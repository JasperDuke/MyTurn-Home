export type BillingCycle = "monthly" | "semiAnnual" | "annual";

export type BranchMode = "flex" | "fixed";

export const SETUP_FEE_CORE_USD = 49.99;
export const SETUP_FEE_ADDON_USD = 39.99;

/** @deprecated Use SETUP_FEE_CORE_USD */
export const SETUP_FEE_USD = SETUP_FEE_CORE_USD;

type BranchRates = {
  monthly: number;
  semiAnnualPerMonth: number;
  semiAnnualTotal: number;
  annualPerMonth: number;
  annualTotal: number;
};

function deriveBranchRates(monthly: number): BranchRates {
  const semiAnnualPerMonth = Math.round(monthly * 0.9 * 100) / 100;
  const annualPerMonth = Math.round(monthly * 0.8 * 100) / 100;

  return {
    monthly,
    semiAnnualPerMonth,
    semiAnnualTotal: Math.round(semiAnnualPerMonth * 6 * 100) / 100,
    annualPerMonth,
    annualTotal: Math.round(annualPerMonth * 12 * 100) / 100,
  };
}

export const MODE_PRICING: Record<BranchMode, { core: BranchRates; addon: BranchRates }> = {
  flex: {
    core: deriveBranchRates(39.99),
    addon: deriveBranchRates(29.99),
  },
  fixed: {
    core: deriveBranchRates(69.99),
    addon: deriveBranchRates(59.99),
  },
};

export const BRANCH_MODES: BranchMode[] = ["flex", "fixed"];

export const BILLING_CYCLES: BillingCycle[] = ["monthly", "semiAnnual", "annual"];

export function formatUsd(amount: number): string {
  const formatted = amount.toFixed(2);
  return formatted.endsWith(".00") ? `$${formatted.slice(0, -3)}` : `$${formatted}`;
}

export function isSetupFeeWaived(cycle: BillingCycle): boolean {
  return cycle === "annual";
}

export function setupFeeAmount(cycle: BillingCycle, branch: "core" | "addon" = "core"): number {
  if (isSetupFeeWaived(cycle)) return 0;
  return branch === "core" ? SETUP_FEE_CORE_USD : SETUP_FEE_ADDON_USD;
}

function billingPeriodMonths(cycle: BillingCycle): number {
  if (cycle === "semiAnnual") return 6;
  if (cycle === "annual") return 12;
  return 1;
}

function subscriptionSavings(monthlyList: number, perMonth: number, totalUpfront: number, cycle: BillingCycle) {
  const months = billingPeriodMonths(cycle);
  const listTotal = monthlyList * months;
  const saved = Math.round((listTotal - totalUpfront) * 100) / 100;
  const percent = listTotal > 0 ? Math.round((saved / listTotal) * 100) : 0;
  const savedPerMonth = Math.round((monthlyList - perMonth) * 100) / 100;
  return { saved, percent, months, savedPerMonth };
}

function getBranchQuote(rates: BranchRates, cycle: BillingCycle, setupSavingsAmount: number | null = null) {
  switch (cycle) {
    case "monthly":
      return {
        perMonth: rates.monthly,
        totalUpfront: rates.monthly,
        compareMonthly: null as number | null,
        savingsPercent: null as number | null,
        savingsAmount: null as number | null,
        savingsPerMonth: null as number | null,
        setupSavingsAmount,
        billingMonths: null as number | null,
      };
    case "semiAnnual": {
      const s = subscriptionSavings(rates.monthly, rates.semiAnnualPerMonth, rates.semiAnnualTotal, cycle);
      return {
        perMonth: rates.semiAnnualPerMonth,
        totalUpfront: rates.semiAnnualTotal,
        compareMonthly: rates.monthly,
        savingsPercent: s.percent,
        savingsAmount: s.saved,
        savingsPerMonth: s.savedPerMonth,
        setupSavingsAmount,
        billingMonths: s.months,
      };
    }
    case "annual": {
      const s = subscriptionSavings(rates.monthly, rates.annualPerMonth, rates.annualTotal, cycle);
      return {
        perMonth: rates.annualPerMonth,
        totalUpfront: rates.annualTotal,
        compareMonthly: rates.monthly,
        savingsPercent: s.percent,
        savingsAmount: s.saved,
        savingsPerMonth: s.savedPerMonth,
        setupSavingsAmount,
        billingMonths: s.months,
      };
    }
  }
}

export function getCoreBranchQuote(mode: BranchMode, cycle: BillingCycle) {
  const setupSavingsAmount = cycle === "annual" ? SETUP_FEE_CORE_USD : null;
  return getBranchQuote(MODE_PRICING[mode].core, cycle, setupSavingsAmount);
}

export function getAddonBranchQuote(mode: BranchMode, cycle: BillingCycle) {
  const setupSavingsAmount = cycle === "annual" ? SETUP_FEE_ADDON_USD : null;
  return getBranchQuote(MODE_PRICING[mode].addon, cycle, setupSavingsAmount);
}

export function getModeCardSavings(mode: BranchMode, cycle: BillingCycle) {
  const core = getCoreBranchQuote(mode, cycle);
  if (core.savingsAmount == null || core.savingsPercent == null) {
    return null;
  }
  const setup = core.setupSavingsAmount ?? 0;
  return {
    percent: core.savingsPercent,
    subscription: core.savingsAmount,
    setup,
    total: Math.round((core.savingsAmount + setup) * 100) / 100,
  };
}

export type BranchQuote = ReturnType<typeof getCoreBranchQuote>;

export function getBranchSavingsAmount(quote: BranchQuote): number | null {
  return quote.savingsAmount;
}
