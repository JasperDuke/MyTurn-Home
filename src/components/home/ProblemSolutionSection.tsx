"use client";

import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import QueueOutlinedIcon from "@mui/icons-material/QueueOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { ProductShot } from "@/components/home/ProductShot";
import { useLanguage } from "@/i18n/LanguageProvider";

const problemBullets = [
  "Idle gaps of just 1–3 minutes compound into major lost revenue every peak service.",
  "Unpredictable waitlists and no-shows frustrate staff and guests alike.",
  "Mismatched seating wastes structural capacity when every seat counts.",
];

const solutionBullets = [
  "Table-driven lifecycle: WAITING → CALLED → SEATED → FINISHED.",
  "Deterministic no-show handling—snooze, expire, and prioritize who's actually there.",
  "A staff dashboard with per-category clarity—no blank screens, no guesswork.",
];

const outcomes = [
  {
    icon: QueueOutlinedIcon,
    iconIndex: 0 as const,
    label: "Tighter table turns",
    sub: "Less idle time between parties",
  },
  {
    icon: GroupsOutlinedIcon,
    iconIndex: 1 as const,
    label: "Happier guests & staff",
    sub: "Predictable flow under pressure",
  },
  {
    icon: TuneOutlinedIcon,
    iconIndex: 2 as const,
    label: "Operations you can tune",
    sub: "Metrics that expose what to fix next",
  },
] as const;

function outcomeIconBox(isDark: boolean, index: 0 | 1 | 2) {
  const dark = [
    { bg: "linear-gradient(135deg, rgba(225,29,72,0.3), rgba(225,29,72,0.1))", color: "#E11D48" },
    { bg: "linear-gradient(135deg, rgba(251,113,133,0.3), rgba(251,113,133,0.1))", color: "#FB7185" },
    { bg: "linear-gradient(135deg, rgba(159,18,57,0.3), rgba(159,18,57,0.1))", color: "#BE123C" },
  ];
  const light = [
    { bg: "rgba(225, 29, 72, 0.1)", color: "#E11D48" },
    { bg: "rgba(225, 29, 72, 0.1)", color: "#E11D48" },
    { bg: "rgba(159, 18, 57, 0.1)", color: "#BE123C" },
  ];
  const s = isDark ? dark[index] : light[index];
  return { bgcolor: s.bg, color: s.color };
}

export function ProblemSolutionSection() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { t } = useLanguage();
  const labOneSrc = isDark ? "/lab-1-light.png" : "/lab-1.png";
  const loyaltySrc = isDark ? "/loyalty-light.png" : "/loyalty.png";

  const labelColor = isDark ? "#F472B6" : "#E11D48";
  const cardBg = isDark ? "rgba(30, 32, 44, 0.7)" : "#ffffff";
  const border = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)";
  const dividerLine = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)";
  const gradientText = isDark
    ? "linear-gradient(135deg, #F472B6 0%, #FB7185 50%, #FB923C 100%)"
    : "linear-gradient(135deg, #EC4899 0%, #E11D48 50%, #F97316 100%)";

  return (
    <Box
      component="section"
      sx={{
        py: { xs: 10, md: 14 },
        px: 2,
        position: "relative",
        overflow: "hidden",
        bgcolor: isDark ? "transparent" : "#f8fafc",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          right: 0,
          width: { xs: "100%", lg: "55%" },
          height: "100%",
          background: isDark ? "linear-gradient(270deg, rgba(251,113,133,0.04), transparent)" : "linear-gradient(270deg, rgba(251,113,133,0.04), transparent)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box sx={{ textAlign: "center", maxWidth: 720, mx: "auto", mb: { xs: 5, md: 7 } }}>
          <Typography
            sx={{ color: labelColor, textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 13, fontWeight: 800 }}
          >
            {t.problemSolution.sectionLabel}
          </Typography>
          <Typography sx={{ mt: 1.5, fontSize: { xs: "2rem", md: "3rem" }, fontWeight: 400, lineHeight: 1.15, color: "text.primary" }}>
            {t.problemSolution.title1}{" "}
            <Box component="span" sx={{ background: gradientText, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent", fontWeight: 600 }}>
              {t.problemSolution.titleHighlight}
            </Box>
          </Typography>
          <Typography sx={{ mt: 2, color: "text.secondary", fontSize: { xs: 16, md: 18 }, lineHeight: 1.55 }}>
            {t.problemSolution.subtitle}
          </Typography>
        </Box>

        <Box
          sx={{
            borderRadius: "24px",
            border,
            bgcolor: cardBg,
            backdropFilter: isDark ? "blur(20px)" : "none",
            boxShadow: isDark ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)" : "0 10px 40px -10px rgba(0,0,0,0.08)",
            p: { xs: 3, sm: 4, md: 5 },
            position: "relative",
          }}
        >
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 1px 1fr" },
              gap: { xs: 4, md: 4 },
              alignItems: "start",
            }}
          >
            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor }}>
                {t.problemSolution.problemLabel}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: { xs: "1.25rem", md: "1.45rem" }, fontWeight: 600, lineHeight: 1.3, color: "text.primary" }}>
                {t.problemSolution.problemTitle}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: 15, lineHeight: 1.65, color: "text.secondary", fontWeight: 500 }}>
                {t.problemSolution.problemDesc}
              </Typography>
              <Box component="ul" sx={{ m: 0, mt: 2.5, pl: 2.25, color: "text.secondary", "& li": { mb: 1.1 } }}>
                {t.problemSolution.problemBullets.map((line, index) => (
                  <Typography key={index} component="li" sx={{ fontSize: 14, lineHeight: 1.55, fontWeight: 500 }}>
                    {line}
                  </Typography>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: { xs: "none", md: "block" }, width: "1px", bgcolor: dividerLine, alignSelf: "stretch", minHeight: 120 }} />

            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor }}>
                {t.problemSolution.solutionLabel}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: { xs: "1.25rem", md: "1.45rem" }, fontWeight: 600, lineHeight: 1.3, color: "text.primary" }}>
                {t.problemSolution.solutionTitle1}{" "}
                <Box component="span" sx={{ background: gradientText, WebkitBackgroundClip: "text", backgroundClip: "text", color: "transparent" }}>
                  {t.problemSolution.solutionHighlight}
                </Box>
              </Typography>
              <Typography sx={{ mt: 2, fontSize: 15, lineHeight: 1.65, color: "text.secondary", fontWeight: 500 }}>
                {t.problemSolution.solutionDesc}
              </Typography>
              <Stack spacing={1.75} sx={{ mt: 2.5 }}>
                {t.problemSolution.solutionBullets.map((line, index) => (
                  <Box key={index} sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}>
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        flexShrink: 0,
                        mt: 0.1,
                        bgcolor: isDark ? "rgba(251,113,133,0.2)" : "rgba(225,29,72,0.1)",
                        color: labelColor,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckRoundedIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Typography sx={{ fontSize: 14, lineHeight: 1.55, color: "text.secondary", fontWeight: 500 }}>{line}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          <Box
            sx={{
              position: "relative",
              mt: { xs: 4, md: 5 },
              mx: "auto",
              maxWidth: 960,
              minHeight: { xs: "auto", md: 500 },
            }}
          >
            <Box sx={{ width: { xs: "100%", md: "78%" } }}>
              <ProductShot
                src={labOneSrc}
                alt="MyTurn Lab strategy dashboard with completed turns and peak-hour insights"
                sx={{ boxShadow: isDark ? "0 22px 54px rgba(0,0,0,0.38)" : "0 22px 54px rgba(15,23,42,0.12)" }}
              />
            </Box>
            <Box
              sx={{
                width: { xs: "90%", md: "58%" },
                ml: { xs: "auto", md: 0 },
                mt: { xs: -4, md: 0 },
                position: { xs: "relative", md: "absolute" },
                right: { md: 0 },
                bottom: { md: 0 },
              }}
            >
              <ProductShot
                src={loyaltySrc}
                alt="MyTurn Loyalty insights showing user sources and top customers"
                sx={{ boxShadow: isDark ? "0 22px 54px rgba(0,0,0,0.42)" : "0 22px 54px rgba(15,23,42,0.14)" }}
              />
            </Box>
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" }, height: "1px", bgcolor: dividerLine, my: 4 }} />

          <Box sx={{ display: "flex", alignItems: "center", gap: 2, my: { xs: 4, md: 5 } }}>
            <Box sx={{ flex: 1, height: "1px", bgcolor: dividerLine }} />
            <Stack direction="row" spacing={1.25} sx={{ px: 1 }}>
              {[labelColor, isDark ? "#a78bfa" : "#4f46e5", isDark ? "#f472b6" : "#ec4899"].map((c, i) => (
                <Box
                  key={i}
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    bgcolor: c,
                    opacity: 0.9,
                  }}
                />
              ))}
            </Stack>
            <Box sx={{ flex: 1, height: "1px", bgcolor: dividerLine }} />
          </Box>

          <Typography
            sx={{
              textAlign: "center",
              fontWeight: 800,
              fontSize: 12,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: labelColor,
            }}
          >
            {t.problemSolution.outcomesLabel}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
              gap: { xs: 2.5, md: 3 },
              mt: 3,
            }}
          >
            {outcomes.map(({ icon: Icon, iconIndex }, idx) => {
              const ib = outcomeIconBox(isDark, iconIndex);
              const data = t.problemSolution.outcomes[idx];
              return (
                <Box
                  key={idx}
                  sx={{
                    textAlign: "center",
                    p: 2.5,
                    borderRadius: "16px",
                    border,
                    bgcolor: isDark ? "rgba(15, 23, 42, 0.35)" : "rgba(248, 250, 252, 0.9)",
                  }}
                >
                  <Box
                    sx={{
                      width: 52,
                      height: 52,
                      mx: "auto",
                      borderRadius: "16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: ib.bgcolor,
                      color: ib.color,
                    }}
                  >
                    <Icon sx={{ fontSize: 26 }} />
                  </Box>
                  <Typography sx={{ mt: 2, fontWeight: 600, fontSize: 16, color: "text.primary" }}>{data.label}</Typography>
                  <Typography sx={{ mt: 0.75, fontSize: 13, lineHeight: 1.5, color: "text.secondary", fontWeight: 500 }}>{data.sub}</Typography>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
