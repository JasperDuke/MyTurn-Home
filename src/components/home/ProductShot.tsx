import { Box, Typography } from "@mui/material";
import type { SxProps, Theme } from "@mui/material/styles";

type ProductShotProps = {
  src: string;
  alt: string;
  label?: string;
  aspectRatio?: string;
  objectFit?: "cover" | "contain";
  /** When true, do not force an aspect-ratio box — image keeps its natural height (best for showing full screenshots). */
  naturalSize?: boolean;
  /** Eager load + higher fetch priority — use for hero / above-the-fold shots only */
  priority?: boolean;
  sx?: SxProps<Theme>;
};

export function ProductShot({
  src,
  alt,
  label,
  aspectRatio = "16 / 9",
  objectFit = "cover",
  naturalSize = false,
  priority = false,
  sx,
}: ProductShotProps) {
  const imgFetchPriority = priority ? ("high" as const) : undefined;

  if (naturalSize) {
    return (
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 0,
          border: "1px solid rgba(148, 163, 184, 0.22)",
          bgcolor: "#0b1019",
          boxShadow: "0 24px 60px rgba(2, 6, 23, 0.28)",
          ...sx,
        }}
      >
        <Box
          component="img"
          src={src}
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          fetchPriority={imgFetchPriority}
          sx={{
            display: "block",
            width: "100%",
            height: "auto",
            objectFit,
          }}
        />
        {label ? (
          <Typography
            sx={{
              position: "absolute",
              left: 14,
              bottom: 12,
              zIndex: 2,
              px: 1.25,
              py: 0.55,
              borderRadius: "999px",
              bgcolor: "rgba(2, 6, 23, 0.72)",
              color: "#e2e8f0",
              fontSize: 11,
              fontWeight: 800,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              backdropFilter: "blur(12px)",
            }}
          >
            {label}
          </Typography>
        ) : null}
      </Box>
    );
  }

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 0,
        border: "1px solid rgba(148, 163, 184, 0.22)",
        bgcolor: "#0b1019",
        boxShadow: "0 24px 60px rgba(2, 6, 23, 0.28)",
        aspectRatio,
        ...sx,
        "& img": {
          backfaceVisibility: "hidden",
          transform: "translateZ(0)",
        },
      }}
    >
      <Box
        component="img"
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={imgFetchPriority}
        sx={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit,
        }}
      />
      {label ? (
        <Typography
          sx={{
            position: "absolute",
            left: 14,
            bottom: 12,
            zIndex: 2,
            px: 1.25,
            py: 0.55,
            borderRadius: "999px",
            bgcolor: "rgba(2, 6, 23, 0.72)",
            color: "#e2e8f0",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            backdropFilter: "blur(12px)",
          }}
        >
          {label}
        </Typography>
      ) : null}
    </Box>
  );
}
