"use client";

import { Box, Container, Typography, useTheme } from "@mui/material";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import SmartphoneOutlinedIcon from "@mui/icons-material/SmartphoneOutlined";
import SyncAltOutlinedIcon from "@mui/icons-material/SyncAltOutlined";
import { useLanguage } from "@/i18n/LanguageProvider";

const accentOrange = "#ff7a00";

const featureIcons = [
  { icon: PublicOutlinedIcon, iconColor: "#E11D48" },
  { icon: SmartphoneOutlinedIcon, iconColor: "#34d399" },
  { icon: SyncAltOutlinedIcon, iconColor: accentOrange },
];

export function GlobalSupportSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();

  const sectionBg = isDark ? "#0a0c14" : "#f1f5f9";
  const cardBg = isDark ? "rgba(255, 255, 255, 0.05)" : "rgba(255, 255, 255, 0.85)";
  const borderSubtle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.08)";

  return (
    <Box
      sx={{
        py: { xs: 10, md: 12 },
        px: { xs: 2, sm: 3 },
        position: "relative",
        bgcolor: sectionBg,
        borderTop: isDark ? `1px solid ${borderSubtle}` : "none",
        borderBottom: isDark ? `1px solid ${borderSubtle}` : "none",
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box sx={{ textAlign: "center", maxWidth: 800, mx: "auto", mb: { xs: 6, md: 8 } }}>
          <Typography
            sx={{
              color: accentOrange,
              textTransform: "uppercase",
              letterSpacing: "0.1em",
              fontSize: 12,
              fontWeight: 800,
            }}
          >
            {t.globalSupport.sectionLabel}
          </Typography>
          <Typography
            sx={{
              mt: 1.5,
              fontSize: { xs: "1.85rem", md: "2.75rem" },
              fontWeight: 500,
              lineHeight: 1.2,
              color: isDark ? "#ffffff" : "#0f172a",
            }}
          >
            {t.globalSupport.title1}{" "}
            <Box
              component="span"
              sx={{
                fontWeight: 700,
                background: isDark
                  ? "linear-gradient(90deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
                  : "linear-gradient(90deg, #EC4899 0%, #E11D48 50%, #F97316 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {t.globalSupport.titleHighlight}
            </Box>
          </Typography>
          <Typography
            sx={{
              mt: 2,
              color: isDark ? "rgba(255,255,255,0.65)" : "#475569",
              fontSize: { xs: 15, md: 17 },
              lineHeight: 1.6,
            }}
          >
            {t.globalSupport.subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
            gap: { xs: 2.5, md: 3 },
            alignItems: "stretch",
          }}
        >
          {t.globalSupport.features.map((item, index) => {
            const { icon: Icon, iconColor } = featureIcons[index];
            return (
              <Box
                key={index}
                sx={{
                  p: 2.5,
                  borderRadius: "16px",
                  border: `1px solid ${borderSubtle}`,
                  bgcolor: cardBg,
                  backdropFilter: isDark ? "blur(12px)" : "none",
                  display: "flex",
                  gap: 2,
                  alignItems: "flex-start",
                }}
              >
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: "12px",
                    flexShrink: 0,
                    bgcolor: isDark ? "rgba(0,0,0,0.35)" : "rgba(15,23,42,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: iconColor,
                  }}
                >
                  <Icon sx={{ fontSize: 24 }} />
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: 16, color: isDark ? "#fff" : "#0f172a" }}>{item.title}</Typography>
                  <Typography sx={{ mt: 0.75, color: isDark ? "rgba(255,255,255,0.6)" : "#64748b", fontSize: 14, lineHeight: 1.55 }}>
                    {item.description}
                  </Typography>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}
