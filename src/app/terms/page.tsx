"use client";

import { Box } from "@mui/material";
import { Header, Footer } from "@/components/home";
import { TermsOfUseContent } from "@/components/legal/TermsOfUseContent";

export default function TermsPage() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "background.default",
        color: "text.primary",
      }}
    >
      <Header />
      <Box component="main" sx={{ pt: { xs: 12, md: 13 } }}>
        <TermsOfUseContent />
      </Box>
      <Footer />
    </Box>
  );
}
