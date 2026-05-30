import type { SxProps, Theme } from "@mui/material";

/** Consistent vertical rhythm across homepage sections */
export const SECTION_PY = { xs: 10, md: 12 } as const;
export const SECTION_PX = { xs: 2, sm: 3, md: 10 } as const;
export const SECTION_HEADER_MB = { xs: 5, md: 7 } as const;

export function sectionLabelSx(isDark: boolean): SxProps<Theme> {
  return {
    color: isDark ? "#F472B6" : "#E11D48",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    fontSize: 13,
    fontWeight: 800,
  };
}

export function brandGradientCss(isDark: boolean): string {
  return isDark
    ? "linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
    : "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #F97316 100%)";
}

export function gradientHighlightSx(isDark: boolean): SxProps<Theme> {
  return {
    background: brandGradientCss(isDark),
    WebkitBackgroundClip: "text",
    backgroundClip: "text",
    color: "transparent",
    fontWeight: 600,
  };
}

export function brandIconBadgeSx(isDark: boolean): SxProps<Theme> {
  return {
    width: 48,
    height: 48,
    borderRadius: "50%",
    mx: "auto",
    mb: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    background: brandGradientCss(isDark),
    color: "#ffffff",
    transition: "opacity 0.25s ease, max-height 0.25s ease, margin 0.25s ease",
  };
}

export const sectionTitleSx: SxProps<Theme> = {
  mt: 1.5,
  fontSize: { xs: "1.75rem", sm: "2.25rem", md: "2.75rem" },
  fontWeight: 400,
  lineHeight: 1.15,
  color: "text.primary",
};

export const sectionSubtitleSx: SxProps<Theme> = {
  mt: 2,
  color: "text.secondary",
  fontSize: { xs: 15, md: 17 },
  lineHeight: 1.55,
  fontWeight: 500,
};

export function primaryCtaSx(isDark: boolean): SxProps<Theme> {
  return {
    textTransform: "none",
    borderRadius: "12px",
    px: 3.5,
    py: 1.35,
    fontWeight: 600,
    fontSize: { xs: 15, sm: 16 },
    boxShadow: isDark
      ? "0 8px 24px rgba(244, 114, 182, 0.22)"
      : "0 8px 24px rgba(225, 29, 72, 0.18)",
    background: isDark
      ? "linear-gradient(90deg, #F472B6 0%, #FB923C 100%)"
      : "linear-gradient(90deg, #EC4899 0%, #F97316 100%)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease",
    "&:hover": {
      boxShadow: isDark
        ? "0 12px 28px rgba(244, 114, 182, 0.32)"
        : "0 12px 28px rgba(225, 29, 72, 0.26)",
      transform: "translateY(-1px)",
      background: isDark
        ? "linear-gradient(90deg, #E11D48 0%, #EA580C 100%)"
        : "linear-gradient(90deg, #BE123C 0%, #C2410C 100%)",
    },
  };
}

export function secondaryCtaSx(isDark: boolean): SxProps<Theme> {
  return {
    borderColor: isDark ? "rgba(255, 255, 255, 0.12)" : "rgba(15, 23, 42, 0.1)",
    color: "text.primary",
    textTransform: "none",
    borderRadius: "12px",
    px: 3.5,
    py: 1.35,
    fontWeight: 500,
    fontSize: { xs: 15, sm: 16 },
    bgcolor: isDark ? "rgba(30, 32, 44, 0.65)" : "rgba(255, 255, 255, 0.92)",
    backdropFilter: "blur(12px)",
    "&:hover": {
      bgcolor: isDark ? "rgba(255, 255, 255, 0.06)" : "#ffffff",
      borderColor: isDark ? "rgba(255, 255, 255, 0.22)" : "rgba(15, 23, 42, 0.18)",
    },
  };
}
