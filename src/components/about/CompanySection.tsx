"use client";

import { Box, Container, Typography, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";

export function CompanySection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 8, md: 8 },
        px: 2,
        bgcolor: isDark ? "rgba(15, 23, 42, 0.3)" : "rgba(248, 250, 252, 0.5)",
        borderTop: isDark
          ? "1px solid rgba(255,255,255,0.05)"
          : "1px solid rgba(0,0,0,0.05)",
      }}
    >
      <Container maxWidth="md">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          sx={{ textAlign: "center", mb: { xs: 6, md: 8 } }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            {t.about.companyInfo.sectionLabel}
          </Typography>
          <Typography
            sx={{
              mt: 1.5,
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              lineHeight: 1.2,
              color: "text.primary",
            }}
          >
            {t.about.companyInfo.title1}{" "}
            <Box component="span" sx={{ color: "primary.main" }}>
              {t.about.companyInfo.titleHighlight}
            </Box>
          </Typography>
          <Typography
            sx={{
              mt: 2,
              color: "text.primary",
              fontSize: { xs: 16, md: 18 },
              fontWeight: 600,
            }}
          >
            {t.about.companyInfo.subtitle}
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          sx={{
            p: { xs: 4, md: 6 },
            borderRadius: "24px",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.05)",
            background: isDark ? "rgba(30, 32, 44, 0.6)" : "#ffffff",
            boxShadow: isDark ? "none" : "0 12px 32px rgba(0,0,0,0.04)",
          }}
        >
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 16,
              lineHeight: 1.8,
              mb: 3,
            }}
          >
            {t.about.companyInfo.description1}
          </Typography>
          <Typography
            sx={{
              color: "text.secondary",
              fontSize: 16,
              lineHeight: 1.8,
              mb: 4,
            }}
          >
            {t.about.companyInfo.description2}
          </Typography>

          <Box
            sx={{
              p: 3,
              borderRadius: "16px",
              bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)",
              borderLeft: "4px solid",
              borderColor: "primary.main",
            }}
          >
            <Typography sx={{ fontWeight: 700, color: "text.primary", mb: 1 }}>
              {t.about.companyInfo.missionTitle}
            </Typography>
            <Typography
              sx={{
                color: "text.secondary",
                fontSize: 15,
                fontStyle: "italic",
              }}
            >
              "{t.about.companyInfo.missionDesc}"
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
