"use client";

import { Box } from "@mui/material";
import { Header, Footer } from "@/components/home";
import { PrivacyPolicyContent } from "@/components/legal/PrivacyPolicyContent";

export default function PrivacyPage() {
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
        <PrivacyPolicyContent />
      </Box>
      <Footer />
    </Box>
  );
}
