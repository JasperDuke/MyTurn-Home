"use client";

import { IconButton, Tooltip, Typography, useTheme as useMuiTheme } from "@mui/material";
import { useLanguage } from "@/i18n/LanguageProvider";

export function LanguageToggle() {
  const { locale, setLocale } = useLanguage();
  const muiTheme = useMuiTheme();
  const isDark = muiTheme.palette.mode === "dark";

  const toggleLanguage = () => {
    setLocale(locale === "en" ? "th" : "en");
  };

  return (
    <Tooltip title={locale === "en" ? "เปลี่ยนเป็นภาษาไทย" : "Switch to English"} placement="left">
      <IconButton
        onClick={toggleLanguage}
        sx={{
          width: 56,
          height: 56,
          color: "text.primary",
          bgcolor: isDark ? "rgba(30, 41, 59, 0.9)" : "white",
          boxShadow: isDark 
            ? "0 4px 20px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)" 
            : "0 8px 30px rgba(0,0,0,0.12)",
          backdropFilter: "blur(10px)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          "&:hover": {
            bgcolor: isDark ? "rgba(40, 53, 75, 0.95)" : "#f8fafc",
            transform: "scale(1.08) translateY(-2px)",
            boxShadow: isDark 
              ? "0 8px 30px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.15)" 
              : "0 12px 40px rgba(0,0,0,0.15)",
          },
        }}
      >
        <Typography sx={{ fontWeight: 800, fontSize: 16, color: isDark ? "#f8fafc" : "#0f172a" }}>
          {locale === "en" ? "TH" : "EN"}
        </Typography>
      </IconButton>
    </Tooltip>
  );
}
