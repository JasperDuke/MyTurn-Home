"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AppBar, Box, Button, Container, Toolbar } from "@mui/material";
import { BookDemoModal } from "@/components/home/BookDemoModal";
import MyTurnLogo from "@/components/MyTurnLogo";
import { useLanguage } from "@/i18n/LanguageProvider";


export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();

  const links = [
    { label: t.footer.links["Features"], href: "/#features" },
    { label: t.footer.links["How It Works"], href: "/#how-it-works" },
    { label: t.footer.links["Pricing"], href: "/#pricing" },
    { label: t.footer.links["About Us"], href: "/about" },
    { label: t.footer.links["Contact"], href: "/#contact" },
  ];

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        bgcolor: "background.paper",
        backdropFilter: "blur(20px)",
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ minHeight: 74, px: { xs: 0, sm: 1 } }}>
          <MyTurnLogo iconSize={50} nameFontSize={25} taglineFontSize={13} />

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{ display: { xs: "none", md: "inline-flex" }, gap: 3, mr: 2 }}
          >
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Button
                  key={link.label}
                  href={link.href}
                  sx={{
                    color: isActive ? "primary.main" : "text.primary",
                    fontSize: 14,
                    fontWeight: isActive ? 700 : 600,
                    textTransform: "none",
                    "&:hover": {
                      color: "primary.main",
                      backgroundColor: "transparent",
                      boxShadow: "none",
                    },
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>

          <Box sx={{ display: "inline-flex", gap: 1.5, alignItems: "center" }}>
            <Button
              variant="contained"
              color="primary"
              sx={{
                textTransform: "none",
                borderRadius: "8px",
                px: 2.4,
                py: 1.15,
                fontWeight: 500,
                boxShadow: "none",
                "&:hover": {
                  bgcolor: "primary.main",
                  boxShadow: "none",
                },
              }}
              onClick={() => setIsModalOpen(true)}
            >
              {t.nav.bookDemo}
            </Button>
          </Box>
        </Toolbar>
      </Container>
      <BookDemoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </AppBar>
  );
}
