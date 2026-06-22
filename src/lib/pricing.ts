export type BillingCycle = "monthly" | "semiAnnual" | "annual";

export type PlanKey = "foundation" | "pro";

export const SETUP_FEE_USD = 49;

type BranchRates = {
  monthly: number;
  semiAnnualPerMonth: number;
  semiAnnualTotal: number;
  annualPerMonth: number;
  annualTotal: number;
};

export const PLAN_PRICING: Record<PlanKey, { main: BranchRates; expansion: BranchRates }> = {
  foundation: {
    main: {
      monthly: 49,
      semiAnnualPerMonth: 44,
      semiAnnualTotal: 264,
      annualPerMonth: 39,
      annualTotal: 468,
    },
    expansion: {
      monthly: 29,
      semiAnnualPerMonth: 26,
      semiAnnualTotal: 156,
      annualPerMonth: 24,
      annualTotal: 288,
    },
  },
  pro: {
    main: {
      monthly: 89,
      semiAnnualPerMonth: 80,
      semiAnnualTotal: 480,
      annualPerMonth: 75,
      annualTotal: 900,
    },
    expansion: {
      monthly: 59,
      semiAnnualPerMonth: 53,
      semiAnnualTotal: 318,
      annualPerMonth: 49,
      annualTotal: 588,
    },
  },
};

export const BILLING_CYCLES: BillingCycle[] = ["monthly", "semiAnnual", "annual"];

export function formatUsd(amount: number): string {
  return `$${amount}`;
}

export function isSetupFeeWaived(cycle: BillingCycle): boolean {
  return cycle === "annual";
}

export function setupFeeAmount(cycle: BillingCycle): number {
  return isSetupFeeWaived(cycle) ? 0 : SETUP_FEE_USD;
}

function billingPeriodMonths(cycle: BillingCycle): number {
  if (cycle === "semiAnnual") return 6;
  if (cycle === "annual") return 12;
  return 1;
}

function subscriptionSavings(monthlyList: number, perMonth: number, totalUpfront: number, cycle: BillingCycle) {
  const months = billingPeriodMonths(cycle);
  const listTotal = monthlyList * months;
  const saved = listTotal - totalUpfront;
  const percent = listTotal > 0 ? Math.round((saved / listTotal) * 100) : 0;
  const savedPerMonth = monthlyList - perMonth;
  return { saved, percent, months, savedPerMonth };
}

export function getMainBranchQuote(planKey: PlanKey, cycle: BillingCycle) {
  const rates = PLAN_PRICING[planKey].main;
  switch (cycle) {
    case "monthly":
      return {
        perMonth: rates.monthly,
        totalUpfront: rates.monthly,
        compareMonthly: null as number | null,
        savingsPercent: null as number | null,
        savingsAmount: null as number | null,
        savingsPerMonth: null as number | null,
        setupSavingsAmount: null as number | null,
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
        setupSavingsAmount: null,
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
        setupSavingsAmount: SETUP_FEE_USD,
        billingMonths: s.months,
      };
    }
  }
}

export function getExpansionBranchQuote(planKey: PlanKey, cycle: BillingCycle) {
  const rates = PLAN_PRICING[planKey].expansion;
  switch (cycle) {
    case "monthly":
      return {
        perMonth: rates.monthly,
        totalUpfront: rates.monthly,
        compareMonthly: null as number | null,
        savingsPercent: null as number | null,
        savingsAmount: null as number | null,
        savingsPerMonth: null as number | null,
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
        billingMonths: s.months,
      };
    }
  }
}

export function getPlanCardSavings(planKey: PlanKey, cycle: BillingCycle) {
  const main = getMainBranchQuote(planKey, cycle);
  if (main.savingsAmount == null || main.savingsPercent == null) {
    return null;
  }
  const setup = main.setupSavingsAmount ?? 0;
  return {
    percent: main.savingsPercent,
    subscription: main.savingsAmount,
    setup,
    total: main.savingsAmount + setup,
  };
}

export function formatExpansionPrice(planKey: PlanKey, cycle: BillingCycle): string {
  const q = getExpansionBranchQuote(planKey, cycle);
  return `+${formatUsd(q.perMonth)}/mo`;
}

export type BranchQuote = ReturnType<typeof getMainBranchQuote>;

export function getBranchSavingsAmount(quote: BranchQuote): number | null {
  return quote.savingsAmount;
}
