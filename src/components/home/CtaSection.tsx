"use client";

import { useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import { Box, Button, Container, Typography, useTheme } from "@mui/material";
import { BookDemoModal } from "@/components/home/BookDemoModal";
import { SectionHeading } from "@/components/home/SectionHeading";
import { SECTION_HEADER_MB, SECTION_PX, SECTION_PY, primaryCtaSx, secondaryCtaSx } from "@/components/home/styles";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

function FeatureTick({ isDark }: { isDark: boolean }) {
  return (
    <CheckIcon
      sx={{
        fontSize: 14,
        flexShrink: 0,
        mt: "2px",
        color: isDark ? "#F472B6" : "#E11D48",
      }}
    />
  );
}

export function CtaSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();
  const labelColor = isDark ? "#F472B6" : "#E11D48";
  const border = isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.08)";
  const cardBg = isDark ? "rgba(30, 32, 44, 0.82)" : "#ffffff";

  return (
    <Box sx={{ py: SECTION_PY, px: SECTION_PX, position: "relative", overflow: "hidden", bgcolor: isDark ? "transparent" : "#f8fafc" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isDark
            ? "linear-gradient(90deg, rgba(251,113,133,0.08), transparent, rgba(251,113,133,0.08))"
            : "linear-gradient(90deg, rgba(251,113,133,0.04), transparent, rgba(251,113,133,0.04))",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          sx={{ mb: SECTION_HEADER_MB }}
        >
          <SectionHeading
            label={t.cta.sectionLabel}
            title={t.cta.title1}
            titleHighlight={t.cta.titleHighlight}
            subtitle={t.cta.subtitle}
            singleLineTitle
          />
        </Box>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: { xs: 3, md: 3 },
            justifyContent: "center",
            alignItems: "stretch",
            mx: "auto",
            /** ~max-w-5xl (1024px) — balanced width for two cards + vertical feature lists */
            maxWidth: { xs: "100%", sm: 1024 },
            width: "100%",
          }}
        >
          {t.cta.plans.map((plan, index) => {
            const isFeatured = plan.featured;

            return (
              <Box
                component={motion.div}
                variants={itemVariants}
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  /** ~p-6 / p-7 */
                  p: { xs: 3, md: 3.5 },
                  borderRadius: "20px",
                  border: isFeatured
                    ? `2px solid ${isDark ? "rgba(244,114,182,0.5)" : "rgba(225,29,72,0.35)"}`
                    : border,
                  bgcolor: cardBg,
                  backdropFilter: isDark ? "blur(20px)" : "none",
                  boxShadow: isFeatured
                    ? isDark
                      ? "0 20px 48px rgba(244,114,182,0.18), 0 8px 24px rgba(0,0,0,0.3)"
                      : "0 20px 48px -8px rgba(225,29,72,0.16), 0 8px 24px rgba(15,23,42,0.06)"
                    : isDark
                      ? "0 8px 28px rgba(0,0,0,0.22)"
                      : "0 10px 36px -10px rgba(15,23,42,0.08)",
                  textAlign: "left",
                }}
              >
                <Typography
                  sx={{
                    display: "inline-block",
                    alignSelf: "flex-start",
                    px: 1.25,
                    py: 0.35,
                    borderRadius: "6px",
                    fontSize: 11,
                    fontWeight: 800,
                    letterSpacing: "0.07em",
                    textTransform: "uppercase",
                    color: labelColor,
                    bgcolor: isDark ? "rgba(251,113,133,0.12)" : "rgba(225,29,72,0.07)",
                    border: isDark ? "1px solid rgba(244,114,182,0.22)" : "1px solid rgba(225,29,72,0.12)",
                  }}
                >
                  {plan.badge}
                </Typography>

                <Typography sx={{ mt: 2, fontWeight: 700, fontSize: { xs: 18, md: 20 }, color: "text.primary", lineHeight: 1.25 }}>
                  {plan.name}
                </Typography>

                <Box sx={{ mt: 2, minHeight: { xs: 92, md: 100 } }}>
                  <Box sx={{ display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 0.5 }}>
                    <Typography sx={{ fontSize: { xs: "2rem", md: "2.25rem" }, fontWeight: 700, color: "text.primary", lineHeight: 1 }}>
                      {plan.price}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: { xs: "1.2rem", md: "1.35rem" },
                        fontWeight: 600,
                        color: "text.primary",
                        lineHeight: 1,
                      }}
                    >
                      {plan.priceUnit}
                    </Typography>
                  </Box>
                  {"priceNote" in plan && plan.priceNote ? (
                    <Typography sx={{ mt: 0.5, fontSize: 13, fontWeight: 500, color: "text.secondary", lineHeight: 1.3 }}>
                      {plan.priceNote}
                    </Typography>
                  ) : null}
                  {"setupFee" in plan && plan.setupFee ? (
                    <Box
                      sx={{
                        mt: 1.25,
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                        gap: 0.75,
                        px: 1.25,
                        py: 0.9,
                        borderRadius: "10px",
                        bgcolor: isDark ? "rgba(255, 255, 255, 0.04)" : "rgba(15, 23, 42, 0.025)",
                        border: isDark
                          ? "1px dashed rgba(255, 255, 255, 0.14)"
                          : "1px dashed rgba(15, 23, 42, 0.14)",
                      }}
                    >
                      <Typography component="span" sx={{ fontSize: 14, fontWeight: 600, color: "text.secondary" }}>
                        {plan.setupFee.prefix}
                      </Typography>
                      <Typography component="span" sx={{ fontSize: 16, fontWeight: 700, color: "text.primary", letterSpacing: "-0.01em" }}>
                        {plan.setupFee.amount}
                      </Typography>
                      <Box
                        component="span"
                        sx={{
                          px: 0.85,
                          py: 0.25,
                          borderRadius: "5px",
                          fontSize: 10,
                          fontWeight: 800,
                          letterSpacing: "0.08em",
                          textTransform: "uppercase",
                          lineHeight: 1.2,
                          color: isDark ? "#FCD34D" : "#92400E",
                          bgcolor: isDark ? "rgba(251, 191, 36, 0.16)" : "rgba(245, 158, 11, 0.14)",
                          border: isDark ? "1px solid rgba(251, 191, 36, 0.35)" : "1px solid rgba(245, 158, 11, 0.35)",
                        }}
                      >
                        {plan.setupFee.badge}
                      </Box>
                      <Typography component="span" sx={{ fontSize: 12.5, fontWeight: 500, color: "text.secondary", lineHeight: 1.35 }}>
                        {plan.setupFee.label}
                      </Typography>
                    </Box>
                  ) : null}
                </Box>

                <Typography sx={{ mt: 2, fontSize: 13.5, lineHeight: 1.58, color: "text.secondary", fontWeight: 500 }}>
                  {plan.description}
                </Typography>

                <Box
                  component="ul"
                  sx={{
                    mt: 2,
                    mb: 0,
                    pl: 0,
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1.25,
                    alignItems: "stretch",
                    listStyle: "none",
                  }}
                >
                  {plan.features.map((feature, featureIndex) => (
                    <Box
                      component="li"
                      key={featureIndex}
                      sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 1,
                        ...(feature.isExpansion
                          ? {
                              mt: 0.25,
                              pt: 1.25,
                              borderTop: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.06)",
                            }
                          : {}),
                      }}
                    >
                      <FeatureTick isDark={isDark} />
                      <Typography
                        sx={{
                          fontSize: 14,
                          lineHeight: 1.45,
                          color: feature.isExpansion ? "text.primary" : "text.secondary",
                          fontWeight: feature.isExpansion ? 600 : 500,
                        }}
                      >
                        {feature.isExpansion ? (
                          <>
                            <Box component="span" sx={{ fontWeight: 700 }}>
                              {feature.label}
                            </Box>
                            {": "}
                            <Box component="span" sx={{ fontWeight: 700, color: labelColor }}>
                              {feature.price}
                            </Box>{" "}
                            {feature.detail}
                          </>
                        ) : (
                          feature.text
                        )}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Button
                  fullWidth
                  variant={plan.ctaVariant === "primary" ? "contained" : "outlined"}
                  onClick={() => setIsModalOpen(true)}
                  sx={{
                    mt: 2.25,
                    flexShrink: 0,
                    ...(plan.ctaVariant === "primary" ? primaryCtaSx(isDark) : secondaryCtaSx(isDark)),
                  }}
                >
                  {plan.ctaLabel}
                </Button>
              </Box>
            );
          })}
        </Box>
      </Container>
      <BookDemoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
