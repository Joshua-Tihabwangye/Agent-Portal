import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";

// 49. /agent/404 – Not Found
export function AgentNotFoundPage({ onGoHome, onGoBack }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleHome = () => {
    if (onGoHome) onGoHome();
    else console.log("AgentNotFoundPage: go home");
  };

  const handleBack = () => {
    if (onGoBack) onGoBack();
    else console.log("AgentNotFoundPage: go back");
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-8 flex items-center justify-center">
      <Card
        elevation={1}
        sx={{
          maxWidth: 560,
          borderRadius: 3,
          backgroundColor: isDark ? "#020617" : "#ffffff",
          border:
            "1px solid " +
            (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
        }}
      >
        <CardContent sx={{ p: 3.2 }}>
          <Stack spacing={2.4} alignItems="center" textAlign="center">
            <Box
              className="w-16 h-16 rounded-3xl flex items-center justify-center"
              sx={{
                backgroundColor: isDark
                  ? "rgba(15,23,42,0.9)"
                  : "rgba(248,250,252,1)",
                border: "1px solid rgba(203,213,225,0.9)",
              }}
            >
              <ErrorOutlineOutlinedIcon
                sx={{ fontSize: 30, color: "#f97316" }}
              />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: isDark ? "#e5e7eb" : "#111827",
                }}
              >
                Page not found
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: EVZONE_GREY, mt: 0.5 }}
              >
                The link you followed does not exist or may have been moved.
                Check the URL or return to your Agent workspace.
              </Typography>
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                size="small"
                variant="contained"
                startIcon={<ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />}
                onClick={handleBack}
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  backgroundColor: EVZONE_GREEN,
                  "&:hover": { backgroundColor: "#059669" },
                }}
              >
                Go back
              </Button>
              <Button
                size="small"
                variant="outlined"
                onClick={handleHome}
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontSize: 13,
                }}
              >
                Go to dashboard
              </Button>
            </Stack>

            <Chip
              label="404"
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor: isDark
                  ? "rgba(15,23,42,0.8)"
                  : "rgba(248,250,252,1)",
                border: "1px solid rgba(203,213,225,0.9)",
                color: EVZONE_GREY,
              }}
            />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default AgentNotFoundPage;

// Preview wrapper (kept for reference)
export function AgentNotFoundPreview() {
  const handleHome = () => {
    console.log("Preview: Go to dashboard clicked");
  };

  const handleBack = () => {
    console.log("Preview: Go back clicked");
  };

  return (
    <AgentNotFoundPage onGoHome={handleHome} onGoBack={handleBack} />
  );
}

// Suggested tests (pseudo-code):
// - Render AgentNotFoundPage with custom onGoHome/onGoBack and assert they are called when buttons are clicked.
// - Verify that the 404 chip and main message text render correctly.
