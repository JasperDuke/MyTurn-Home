"use client";

import { Box, Container, Typography, useTheme } from "@mui/material";
import { ProductShot } from "@/components/home/ProductShot";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, Variants } from "framer-motion";

const STEP_IMAGES = ["/assets/step1.png", "/assets/step2.png", "/assets/step3.png"] as const;

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

export function OnboardingSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const labelColor = isDark ? "#F472B6" : "#E11D48";
  const gradientText = isDark
    ? "linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
    : "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #F97316 100%)";
  const border = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)";
  const cardBg = isDark ? "rgba(30, 32, 44, 0.75)" : "#ffffff";
  const imageFrameBg = isDark
    ? "linear-gradient(180deg, rgba(251,113,133,0.12) 0%, rgba(15, 17, 28, 0.95) 100%)"
    : "linear-gradient(180deg, rgba(236,72,153,0.06) 0%, #f8fafc 100%)";
  const imageShadow = isDark
    ? "0 24px 48px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.06)"
    : "0 20px 44px rgba(15,23,42,0.10), 0 8px 24px rgba(236,72,153,0.06)";
  const cardShadow = isDark
    ? "0 12px 40px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)"
    : "0 16px 48px -16px rgba(15,23,42,0.10), 0 4px 16px rgba(236,72,153,0.04)";

  return (
    <Box
      sx={{
        py: { xs: 10, md: 12 },
        px: { xs: 2, sm: 3 },
        position: "relative",
        overflow: "hidden",
        bgcolor: isDark ? "transparent" : "#ffffff",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: isDark
            ? "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(251,113,133,0.08), transparent 65%)"
            : "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(236,72,153,0.06), transparent 65%)",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          top: "20%",
          left: "-10%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: isDark ? "rgba(251,113,133,0.06)" : "rgba(236,72,153,0.05)",
          filter: "blur(80px)",
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          bottom: "10%",
          right: "-8%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: isDark ? "rgba(249,115,22,0.05)" : "rgba(249,115,22,0.04)",
          filter: "blur(72px)",
          pointerEvents: "none",
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: { xs: 5, md: 8 } }}
        >
          <Typography
            sx={{ color: labelColor, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 13, fontWeight: 800 }}
          >
            {t.onboarding.sectionLabel}
          </Typography>
          <Typography sx={{ mt: 1.5, fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 400, lineHeight: 1.15, color: "text.primary" }}>
            {t.onboarding.title1}{" "}
            <Box
              component="span"
              sx={{ background: gradientText, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontWeight: 600 }}
            >
              {t.onboarding.titleHighlight}
            </Box>
          </Typography>
          <Typography sx={{ mt: 2, color: "text.secondary", fontSize: { xs: 16, md: 18 }, lineHeight: 1.55, fontWeight: 500 }}>
            {t.onboarding.subtitle}
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 3, md: 3 },
            alignItems: "stretch",
          }}
        >
          {t.onboarding.steps.map((step, index) => {
            const stepNum = String(index + 1).padStart(2, "0");
            const isCenter = index === 1;

            return (
              <Box
                component={motion.div}
                variants={itemVariants}
                key={index}
                whileHover={{ y: -6, transition: { type: "spring", stiffness: 400, damping: 28 } }}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: "24px",
                  border,
                  bgcolor: cardBg,
                  backdropFilter: isDark ? "blur(20px)" : "none",
                  boxShadow: cardShadow,
                  overflow: "hidden",
                  position: "relative",
                  transform: { md: isCenter ? "translateY(-8px)" : "none" },
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    p: { xs: 2, md: 2.25 },
                    pb: 0,
                    background: imageFrameBg,
                    borderBottom: border,
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      top: { xs: 16, md: 18 },
                      left: { xs: 16, md: 18 },
                      zIndex: 2,
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Typography
                      sx={{
                        px: 1.25,
                        py: 0.5,
                        borderRadius: "999px",
                        fontSize: 11,
                        fontWeight: 800,
                        letterSpacing: "0.1em",
                        color: "#fff",
                        bgcolor: labelColor,
                        boxShadow: isDark ? "0 4px 14px rgba(244,114,182,0.35)" : "0 4px 14px rgba(225,29,72,0.25)",
                      }}
                    >
                      {stepNum}
                    </Typography>
                    <Typography
                      sx={{
                        px: 1.25,
                        py: 0.5,
                        borderRadius: "999px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        textTransform: "uppercase",
                        color: labelColor,
                        bgcolor: isDark ? "rgba(15,17,28,0.72)" : "rgba(255,255,255,0.92)",
                        border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.06)",
                        backdropFilter: "blur(12px)",
                      }}
                    >
                      {step.subtitle}
                    </Typography>
                  </Box>

                  <ProductShot
                    src={STEP_IMAGES[index]}
                    alt={`${step.title} — ${step.subtitle}`}
                    aspectRatio="4 / 3"
                    objectFit="cover"
                    sx={{
                      border: isDark ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(15,23,42,0.08)",
                      borderRadius: { xs: "16px", md: "18px" },
                      bgcolor: isDark ? "#0f1118" : "#f1f5f9",
                      boxShadow: imageShadow,
                      mt: { xs: 4.5, md: 5 },
                    }}
                  />
                </Box>

                <Box sx={{ p: { xs: 2.5, md: 3 }, flex: 1, display: "flex", flexDirection: "column" }}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: 18, md: 20 },
                      color: "text.primary",
                      lineHeight: 1.25,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {step.title}
                  </Typography>
                  <Typography
                    sx={{
                      mt: 1.5,
                      fontSize: 14,
                      lineHeight: 1.65,
                      color: "text.secondary",
                      fontWeight: 500,
                      flex: 1,
                    }}
                  >
                    {step.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
