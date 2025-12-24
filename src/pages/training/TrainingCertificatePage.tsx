import React from "react";
import { Box, Card, CardContent, Typography, Stack, Chip, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

export default function TrainingCertificatePage() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const title = moduleId ? `Certificate for ${moduleId}` : "Training certificate";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-3xl mx-auto">
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? "#e5e7eb" : "#0f172a" }}>
              {title}
            </Typography>
            <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
              Download or share your completion record with your supervisor.
            </Typography>
          </Box>
          <Chip
            label="Completed"
            sx={{
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              backgroundColor: "rgba(255,255,255,0.2)",
              color: "#166534",
              border: "1px solid rgba(34,197,94,0.5)",
            }}
          />
        </Box>

        <Card
          elevation={1}
          className="ev-gradient-soft"
          sx={{
            borderRadius: 3,
            border: "1px solid " + (isDark ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.65)"),
            boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.8 } }}>
            <Stack spacing={2.5}>
              <Stack direction="row" spacing={1} alignItems="center">
                <EmojiEventsOutlinedIcon sx={{ color: EVZONE_ORANGE }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#e2e8f0" : "#0f172a" }}>
                  EVzone Academy
                </Typography>
              </Stack>

              <Box
                className="rounded-2xl px-4 py-6 bg-white/60 dark:bg-slate-900/60"
                sx={{ border: "1px dashed rgba(148,163,184,0.5)" }}
              >
                <Typography variant="body2" sx={{ color: EVZONE_GREY, textAlign: "center", mb: 1 }}>
                  This certifies that
                </Typography>
                <Typography variant="h5" sx={{ textAlign: "center", fontWeight: 800, color: isDark ? "#e2e8f0" : "#0f172a" }}>
                  Alex Agent
                </Typography>
                <Typography variant="body2" sx={{ color: EVZONE_GREY, textAlign: "center", mt: 1 }}>
                  successfully completed the module
                </Typography>
                <Typography variant="subtitle1" sx={{ textAlign: "center", fontWeight: 700, color: isDark ? "#e2e8f0" : "#0f172a", mt: 0.5 }}>
                  EV basics & battery safety
                </Typography>
                <Typography variant="caption" sx={{ color: EVZONE_GREY, textAlign: "center", display: "block", mt: 1 }}>
                  Issued on 21 Dec 2025 · EVzone Agent Training
                </Typography>
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }}>
                <Button startIcon={<ArrowBackOutlinedIcon />} variant="text" onClick={() => navigate(-1)} sx={{ color: isDark ? "#e2e8f0" : "#0f172a" }}>
                  Back to modules
                </Button>
                <Stack direction="row" spacing={1}>
                  <Button
                    startIcon={<FileDownloadOutlinedIcon />}
                    variant="outlined"
                    sx={{
                      borderRadius: 999,
                      color: isDark ? "#e2e8f0" : "#0f172a",
                      borderColor: "rgba(148,163,184,0.5)",
                    }}
                  >
                    Download PDF
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      borderRadius: 999,
                      fontWeight: 700,
                      backgroundImage: "linear-gradient(120deg, " + EVZONE_GREEN + ", " + EVZONE_ORANGE + ")",
                      color: "#0f172a",
                    }}
                  >
                    Share to Slack
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

