"use client";

import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  IconButton,
  TextField,
  Typography,
  useTheme,
  CircularProgress,
  Snackbar,
  Alert
} from "@mui/material";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";
import { sendDemoEmail } from "@/app/actions/sendEmail";
import { useLanguage } from "@/i18n/LanguageProvider";

interface BookDemoModalProps {
  open: boolean;
  onClose: () => void;
}

export function BookDemoModal({ open, onClose }: BookDemoModalProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await sendDemoEmail(formData);

    setLoading(false);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 3000); // Close gently after success
    } else {
      setError(result.error || t.modal.error);
    }
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: "24px",
            bgcolor: isDark ? "rgba(15, 23, 42, 0.95)" : "#ffffff",
            backgroundImage: "none",
            backdropFilter: "blur(20px)",
            boxShadow: isDark
              ? "0 24px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
              : "0 24px 60px rgba(37, 99, 235, 0.1)",
            border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.05)",
            overflow: "hidden",
          },
        }}
      >
        <Box sx={{ p: { xs: 3, md: 5 }, position: "relative" }}>
          {/* Header */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 4 }}>
            <Box>
              <Typography sx={{ color: isDark ? "#F472B6" : "#E11D48", textTransform: "uppercase", letterSpacing: "0.08em", fontSize: 12, fontWeight: 800 }}>
                {t.modal.tagline}
              </Typography>
              <Typography sx={{ mt: 1, fontSize: "1.75rem", fontWeight: 400, lineHeight: 1.15, color: "text.primary" }}>
                {t.modal.title1}{" "}
                <Box component="span" sx={{ color: isDark ? "#a78bfa" : "#4f46e5" }}>
                  {t.modal.titleHighlight}
                </Box>
              </Typography>
              <Typography sx={{ mt: 1, color: "text.secondary", fontSize: 14, fontWeight: 500, maxWidth: 350 }}>
                {t.modal.subtitle}
              </Typography>
            </Box>
            <IconButton onClick={onClose} sx={{ color: "text.secondary", bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)", transition: "all 0.2s", "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.06)", transform: "rotate(90deg)" } }}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>

          <DialogContent sx={{ p: 0, overflow: "visible" }}>
            {success ? (
              <Box sx={{ textAlign: "center", py: 4, animation: "float 1s ease-in-out" }}>
                <CheckCircleOutlineRoundedIcon sx={{ fontSize: 64, color: isDark ? "#4ade80" : "#16a34a", mb: 2 }} />
                <Typography sx={{ fontSize: "1.5rem", fontWeight: 600, color: "text.primary" }}>{t.modal.successTitle}</Typography>
                <Typography sx={{ mt: 1, color: "text.secondary", fontSize: 15 }}>
                  {t.modal.successDesc}
                </Typography>
              </Box>
            ) : (
              <form onSubmit={handleSubmit}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <TextField
                    required
                    name="name"
                    label={t.modal.fullName}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ sx: { fontWeight: 500, color: "text.secondary" } }}
                    InputProps={{
                      sx: {
                        borderRadius: "12px",
                        bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                        "& fieldset": { borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" },
                        "&:hover fieldset": { borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" },
                        "&.Mui-focused fieldset": { borderColor: isDark ? "#F472B6" : "#E11D48" },
                      },
                    }}
                  />
                  <TextField
                    required
                    name="email"
                    type="email"
                    label={t.modal.email}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ sx: { fontWeight: 500, color: "text.secondary" } }}
                    InputProps={{
                      sx: {
                        borderRadius: "12px",
                        bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                        "& fieldset": { borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" },
                        "&:hover fieldset": { borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" },
                        "&.Mui-focused fieldset": { borderColor: isDark ? "#F472B6" : "#E11D48" },
                      },
                    }}
                  />
                  <TextField
                    required
                    name="restaurantName"
                    label={t.modal.restaurant}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ sx: { fontWeight: 500, color: "text.secondary" } }}
                    InputProps={{
                      sx: {
                        borderRadius: "12px",
                        bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                        "& fieldset": { borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" },
                        "&:hover fieldset": { borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" },
                        "&.Mui-focused fieldset": { borderColor: isDark ? "#F472B6" : "#E11D48" },
                      },
                    }}
                  />
                  <TextField
                    name="message"
                    label={t.modal.message}
                    multiline
                    rows={3}
                    variant="outlined"
                    fullWidth
                    InputLabelProps={{ sx: { fontWeight: 500, color: "text.secondary" } }}
                    InputProps={{
                      sx: {
                        borderRadius: "12px",
                        bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.02)",
                        "& fieldset": { borderColor: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.08)" },
                        "&:hover fieldset": { borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.15)" },
                        "&.Mui-focused fieldset": { borderColor: isDark ? "#F472B6" : "#E11D48" },
                      },
                    }}
                  />

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      mt: 1,
                      py: 1.8,
                      borderRadius: "12px",
                      textTransform: "none",
                      fontSize: 16,
                      fontWeight: 600,
                      background: isDark ? "linear-gradient(90deg, #F472B6 0%, #FB923C 100%)" : "linear-gradient(90deg, #EC4899 0%, #F97316 100%)",
                      boxShadow: isDark ? "0 8px 24px rgba(59,130,246,0.3)" : "0 8px 24px rgba(37,99,235,0.25)",
                      "&:hover": {
                        background: isDark ? "linear-gradient(90deg, #E11D48 0%, #9F1239 100%)" : "linear-gradient(90deg, #BE123C 0%, #881337 100%)",
                        boxShadow: isDark ? "0 12px 32px rgba(59,130,246,0.4)" : "0 12px 32px rgba(37,99,235,0.35)",
                      },
                      "&:disabled": {
                        background: isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)",
                        color: "text.secondary"
                      }
                    }}
                  >
                    {loading ? <CircularProgress size={24} color="inherit" /> : t.modal.submit}
                  </Button>
                </Box>
              </form>
            )}
          </DialogContent>
        </Box>
      </Dialog>
      <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError(null)} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
        <Alert onClose={() => setError(null)} severity="error" sx={{ width: '100%', borderRadius: "12px", fontWeight: 600 }}>
          {error}
        </Alert>
      </Snackbar>
    </>
  );
}
