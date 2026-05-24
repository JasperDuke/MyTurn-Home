import { Box, Container, Typography, useTheme } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InstallMobileOutlinedIcon from "@mui/icons-material/InstallMobileOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { SectionHeading } from "@/components/home/SectionHeading";
import { SECTION_HEADER_MB, SECTION_PX, SECTION_PY } from "@/components/home/styles";
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

const featureIcons = [
  AccessTimeOutlinedIcon, 
  LightbulbOutlinedIcon, 
  BarChartOutlinedIcon, 
  AutoAwesomeOutlinedIcon,
  RocketLaunchOutlinedIcon,
  InstallMobileOutlinedIcon
];

const cardThemes = [
  {
    // index 0: Rose (Deterministic Queue Logic)
    bgLight: "rgba(225, 29, 72, 0.03)",
    bgDark: "rgba(244, 114, 182, 0.05)",
    borderLight: "rgba(225, 29, 72, 0.08)",
    borderDark: "rgba(244, 114, 182, 0.12)",
    labelLight: "#be123c",
    labelDark: "#f472b6",
    valueLight: "#e11d48",
    valueDark: "#f472b6",
    iconBgLight: "rgba(225, 29, 72, 0.08)",
    iconBgDark: "linear-gradient(135deg, rgba(225,29,72,0.25), rgba(225,29,72,0.05))",
    iconColorLight: "#e11d48",
    iconColorDark: "#f472b6",
  },
  {
    // index 1: Rose Pink (Smart Recommendations)
    bgLight: "rgba(225, 29, 72, 0.03)",
    bgDark: "rgba(244, 114, 182, 0.05)",
    borderLight: "rgba(225, 29, 72, 0.08)",
    borderDark: "rgba(244, 114, 182, 0.12)",
    labelLight: "#be123c",
    labelDark: "#f472b6",
    valueLight: "#e11d48",
    valueDark: "#f472b6",
    iconBgLight: "rgba(251, 113, 133, 0.08)",
    iconBgDark: "linear-gradient(135deg, rgba(251,113,133,0.25), rgba(251,113,133,0.05))",
    iconColorLight: "#e11d48",
    iconColorDark: "#f472b6",
  },
  {
    // index 2: Purple (Idle Gap Analytics)
    bgLight: "rgba(168, 85, 247, 0.03)",
    bgDark: "rgba(192, 132, 252, 0.05)",
    borderLight: "rgba(168, 85, 247, 0.08)",
    borderDark: "rgba(192, 132, 252, 0.12)",
    labelLight: "#6b21a8",
    labelDark: "#c084fc",
    valueLight: "#8b5cf6",
    valueDark: "#c084fc",
    iconBgLight: "rgba(168, 85, 247, 0.08)",
    iconBgDark: "linear-gradient(135deg, rgba(168,85,247,0.25), rgba(168,85,247,0.05))",
    iconColorLight: "#a855f7",
    iconColorDark: "#c084fc",
  },
  {
    // index 3: Blue / AI (AI Owner Copilot)
    bgLight: "rgba(59, 130, 246, 0.03)",
    bgDark: "rgba(96, 165, 250, 0.05)",
    borderLight: "rgba(59, 130, 246, 0.08)",
    borderDark: "rgba(96, 165, 250, 0.12)",
    labelLight: "#1d4ed8",
    labelDark: "#60a5fa",
    valueLight: "#3b82f6",
    valueDark: "#60a5fa",
    iconBgLight: "rgba(59, 130, 246, 0.08)",
    iconBgDark: "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(59,130,246,0.05))",
    iconColorLight: "#3b82f6",
    iconColorDark: "#60a5fa",
  },
  {
    // index 4: Amber (Queue Autopilot)
    bgLight: "rgba(245, 158, 11, 0.03)",
    bgDark: "rgba(251, 191, 36, 0.05)",
    borderLight: "rgba(245, 158, 11, 0.08)",
    borderDark: "rgba(251, 191, 36, 0.12)",
    labelLight: "#b45309",
    labelDark: "#fbbf24",
    valueLight: "#f59e0b",
    valueDark: "#fbbf24",
    iconBgLight: "rgba(245, 158, 11, 0.08)",
    iconBgDark: "linear-gradient(135deg, rgba(245,158,11,0.25), rgba(245,158,11,0.05))",
    iconColorLight: "#f59e0b",
    iconColorDark: "#fbbf24",
  },
  {
    // index 5: Emerald Green (Get Queue from Home)
    bgLight: "rgba(16, 185, 129, 0.03)",
    bgDark: "rgba(52, 211, 153, 0.05)",
    borderLight: "rgba(16, 185, 129, 0.08)",
    borderDark: "rgba(52, 211, 153, 0.12)",
    labelLight: "#047857",
    labelDark: "#34d399",
    valueLight: "#10b981",
    valueDark: "#34d399",
    iconBgLight: "rgba(16, 185, 129, 0.08)",
    iconBgDark: "linear-gradient(135deg, rgba(16,185,129,0.25), rgba(16,185,129,0.05))",
    iconColorLight: "#10b981",
    iconColorDark: "#34d399",
  }
];

export function FeaturesSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();

  return (
    <Box sx={{ py: SECTION_PY, px: SECTION_PX, position: "relative", bgcolor: isDark ? "transparent" : "#ffffff" }}>
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isDark ? "linear-gradient(180deg, rgba(30, 41, 59, 0.7) 0%, rgba(15, 23, 42, 0.95) 100%)" : "none",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative", width: "100%" }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          sx={{ mb: SECTION_HEADER_MB, position: "relative" }}
        >
          <SectionHeading
            label={t.features.sectionLabel}
            title={t.features.title1}
            titleHighlight={t.features.titleHighlight}
            subtitle={t.features.subtitle}
            maxWidth={860}
          />
        </Box>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }, gap: 3, position: "relative" }}
        >
          {t.features.cards.map((card, index) => {
            const Icon = featureIcons[index];
            const currentTheme = cardThemes[index] || cardThemes[0];
            return (
              <Box
                component={motion.div}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                key={index}
                sx={{
                  p: 3,
                  borderRadius: "20px",
                  border: isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.05)",
                  background: isDark ? "rgba(30, 32, 44, 0.7)" : "#ffffff",
                  backdropFilter: isDark ? "blur(20px)" : "none",
                  boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)" : "0 8px 32px rgba(0,0,0,0.04)",
                  "&:hover": { 
                    boxShadow: isDark ? "0 12px 40px rgba(0,0,0,0.4)" : "0 12px 40px rgba(37,99,235,0.1)",
                    border: isDark ? "1px solid rgba(255, 255, 255, 0.15)" : `1px solid ${currentTheme.iconColorLight}40`,
                  },
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  height: "100%",
                }}
              >
                <Box>
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      borderRadius: "16px",
                      background: isDark ? currentTheme.iconBgDark : currentTheme.iconBgLight,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: isDark ? currentTheme.iconColorDark : currentTheme.iconColorLight,
                    }}
                  >
                    {Icon ? <Icon sx={{ fontSize: 26 }} /> : null}
                  </Box>
                  <Typography sx={{ mt: 2.5, fontWeight: 600, fontSize: 18, color: "text.primary" }}>{card.title}</Typography>
                  <Typography sx={{ mt: 1, color: "text.secondary", fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
                    {card.description}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    mt: 3,
                    borderRadius: "14px",
                    p: 1.5,
                    bgcolor: isDark ? currentTheme.bgDark : currentTheme.bgLight,
                    border: `1px solid ${isDark ? currentTheme.borderDark : currentTheme.borderLight}`,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: isDark ? currentTheme.labelDark : currentTheme.labelLight
                    }}
                  >
                    {card.footerLabel}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                    {index === 5 && (
                      <Box
                        sx={{
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          bgcolor: isDark ? "#34d399" : "#10b981",
                          animation: "pulse 2s infinite",
                          "@keyframes pulse": {
                            "0%": {
                              boxShadow: `0 0 0 0 ${isDark ? "rgba(52, 211, 153, 0.4)" : "rgba(16, 185, 129, 0.4)"}`,
                            },
                            "70%": {
                              boxShadow: `0 0 0 6px ${isDark ? "rgba(52, 211, 153, 0)" : "rgba(16, 185, 129, 0)"}`,
                            },
                            "100%": {
                              boxShadow: `0 0 0 0 ${isDark ? "rgba(52, 211, 153, 0)" : "rgba(16, 185, 129, 0)"}`,
                            },
                          },
                        }}
                      />
                    )}
                    <Typography
                      sx={{
                        fontSize: 16,
                        fontWeight: 700,
                        color: isDark ? currentTheme.valueDark : currentTheme.valueLight
                      }}
                    >
                      {card.footerValue}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

