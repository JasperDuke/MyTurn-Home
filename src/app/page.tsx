"use client";

import { Box, useTheme } from "@mui/material";
import {
  CtaSection,
  FeaturesSection,
  Footer,
  GlobalSupportSection,
  Header,
  HeroSection,
  HowItWorksSection,
  LineNotificationsSection,
  ProblemSolutionSection,
} from "@/components/home";

export default function Home() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
        "@keyframes float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-15px)" },
        },
        "@keyframes pulseSlow": {
          "0%, 100%": { opacity: 0.6 },
          "50%": { opacity: 1 },
        },
      }}
    >
      <Box sx={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        {/* Soft, premium animated blobs */}
        <Box sx={{ position: "absolute", top: "-10%", left: "10%", width: 500, height: 500, bgcolor: theme.palette.mode === "dark" ? "rgba(96,165,250,0.06)" : "rgba(37,99,235,0.04)", borderRadius: "50%", filter: "blur(80px)", animation: "float 10s ease-in-out infinite" }} />
        <Box sx={{ position: "absolute", bottom: "-10%", right: "10%", width: 450, height: 450, bgcolor: theme.palette.mode === "dark" ? "rgba(167,139,250,0.05)" : "rgba(79,70,229,0.04)", borderRadius: "50%", filter: "blur(80px)", animation: "float 12s ease-in-out infinite reverse" }} />
        <Box sx={{ position: "absolute", top: "40%", left: "40%", width: 350, height: 350, bgcolor: theme.palette.mode === "dark" ? "rgba(244,114,182,0.03)" : "rgba(96,165,250,0.03)", borderRadius: "50%", filter: "blur(60px)", animation: "pulseSlow 8s ease-in-out infinite" }} />
      </Box>
      <Header />
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection />
        <ProblemSolutionSection />
        <FeaturesSection />
        <GlobalSupportSection />
        <LineNotificationsSection />
        <HowItWorksSection />
        <CtaSection />
      </main>
      <Footer />
    </Box>
  );
}
