import { Box, Container, Typography, useTheme } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import LightbulbOutlinedIcon from "@mui/icons-material/LightbulbOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import InstallMobileOutlinedIcon from "@mui/icons-material/InstallMobileOutlined";
import SettingsSuggestOutlinedIcon from "@mui/icons-material/SettingsSuggestOutlined";
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
  SettingsSuggestOutlinedIcon,
  RocketLaunchOutlinedIcon,
  InstallMobileOutlinedIcon
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
                    border: isDark ? "1px solid rgba(255,255,255,0.15)" : "1px solid rgba(37,99,235,0.2)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 52,
                    height: 52,
                    borderRadius: "16px",
                    background:
                      index === 0 ? (isDark ? "linear-gradient(135deg, rgba(225,29,72,0.3), rgba(225,29,72,0.1))" : "rgba(225, 29, 72, 0.1)")
                      : index === 1 ? (isDark ? "linear-gradient(135deg, rgba(251,113,133,0.3), rgba(251,113,133,0.1))" : "rgba(251, 113, 133, 0.1)")
                      : index === 2 ? (isDark ? "linear-gradient(135deg, rgba(159,18,57,0.3), rgba(159,18,57,0.1))" : "rgba(159, 18, 57, 0.1)")
                      : index === 3 ? (isDark ? "linear-gradient(135deg, rgba(59,130,246,0.3), rgba(59,130,246,0.1))" : "rgba(59, 130, 246, 0.1)") // Blue
                      : index === 4 ? (isDark ? "linear-gradient(135deg, rgba(245,158,11,0.3), rgba(245,158,11,0.1))" : "rgba(245, 158, 11, 0.1)") // Amber
                      : (isDark ? "linear-gradient(135deg, rgba(16,185,129,0.3), rgba(16,185,129,0.1))" : "rgba(16, 185, 129, 0.1)"), // Emerald green
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: 
                      index === 0 ? (isDark ? "#F472B6" : "#E11D48")
                      : index === 1 ? (isDark ? "#F472B6" : "#E11D48")
                      : index === 2 ? (isDark ? "#c084fc" : "#a855f7")
                      : index === 3 ? (isDark ? "#60a5fa" : "#3b82f6")
                      : index === 4 ? (isDark ? "#fbbf24" : "#f59e0b")
                      : (isDark ? "#34d399" : "#10b981"),
                  }}
                >
                  {Icon ? <Icon sx={{ fontSize: 26 }} /> : null}
                </Box>
                <Typography sx={{ mt: 2.5, fontWeight: 600, fontSize: 18, color: "text.primary" }}>{card.title}</Typography>
                <Typography sx={{ mt: 1, color: "text.secondary", fontSize: 14, lineHeight: 1.5, fontWeight: 500 }}>
                  {card.description}
                </Typography>
                {index === 0 && (
                  <Box sx={{ mt: 3, borderRadius: "14px", p: 1.5, bgcolor: isDark ? "rgba(15,23,42,0.4)" : "#f1f5f9", border: isDark ? "none" : "1px solid rgba(0,0,0,0.03)" }}>
                    <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                      <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 600 }}>{card.footerLabel}</Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, color: isDark ? "#F472B6" : "#E11D48" }}>{card.footerValue}</Typography>
                    </Box>
                  </Box>
                )}
                {index === 1 && (
                  <Box sx={{ mt: 3, borderRadius: "14px", p: 1.5, bgcolor: isDark ? "rgba(15,23,42,0.4)" : "#f1f5f9", display: "flex", alignItems: "center", gap: 1.2, border: isDark ? "none" : "1px solid rgba(0,0,0,0.03)" }}>
                    <Box sx={{ width: 38, height: 38, borderRadius: "10px", bgcolor: isDark ? "rgba(251,113,133,0.2)" : "rgba(225,29,72,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: isDark ? "#F472B6" : "#E11D48", fontWeight: 600, fontSize: 14 }}>
                      98%
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 600, color: "text.primary" }}>Best Match</Typography>
                      <Typography sx={{ fontSize: 12, color: "text.secondary", fontWeight: 500 }}>Eliminates wasted seats</Typography>
                    </Box>
                  </Box>
                )}
                {index === 2 && (
                  <Box sx={{ mt: 3, borderRadius: "14px", p: 1.5, bgcolor: isDark ? "rgba(15,23,42,0.4)" : "#f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "flex-end", border: isDark ? "none" : "1px solid rgba(0,0,0,0.03)" }}>
                    <Box>
                      <Typography sx={{ fontSize: 12, color: "text.secondary", fontWeight: 600 }}>{card.footerLabel}</Typography>
                      <Typography sx={{ fontSize: 20, fontWeight: 600, color: isDark ? "#c084fc" : "#a855f7" }}>{card.footerValue}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end", gap: 0.5, height: 36 }}>
                      {[40, 60, 80, 100].map((h, i) => (
                        <Box key={h} sx={{ width: 8, borderRadius: "4px 4px 0 0", height: `${h}%`, bgcolor: i === 3 ? (isDark ? "#c084fc" : "#a855f7") : (isDark ? `rgba(168,85,247,${0.45 + i * 0.12})` : `rgba(168,85,247,${0.2 + i * 0.1})`) }} />
                      ))}
                    </Box>
                  </Box>
                )}
                {index === 3 && (
                  <Box sx={{ mt: 3, borderRadius: "14px", p: 1.5, bgcolor: isDark ? "rgba(15,23,42,0.4)" : "#f1f5f9", display: "flex", justifyContent: "space-between", mb: 1.5, border: isDark ? "none" : "1px solid rgba(0,0,0,0.03)" }}>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 600 }}>{card.footerLabel}</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 600, color: isDark ? "#60a5fa" : "#3b82f6" }}>{card.footerValue}</Typography>
                  </Box>
                )}
                {index === 4 && (
                  <Box sx={{ mt: 3, borderRadius: "14px", p: 1.5, bgcolor: isDark ? "rgba(15,23,42,0.4)" : "#f1f5f9", display: "flex", justifyContent: "space-between", mb: 1.5, border: isDark ? "none" : "1px solid rgba(0,0,0,0.03)" }}>
                    <Typography sx={{ fontSize: 13, color: "text.secondary", fontWeight: 600 }}>{card.footerLabel}</Typography>
                    <Typography sx={{ fontSize: 16, fontWeight: 600, color: isDark ? "#fbbf24" : "#f59e0b" }}>{card.footerValue}</Typography>
                  </Box>
                )}
                {index === 5 && (
                  <Box sx={{ mt: 3, borderRadius: "14px", p: 1.5, bgcolor: isDark ? "rgba(15,23,42,0.4)" : "#f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", border: isDark ? "none" : "1px solid rgba(0,0,0,0.03)" }}>
                    <Box>
                      <Typography sx={{ fontSize: 12, color: "text.secondary", fontWeight: 600 }}>{card.footerLabel}</Typography>
                      <Typography sx={{ fontSize: 16, fontWeight: 600, color: isDark ? "#34d399" : "#10b981" }}>{card.footerValue}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.8 }}>
                      <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: isDark ? "#34d399" : "#10b981", animation: "pulse 2s infinite", "@keyframes pulse": { "0%": { boxShadow: "0 0 0 0 rgba(16, 185, 129, 0.4)" }, "70%": { boxShadow: "0 0 0 6px rgba(16, 185, 129, 0)" }, "100%": { boxShadow: "0 0 0 0 rgba(16, 185, 129, 0)" } } }} />
                      <Typography sx={{ fontSize: 11, fontWeight: 600, color: isDark ? "#34d399" : "#10b981" }}>Live Sync</Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

