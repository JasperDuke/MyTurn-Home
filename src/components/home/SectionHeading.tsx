import { Box, Typography, useTheme } from "@mui/material";
import {
  gradientHighlightSx,
  sectionLabelSx,
  sectionSubtitleSx,
  sectionTitleSx,
} from "@/components/home/styles";

type SectionHeadingProps = {
  label: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: "center" | "left";
  maxWidth?: number;
  /** Keep title + highlight on one line (fluid clamp on small widths). */
  singleLineTitle?: boolean;
};

export function SectionHeading({
  label,
  title,
  titleHighlight,
  subtitle,
  align = "center",
  maxWidth = 720,
  singleLineTitle = false,
}: SectionHeadingProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box
      sx={{
        textAlign: align,
        maxWidth: singleLineTitle ? undefined : maxWidth,
        width: singleLineTitle ? "100%" : undefined,
        mx: align === "center" ? "auto" : 0,
      }}
    >
      <Typography sx={sectionLabelSx(isDark)}>{label}</Typography>
      <Typography
        sx={{
          ...sectionTitleSx,
          ...(singleLineTitle && {
            whiteSpace: { xs: "normal", md: "nowrap" },
            fontSize: {
              xs: "clamp(1.5rem, 4vw + 0.5rem, 1.8rem)",
              sm: "clamp(1.8rem, 3vw + 0.6rem, 2.25rem)",
              md: "clamp(2rem, 2.5vw + 0.5rem, 2.75rem)",
            },
          }),
        }}
      >
        {title}
        {titleHighlight ? (
          <>
            {" "}
            <Box component="span" sx={gradientHighlightSx(isDark)}>
              {titleHighlight}
            </Box>
          </>
        ) : null}
      </Typography>
      {subtitle ? (
        <Typography
          sx={{
            ...sectionSubtitleSx,
            ...(align === "center" && {
              maxWidth,
              mx: "auto",
              textAlign: "center",
            }),
          }}
        >
          {subtitle}
        </Typography>
      ) : null}
    </Box>
  );
}
