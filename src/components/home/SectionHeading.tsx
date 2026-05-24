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
            whiteSpace: "nowrap",
            fontSize: {
              xs: "clamp(0.8rem, 2.85vw + 0.52rem, 2.75rem)",
              sm: "clamp(1.125rem, 2.1vw + 0.75rem, 2.75rem)",
              md: "2.75rem",
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
