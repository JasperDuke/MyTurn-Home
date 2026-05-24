import { Box, Container, Typography, useTheme } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } }
};

export function HowItWorksSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();

  return (
    <Box id="how-it-works" component="section" sx={{ py: { xs: 10, md: 14 }, px: 2, textAlign: "center", position: "relative", overflow: "hidden", bgcolor: isDark ? "transparent" : "#f8fafc" }}>

      <Container maxWidth="lg">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <Typography sx={{ color: isDark ? "#F472B6" : "#E11D48", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 13, fontWeight: 800 }}>
            {t.howItWorks.sectionLabel}
          </Typography>
        <Typography sx={{ mt: 1.5, fontSize: { xs: "2rem", md: "3.2rem" }, fontWeight: 400, lineHeight: 1.15, color: "text.primary" }}>
          {t.howItWorks.title1}{" "}
          <Box
            component="span"
            sx={{
              background: isDark ? "linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)" : "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #F97316 100%)",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            {t.howItWorks.titleHighlight}
          </Box>
        </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          sx={{ mt: 6, display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(4, 1fr)" }, gap: 2.5 }}
        >
          {t.howItWorks.steps.map((step, index) => (
            <Box
              component={motion.div}
              variants={itemVariants}
              whileHover={{ scale: 1.03, y: -4 }}
              key={index}
              sx={{
                p: 3,
                borderRadius: "18px",
                border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.04)",
                background: isDark ? "rgba(30, 32, 44, 0.8)" : "#ffffff",
                backdropFilter: isDark ? "blur(20px)" : "none",
                textAlign: "center",
                position: "relative",
                zIndex: 1,
                boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.2)" : "0 4px 20px rgba(0,0,0,0.03)",
                "&:hover": {
                  boxShadow: isDark ? "0 12px 40px rgba(0,0,0,0.4)" : "0 8px 25px rgba(37,99,235,0.1)",
                }
              }}
            >
              <Box
                sx={{
                  width: 48,
                  height: 48,
                  borderRadius: "50%",
                  mx: "auto",
                  mb: 2,
                  bgcolor: isDark ? "#F472B6" : "#E11D48",
                  color: isDark ? "#0f172a" : "#ffffff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 500,
                  fontSize: 22,
                  boxShadow: isDark ? "0 4px 14px rgba(96,165,250,0.4)" : "0 4px 14px rgba(37,99,235,0.3)",
                }}
              >
                {index + 1}
              </Box>
              <Typography sx={{ fontWeight: 500, fontSize: 20, color: "text.primary" }}>{step.title}</Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", fontSize: 14, fontWeight: 500 }}>{step.description}</Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

