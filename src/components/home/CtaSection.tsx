"use client";

import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { BookDemoModal } from "@/components/home/BookDemoModal";
import { SectionHeading } from "@/components/home/SectionHeading";
import {
  brandSectionBackground,
  SECTION_HEADER_MB,
  SECTION_PX,
  SECTION_PY,
  primaryCtaSx,
} from "@/components/home/styles";
import { useLanguage } from "@/i18n/LanguageProvider";
import { scrollToSection } from "@/lib/scroll";
import {
  BILLING_CYCLES,
  BRANCH_MODES,
  formatUsd,
  getAddonBranchQuote,
  getCoreBranchQuote,
  getModeCardSavings,
  SETUP_FEE_ADDON_USD,
  SETUP_FEE_CORE_USD,
  type BillingCycle,
  type BranchMode,
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
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 26 },
  },
};

const MODE_ICONS = {
  flex: GroupsOutlinedIcon,
  fixed: TableRestaurantOutlinedIcon,
} as const;

type PlanCopy = {
  name: string;
  tagline: string;
  description: string;
  features: readonly PlanFeature[];
  ctaLabel: string;
  trialSubtext: string;
  ctaVariant: "primary";
};

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
          <Typography
            sx={{
              fontSize: 14,
              lineHeight: 1.45,
              color: "text.secondary",
              fontWeight: 500,
            }}
          >
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
  labels: {
    viewAllFeatures: string;
    hideFeatures: string;
    moreFeatures: string;
  };
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
      {visibleItems.length > 0 ? (
        <FeatureList items={visibleItems} isDark={isDark} />
      ) : null}

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
  coreBranchLabel: string;
  addonBranchLabel: string;
  perMonth: string;
  billedYearly: string;
  billedSemiAnnual: string;
  savePerYear: string;
  savePerPeriod: string;
  savePercentBadge: string;
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
  fee,
  p,
  savingsGreen,
  mutedColor,
}: {
  billing: BillingCycle;
  fee: number;
  p: Pick<PricingCopy, "setupFeeMonthly" | "setupFeeWaived">;
  savingsGreen: string;
  mutedColor: string;
}) {
  if (billing === "annual") {
    return (
      <Typography
        sx={{
          mt: 1,
          fontSize: 12,
          fontWeight: 500,
          color: "text.secondary",
          lineHeight: 1.4,
        }}
      >
        <Box
          component="span"
          sx={{ textDecoration: "line-through", color: mutedColor, mr: 0.5 }}
        >
          +{formatUsd(fee)}
        </Box>
        <Box component="span" sx={{ color: savingsGreen, fontWeight: 600 }}>
          {p.setupFeeWaived}
        </Box>
      </Typography>
    );
  }

  return (
    <Typography
      sx={{
        mt: 1,
        fontSize: 12,
        fontWeight: 500,
        color: "text.secondary",
        lineHeight: 1.4,
      }}
    >
      {p.setupFeeMonthly.replace("{amount}", formatUsd(fee))}
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
            fontSize: compact
              ? { xs: "1.45rem", md: "1.55rem" }
              : { xs: "1.85rem", md: "2.1rem" },
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
  core,
  addon,
  billing,
  p,
  isDark,
  savingsGreen,
  cardSavings,
  dividerColor,
}: {
  core: BranchPriceQuote;
  addon: BranchPriceQuote;
  billing: BillingCycle;
  p: PricingCopy;
  isDark: boolean;
  savingsGreen: string;
  cardSavings: ReturnType<typeof getModeCardSavings>;
  dividerColor: string;
}) {
  const mutedColor = isDark ? "#94a3b8" : "#64748b";

  return (
    <Box sx={{ position: "relative", mt: 2 }}>
      {cardSavings ? (
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            px: 1,
            py: 0.35,
            borderRadius: "8px",
            fontSize: 10,
            fontWeight: 800,
            letterSpacing: "0.04em",
            color: isDark ? "#fda4af" : "#be123c",
            bgcolor: isDark ? "rgba(244,114,182,0.15)" : "rgba(225,29,72,0.08)",
          }}
        >
          {p.savePercentBadge.replace("{percent}", String(cardSavings.percent))}
        </Box>
      ) : null}

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
          gap: { xs: 0, sm: 2.5 },
          alignItems: "start",
          pt: cardSavings ? 0.5 : 0,
        }}
      >
        <Box
          sx={{
            borderBottom: { xs: `1px solid ${dividerColor}`, sm: "none" },
            pb: { xs: 2.5, sm: 0 },
            pr: { sm: 2.5 },
            borderRight: { sm: `1px solid ${dividerColor}` },
          }}
        >
          <BranchPricingBlock
            label={p.coreBranchLabel}
            quote={core}
            billing={billing}
            p={p}
            savingsGreen={savingsGreen}
            isDark={isDark}
            saveAmount={cardSavings?.total ?? null}
          />
          <SetupFeeLine
            billing={billing}
            fee={SETUP_FEE_CORE_USD}
            p={p}
            savingsGreen={savingsGreen}
            mutedColor={mutedColor}
          />
        </Box>

        <Box sx={{ pt: { xs: 2.5, sm: 0 }, pl: { sm: 0.5 } }}>
          <BranchPricingBlock
            label={p.addonBranchLabel}
            quote={addon}
            billing={billing}
            p={p}
            savingsGreen={savingsGreen}
            isDark={isDark}
            compact
            saveAmount={addon.savingsAmount}
          />
          <SetupFeeLine
            billing={billing}
            fee={SETUP_FEE_ADDON_USD}
            p={p}
            savingsGreen={savingsGreen}
            mutedColor={mutedColor}
          />
        </Box>
      </Box>
    </Box>
  );
}

function SetupFeeCallout({
  isDark,
  text,
  note,
}: {
  isDark: boolean;
  text: string;
  note: string;
}) {
  const border = isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.08)";
  const bg = isDark ? "rgba(30, 32, 44, 0.55)" : "rgba(248, 250, 252, 0.9)";

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      sx={{
        mb: { xs: 2.5, md: 3 },
        maxWidth: 640,
        mx: "auto",
        px: { xs: 2, sm: 2.5 },
        py: { xs: 1.25, sm: 1.5 },
        borderRadius: "12px",
        border,
        bgcolor: bg,
        textAlign: "center",
      }}
    >
      <Typography sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 600, color: "text.primary", lineHeight: 1.45 }}>
        {text}
      </Typography>
      <Typography sx={{ mt: 0.5, fontSize: 12, fontWeight: 500, color: "text.secondary", lineHeight: 1.4 }}>
        {note}
      </Typography>
    </Box>
  );
}

function PricingModesBridge({
  bridge,
  linkLabel,
  isDark,
}: {
  bridge: string;
  linkLabel: string;
  isDark: boolean;
}) {
  const linkColor = isDark ? "#F472B6" : "#E11D48";

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      sx={{ mb: { xs: 2.5, md: 3 }, textAlign: "center" }}
    >
      <Typography sx={{ fontSize: { xs: 13, sm: 14 }, fontWeight: 500, color: "text.secondary", lineHeight: 1.5 }}>
        {bridge}{" "}
        <Box
          component="a"
          href="#branch-modes"
          onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
            e.preventDefault();
            scrollToSection("branch-modes");
          }}
          sx={{
            color: linkColor,
            fontWeight: 600,
            textDecoration: "none",
            borderBottom: `1px solid ${isDark ? "rgba(244,114,182,0.35)" : "rgba(225,29,72,0.25)"}`,
            transition: "opacity 0.2s ease",
            "&:hover": { opacity: 0.85 },
          }}
        >
          {linkLabel}
        </Box>
      </Typography>
    </Box>
  );
}

function ModePricingCard({
  mode,
  plan,
  billing,
  p,
  isDark,
  border,
  cardBg,
  labelColor,
  savingsGreen,
  branchDividerColor,
  featuresExpanded,
  onFeaturesToggle,
  onBookDemo,
  featureLabels,
}: {
  mode: BranchMode;
  plan: PlanCopy;
  billing: BillingCycle;
  p: PricingCopy & {
    viewAllFeatures: string;
    hideFeatures: string;
    moreFeatures: string;
  };
  isDark: boolean;
  border: string;
  cardBg: string;
  labelColor: string;
  savingsGreen: string;
  branchDividerColor: string;
  featuresExpanded: boolean;
  onFeaturesToggle: (open: boolean) => void;
  onBookDemo: () => void;
  featureLabels: {
    viewAllFeatures: string;
    hideFeatures: string;
    moreFeatures: string;
  };
}) {
  const Icon = MODE_ICONS[mode];
  const cardSavings = getModeCardSavings(mode, billing);
  const features = plan.features as PlanFeature[];

  return (
    <Box
      component={motion.article}
      variants={itemVariants}
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        p: { xs: 3, md: 3.5 },
        borderRadius: "16px",
        border,
        bgcolor: cardBg,
        textAlign: "left",
        boxShadow: isDark
          ? "0 12px 36px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 12px 40px -12px rgba(15,23,42,0.1)",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1.5 }}>
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            bgcolor: isDark
              ? "rgba(244, 114, 182, 0.12)"
              : "rgba(225, 29, 72, 0.08)",
            color: labelColor,
          }}
        >
          <Icon sx={{ fontSize: 24 }} />
        </Box>
        <Typography
          sx={{
            fontWeight: 700,
            fontSize: { xs: 18, md: 20 },
            color: "text.primary",
            lineHeight: 1.25,
          }}
        >
          {plan.name}
        </Typography>
      </Box>

      <Typography
        sx={{
          fontWeight: 700,
          fontSize: 14,
          color: "text.primary",
          lineHeight: 1.4,
        }}
      >
        {plan.tagline}
      </Typography>

      <Typography
        sx={{
          mt: 1,
          fontSize: 13,
          lineHeight: 1.55,
          color: "text.secondary",
          fontWeight: 500,
        }}
      >
        {plan.description}
      </Typography>

      <BranchPricingGrid
        core={getCoreBranchQuote(mode, billing)}
        addon={getAddonBranchQuote(mode, billing)}
        billing={billing}
        p={p}
        isDark={isDark}
        savingsGreen={savingsGreen}
        cardSavings={cardSavings}
        dividerColor={branchDividerColor}
      />

      <Box
        sx={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}
      >
        <PlanFeaturesAccordion
          features={features}
          open={featuresExpanded}
          onOpenChange={onFeaturesToggle}
          isDark={isDark}
          labels={featureLabels}
        />

        <Box sx={{ mt: "auto", pt: 2, flexShrink: 0 }}>
          <Button
            fullWidth
            variant="contained"
            onClick={onBookDemo}
            sx={primaryCtaSx(isDark)}
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
}

export function CtaSection() {
  const isDark = useTheme().palette.mode === "dark";
  const [billing, setBilling] = useState<BillingCycle>("monthly");
  const [featuresExpanded, setFeaturesExpanded] = useState<
    Record<BranchMode, boolean>
  >({
    flex: false,
    fixed: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();
  const p = t.cta;

  const labelColor = isDark ? "#F472B6" : "#E11D48";
  const border = isDark
    ? "1px solid rgba(255, 255, 255, 0.1)"
    : "1px solid rgba(15, 23, 42, 0.08)";
  const cardBg = isDark ? "rgba(30, 32, 44, 0.82)" : "#ffffff";
  const toggleBg = isDark ? "rgba(255,255,255,0.08)" : "#ffffff";
  const toggleActiveBg = isDark ? "rgba(30,32,44,0.95)" : "#fdf2f8";
  const toggleTrackBorder = isDark
    ? "1px solid rgba(255,255,255,0.12)"
    : "1px solid rgba(15,23,42,0.1)";
  const toggleShadow = isDark
    ? "0 4px 20px rgba(0,0,0,0.2)"
    : "0 4px 20px rgba(225,29,72,0.08), 0 1px 3px rgba(15,23,42,0.06)";
  const selectedToggleShadow = isDark
    ? "none"
    : "0 1px 4px rgba(15,23,42,0.08)";
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
              gridTemplateColumns: {
                xs: "repeat(3, minmax(0, 1fr))",
                md: "none",
              },
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
                  <Box
                    component="span"
                    sx={{ display: { xs: "none", sm: "inline" } }}
                  >
                    {cycleLabel}
                  </Box>
                  <Box
                    component="span"
                    sx={{ display: { xs: "inline", sm: "none" } }}
                  >
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
                        bgcolor: isDark
                          ? "rgba(244,114,182,0.15)"
                          : "rgba(225,29,72,0.08)",
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

        <PricingModesBridge
          bridge={p.pricingModesBridge}
          linkLabel={p.pricingModesBridgeLink}
          isDark={isDark}
        />

        <SetupFeeCallout
          isDark={isDark}
          text={p.setupFeeCallout
            .replace("{core}", formatUsd(SETUP_FEE_CORE_USD))
            .replace("{addon}", formatUsd(SETUP_FEE_ADDON_USD))}
          note={p.setupFeeCalloutNote}
        />

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
          {BRANCH_MODES.map((mode) => (
            <ModePricingCard
              key={mode}
              mode={mode}
              plan={p.plans[mode]}
              billing={billing}
              p={p}
              isDark={isDark}
              border={border}
              cardBg={cardBg}
              labelColor={labelColor}
              savingsGreen={savingsGreen}
              branchDividerColor={branchDividerColor}
              featuresExpanded={featuresExpanded[mode]}
              onFeaturesToggle={(open) =>
                setFeaturesExpanded((prev) => ({ ...prev, [mode]: open }))
              }
              onBookDemo={() => setIsModalOpen(true)}
              featureLabels={{
                viewAllFeatures: p.viewAllFeatures,
                hideFeatures: p.hideFeatures,
                moreFeatures: p.moreFeatures,
              }}
            />
          ))}
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
            border: isDark
              ? "1px solid rgba(255,255,255,0.1)"
              : "1px solid rgba(15,23,42,0.08)",
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
