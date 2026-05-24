import { Box, Container, Link, Typography, useTheme } from "@mui/material";
import MyTurnLogo from "@/components/MyTurnLogo";
import { useLanguage } from "@/i18n/LanguageProvider";

const FOOTER_LINK_HREFS: Record<string, string> = {
  Features: "/#features",
  "How It Works": "/#how-it-works",
  Pricing: "/#pricing",
  "About Us": "/about",
  Contact: "/#contact",
  "Privacy Policy": "/privacy",
  "นโยบายความเป็นส่วนตัว": "/privacy",
  "เกี่ยวกับเรา": "/about",
  "ติดต่อเรา": "/#contact",
};

const FOOTER_LEGAL_HREFS: Record<string, string> = {
  "Privacy Policy": "/privacy",
  "Terms of Service": "/terms",
  "Cookie Settings": "#",
};

export function Footer() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();

  return (
    <Box
      component="footer"
      sx={{
        py: 8,
        px: 2,
        borderTop: isDark
          ? "1px solid rgba(255, 255, 255, 0.1)"
          : "1px solid rgba(0, 0, 0, 0.05)",
        bgcolor: isDark ? "transparent" : "#ffffff",
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr repeat(3, 1fr)" },
            gap: 5,
            mb: 6,
          }}
        >
          <Box sx={{ maxWidth: 360 }}>
            <MyTurnLogo iconSize={52} nameFontSize={26} taglineFontSize={13} />
            <Typography
              sx={{
                mt: 1.5,
                color: "text.secondary",
                fontSize: 14,
                lineHeight: 1.6,
                fontWeight: 500,
              }}
            >
              {t.footer.description}
            </Typography>
            <Typography
              sx={{
                mt: 2,
                fontSize: 14,
                fontWeight: 600,
                color: "text.primary",
              }}
            >
              {t.footer.companyName}
            </Typography>
            <Typography
              sx={{
                mt: 0.5,
                fontSize: 13,
                fontWeight: 500,
                color: "text.secondary",
              }}
            >
              {t.footer.address}
            </Typography>
            <Box sx={{ mt: 2.5 }}>
              <Link
                href={process.env.NEXT_PUBLIC_HAWDI_URL || "#"}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  display: "inline-block",
                  fontSize: 13,
                  fontWeight: 600,
                  color: isDark ? "rgba(255,255,255,0.4)" : "text.secondary",
                  textDecoration: "none",
                  bgcolor: isDark
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(0,0,0,0.03)",
                  px: 1.5,
                  py: 0.5,
                  borderRadius: "6px",
                  transition: "color 0.2s, background 0.2s",
                  "&:hover": {
                    color: "primary.main",
                    bgcolor: isDark
                      ? "rgba(96,165,250,0.1)"
                      : "rgba(37,99,235,0.05)",
                  },
                }}
              >
                {t.footer.hawdi}
              </Link>
            </Box>
          </Box>

          {t.footer.columns.map((column, index) => (
            <Box key={index}>
              <Typography
                sx={{
                  mb: 1.5,
                  fontSize: 16,
                  color: "text.primary",
                  fontWeight: 600,
                }}
              >
                {column.title}
              </Typography>
              {column.links.map((link) => (
                <Link
                  key={link}
                  href={FOOTER_LINK_HREFS[link] ?? "#"}
                  underline="none"
                  sx={{
                    display: "block",
                    mb: 1.3,
                    fontSize: 14,
                    color: "text.secondary",
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                    "&:hover": { color: isDark ? "#ffffff" : "primary.main" },
                  }}
                >
                  {t.footer.links[link as keyof typeof t.footer.links] || link}
                </Link>
              ))}
            </Box>
          ))}
        </Box>

        <Box
          sx={{
            pt: 3,
            borderTop: isDark
              ? "1px solid rgba(255, 255, 255, 0.1)"
              : "1px solid rgba(0, 0, 0, 0.05)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: { xs: "column", md: "row" },
            gap: 2,
          }}
        >
          <Typography
            sx={{
              color: isDark ? "#6b7280" : "text.secondary",
              fontSize: 13,
              fontWeight: 500,
            }}
          >
            {t.footer.rights}
          </Typography>
          <Box sx={{ display: "flex", gap: 2.5 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Settings"].map(
              (item) => (
                <Link
                  key={item}
                  href={FOOTER_LEGAL_HREFS[item] ?? "#"}
                  underline="none"
                  sx={{
                    color: isDark ? "#6b7280" : "text.secondary",
                    fontSize: 13,
                    fontWeight: 500,
                    transition: "color 0.2s ease",
                    "&:hover": { color: isDark ? "#fff" : "primary.main" },
                  }}
                >
                  {t.footer.links[item as keyof typeof t.footer.links]}
                </Link>
              ),
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
