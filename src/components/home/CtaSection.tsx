"use client";

import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { BookDemoModal } from "@/components/home/BookDemoModal";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  brandSectionBackground,
  SECTION_HEADER_MB,
  SECTION_PX,
  SECTION_PY,
  primaryCtaSx,
  secondaryCtaSx,
} from "@/components/home/styles";
import { useLanguage } from "@/i18n/LanguageProvider";
import {
  BILLING_CYCLES,
  formatUsd,
  getExpansionBranchQuote,
  getMainBranchQuote,
  getPlanCardSavings,
  SETUP_FEE_USD,
  type BillingCycle,
  type PlanKey,
} from "@/lib/pricing";
import { AnimatePresence, motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.08 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
};

const PLAN_KEYS: PlanKey[] = ["foundation", "pro"];
const VISIBLE_FEATURE_COUNT = 2;

type PlanFeature = { text: string };

const featureListSx = {
  m: 0,
  p: 0,
  listStyle: "none",
  display: "flex",
  flexDirection: "column" as const,
  gap: 1,
};

const featureItemSx = {
  display: "flex",
  alignItems: "flex-start",
  gap: 1,
};

function FeatureTick({ isDark }: { isDark: boolean }) {
  return (
    <CheckIcon
      sx={{
        fontSize: 14,
        flexShrink: 0,
        mt: "2px",
        color: isDark ? "#94a3b8" : "#64748b",
      }}
    />
  );
}

function FeatureChevron({ open }: { open: boolean }) {
  return (
    <Box
      component="svg"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden
      sx={{
        width: 16,
        height: 16,
        flexShrink: 0,
        transition: "transform 0.22s ease",
        transform: open ? "rotate(180deg)" : "rotate(0deg)",
      }}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </Box>
  );
}

function FeatureList({ items, isDark }: { items: string[]; isDark: boolean }) {
  return (
    <Box component="ul" sx={featureListSx}>
      {items.map((text) => (
        <Box component="li" key={text} sx={featureItemSx}>
          <FeatureTick isDark={isDark} />
          <Typography sx={{ fontSize: 14, lineHeight: 1.45, color: "text.secondary", fontWeight: 500 }}>
            {text}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function PlanFeaturesAccordion({
  features,
  open,
  onOpenChange,
  isDark,
  labels,
}: {
  features: PlanFeature[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isDark: boolean;
  labels: { viewAllFeatures: string; hideFeatures: string; moreFeatures: string };
}) {
  const linkColor = isDark ? "#94a3b8" : "#6b7280";
  const linkHover = isDark ? "#f1f5f9" : "#111827";
  const allItems = features.map((f) => f.text);
  const visibleItems = allItems.slice(0, VISIBLE_FEATURE_COUNT);
  const hiddenItems = allItems.slice(VISIBLE_FEATURE_COUNT);
  const hasHidden = hiddenItems.length > 0;

  const toggleLabel = open
    ? labels.hideFeatures
    : hiddenItems.length > 0
      ? labels.moreFeatures.replace("{count}", String(hiddenItems.length))
      : labels.viewAllFeatures;

  return (
    <Box sx={{ mt: 1.5 }}>
      {visibleItems.length > 0 ? <FeatureList items={visibleItems} isDark={isDark} /> : null}

      {hasHidden ? (
        <>
          <Box
            component="button"
            type="button"
            onClick={() => onOpenChange(!open)}
            aria-expanded={open}
            sx={{
              display: "inline-flex",
              alignItems: "center",
              gap: 0.5,
              mt: 1.25,
              p: 0,
              border: "none",
              bgcolor: "transparent",
              cursor: "pointer",
              fontSize: 14,
              fontWeight: 500,
              fontFamily: "inherit",
              color: linkColor,
              transition: "color 0.2s ease",
              "&:hover": { color: linkHover },
            }}
          >
            {toggleLabel}
            <FeatureChevron open={open} />
          </Box>

          <AnimatePresence initial={false}>
            {open ? (
              <motion.div
                key="more-features"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.28, ease: [0.4, 0, 0.2, 1] }}
                style={{ overflow: "hidden" }}
              >
                <Box sx={{ mt: 1.25 }}>
                  <FeatureList items={hiddenItems} isDark={isDark} />
                </Box>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </>
      ) : null}
    </Box>
  );
}

function cycleBadge(
  cycle: BillingCycle,
  p: { semiAnnualBadge: string; annualBadge: string },
): string | null {
  if (cycle === "semiAnnual") return p.semiAnnualBadge;
  if (cycle === "annual") return p.annualBadge;
  return null;
}

type PricingCopy = {
  mainBranchLabel: string;
  expansionBranchLabel: string;
  perMonth: string;
  billedYearly: string;
  billedSemiAnnual: string;
  savePerYear: string;
  savePerPeriod: string;
  setupFeeMonthly: string;
  setupFeeWaived: string;
};

const branchLabelSx = {
  fontSize: 10,
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase" as const,
  color: "text.secondary",
  mb: 1,
};

function formatSaveLine(
  billing: BillingCycle,
  amount: number,
  p: Pick<PricingCopy, "savePerYear" | "savePerPeriod">,
): string {
  const formatted = formatUsd(amount);
  if (billing === "annual") {
    return p.savePerYear.replace("{amount}", formatted);
  }
  return p.savePerPeriod.replace("{amount}", formatted);
}

function SetupFeeLine({
  billing,
  p,
  savingsGreen,
  mutedColor,
}: {
  billing: BillingCycle;
  p: Pick<PricingCopy, "setupFeeMonthly" | "setupFeeWaived">;
  savingsGreen: string;
  mutedColor: string;
}) {
  if (billing === "annual") {
    return (
      <Typography sx={{ mt: 1, fontSize: 12, fontWeight: 500, color: "text.secondary", lineHeight: 1.4 }}>
        <Box
          component="span"
          sx={{ textDecoration: "line-through", color: mutedColor, mr: 0.5 }}
        >
          +{formatUsd(SETUP_FEE_USD)}
        </Box>
        <Box component="span" sx={{ color: savingsGreen, fontWeight: 600 }}>
          {p.setupFeeWaived}
        </Box>
      </Typography>
    );
  }

  return (
    <Typography sx={{ mt: 1, fontSize: 12, fontWeight: 500, color: "text.secondary", lineHeight: 1.4 }}>
      {p.setupFeeMonthly.replace("{amount}", formatUsd(SETUP_FEE_USD))}
    </Typography>
  );
}

type BranchPriceQuote = {
  perMonth: number;
  totalUpfront: number;
  savingsAmount: number | null;
};

function BranchPricingBlock({
  label,
  quote,
  billing,
  p,
  savingsGreen,
  isDark,
  compact,
  saveAmount,
}: {
  label: string;
  quote: BranchPriceQuote;
  billing: BillingCycle;
  p: PricingCopy;
  savingsGreen: string;
  isDark: boolean;
  compact?: boolean;
  saveAmount: number | null;
}) {
  const billedSubtext = isDark ? "#94a3b8" : "#9ca3af";
  const perMonthSubtext = isDark ? "#64748b" : "#9ca3af";

  const billedInline =
    billing === "annual"
      ? p.billedYearly.replace("{total}", formatUsd(quote.totalUpfront))
      : billing === "semiAnnual"
        ? p.billedSemiAnnual.replace("{total}", formatUsd(quote.totalUpfront))
        : null;

  const saveLine =
    billing !== "monthly" && saveAmount != null && saveAmount > 0
      ? formatSaveLine(billing, saveAmount, p)
      : null;

  return (
    <Box>
      <Typography sx={branchLabelSx}>{label}</Typography>
      <Box sx={{ display: "flex", alignItems: "baseline", gap: 0.5 }}>
        <Typography
          sx={{
            fontSize: compact ? { xs: "1.45rem", md: "1.55rem" } : { xs: "1.85rem", md: "2.1rem" },
            fontWeight: 700,
            color: "text.primary",
            lineHeight: 1.1,
          }}
        >
          {formatUsd(quote.perMonth)}
        </Typography>
        <Typography
          sx={{
            fontSize: compact ? 12 : 13,
            fontWeight: 400,
            color: perMonthSubtext,
            lineHeight: 1.2,
          }}
        >
          {p.perMonth}
        </Typography>
      </Box>

      {billedInline || saveLine ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "baseline",
            flexWrap: "wrap",
            columnGap: 1.25,
            rowGap: 0.25,
            mt: 0.75,
          }}
        >
          {billedInline ? (
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 400,
                color: billedSubtext,
                lineHeight: 1.3,
              }}
            >
              {billedInline}
            </Typography>
          ) : null}
          {saveLine ? (
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 600,
                color: savingsGreen,
                lineHeight: 1.3,
              }}
            >
              {saveLine}
            </Typography>
          ) : null}
        </Box>
      ) : null}
    </Box>
  );
}

function BranchPricingGrid({
  main,
  expansion,
  billing,
  p,
  isDark,
  savingsGreen,
  cardSavings,
  dividerColor,
}: {
  main: BranchPriceQuote;
  expansion: BranchPriceQuote;
  billing: BillingCycle;
  p: PricingCopy;
  isDark: boolean;
  savingsGreen: string;
  cardSavings: ReturnType<typeof getPlanCardSavings>;
  dividerColor: string;
}) {
  const mutedColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <Box
      sx={{
        mt: 2,
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
        gap: { xs: 0, md: 3 },
        alignItems: "start",
      }}
    >
      <Box
        sx={{
          borderBottom: { xs: `1px solid ${dividerColor}`, md: "none" },
          pb: { xs: 3, md: 0 },
          pr: { md: 3 },
          borderRight: { md: `1px solid ${dividerColor}` },
        }}
      >
        <BranchPricingBlock
          label={p.mainBranchLabel}
          quote={main}
          billing={billing}
          p={p}
          savingsGreen={savingsGreen}
          isDark={isDark}
          saveAmount={cardSavings?.total ?? null}
        />
        <SetupFeeLine billing={billing} p={p} savingsGreen={savingsGreen} mutedColor={mutedColor} />
      </Box>

      <Box sx={{ pt: { xs: 3, md: 0 }, pl: { md: 1 } }}>
        <BranchPricingBlock
          label={p.expansionBranchLabel}
          quote={expansion}
          billing={billing}
          p={p}
          savingsGreen={savingsGreen}
          isDark={isDark}
          compact
          saveAmount={expansion.savingsAmount}
        />
      </Box>
    </Box>
  );
}

export function CtaSection() {
  const isDark = useTheme().palette.mode === "dark";
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [featuresExpanded, setFeaturesExpanded] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();
  const p = t.cta;

  const labelColor = isDark ? "#F472B6" : "#E11D48";
  const border = isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.08)";
  const cardBg = isDark ? "rgba(30, 32, 44, 0.82)" : "#ffffff";
  const toggleBg = isDark ? "rgba(255,255,255,0.08)" : "#ffffff";
  const toggleActiveBg = isDark ? "rgba(30,32,44,0.95)" : "#fdf2f8";
  const toggleTrackBorder = isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(15,23,42,0.1)";
  const toggleShadow = isDark
    ? "0 4px 20px rgba(0,0,0,0.2)"
    : "0 4px 20px rgba(225,29,72,0.08), 0 1px 3px rgba(15,23,42,0.06)";
  const selectedToggleShadow = isDark ? "none" : "0 1px 4px rgba(15,23,42,0.08)";
  const savingsGreen = isDark ? "#34d399" : "#059669";
  const branchDividerColor = isDark ? "rgba(255,255,255,0.1)" : "#e5e7eb";
  return (
    <Box
      component="section"
      sx={{
        py: SECTION_PY,
        px: SECTION_PX,
        position: "relative",
        overflow: "hidden",
        background: brandSectionBackground(isDark),
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          sx={{ mb: SECTION_HEADER_MB }}
        >
          <SectionHeading
            label={p.sectionLabel}
            title={p.title1}
            titleHighlight={p.titleHighlight}
            subtitle={p.subtitle}
            singleLineTitle
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mb: { xs: 2.5, md: 3 },
            width: "100%",
          }}
        >
          <Box
            role="group"
            aria-label={p.billingToggleLabel}
            sx={{
              display: { xs: "grid", md: "inline-flex" },
              gridTemplateColumns: { xs: "repeat(3, minmax(0, 1fr))", md: "none" },
              width: { xs: "100%", md: "auto" },
              maxWidth: { xs: "100%", md: "none" },
              gap: 0.5,
              p: 0.5,
              borderRadius: "999px",
              bgcolor: toggleBg,
              border: toggleTrackBorder,
              boxShadow: toggleShadow,
            }}
          >
            {BILLING_CYCLES.map((cycle) => {
              const selected = billing === cycle;
              const badge = cycleBadge(cycle, p);
              const cycleLabel =
                cycle === "monthly"
                  ? p.billingMonthly
                  : cycle === "semiAnnual"
                    ? p.billingSemiAnnual
                    : p.billingAnnual;
              const cycleLabelShort =
                cycle === "semiAnnual" ? p.billingSemiAnnualShort : cycleLabel;

              return (
                <Button
                  key={cycle}
                  variant="text"
                  onClick={() => setBilling(cycle)}
                  disableElevation
                  disableRipple
                  sx={{
                    textTransform: "none",
                    borderRadius: "999px",
                    px: { xs: 0.75, sm: 2.25 },
                    py: { xs: 0.75, sm: 0.85 },
                    minWidth: { xs: 0, sm: 108 },
                    width: { xs: "100%", md: "auto" },
                    fontSize: { xs: 12, sm: 13 },
                    fontWeight: 600,
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    color: selected ? "text.primary" : "text.secondary",
                    bgcolor: selected ? toggleActiveBg : "transparent",
                    boxShadow: selected ? selectedToggleShadow : "none",
                    flexDirection: "row",
                    gap: 0.35,
                    "&:hover": {
                      bgcolor: selected
                        ? toggleActiveBg
                        : isDark
                          ? "rgba(255,255,255,0.05)"
                          : "rgba(253,242,248,0.6)",
                      boxShadow: selected ? selectedToggleShadow : "none",
                    },
                    "&:active": {
                      boxShadow: "none",
                    },
                  }}
                >
                  <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
                    {cycleLabel}
                  </Box>
                  <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
                    {cycleLabelShort}
                  </Box>
                  {badge ? (
                    <Box
                      component="span"
                      sx={{
                        px: 0.45,
                        py: 0.05,
                        borderRadius: "6px",
                        fontSize: { xs: 8, sm: 9 },
                        fontWeight: 800,
                        letterSpacing: "0.02em",
                        color: isDark ? "#fda4af" : "#be123c",
                        bgcolor: isDark ? "rgba(244,114,182,0.15)" : "rgba(225,29,72,0.08)",
                      }}
                    >
                      {badge}
                    </Box>
                  ) : null}
                </Button>
              );
            })}
          </Box>
        </Box>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: { xs: 2.5, md: 3 },
            maxWidth: 1024,
            mx: "auto",
            width: "100%",
          }}
        >
          {PLAN_KEYS.map((planKey) => {
            const plan = p.plans[planKey];
            const main = getMainBranchQuote(planKey, billing);
            const expansion = getExpansionBranchQuote(planKey, billing);
            const cardSavings = getPlanCardSavings(planKey, billing);
            const isHighlighted = plan.recommended;
            const features = plan.features as PlanFeature[];

            return (
              <Box
                component={motion.article}
                variants={itemVariants}
                key={planKey}
                sx={{
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  p: { xs: 3, md: 3.5 },
                  borderRadius: "16px",
                  border: isHighlighted
                    ? `1.5px solid ${isDark ? "rgba(244,114,182,0.45)" : "rgba(225,29,72,0.3)"}`
                    : border,
                  bgcolor: cardBg,
                  textAlign: "left",
                  opacity: plan.comingSoon ? 0.92 : 1,
                }}
              >
                {cardSavings ? (
                  <Box
                    sx={{
                      position: "absolute",
                      top: { xs: 14, md: 16 },
                      right: { xs: 14, md: 16 },
                      px: 1,
                      py: 0.35,
                      borderRadius: "8px",
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: "0.04em",
                      color: isDark ? "#fda4af" : "#be123c",
                      bgcolor: isDark ? "rgba(244,114,182,0.15)" : "rgba(225,29,72,0.08)",
                    }}
                  >
                    {p.savePercentBadge.replace("{percent}", String(cardSavings.percent))}
                  </Box>
                ) : null}

                <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", mb: 1.5, pr: cardSavings ? 7 : 0 }}>
                  <Typography
                    sx={{
                      fontSize: 11,
                      fontWeight: 800,
                      letterSpacing: "0.07em",
                      textTransform: "uppercase",
                      color: labelColor,
                    }}
                  >
                    {plan.badge}
                  </Typography>
                  {plan.recommended ? (
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: isDark ? "#34d399" : "#059669",
                      }}
                    >
                      {p.recommendedLabel}
                    </Typography>
                  ) : null}
                  {plan.comingSoon ? (
                    <Typography
                      sx={{
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.05em",
                        textTransform: "uppercase",
                        color: isDark ? "#94a3b8" : "#64748b",
                      }}
                    >
                      {p.comingSoonLabel}
                    </Typography>
                  ) : null}
                </Box>

                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: 17, md: 18 },
                    color: "text.primary",
                    lineHeight: 1.25,
                    mt: 0.25,
                  }}
                >
                  {plan.name}
                </Typography>

                <BranchPricingGrid
                  main={main}
                  expansion={expansion}
                  billing={billing}
                  p={p}
                  isDark={isDark}
                  savingsGreen={savingsGreen}
                  cardSavings={cardSavings}
                  dividerColor={branchDividerColor}
                />

                <Box sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
                  <Typography sx={{ mt: 3, fontSize: 13, lineHeight: 1.55, color: "text.secondary", fontWeight: 500 }}>
                    {plan.description}
                  </Typography>

                  <PlanFeaturesAccordion
                    features={features}
                    open={featuresExpanded}
                    onOpenChange={setFeaturesExpanded}
                    isDark={isDark}
                    labels={{
                      viewAllFeatures: p.viewAllFeatures,
                      hideFeatures: p.hideFeatures,
                      moreFeatures: p.moreFeatures,
                    }}
                  />

                  <Box sx={{ mt: "auto", pt: 2, flexShrink: 0 }}>
                    <Button
                      fullWidth
                      variant={plan.ctaVariant === "primary" ? "contained" : "outlined"}
                      disabled={plan.comingSoon}
                      onClick={() => {
                        if (!plan.comingSoon) setIsModalOpen(true);
                      }}
                      sx={{
                        ...(plan.ctaVariant === "primary" ? primaryCtaSx(isDark) : secondaryCtaSx(isDark)),
                      }}
                    >
                      {plan.ctaLabel}
                    </Button>

                    {plan.trialSubtext ? (
                      <Typography
                        sx={{
                          mt: 1.25,
                          fontSize: 12,
                          fontWeight: 500,
                          color: "text.secondary",
                          textAlign: "center",
                          lineHeight: 1.45,
                        }}
                      >
                        {plan.trialSubtext}
                      </Typography>
                    ) : null}
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          sx={{
            mt: { xs: 4, md: 5 },
            maxWidth: 720,
            mx: "auto",
            p: { xs: 2.5, md: 3 },
            borderRadius: "14px",
            textAlign: "center",
            border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(15,23,42,0.08)",
            bgcolor: isDark ? "rgba(30, 32, 44, 0.82)" : "#ffffff",
            boxShadow: isDark
              ? "0 8px 32px rgba(0,0,0,0.25)"
              : "0 10px 40px -12px rgba(225,29,72,0.1), 0 4px 16px rgba(15,23,42,0.06)",
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 15, md: 16 },
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 1.4,
            }}
          >
            {p.guarantee.title}
          </Typography>
          <Typography
            sx={{
              mt: 1.25,
              fontSize: { xs: 13.5, md: 14.5 },
              lineHeight: 1.65,
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
            {p.guarantee.body}
          </Typography>
        </Box>
      </Container>

      <BookDemoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
