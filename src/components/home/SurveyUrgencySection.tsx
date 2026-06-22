"use client";

import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material";
import TrendingDownOutlinedIcon from "@mui/icons-material/TrendingDownOutlined";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import {
  brandSectionBackground,
  gradientHighlightSx,
  primaryCtaSx,
  sectionLabelSx,
  sectionSubtitleSx,
  SECTION_PX,
} from "@/components/home/styles";
import { useLanguage } from "@/i18n/LanguageProvider";
import { getSurveyUrl } from "@/lib/survey";
import { motion, Variants } from "framer-motion";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 26 } },
};

export function SurveyUrgencySection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const s = t.surveyUrgency;
  const surveyUrl = getSurveyUrl();

  const accent = isDark ? "#F472B6" : "#E11D48";
  const panelBorder = isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.06)";
  const panelBg = isDark ? "rgba(30, 32, 44, 0.75)" : "#ffffff";
  const stakeBg = isDark ? "rgba(255, 255, 255, 0.03)" : "#fdf2f8";
  const stakeBorder = isDark
    ? "1px solid rgba(255, 255, 255, 0.08)"
    : "1px solid rgba(225, 29, 72, 0.12)";

  return (
    <Box
      component="section"
      id="survey"
      aria-label={s.ariaLabel}
      sx={{
        py: { xs: 7, md: 8 },
        px: SECTION_PX,
        position: "relative",
        overflow: "hidden",
        background: brandSectionBackground(isDark),
      }}
    >
      <Container maxWidth="md" sx={{ position: "relative" }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          sx={{
            border: panelBorder,
            borderRadius: { xs: "20px", md: "24px" },
            p: { xs: 2.5, sm: 3.5, md: 4.5 },
            bgcolor: panelBg,
            backdropFilter: isDark ? "blur(20px)" : "none",
            boxShadow: isDark
              ? "0 20px 50px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05)"
              : "0 10px 40px -12px rgba(225,29,72,0.1), 0 20px 48px rgba(15,23,42,0.08)",
          }}
        >
          <Box sx={{ textAlign: "center", mb: { xs: 2.5, md: 3 }, maxWidth: 640, mx: "auto" }}>
            <Typography sx={sectionLabelSx(isDark)}>{s.sectionLabel}</Typography>

            <Typography
              component="h2"
              sx={{
                mt: 1.5,
                fontWeight: 400,
                lineHeight: 1.12,
                color: "text.primary",
                fontSize: {
                  xs: "clamp(1.45rem, 5vw + 0.25rem, 1.85rem)",
                  sm: "clamp(1.75rem, 3.5vw + 0.5rem, 2.35rem)",
                  md: "clamp(2rem, 2vw + 1rem, 2.75rem)",
                },
              }}
            >
              <Box component="span" sx={{ display: "block" }}>
                {s.titleLine1}
              </Box>
              <Box component="span" sx={{ ...gradientHighlightSx(isDark), display: "block", fontWeight: 600 }}>
                {s.titleLine2}
              </Box>
            </Typography>

            <Typography
              sx={{
                ...sectionSubtitleSx,
                mt: 2,
                maxWidth: 560,
                mx: "auto",
                fontSize: { xs: 14, sm: 15, md: 17 },
                px: { xs: 0, sm: 1 },
              }}
            >
              {s.subtitle}
            </Typography>
          </Box>

          <Stack
            component={motion.ul}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={{ show: { transition: { staggerChildren: 0.08 } } }}
            spacing={{ xs: 1, sm: 1.25 }}
            sx={{ listStyle: "none", m: 0, p: 0, mb: { xs: 2.5, md: 3.5 } }}
          >
            {s.stakes.map((line) => (
              <Box
                component={motion.li}
                key={line}
                variants={itemVariants}
                sx={{
                  display: "flex",
                  gap: { xs: 1.25, sm: 1.5 },
                  alignItems: "flex-start",
                  px: { xs: 1.25, sm: 2 },
                  py: { xs: 1.1, sm: 1.25 },
                  borderRadius: "12px",
                  bgcolor: stakeBg,
                  border: stakeBorder,
                }}
              >
                <TrendingDownOutlinedIcon
                  sx={{ fontSize: { xs: 18, sm: 20 }, color: accent, mt: 0.15, flexShrink: 0 }}
                />
                <Typography
                  sx={{
                    fontSize: { xs: 13, sm: 14, md: 15 },
                    lineHeight: 1.55,
                    fontWeight: 600,
                    color: "text.primary",
                  }}
                >
                  {line}
                </Typography>
              </Box>
            ))}
          </Stack>

          <Stack
            component={motion.div}
            variants={itemVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            spacing={{ xs: 1.25, sm: 1.5 }}
            alignItems="center"
            sx={{ px: { xs: 0, sm: 2 } }}
          >
            <Button
              component="a"
              href={surveyUrl}
              target="_blank"
              rel="noopener noreferrer"
              variant="contained"
              size="large"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                ...primaryCtaSx(isDark),
                px: { xs: 2.5, sm: 4.5 },
                py: { xs: 1.35, sm: 1.5 },
                fontSize: { xs: 14, sm: 16, md: 17 },
                width: { xs: "100%", sm: "auto" },
                maxWidth: { xs: "100%", sm: 420 },
              }}
            >
              {s.cta}
            </Button>

            <Typography
              sx={{
                fontSize: { xs: 12, sm: 13 },
                lineHeight: 1.5,
                color: accent,
                fontWeight: 700,
                textAlign: "center",
                maxWidth: { xs: "100%", sm: 480 },
                px: { xs: 0.5, sm: 0 },
              }}
            >
              {s.urgencyNote}
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 11, sm: 12 },
                color: "text.secondary",
                fontWeight: 500,
                textAlign: "center",
                maxWidth: { xs: "100%", sm: 440 },
                lineHeight: 1.5,
              }}
            >
              {s.contactHint}
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
