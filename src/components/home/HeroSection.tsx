"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { BookDemoModal } from "@/components/home/BookDemoModal";
import { ProductShot } from "@/components/home/ProductShot";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function HeroSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();
  const cockpitSrc = "/cockpit.png";

  return (
    <Box
      component="section"
      sx={{
        minHeight: { xs: "auto", lg: "92vh" },
        pt: { xs: 12, md: 13 },
        pb: { xs: 8, md: 9 },
        px: 2,
        position: "relative",
        overflow: "hidden",
        "@keyframes heroMobileFloat": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-16px)" },
        },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          pointerEvents: "none",
          zIndex: 0,
        }}
      >
        <Box
          component={motion.div}
          animate={{
            x: [0, 60, -30, 0],
            y: [0, -40, 50, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            top: "-10%",
            left: "-5%",
            width: { xs: 400, md: 600 },
            height: { xs: 400, md: 600 },
            borderRadius: "50%",
            background: isDark 
              ? "radial-gradient(circle, rgba(244,114,182,0.15) 0%, transparent 70%)" 
              : "radial-gradient(circle, rgba(236,72,153,0.08) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        <Box
          component={motion.div}
          animate={{
            x: [0, -50, 40, 0],
            y: [0, 60, -30, 0],
            scale: [1, 0.9, 1.1, 1],
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            bottom: "-20%",
            right: "-10%",
            width: { xs: 500, md: 700 },
            height: { xs: 500, md: 700 },
            borderRadius: "50%",
            background: isDark 
              ? "radial-gradient(circle, rgba(96,165,250,0.12) 0%, transparent 70%)" 
              : "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)",
            filter: "blur(80px)",
          }}
        />
        <Box
          component={motion.div}
          animate={{
            x: [0, 30, -20, 0],
            y: [0, 30, -50, 0],
            scale: [0.8, 1, 0.8],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          sx={{
            position: "absolute",
            top: "30%",
            right: "20%",
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: isDark 
              ? "radial-gradient(circle, rgba(251,146,60,0.1) 0%, transparent 70%)" 
              : "radial-gradient(circle, rgba(249,115,22,0.06) 0%, transparent 70%)",
            filter: "blur(50px)",
          }}
        />
      </Box>
      <Container maxWidth="xl" sx={{ position: "relative" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" },
            gap: { xs: 6, lg: 10 },
            alignItems: "center",
          }}
        >
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="show"
          >
            <Box
              component={motion.div}
              variants={itemVariants}
              onClick={() => setIsModalOpen(true)}
              sx={{
                display: "inline-flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 0.75,
                borderRadius: "999px",
                bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)",
                border: isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.06)",
                mb: 3,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)",
                  transform: "translateY(-1px)",
                }
              }}
            >
              <Typography sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}>
                {t.hero.trialBadge}
              </Typography>
            </Box>

            <Typography
              component={motion.h6}
              variants={itemVariants}
              sx={{
                color: isDark ? "#F472B6" : "#E11D48",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                fontSize: 13,
                fontWeight: 800,
              }}
            >
              {t.hero.tagline}
            </Typography>
            <Typography
              component={motion.h1}
              variants={itemVariants}
              variant="h2"
              sx={{
                mt: 1.5,
                fontSize: { xs: "2rem", sm: "2.7rem", lg: "3.6rem" },
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
                fontWeight: 400,
                color: "text.primary",
              }}
            >
              {t.hero.title1}{" "}
              <Box
                component="span"
                sx={{
                  background: isDark
                    ? "linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
                    : "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #F97316 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t.hero.titleHighlight}
              </Box>{" "}
              {t.hero.title2}
            </Typography>

            <Typography
              component={motion.p}
              variants={itemVariants}
              sx={{
                mt: 3,
                color: "text.secondary",
                fontSize: { xs: 16, md: 19 },
                lineHeight: 1.6,
                maxWidth: 650,
              }}
            >
              {t.hero.subtitle}
            </Typography>

            <Stack
              component={motion.div}
              variants={itemVariants}
              direction={{ xs: "column", sm: "row" }}
              spacing={1.75}
              sx={{ mt: 4 }}
            >
              <Button
                variant="contained"
                sx={{
                  textTransform: "none",
                  borderRadius: "12px",
                  px: 4,
                  py: 1.6,
                  fontWeight: 500,
                  fontSize: 16,
                  boxShadow: isDark
                    ? "0 8px 24px rgba(59,130,246,0.3)"
                    : "0 8px 24px rgba(37,99,235,0.25)",
                  background: isDark
                    ? "linear-gradient(90deg, #F472B6 0%, #FB923C 100%)"
                    : "linear-gradient(90deg, #EC4899 0%, #F97316 100%)",
                  "&:hover": {
                    boxShadow: isDark
                      ? "0 12px 32px rgba(59,130,246,0.4)"
                      : "0 12px 32px rgba(37,99,235,0.35)",
                    transform: "translateY(-2px)",
                    background: isDark
                      ? "linear-gradient(90deg, #E11D48 0%, #9F1239 100%)"
                      : "linear-gradient(90deg, #BE123C 0%, #881337 100%)",
                  },
                }}
                onClick={() => setIsModalOpen(true)}
              >
                {t.hero.bookDemo}
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: isDark
                    ? "rgba(255, 255, 255, 0.1)"
                    : "rgba(0, 0, 0, 0.1)",
                  color: "text.primary",
                  textTransform: "none",
                  borderRadius: "12px",
                  px: 4,
                  py: 1.6,
                  fontWeight: 500,
                  fontSize: 16,
                  background: isDark
                    ? "rgba(30, 32, 44, 0.7)"
                    : "rgba(255, 255, 255, 0.8)",
                  backdropFilter: "blur(20px)",
                  boxShadow: isDark ? "none" : "0 4px 12px rgba(0,0,0,0.03)",
                  "&:hover": {
                    background: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(255,255,255,1)",
                    borderColor: isDark
                      ? "rgba(255, 255, 255, 0.2)"
                      : "rgba(0, 0, 0, 0.2)",
                  },
                }}
                onClick={() => setIsModalOpen(true)}
              >
                {t.hero.learnMore}
              </Button>
            </Stack>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, type: "spring", stiffness: 200, damping: 25 }}
            sx={{
              position: "relative",
              minHeight: { xs: 380, sm: 490, lg: 580 },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 0,
              overflow: "visible",
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: {
                  xs: "min(100%, 580px)",
                  sm: "min(100%, 640px)",
                  md: "min(100%, 680px)",
                  lg: "min(100%, 720px)",
                },
                mx: "auto",
                transform: {
                  xs: "translate(-3%, -4%)",
                  md: "translate(-11%, -12%)",
                },
                transformOrigin: "center center",
              }}
            >
              <Box
                sx={{
                  p: "2px",
                  borderRadius: "4px",
                  backgroundColor: "rgba(54, 61, 64, 0.7)",
                }}
              >
                <ProductShot
                  src={cockpitSrc}
                  alt="MyTurn live cockpit showing queue, table status, and seat recommendation"
                  aspectRatio="16 / 9"
                  objectFit="cover"
                  priority
                  sx={{
                    width: "100%",
                    border: "none",
                    borderRadius: "4px",
                    boxShadow: isDark
                      ? "0 14px 34px rgba(0,0,0,0.35)"
                      : "0 14px 34px rgba(15,23,42,0.12)",
                  }}
                />
              </Box>
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: { xs: 0, md: 12 },
                bottom: { xs: -12, md: 56 },
                width: { xs: 118, sm: 144 },
                display: { xs: "none", sm: "block" },
              }}
            >
              <Box
                sx={{
                  animation: "heroMobileFloat 2.5s ease-in-out infinite",
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                  },
                }}
              >
                <ProductShot
                  src="/scanned-mobile-2.png"
                  alt="Customer mobile screen showing it is their turn"
                  aspectRatio="9 / 19"
                  objectFit="cover"
                  sx={{
                    borderRadius: "28px",
                    border: isDark
                      ? "1px solid rgba(255, 255, 255, 0.88)"
                      : "1px solid rgba(255, 255, 255, 0.98)",
                    boxShadow: isDark
                      ? "0 18px 38px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(255,255,255,0.06)"
                      : "0 18px 38px rgba(15,23,42,0.14), inset 0 0 0 1px rgba(255,255,255,0.75)",
                    transform: "translateX(-8%)",
                  }}
                />
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <BookDemoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}
