"use client";

import { Box, Container, Chip, Stack, Typography, useTheme } from "@mui/material";
import TableRestaurantOutlinedIcon from "@mui/icons-material/TableRestaurantOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import { ProductShot } from "@/components/home/ProductShot";
import { SectionHeading } from "@/components/home/SectionHeading";
import { SECTION_PX } from "@/components/home/styles";
import { useLanguage } from "@/i18n/LanguageProvider";
import { motion, Variants } from "framer-motion";

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 280, damping: 26 } },
};

type ModeCardProps = {
  badge: string;
  title: string;
  description: string;
  recommendedLabel: string;
  tags: readonly string[];
  bullets: readonly string[];
  note?: string;
  icon: typeof TableRestaurantOutlinedIcon;
  isDark: boolean;
};

function ModeCard({
  badge,
  title,
  description,
  recommendedLabel,
  tags,
  bullets,
  note,
  icon: Icon,
  isDark,
}: ModeCardProps) {
  const border = isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(15, 23, 42, 0.08)";
  const cardBg = isDark ? "rgba(30, 32, 44, 0.75)" : "#ffffff";
  const labelColor = isDark ? "#F472B6" : "#E11D48";
  const tagBg = isDark ? "rgba(244, 114, 182, 0.14)" : "rgba(225, 29, 72, 0.08)";
  const tagColor = isDark ? "#fbcfe8" : "#be123c";

  return (
    <Box
      component={motion.div}
      variants={cardVariants}
      sx={{
        p: { xs: 2, sm: 2.25 },
        borderRadius: "16px",
        border,
        bgcolor: cardBg,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        boxShadow: isDark
          ? "0 12px 36px rgba(0,0,0,0.28), inset 0 1px 0 rgba(255,255,255,0.05)"
          : "0 12px 40px -12px rgba(15,23,42,0.1)",
      }}
    >
      <Box sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            bgcolor: isDark ? "rgba(244, 114, 182, 0.12)" : "rgba(225, 29, 72, 0.08)",
            color: labelColor,
          }}
        >
          <Icon sx={{ fontSize: 22 }} />
        </Box>
        <Box sx={{ minWidth: 0 }}>
          <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", color: labelColor }}>
            {badge}
          </Typography>
          <Typography sx={{ mt: 0.35, fontSize: { xs: "1rem", sm: "1.05rem" }, fontWeight: 700, lineHeight: 1.3, color: "text.primary" }}>
            {title}
          </Typography>
        </Box>
      </Box>

      <Typography sx={{ mt: 1.25, fontSize: 13, lineHeight: 1.55, color: "text.secondary", fontWeight: 500 }}>
        {description}
      </Typography>

      <Box sx={{ mt: 1.75 }}>
        <Typography sx={{ fontSize: 11, fontWeight: 700, color: "text.secondary", mb: 0.75 }}>
          {recommendedLabel}
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={0.6} useFlexGap>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              sx={{
                height: 24,
                fontSize: 11,
                fontWeight: 700,
                bgcolor: tagBg,
                color: tagColor,
                border: "none",
              }}
            />
          ))}
        </Stack>
      </Box>

      <Stack spacing={0.9} sx={{ mt: 1.75 }}>
        {bullets.map((line) => (
          <Box key={line} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
            <CheckRoundedIcon sx={{ fontSize: 16, color: labelColor, mt: 0.1, flexShrink: 0 }} />
            <Typography sx={{ fontSize: 12, lineHeight: 1.5, color: "text.secondary", fontWeight: 500 }}>
              {line}
            </Typography>
          </Box>
        ))}
      </Stack>

      {note ? (
        <Box
          sx={{
            mt: 1.75,
            p: 1.25,
            borderRadius: "12px",
            display: "flex",
            gap: 1.25,
            alignItems: "flex-start",
            bgcolor: isDark ? "rgba(251, 191, 36, 0.08)" : "rgba(245, 158, 11, 0.08)",
            border: isDark ? "1px solid rgba(251, 191, 36, 0.2)" : "1px solid rgba(245, 158, 11, 0.2)",
          }}
        >
          <InfoOutlinedIcon sx={{ fontSize: 18, color: isDark ? "#fbbf24" : "#d97706", mt: 0.1, flexShrink: 0 }} />
          <Typography sx={{ fontSize: 12, lineHeight: 1.55, color: isDark ? "#fde68a" : "#92400e", fontWeight: 600 }}>
            {note}
          </Typography>
        </Box>
      ) : null}
    </Box>
  );
}

export function BranchModesSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const m = t.branchModes;

  const sectionBg = isDark ? "#080a12" : "#f8fafc";
  const borderSubtle = isDark ? "rgba(255, 255, 255, 0.08)" : "rgba(15, 23, 42, 0.06)";
  const supportBg = isDark ? "rgba(96, 165, 250, 0.08)" : "rgba(37, 99, 235, 0.06)";
  const supportBorder = isDark ? "rgba(96, 165, 250, 0.22)" : "rgba(37, 99, 235, 0.15)";

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 7, md: 8 },
        px: SECTION_PX,
        position: "relative",
        bgcolor: sectionBg,
        borderTop: `1px solid ${borderSubtle}`,
        borderBottom: `1px solid ${borderSubtle}`,
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          sx={{ mb: { xs: 3, md: 3.5 } }}
        >
          <SectionHeading
            label={m.sectionLabel}
            title={m.title1}
            titleHighlight={m.titleHighlight}
            subtitle={m.subtitle}
            maxWidth={640}
          />
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.55, type: "spring", stiffness: 200, damping: 26 }}
          sx={{ mb: { xs: 2.5, md: 3 } }}
        >
          <ProductShot
            src="/mode.png"
            alt={m.imageAlt}
            naturalSize
            objectFit="contain"
            priority
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 480, md: 580, lg: 640 },
              mx: "auto",
              display: "block",
              border: "none",
              borderRadius: "16px",
              bgcolor: isDark ? "#0f111a" : "#ffffff",
              boxShadow: isDark
                ? "0 16px 40px rgba(0,0,0,0.35)"
                : "0 16px 40px rgba(15,23,42,0.1)",
            }}
          />
        </Box>

        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: 0.08 }}
          sx={{
            mb: { xs: 2, md: 2.5 },
            px: { xs: 1.5, sm: 2 },
            py: { xs: 1.25, sm: 1.5 },
            borderRadius: "12px",
            maxWidth: 560,
            mx: "auto",
            textAlign: "center",
            bgcolor: supportBg,
            border: `1px solid ${supportBorder}`,
          }}
        >
          <Typography sx={{ fontSize: { xs: 13, sm: 14 }, lineHeight: 1.55, color: "text.primary", fontWeight: 600 }}>
            {m.supportLine}
          </Typography>
        </Box>

        <Box
          component={motion.div}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" },
            gap: { xs: 1.75, md: 2 },
            maxWidth: 800,
            mx: "auto",
          }}
        >
          <ModeCard {...m.fixed} icon={TableRestaurantOutlinedIcon} isDark={isDark} />
          <ModeCard {...m.flex} icon={GroupsOutlinedIcon} isDark={isDark} />
        </Box>
      </Container>
    </Box>
  );
}
