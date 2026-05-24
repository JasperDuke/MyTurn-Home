"use client";

import { Box, Container, Typography, useTheme } from "@mui/material";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { ProductShot } from "@/components/home/ProductShot";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, Variants } from "framer-motion";

const textContainerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const textItemVariants: Variants = {
  hidden: { opacity: 0, x: 20 },
  show: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};
export function LineNotificationsSection() {
  const { palette } = useTheme();
  const isDark = palette.mode === "dark";
  const { t } = useLanguage();

  const sectionBg = isDark ? "#080a12" : "#ffffff";
  const borderSubtle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)";
  const accentGreen = isDark ? "#00ff9d" : "#059669";

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        px: 2,
        position: "relative",
        bgcolor: sectionBg,
        borderTop: isDark ? `1px solid ${borderSubtle}` : "none",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1.25fr) minmax(0, 1fr)" },
            gap: { xs: 5, md: 8 },
            alignItems: "center",
          }}
        >
          <Box
            component={motion.div}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, type: "spring", stiffness: 200, damping: 25 }}
            sx={{
              order: { xs: 2, lg: 1 },
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              flexWrap: "wrap",
              justifyContent: "center",
              alignItems: "flex-start",
              gap: { xs: 2, sm: 2.25 },
            }}
          >
            <ProductShot
              src="/line-1.png"
              alt="LINE chat — upper half showing MyTurn queue updates"
              naturalSize
              objectFit="contain"
              sx={{
                width: { xs: "min(100%, 235px)", sm: "calc(50% - 9px)", md: 236 },
                maxWidth: "100%",
                flex: { sm: "1 1 200px" },
                borderRadius: "28px",
                border: "6px solid rgba(15, 23, 42, 0.92)",
                bgcolor: isDark ? "#0b1220" : "#f1f5f9",
                boxShadow: isDark ? "0 18px 46px rgba(0,0,0,0.4)" : "0 18px 46px rgba(15,23,42,0.12)",
              }}
            />
            <ProductShot
              src="/line-2.png"
              alt="LINE chat — lower half showing MyTurn queue updates"
              naturalSize
              objectFit="contain"
              sx={{
                width: { xs: "min(100%, 235px)", sm: "calc(50% - 9px)", md: 236 },
                maxWidth: "100%",
                flex: { sm: "1 1 200px" },
                borderRadius: "28px",
                border: "6px solid rgba(15, 23, 42, 0.92)",
                bgcolor: isDark ? "#0b1220" : "#f1f5f9",
                boxShadow: isDark ? "0 18px 46px rgba(0,0,0,0.4)" : "0 18px 46px rgba(15,23,42,0.12)",
              }}
            />
          </Box>

          <Box
            component={motion.div}
            variants={textContainerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            sx={{ order: { xs: 1, lg: 2 } }}
          >
            <Typography
              component={motion.div}
              variants={textItemVariants}
              sx={{
                color: accentGreen,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                fontSize: 12,
                fontWeight: 800,
              }}
            >
              {t.lineIntegration.sectionLabel}
            </Typography>
            <Typography
              component={motion.div}
              variants={textItemVariants}
              sx={{
                mt: 1.5,
                fontSize: { xs: "1.85rem", md: "2.75rem" },
                fontWeight: 600,
                lineHeight: 1.15,
                color: isDark ? "#ffffff" : "#0f172a",
              }}
            >
              {t.lineIntegration.title1}{" "}
              <Box
                component="span"
                sx={{
                  fontWeight: 800,
                  background: isDark
                    ? "linear-gradient(90deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
                    : "linear-gradient(90deg, #EC4899 0%, #E11D48 50%, #F97316 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t.lineIntegration.titleHighlight}
              </Box>
            </Typography>
            <Typography
              component={motion.div}
              variants={textItemVariants}
              sx={{
                mt: 2,
                color: isDark ? "rgba(255,255,255,0.65)" : "#475569",
                fontSize: { xs: 15, md: 17 },
                lineHeight: 1.6,
              }}
            >
              {t.lineIntegration.subtitle}
            </Typography>

            <Box sx={{ mt: 4, display: "grid", gap: 2.5 }}>
              {t.lineIntegration.features.map((f, index) => (
                <Box
                  component={motion.div}
                  variants={textItemVariants}
                  key={index}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                >
                  <Box
                    sx={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      bgcolor: isDark ? "rgba(0,255,157,0.15)" : "rgba(16,185,129,0.12)",
                      color: accentGreen,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      mt: 0.15,
                    }}
                  >
                    <CheckRoundedIcon sx={{ fontSize: 18 }} />
                  </Box>
                  <Box>
                    <Typography sx={{ fontWeight: 700, fontSize: 16, color: isDark ? "#fff" : "#0f172a" }}>{f.title}</Typography>
                    <Typography sx={{ mt: 0.5, fontSize: 14, lineHeight: 1.55, color: isDark ? "rgba(255,255,255,0.55)" : "#64748b" }}>
                      {f.description}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
