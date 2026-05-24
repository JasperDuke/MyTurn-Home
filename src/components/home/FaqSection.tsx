"use client";

import { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Container,
  Typography,
  useTheme,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion } from "framer-motion";

export function FaqSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const [expanded, setExpanded] = useState<number | false>(0);

  const labelColor = isDark ? "#F472B6" : "#E11D48";
  const gradientText = isDark
    ? "linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
    : "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #F97316 100%)";
  const border = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)";
  const cardBg = isDark ? "rgba(30, 32, 44, 0.75)" : "#ffffff";
  const cardShadow = isDark
    ? "0 8px 32px rgba(0,0,0,0.25)"
    : "0 10px 40px -12px rgba(0,0,0,0.08)";
  const expandedShadow = isDark
    ? "0 12px 40px rgba(244,114,182,0.12), 0 8px 32px rgba(0,0,0,0.28)"
    : "0 16px 48px -12px rgba(225,29,72,0.12), 0 10px 40px -12px rgba(0,0,0,0.08)";

  const handleChange = (index: number) => (_: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? index : false);
  };

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
            ? "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(251,113,133,0.06), transparent 70%)"
            : "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(236,72,153,0.04), transparent 70%)",
        }}
      />

      <Container maxWidth="md" sx={{ position: "relative" }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          sx={{ textAlign: "center", mb: { xs: 5, md: 7 } }}
        >
          <Typography
            sx={{
              color: labelColor,
              fontSize: 13,
              textTransform: "uppercase",
              letterSpacing: "0.07em",
              fontWeight: 800,
            }}
          >
            {t.faq.sectionLabel}
          </Typography>
          <Typography
            sx={{
              mt: 1.5,
              fontSize: { xs: "2rem", md: "2.75rem" },
              fontWeight: 400,
              lineHeight: 1.15,
              color: "text.primary",
            }}
          >
            {t.faq.title1}{" "}
            <Box
              component="span"
              sx={{
                background: gradientText,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontWeight: 600,
              }}
            >
              {t.faq.titleHighlight}
            </Box>
          </Typography>
          <Typography
            sx={{
              mt: 2,
              color: "text.secondary",
              fontSize: { xs: 16, md: 17 },
              lineHeight: 1.55,
              fontWeight: 500,
              maxWidth: 560,
              mx: "auto",
            }}
          >
            {t.faq.subtitle}
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ delay: 0.1 }}
          sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
        >
          {t.faq.items.map((item, index) => {
            const isExpanded = expanded === index;

            return (
              <Accordion
                key={index}
                disableGutters
                elevation={0}
                expanded={isExpanded}
                onChange={handleChange(index)}
                TransitionProps={{ unmountOnExit: false, timeout: 350 }}
                sx={{
                  borderRadius: "16px !important",
                  border: isExpanded
                    ? `1.5px solid ${isDark ? "rgba(244,114,182,0.45)" : "rgba(225,29,72,0.25)"}`
                    : border,
                  bgcolor: cardBg,
                  backdropFilter: isDark ? "blur(20px)" : "none",
                  boxShadow: isExpanded ? expandedShadow : cardShadow,
                  overflow: "hidden",
                  transition: "border-color 0.3s ease, box-shadow 0.35s ease, transform 0.25s ease",
                  "&:before": { display: "none" },
                  "&:hover": {
                    transform: isExpanded ? "none" : "translateY(-2px)",
                    boxShadow: isExpanded
                      ? expandedShadow
                      : isDark
                        ? "0 12px 36px rgba(0,0,0,0.32)"
                        : "0 14px 44px -12px rgba(15,23,42,0.12)",
                  },
                  "& .MuiCollapse-root": {
                    transition: "height 350ms cubic-bezier(0.4, 0, 0.2, 1) !important",
                  },
                  "& .MuiCollapse-wrapperInner": {
                    transition: "opacity 300ms ease",
                  },
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <Box
                      sx={{
                        width: 32,
                        height: 32,
                        borderRadius: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        bgcolor: isExpanded
                          ? isDark
                            ? "rgba(244,114,182,0.18)"
                            : "rgba(225,29,72,0.08)"
                          : isDark
                            ? "rgba(255,255,255,0.05)"
                            : "rgba(248,250,252,1)",
                        border: isExpanded
                          ? `1px solid ${isDark ? "rgba(244,114,182,0.35)" : "rgba(225,29,72,0.15)"}`
                          : border,
                        transition: "background-color 0.3s ease, border-color 0.3s ease, transform 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      <AddIcon
                        sx={{
                          fontSize: 18,
                          color: isExpanded ? labelColor : "text.secondary",
                          transition: "transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease",
                          transform: isExpanded ? "rotate(45deg)" : "rotate(0deg)",
                        }}
                      />
                    </Box>
                  }
                  sx={{
                    px: { xs: 2.5, md: 3 },
                    py: { xs: 1.5, md: 2 },
                    minHeight: "unset !important",
                    "& .MuiAccordionSummary-content": {
                      my: 0,
                      mr: 2,
                    },
                    "& .MuiAccordionSummary-expandIconWrapper": {
                      transform: "none !important",
                    },
                  }}
                >
                  <Typography
                    sx={{
                      fontWeight: 600,
                      fontSize: { xs: 15, md: 16.5 },
                      lineHeight: 1.45,
                      color: isExpanded ? "text.primary" : "text.primary",
                      pr: 1,
                    }}
                  >
                    {item.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    px: { xs: 2.5, md: 3 },
                    pt: 0,
                    pb: { xs: 2.5, md: 3 },
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: { xs: 14.5, md: 15.5 },
                      lineHeight: 1.65,
                      color: "text.secondary",
                      fontWeight: 500,
                      borderTop: border,
                      pt: 2,
                    }}
                  >
                    {item.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
