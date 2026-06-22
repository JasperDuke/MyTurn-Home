import { Box } from "@mui/material";
import type { ReactNode } from "react";

type HomeSectionProps = {
  id: string;
  children: ReactNode;
  "aria-label"?: string;
};

/** Semantic homepage anchor; scroll offset is set globally via `section[id]` in globals.css */
export function HomeSection({ id, children, "aria-label": ariaLabel }: HomeSectionProps) {
  return (
    <Box component="section" id={id} aria-label={ariaLabel}>
      {children}
    </Box>
  );
}
