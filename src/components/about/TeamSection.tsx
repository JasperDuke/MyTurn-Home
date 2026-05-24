"use client";

import {
  Box,
  Container,
  Typography,
  useTheme,
  Link as MuiLink,
  Avatar,
} from "@mui/material";
import { motion, Variants } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageProvider";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export function TeamSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();

  const team = [
    {
      name: "Hein Arkar",
      roleKey: "ceo",
      url:
        process.env.NEXT_PUBLIC_URL_HEINARKAR || "https://heinarkar.vercel.app",
      avatar: "/avatar-placeholder.png",
    },
    {
      name: "Lat Yar Lapyae",
      roleKey: "coo",
      url: "#",
      avatar: "/avatar-placeholder.png",
    },
    {
      name: "Aye Nyein Chan Moe",
      roleKey: "fullstack_research",
      url:
        process.env.NEXT_PUBLIC_URL_AYENYEINCHANMOE ||
        "https://ayenyeinchanmoe.vercel.app",
      avatar: "/avatar-placeholder.png",
    },
    {
      name: "Zar Lwin Htet",
      roleKey: "fullstack_marketing",
      url:
        process.env.NEXT_PUBLIC_URL_ZARLWINHTET ||
        "https://zarlwinhtet.vercel.app",
      avatar: "/avatar-placeholder.png",
    },
  ];

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 4, md: 6 },
        px: 2,
        position: "relative",
        bgcolor: isDark ? "transparent" : "#ffffff",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: isDark
            ? "radial-gradient(circle at top, rgba(30, 41, 59, 0.5) 0%, transparent 60%)"
            : "radial-gradient(circle at top, rgba(241, 245, 249, 0.8) 0%, transparent 60%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          sx={{
            textAlign: "center",
            maxWidth: 700,
            mx: "auto",
            mb: { xs: 6, md: 10 },
          }}
        >
          <Typography
            sx={{
              color: isDark ? "#F472B6" : "#E11D48",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              fontSize: 13,
              fontWeight: 800,
            }}
          >
            {t.about.sectionLabel}
          </Typography>
          <Typography
            sx={{
              mt: 1.5,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              fontWeight: 400,
              lineHeight: 1.15,
              color: "text.primary",
            }}
          >
            {t.about.title1}{" "}
            <Box
              component="span"
              sx={{
                background: isDark
                  ? "linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
                  : "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #F97316 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                fontWeight: 600,
              }}
            >
              {t.about.titleHighlight}
            </Box>
          </Typography>
          <Typography
            sx={{
              mt: 2.5,
              color: "text.secondary",
              fontSize: { xs: 16, md: 18 },
              lineHeight: 1.6,
            }}
          >
            {t.about.subtitle}
          </Typography>
        </Box>

        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="show"
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            gap: 4,
          }}
        >
          {team.map((member, index) => (
            <Box
              component={motion.div}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              key={index}
              sx={{
                p: 3,
                borderRadius: "24px",
                border: isDark
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.05)",
                background: isDark ? "rgba(30, 32, 44, 0.6)" : "#ffffff",
                backdropFilter: isDark ? "blur(20px)" : "none",
                boxShadow: isDark
                  ? "0 8px 32px rgba(0,0,0,0.2)"
                  : "0 12px 32px rgba(0,0,0,0.04)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                transition: "box-shadow 0.3s ease, border 0.3s ease",
                "&:hover": {
                  boxShadow: isDark
                    ? "0 16px 48px rgba(0,0,0,0.4)"
                    : "0 16px 48px rgba(37,99,235,0.08)",
                  border: isDark
                    ? "1px solid rgba(255,255,255,0.15)"
                    : "1px solid rgba(37,99,235,0.15)",
                },
              }}
            >
              <Box
                component={motion.div}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
                sx={{
                  mb: 3,
                  p: 0.5,
                  borderRadius: "50%",
                  background: isDark 
                    ? "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.02))"
                    : "linear-gradient(135deg, rgba(0,0,0,0.05), transparent)",
                }}
              >
                <Avatar
                  src={member.avatar}
                  alt={member.name}
                  sx={{
                    width: 90,
                    height: 90,
                    bgcolor: isDark ? "rgba(255,255,255,0.05)" : "primary.main",
                    color: "#fff",
                    fontWeight: 600,
                    fontSize: 28,
                    border: isDark ? "2px solid rgba(255,255,255,0.1)" : "2px solid #ffffff",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)"
                  }}
                >
                  {member.name.split(" ").map((n) => n[0]).join("").substring(0, 2)}
                </Avatar>
              </Box>
              
              <Typography sx={{ fontWeight: 700, fontSize: 18, color: "text.primary" }}>
                {member.name}
              </Typography>
              <Box sx={{ minHeight: 40, display: "flex", alignItems: "flex-start", justifyContent: "center", mt: 0.5 }}>
                <Typography sx={{ color: "text.secondary", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", lineHeight: 1.4, whiteSpace: "pre-line" }}>
                  {t.about.roles[member.roleKey as keyof typeof t.about.roles]}
                </Typography>
              </Box>
              
              <Box sx={{ flexGrow: 1 }} />

              {member.url !== "#" && (
                <MuiLink
                  href={member.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    mt: 3,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 0.5,
                    fontSize: 13,
                    fontWeight: 600,
                    color: "text.secondary",
                    textDecoration: "none",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    bgcolor: isDark
                      ? "rgba(255,255,255,0.05)"
                      : "rgba(0,0,0,0.03)",
                    transition: "all 0.2s ease",
                    "&:hover": {
                      color: "primary.main",
                      bgcolor: isDark
                        ? "rgba(96,165,250,0.1)"
                        : "rgba(37,99,235,0.05)",
                    },
                  }}
                >
                  Portfolio <OpenInNewIcon sx={{ fontSize: 14 }} />
                </MuiLink>
              )}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
