"use client";

import { Box } from "@mui/material";
import { TeamSection } from "@/components/about/TeamSection";
import { CompanySection } from "@/components/about/CompanySection";
import { Header, Footer } from "@/components/home";

export default function AboutPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header />
      <Box component="main" sx={{ pt: { xs: 4, md: 8 }, pb: { xs: 4, md: 6 } }}>
        <TeamSection />
        <CompanySection />
      </Box>
      <Footer />
    </Box>
  );
}
