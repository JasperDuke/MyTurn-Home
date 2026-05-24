"use client";

import { createTheme, ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { ReactNode, useMemo } from "react";
import { useTheme } from "next-themes";

const typography = {
  fontFamily: '"Outfit", "Prompt", "Geist", "Roboto", "Helvetica", "Arial", sans-serif',
  h1: { fontWeight: 600 },
  h2: { fontWeight: 500 },
  h3: { fontWeight: 500 },
  h4: { fontWeight: 500 },
  h5: { fontWeight: 400 },
  h6: { fontWeight: 400 },
  button: { fontWeight: 500, textTransform: "none" as const },
};

const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: mode === "light" ? "#E11D48" : "#FB7185",
        light: mode === "light" ? "#F472B6" : "#F472B6",
        dark: mode === "light" ? "#BE123C" : "#BE123C",
      },
      secondary: {
        main: mode === "light" ? "#FB923C" : "#FB923C",
      },
      background: {
        default: mode === "light" ? "#f8fafc" : "#020617",
        paper: mode === "light" ? "#ffffff" : "rgba(30, 32, 44, 0.7)",
      },
      text: {
        primary: mode === "light" ? "#0f172a" : "#ffffff",
        secondary: mode === "light" ? "#475569" : "#9ca3af",
      },
      divider: mode === "light" ? "rgba(0, 0, 0, 0.05)" : "rgba(255, 255, 255, 0.08)",
    },
    typography,
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "12px",
            padding: "10px 24px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: mode === "light" ? "0 4px 14px 0 rgba(225, 29, 72, 0.39)" : "0 8px 24px rgba(251, 113, 133, 0.3)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            backdropFilter: mode === "dark" ? "blur(20px)" : "none",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            boxShadow: mode === "light" 
              ? "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)"
              : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            transition: "transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out",
            "&:hover": {
              transform: "translateY(-4px)",
              boxShadow: mode === "light"
                ? "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)"
                : "0 12px 40px rgba(0,0,0,0.4)",
            },
          },
        },
      },
    },
  });

function MUIClientProvider({ children }: { children: ReactNode }) {
  const { resolvedTheme } = useTheme();
  
  // Create theme only when resolvedTheme changes. Default to light for initial render matching if needed
  const theme = useMemo(() => getTheme(resolvedTheme === "dark" ? "dark" : "light"), [resolvedTheme]);

  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MUIThemeProvider>
  );
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MUIClientProvider>{children}</MUIClientProvider>
    </NextThemesProvider>
  );
}
