"use client";

import { Box, Container, Link, Typography, useTheme } from "@mui/material";
import type { LegalBlock } from "@/i18n/privacy/types";
import type { PrivacyPolicyDictionary } from "@/i18n/privacy/types";

const EMAIL_PATTERN = /([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g;
const IS_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function renderParagraphText(text: string) {
  const parts = text.split(EMAIL_PATTERN);
  return parts.map((part, index) =>
    IS_EMAIL.test(part) ? (
      <Link
        key={index}
        href={`mailto:${part}`}
        sx={{
          color: "primary.main",
          fontWeight: 600,
          textDecoration: "none",
          "&:hover": { textDecoration: "underline" },
        }}
      >
        {part}
      </Link>
    ) : (
      <span key={index}>{part}</span>
    ),
  );
}

function LegalBlocks({ blocks }: { blocks: LegalBlock[] }) {
  return (
    <>
      {blocks.map((block, index) => {
        if (block.type === "p") {
          return (
            <Typography
              key={index}
              sx={{
                mt: index === 0 ? 0 : 1.5,
                color: "text.secondary",
                fontSize: 15,
                lineHeight: 1.75,
                fontWeight: 500,
              }}
            >
              {renderParagraphText(block.text)}
            </Typography>
          );
        }

        if (block.type === "h3") {
          return (
            <Typography
              key={index}
              component="h3"
              sx={{
                mt: 2.5,
                mb: 0.5,
                fontSize: 16,
                fontWeight: 700,
                color: "text.primary",
              }}
            >
              {block.text}
            </Typography>
          );
        }

        return (
          <Box
            key={index}
            component="ul"
            sx={{
              mt: 1.5,
              mb: 0,
              pl: 2.5,
              color: "text.secondary",
              "& li": {
                fontSize: 15,
                lineHeight: 1.75,
                fontWeight: 500,
                mb: 0.75,
              },
            }}
          >
            {block.items.map((item) => (
              <Typography key={item} component="li">
                {item}
              </Typography>
            ))}
          </Box>
        );
      })}
    </>
  );
}

type LegalDocument = Pick<
  PrivacyPolicyDictionary,
  "title" | "subtitle" | "lastUpdated" | "intro" | "sections"
>;

export function LegalDocumentContent({ document }: { document: LegalDocument }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box component="article" sx={{ px: 2, pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="md">
        <Typography
          component="h1"
          sx={{
            fontSize: { xs: "2rem", md: "2.75rem" },
            fontWeight: 800,
            lineHeight: 1.2,
            color: "text.primary",
          }}
        >
          {document.title}
        </Typography>
        <Typography
          sx={{
            mt: 1,
            fontSize: { xs: 15, md: 17 },
            fontWeight: 600,
            color: "text.secondary",
          }}
        >
          {document.subtitle}
        </Typography>
        <Typography
          sx={{
            mt: 0.5,
            fontSize: 14,
            fontWeight: 500,
            color: isDark ? "rgba(255,255,255,0.45)" : "text.secondary",
          }}
        >
          {document.lastUpdated}
        </Typography>

        <Box
          sx={{
            mt: 4,
            p: { xs: 3, md: 4 },
            borderRadius: "16px",
            border: isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.06)",
            bgcolor: isDark ? "rgba(15, 23, 42, 0.35)" : "rgba(248, 250, 252, 0.8)",
          }}
        >
          {document.intro.map((paragraph, index) => (
            <Typography
              key={index}
              sx={{
                color: "text.secondary",
                fontSize: 15,
                lineHeight: 1.75,
                fontWeight: 500,
                "& + &": { mt: 1.5 },
              }}
            >
              {paragraph}
            </Typography>
          ))}
        </Box>

        <Box sx={{ mt: 5 }}>
          {document.sections.map((section) => (
            <Box
              key={section.number}
              component="section"
              sx={{
                mb: 5,
                pb: 5,
                borderBottom: isDark
                  ? "1px solid rgba(255, 255, 255, 0.08)"
                  : "1px solid rgba(0, 0, 0, 0.06)",
                "&:last-child": {
                  borderBottom: "none",
                  mb: 0,
                  pb: 0,
                },
              }}
            >
              <Typography
                component="h2"
                sx={{
                  fontSize: { xs: 20, md: 22 },
                  fontWeight: 700,
                  color: "text.primary",
                  lineHeight: 1.35,
                }}
              >
                {section.number}. {section.title}
              </Typography>

              {section.blocks && (
                <Box sx={{ mt: 2 }}>
                  <LegalBlocks blocks={section.blocks} />
                </Box>
              )}

              {section.subsections?.map((subsection) => (
                <Box key={subsection.title ?? subsection.blocks[0]?.type} sx={{ mt: 3 }}>
                  {subsection.title && (
                    <Typography
                      component="h3"
                      sx={{
                        fontSize: 17,
                        fontWeight: 700,
                        color: "text.primary",
                      }}
                    >
                      {subsection.title}
                    </Typography>
                  )}
                  <LegalBlocks blocks={subsection.blocks} />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}
