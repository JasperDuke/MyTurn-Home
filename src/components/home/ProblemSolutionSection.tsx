"use client";

import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EventSeatOutlinedIcon from "@mui/icons-material/EventSeatOutlined";
import ExtensionOutlinedIcon from "@mui/icons-material/ExtensionOutlined";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { ProductShot } from "@/components/home/ProductShot";
import { SectionHeading } from "@/components/home/SectionHeading";
import { SECTION_HEADER_MB, SECTION_PX, SECTION_PY, gradientHighlightSx } from "@/components/home/styles";
import { useLanguage } from "@/i18n/LanguageProvider";

const problemIcons = [AccessTimeOutlinedIcon, EventSeatOutlinedIcon, ExtensionOutlinedIcon] as const;

function iconBox(isDark: boolean, index: 0 | 1 | 2) {
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
  // const labOneSrc = isDark ? "/lab-1-light.png" : "/lab-1.png";
  // const loyaltySrc = isDark ? "/loyalty-light.png" : "/loyalty.png";

  const labOneSrc = "/assets/analytic-1.png";
  const loyaltySrc = "/assets/analytic-2.png";
  // const loyaltySrc = isDark ? "/loyalty-light.png" : "/loyalty.png";

  const labelColor = isDark ? "#F472B6" : "#E11D48";
  const cardBg = isDark ? "rgba(30, 32, 44, 0.7)" : "#ffffff";
  const border = isDark ? "1px solid rgba(255, 255, 255, 0.08)" : "1px solid rgba(0, 0, 0, 0.06)";
  const dividerLine = isDark ? "rgba(255, 255, 255, 0.1)" : "rgba(15, 23, 42, 0.1)";
  const analyticsShotSx = {
    border: "none",
    bgcolor: "transparent",
    borderRadius: { xs: "10px", md: "14px" },
  };

  const analyticsBackShadow = isDark
    ? "0 20px 50px rgba(0,0,0,0.35)"
    : "0 20px 50px rgba(15,23,42,0.10)";

  const analyticsFrontShadow = isDark
    ? "0 28px 64px rgba(0,0,0,0.42)"
    : "0 28px 64px rgba(15,23,42,0.14), 0 12px 32px rgba(236,72,153,0.08)";

  return (
    <Box
      sx={{
        py: SECTION_PY,
        px: SECTION_PX,
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
          background: "linear-gradient(270deg, rgba(251,113,133,0.04), transparent)",
          pointerEvents: "none",
        }}
      />
      <Container maxWidth="lg" sx={{ position: "relative" }}>
        <Box sx={{ mb: SECTION_HEADER_MB }}>
          <SectionHeading
            label={t.problemSolution.sectionLabel}
            title={t.problemSolution.title1}
            titleHighlight={t.problemSolution.titleHighlight}
            singleLineTitle
          />
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
              <Stack spacing={2} sx={{ mt: 3 }}>
                {t.problemSolution.problemItems.map((item, index) => {
                  const Icon = problemIcons[index];
                  const ib = iconBox(isDark, index as 0 | 1 | 2);
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        gap: 1.75,
                        alignItems: "flex-start",
                        p: 2,
                        borderRadius: "14px",
                        border,
                        bgcolor: isDark ? "rgba(15, 23, 42, 0.35)" : "rgba(248, 250, 252, 0.9)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: "12px",
                          flexShrink: 0,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: ib.bgcolor,
                          color: ib.color,
                        }}
                      >
                        <Icon sx={{ fontSize: 22 }} />
                      </Box>
                      <Box sx={{ minWidth: 0 }}>
                        <Typography sx={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", color: labelColor }}>
                          {item.tag}
                        </Typography>
                        <Typography sx={{ mt: 0.5, fontWeight: 600, fontSize: 15, color: "text.primary", lineHeight: 1.35 }}>
                          {item.title}
                        </Typography>
                        <Typography sx={{ mt: 0.75, fontSize: 13, lineHeight: 1.55, color: "text.secondary", fontWeight: 500 }}>
                          {item.text}
                        </Typography>
                      </Box>
                    </Box>
                  );
                })}
              </Stack>
            </Box>

            <Box sx={{ display: { xs: "none", md: "block" }, width: "1px", bgcolor: dividerLine, alignSelf: "stretch", minHeight: 120 }} />

            <Box>
              <Typography sx={{ fontSize: 12, fontWeight: 800, letterSpacing: "0.1em", textTransform: "uppercase", color: labelColor }}>
                {t.problemSolution.solutionLabel}
              </Typography>
              <Typography sx={{ mt: 2, fontSize: { xs: "1.25rem", md: "1.45rem" }, fontWeight: 600, lineHeight: 1.3, color: "text.primary" }}>
                {t.problemSolution.solutionTitle1}{" "}
                <Box component="span" sx={gradientHighlightSx(isDark)}>
                  {t.problemSolution.solutionHighlight}
                </Box>
              </Typography>
              <Typography sx={{ mt: 2, fontSize: 15, lineHeight: 1.65, color: "text.secondary", fontWeight: 500 }}>
                {t.problemSolution.solutionDesc}
              </Typography>
              <Stack spacing={2} sx={{ mt: 3 }}>
                {t.problemSolution.solutionFeatures.map((feature, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      alignItems: "flex-start",
                      p: 2,
                      borderRadius: "14px",
                      border,
                      bgcolor: isDark ? "rgba(15, 23, 42, 0.35)" : "rgba(248, 250, 252, 0.9)",
                    }}
                  >
                    <Box
                      sx={{
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        flexShrink: 0,
                        mt: 0.1,
                        bgcolor: isDark ? "rgba(34, 197, 94, 0.2)" : "rgba(5, 150, 105, 0.12)",
                        color: isDark ? "#4ade80" : "#059669",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <CheckRoundedIcon sx={{ fontSize: 18 }} />
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontWeight: 600, fontSize: 15, color: "text.primary", lineHeight: 1.35 }}>
                        {feature.title}
                      </Typography>
                      <Typography sx={{ mt: 0.75, fontSize: 13, lineHeight: 1.55, color: "text.secondary", fontWeight: 500 }}>
                        {feature.text}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Box>

          <Box
            sx={{
              position: "relative",
              mt: { xs: 5, md: 6 },
              mx: "auto",
              maxWidth: 960,
              minHeight: { xs: "auto", md: 500 },
            }}
          >
            <Box
              sx={{
                position: "absolute",
                inset: { xs: "8% 0 -4%", md: "-6% 8% 0 12%" },
                background: isDark
                  ? "radial-gradient(ellipse at 58% 52%, rgba(244,114,182,0.14), transparent 68%)"
                  : "radial-gradient(ellipse at 58% 52%, rgba(236,72,153,0.10), transparent 68%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
            <Box sx={{ position: "relative", zIndex: 1, width: { xs: "100%", md: "78%" } }}>
              <ProductShot
                src={labOneSrc}
                alt="MyTurn analytics dashboard with daily overview and performance metrics"
                objectFit="contain"
                sx={{
                  ...analyticsShotSx,
                  boxShadow: analyticsBackShadow,
                }}
              />
            </Box>
            <Box
              sx={{
                zIndex: 2,
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
                alt="MyTurn analytics dashboard with table performance and queue insights"
                objectFit="contain"
                sx={{
                  ...analyticsShotSx,
                  boxShadow: analyticsFrontShadow,
                }}
              />
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
