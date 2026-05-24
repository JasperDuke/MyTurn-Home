"use client";

import { IconButton, useTheme as useMuiTheme } from "@mui/material";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

// useEffect only runs on the client, so now we can safely show the UI.
export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { setTheme } = useTheme();
  const muiTheme = useMuiTheme();

  useEffect(() => {
    const timeout = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeout);
  }, []);

  if (!mounted) {
    return <IconButton disabled sx={{ width: 40, height: 40 }} />;
  }

  const isDark = muiTheme.palette.mode === "dark";

  return (
    <IconButton
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
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
      {isDark ? <LightModeOutlinedIcon fontSize="medium" sx={{ color: "#fbbf24" }} /> : <DarkModeOutlinedIcon fontSize="medium" sx={{ color: "#E11D48" }} />}
    </IconButton>
  );
}
