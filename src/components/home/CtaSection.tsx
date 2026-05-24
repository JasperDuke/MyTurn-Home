"use client";

import { useState } from "react";
import { Box, Button, Container, Stack, Typography, useTheme } from "@mui/material";
import { BookDemoModal } from "@/components/home/BookDemoModal";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  show: {
    opacity: 1, scale: 1, y: 0,
    transition: { type: "spring", stiffness: 200, damping: 25, staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function CtaSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <Box id="pricing" component="section" sx={{ py: { xs: 10, md: 14 }, px: 2, position: "relative", overflow: "hidden", bgcolor: isDark ? "transparent" : "#ffffff" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isDark ? "linear-gradient(90deg, rgba(251,113,133,0.1), transparent, rgba(251,113,133,0.1))" : "linear-gradient(90deg, rgba(251,113,133,0.05), transparent, rgba(251,113,133,0.05))",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          pointerEvents: "none",
          zIndex: 0,
          opacity: 1,
        }}
      >
        <svg viewBox="0 0 1440 320" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "250px", display: "block" }}>
          <path fill={isDark ? "rgba(244,114,182,0.15)" : "rgba(251,113,133,0.25)"} fillOpacity="1" d="M0,256L48,229.3C96,203,192,149,288,154.7C384,160,480,224,576,218.7C672,213,768,139,864,128C960,117,1056,171,1152,197.3C1248,224,1344,224,1392,224L1440,224L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </Box>

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          sx={{
            maxWidth: 860,
            mx: "auto",
            textAlign: "center",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)",
            borderRadius: "24px",
            p: { xs: 4, md: 6 },
            position: "relative",
            background: isDark ? "rgba(30, 32, 44, 0.7)" : "#ffffff",
            backdropFilter: isDark ? "blur(20px)" : "none",
            boxShadow: isDark 
              ? "0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05), 0 0 60px rgba(96,165,250,0.15)"
              : "0 20px 40px -10px rgba(0,0,0,0.1), 0 0 60px rgba(37,99,235,0.05)",
          }}
        >
          <Typography
            component={motion.div}
            variants={itemVariants}
            sx={{ color: isDark ? "#F472B6" : "#E11D48", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.07em", fontWeight: 800 }}
          >
            {t.cta.sectionLabel}
          </Typography>
          <Typography
            component={motion.h2}
            variants={itemVariants}
            sx={{ mt: 1.8, fontSize: { xs: "2.2rem", md: "3.4rem" }, fontWeight: 400, lineHeight: 1.15, color: "text.primary" }}
          >
            {t.cta.title1}{" "}
            <Box
              component="span"
              sx={{
                background: isDark ? "linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)" : "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #F97316 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t.cta.titleHighlight}
            </Box>
          </Typography>
          <Typography
            component={motion.p}
            variants={itemVariants}
            sx={{ mt: 2, color: "text.secondary", fontSize: { xs: 16, md: 22 }, maxWidth: 700, mx: "auto", fontWeight: 500 }}
          >
            {t.cta.subtitle}
          </Typography>

          <Stack
            component={motion.div}
            variants={itemVariants}
            direction={{ xs: "column", sm: "row" }}
            spacing={1.75}
            justifyContent="center"
            sx={{ mt: 4 }}
          >
            <Button
              variant="contained"
              sx={{
                textTransform: "none",
                borderRadius: "16px",
                px: 4,
                py: 1.6,
                fontSize: 18,
                fontWeight: 600,
                background: isDark ? "linear-gradient(90deg, #F472B6 0%, #FB923C 100%)" : "linear-gradient(90deg, #EC4899 0%, #F97316 100%)",
                boxShadow: isDark ? "0 8px 24px rgba(59,130,246,0.3)" : "0 8px 24px rgba(37,99,235,0.25)",
                "&:hover": {
                  background: isDark ? "linear-gradient(90deg, #E11D48 0%, #9F1239 100%)" : "linear-gradient(90deg, #BE123C 0%, #881337 100%)",
                  boxShadow: isDark ? "0 18px 36px rgba(59,130,246,0.4)" : "0 12px 32px rgba(37,99,235,0.35)",
                  transform: "translateY(-2px)",
                },
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
              onClick={() => setIsModalOpen(true)}
            >
              {t.cta.bookDemo}
            </Button>
            <Button
              variant="outlined"
              sx={{
                borderColor: isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)",
                color: "text.primary",
                textTransform: "none",
                borderRadius: "16px",
                px: 4,
                py: 1.6,
                fontSize: 18,
                fontWeight: 500,
                bgcolor: isDark ? "rgba(30, 32, 44, 0.7)" : "rgba(255, 255, 255, 0.8)",
                backdropFilter: "blur(20px)",
                boxShadow: isDark ? "none" : "0 4px 12px rgba(0,0,0,0.03)",
                "&:hover": { 
                  bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(255,255,255,1)",
                  borderColor: isDark ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"
                },
              }}
              onClick={() => setIsModalOpen(true)}
            >
              {t.cta.contactSales}
            </Button>
          </Stack>

          <Typography
            component={motion.div}
            variants={itemVariants}
            sx={{ mt: 3, fontSize: 14, fontWeight: 600, color: "text.primary" }}
          >
            {t.cta.trialText}
          </Typography>

          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              mt: 4,
              pt: 2.5,
              borderTop: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            {t.cta.bullets.map((item, index) => (
              <Typography key={index} sx={{ color: "text.secondary", fontSize: 13, fontWeight: 600 }}>
                {item}
              </Typography>
            ))}
          </Box>
        </Box>
      </Container>
      <BookDemoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </Box>
  );
}

