"use client";

import { Box, Typography, useTheme } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";
import { useLanguage } from "@/i18n/LanguageProvider";

export default function MyTurnLogo({
  iconSize = 54,
  nameFontSize = 28,
  taglineFontSize = 14,
  showTagline = true,
  sx,
}: {
  iconSize?: number;
  nameFontSize?: number;
  taglineFontSize?: number;
  showTagline?: boolean;
  sx?: SxProps<Theme>;
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();

  return (
    <Box
      sx={{
        display: "inline-flex",
        alignItems: "center",
        gap: 1.5,
        minWidth: 0,
        ...sx,
      }}
    >
      <Box
        component="img"
        src="/3.png"
        alt="MyTurn logo"
        sx={{
          width: iconSize,
          height: iconSize,
          objectFit: "contain",
          flexShrink: 0,
          filter: isDark
            ? "drop-shadow(0 0 10px rgba(251, 113, 133, 0.25))"
            : "none",
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
        <Typography
          sx={{
            background: isDark
              ? "linear-gradient(90deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
              : "linear-gradient(90deg, #EC4899 0%, #E11D48 50%, #F97316 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            fontSize: nameFontSize,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.03em",
            whiteSpace: "nowrap",
            fontFamily: "var(--font-inter), sans-serif",
          }}
        >
          MyTurn!
        </Typography>
        {showTagline ? (
          <Typography
            sx={{
              mt: 0.45,
              color: "text.secondary",
              fontSize: taglineFontSize,
              fontWeight: 500,
              lineHeight: 1.1,
              whiteSpace: "nowrap",
            }}
          >
            {t.logo.tagline}
          </Typography>
        ) : null}
      </Box>
    </Box>
  );
}
