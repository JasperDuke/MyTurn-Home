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
import {
  primaryCtaSx,
  secondaryCtaSx,
  SECTION_PX,
} from "@/components/home/styles";
import { useLanguage } from "@/i18n/LanguageProvider";
import { scrollToSection } from "@/lib/scroll";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function HeroSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();
  const cockpitSrc = "/assets/cockpit.png";

  return (
    <Box
      sx={{
        minHeight: { xs: "auto", lg: "92vh" },
        pt: { xs: 12, md: 13 },
        pb: { xs: 8, md: 9 },
        px: SECTION_PX,
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
            gridTemplateColumns: { xs: "1fr", lg: "44fr 56fr" },
            gap: { xs: 6, lg: 8 },
            alignItems: "center",
          }}
        >
          <Box
            component={motion.div}
            variants={containerVariants}
            initial="hidden"
            animate="show"
            sx={{ minWidth: 0, position: "relative", zIndex: 1 }}
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
                border: isDark
                  ? "1px solid rgba(255,255,255,0.1)"
                  : "1px solid rgba(0,0,0,0.06)",
                mb: 3,
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:hover": {
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.08)"
                    : "rgba(0,0,0,0.05)",
                  transform: "translateY(-1px)",
                },
              }}
            >
              <Typography
                sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}
              >
                🚀 {t.hero.trialBadge}
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
            <Box
              component={motion.h1}
              variants={itemVariants}
              sx={{
                mt: 1.5,
                display: "flex",
                flexDirection: { xs: "column", lg: "row" },
                flexWrap: "wrap",
                alignItems: { xs: "flex-start", lg: "baseline" },
                columnGap: { lg: 0.6 },
                rowGap: { xs: 0.15, lg: 0 },
                fontSize: { xs: "2rem", sm: "2.7rem", lg: "3.6rem" },
                lineHeight: 1.08,
                letterSpacing: "-0.03em",
                color: "text.primary",
              }}
            >
              <Box
                component="span"
                sx={{
                  fontWeight: 500,
                  whiteSpace: "nowrap",
                }}
              >
                {t.hero.title1}
              </Box>
              <Box
                component="span"
                sx={{
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                  background: isDark
                    ? "linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
                    : "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #F97316 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                {t.hero.titleHighlight}
              </Box>
              {t.hero.title2 ? (
                <Box component="span" sx={{ fontWeight: 500 }}>
                  {t.hero.title2}
                </Box>
              ) : null}
            </Box>

            <Typography
              component={motion.p}
              variants={itemVariants}
              sx={{
                mt: 3,
                color: "text.secondary",
                fontSize: { xs: 15, sm: 16, md: 18 },
                lineHeight: 1.65,
                maxWidth: 640,
              }}
            >
              {t.hero.subtitle}
            </Typography>

            <Box component={motion.div} variants={itemVariants} sx={{ mt: 4 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.75}
                sx={{ alignItems: { xs: "stretch", sm: "center" } }}
              >
                <Button
                  variant="contained"
                  sx={primaryCtaSx(isDark)}
                  onClick={() => scrollToSection("pricing")}
                >
                  {t.hero.startTrial}
                </Button>
                <Button
                  variant="outlined"
                  sx={secondaryCtaSx(isDark)}
                  onClick={() => setIsModalOpen(true)}
                >
                  {t.hero.bookDemo}
                </Button>
              </Stack>
              <Typography
                component="p"
                sx={{
                  mt: 1.75,
                  fontSize: { xs: 13, sm: 14 },
                  lineHeight: 1.5,
                  color: "text.secondary",
                  textAlign: { xs: "center", sm: "left" },
                }}
              >
                {t.hero.ctaNote}
              </Typography>
            </Box>
          </Box>

          <Box
            component={motion.div}
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              type: "spring",
              stiffness: 200,
              damping: 25,
            }}
            sx={{
              position: "relative",
              minWidth: 0,
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
                maxWidth: "100%",
                mx: "auto",
                transform: {
                  xs: "translateY(-8%)",
                  lg: "translateY(-22%)",
                },
              }}
            >
              <ProductShot
                src={cockpitSrc}
                alt="MyTurn live cockpit showing queue, table status, and seat recommendation"
                naturalSize
                objectFit="contain"
                priority
                sx={{
                  width: "100%",
                  border: "none",
                  bgcolor: "transparent",
                  boxShadow: "none",
                  borderRadius: 0,
                  overflow: "visible",
                }}
              />
            </Box>

            <Box
              sx={{
                position: "absolute",
                right: { xs: 0, sm: -16, md: -24, lg: -36 },
                bottom: { xs: -12, sm: 24, md: 40, lg: 44 },
                width: { xs: 118, sm: 126, md: 140 },
                display: { xs: "none", sm: "block" },
              }}
            >
              <Box
                sx={{
                  animation: "heroMobileFloat 2.5s ease-in-out infinite",
                  "@media (prefers-reduced-motion: reduce)": {
                    animation: "none",
                  },
                  position: "relative",
                  borderRadius: "28px",
                  py: 2,
                  border: "1px solid #09090b",
                  outline: "1px solid #27272a",
                  bgcolor: "#F4F9F9",
                  boxShadow:
                    "0 25px 50px -12px rgba(0,0,0,0.35), inset 0 0 2px rgba(255,255,255,0.2)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  aspectRatio: "9 / 19.5",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: "6px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "36px",
                    height: "11px",
                    borderRadius: "6px",
                    backgroundColor: "#09090b",
                    zIndex: 10,
                  },
                }}
              >
                <ProductShot
                  src="/assets/mobile-2.png"
                  alt="Customer mobile screen showing it is their turn"
                  naturalSize={false}
                  aspectRatio="9 / 19.5"
                  objectFit="cover"
                  sx={{
                    border: "none",
                    bgcolor: "transparent",
                    boxShadow: "none",
                    borderRadius: 0,
                    overflow: "hidden",
                    display: "block",
                    width: "100%",
                    height: "100%",
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
