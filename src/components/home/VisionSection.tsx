"use client";

import { Box, Container, Typography, useTheme } from "@mui/material";
import { SectionHeading } from "@/components/home/SectionHeading";
import { SECTION_HEADER_MB, SECTION_PX, SECTION_PY } from "@/components/home/styles";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";

export function VisionSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const border = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)";
  const labelColor = isDark ? "#F472B6" : "#E11D48";

  return (
    <Box
      sx={{
        py: SECTION_PY,
        px: SECTION_PX,
        position: "relative",
        overflow: "hidden",
        bgcolor: isDark ? "rgba(15, 23, 42, 0.3)" : "#f8fafc",
      }}
    >
      <Box
        aria-hidden
        sx={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          background: isDark
            ? "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(251,113,133,0.08), transparent 70%)"
            : "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(236,72,153,0.05), transparent 70%)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative" }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          sx={{ mb: SECTION_HEADER_MB }}
        >
          <SectionHeading
            label={t.vision.sectionLabel}
            title={t.vision.title1}
            titleHighlight={t.vision.titleHighlight}
            subtitle={t.vision.subtitle}
            maxWidth={640}
            singleLineTitle
          />
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          sx={{
            p: { xs: 3.5, md: 5 },
            borderRadius: "24px",
            border,
            bgcolor: isDark ? "rgba(30, 32, 44, 0.75)" : "#ffffff",
            backdropFilter: isDark ? "blur(20px)" : "none",
            boxShadow: isDark
              ? "0 8px 32px rgba(0,0,0,0.25)"
              : "0 12px 40px -12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography sx={{ color: "text.secondary", fontSize: 16, lineHeight: 1.8, mb: 4, fontWeight: 500 }}>
            {t.vision.description1}
          </Typography>

          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(248,250,252,0.9)",
              borderLeft: `4px solid ${labelColor}`,
            }}
          >
            <Typography sx={{ fontWeight: 700, color: "text.primary", fontSize: 16, lineHeight: 1.65 }}>
              {t.vision.boldStatement}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
