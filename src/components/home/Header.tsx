"use client";

import { useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import CloseIcon from "@mui/icons-material/Close";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Container,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  useTheme,
} from "@mui/material";
import { BookDemoModal } from "@/components/home/BookDemoModal";
import MyTurnLogo from "@/components/MyTurnLogo";
import { useLanguage } from "@/i18n/LanguageProvider";
import { primaryCtaSx } from "@/components/home/styles";
import {
  hashFromHomeLink,
  isHomeHashLink,
  scrollToSection,
} from "@/lib/scroll";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const { t } = useLanguage();
  const pathname = usePathname();
  const isDark = useTheme().palette.mode === "dark";

  const links = [
    { label: t.footer.links["Features"], href: "/#features" },
    { label: t.footer.links["How It Works"], href: "/#how-it-works" },
    { label: t.footer.links["Pricing"], href: "/#pricing" },
    { label: t.footer.links["About Us"], href: "/about" },
    { label: t.footer.links["Contact"], href: "/#contact" },
  ];

  const closeDrawer = () => setDrawerOpen(false);

  const handleNavClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    if (!isHomeHashLink(href) || pathname !== "/") return;

    const id = hashFromHomeLink(href);
    if (!document.getElementById(id)) return;

    event.preventDefault();
    scrollToSection(id);
    window.history.pushState(null, "", href);
  };

  const onLinkClick = (
    event: MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    handleNavClick(event, href);
    closeDrawer();
  };

  const openBookDemo = () => {
    closeDrawer();
    setIsModalOpen(true);
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          backdropFilter: "blur(20px)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ minHeight: 74, px: { xs: 0, sm: 1 }, gap: 1 }}>
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
                    onClick={(e) =>
                      handleNavClick(
                        e as unknown as MouseEvent<HTMLAnchorElement>,
                        link.href,
                      )
                    }
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

            <Box sx={{ display: "inline-flex", gap: { xs: 0.5, sm: 1.5 }, alignItems: "center" }}>
              <IconButton
                aria-label={t.nav.menuOpen}
                aria-expanded={drawerOpen}
                onClick={() => setDrawerOpen(true)}
                sx={{
                  display: { md: "none" },
                  color: "text.primary",
                }}
              >
                <MenuIcon />
              </IconButton>

              <Button
                variant="contained"
                color="primary"
                sx={{
                  ...primaryCtaSx(isDark),
                  px: { xs: 1.75, sm: 2.4 },
                  py: 1.1,
                  fontSize: { xs: 13, sm: 14 },
                  whiteSpace: "nowrap",
                }}
                onClick={() => setIsModalOpen(true)}
              >
                {t.nav.bookDemo}
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={closeDrawer}
        PaperProps={{
          sx: {
            width: "min(300px, 88vw)",
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            px: 2.5,
            pt: 2.5,
            pb: 2,
          }}
        >
          <Box onClick={closeDrawer} sx={{ minWidth: 0, flex: 1 }}>
            <MyTurnLogo iconSize={44} nameFontSize={23} taglineFontSize={12} />
          </Box>
          <IconButton
            aria-label={t.nav.menuClose}
            onClick={closeDrawer}
            size="small"
            sx={{ color: "text.secondary", mt: 0.25 }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>

        <Divider />

        <List sx={{ flex: 1, px: 1.5, py: 1.5 }}>
          {links.map((link) => (
            <ListItemButton
              key={link.label}
              component="a"
              href={link.href}
              selected={pathname === link.href}
              onClick={(e) =>
                onLinkClick(e as unknown as MouseEvent<HTMLAnchorElement>, link.href)
              }
              sx={{
                borderRadius: "10px",
                py: 1.1,
                mb: 0.25,
                "&.Mui-selected": {
                  bgcolor: isDark ? "rgba(244,114,182,0.12)" : "rgba(225,29,72,0.08)",
                  color: "primary.main",
                },
              }}
            >
              <ListItemText
                primary={link.label}
                primaryTypographyProps={{ fontWeight: 600, fontSize: 15 }}
              />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ px: 2.5, pb: 2.5, pt: 1 }}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={openBookDemo}
            sx={{
              ...primaryCtaSx(isDark),
              py: 1.15,
              fontSize: 14,
            }}
          >
            {t.nav.bookDemo}
          </Button>
        </Box>
      </Drawer>

      <BookDemoModal open={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
}
