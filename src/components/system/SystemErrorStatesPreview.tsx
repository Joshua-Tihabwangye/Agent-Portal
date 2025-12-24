import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Button,
  Chip,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WifiOffOutlinedIcon from "@mui/icons-material/WifiOffOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
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
                sx={{ fontSize: 30, color: EVZONE_ORANGE }}
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
                The link you followed does not exist or may have been
                moved. Check the URL or return to your Agent workspace.
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
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

// 50. /agent/access-denied – No Permission / Role mismatch
export function AgentAccessDeniedPage({ requiredRole, onGoHome, onRequestAccess }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleHome = () => {
    if (onGoHome) onGoHome();
    else console.log("AgentAccessDeniedPage: go home");
  };

  const handleRequest = () => {
    if (onRequestAccess) onRequestAccess();
    else console.log("AgentAccessDeniedPage: request access");
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
              <LockOutlinedIcon sx={{ fontSize: 30, color: "#b91c1c" }} />
            </Box>

            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: isDark ? "#e5e7eb" : "#111827",
                }}
              >
                Access denied
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: EVZONE_GREY, mt: 0.5 }}
              >
                You don&apos;t have permission to view this part of the Agent
                Portal. Contact your supervisor if you think this is a
                mistake.
              </Typography>
              {requiredRole && (
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block", mt: 0.75 }}
                >
                  Required role: <strong>{requiredRole}</strong>
                </Typography>
              )}
            </Box>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
              <Button
                size="small"
                variant="contained"
                onClick={handleRequest}
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontSize: 13,
                  fontWeight: 600,
                  backgroundColor: EVZONE_ORANGE,
                  "&:hover": { backgroundColor: "#ea580c" },
                }}
              >
                Request access
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
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

// 51. Global error / offline banner & retry states
export function AgentGlobalStatusBanner({ mode, message, onRetry }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const finalMode = mode || "offline"; // offline | error

  const handleRetry = () => {
    if (onRetry) onRetry();
    else console.log("AgentGlobalStatusBanner: retry");
  };

  const isOffline = finalMode === "offline";

  return (
    <Box
      className="w-full"
      sx={{
        borderBottom: "1px solid rgba(148,163,184,0.5)",
        backgroundColor: isOffline
          ? isDark
            ? "rgba(15,23,42,0.95)"
            : "#fefce8"
          : isDark
          ? "rgba(127,29,29,0.9)"
          : "#fef2f2",
      }}
    >
      <Box className="max-w-6xl mx-auto px-3 sm:px-6 py-2">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1.5}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", sm: "center" }}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            {isOffline ? (
              <WifiOffOutlinedIcon
                sx={{
                  fontSize: 18,
                  color: isDark ? "#fef9c3" : "#92400e",
                }}
              />
            ) : (
              <ErrorOutlineOutlinedIcon
                sx={{
                  fontSize: 18,
                  color: isDark ? "#fee2e2" : "#b91c1c",
                }}
              />
            )}
            <Typography
              variant="caption"
              sx={{
                color: isOffline
                  ? isDark
                    ? "#fef9c3"
                    : "#92400e"
                  : isDark
                  ? "#fee2e2"
                  : "#b91c1c",
              }}
            >
              {message ||
                (isOffline
                  ? "You appear to be offline. Some actions are paused until the connection is restored."
                  : "We couldn&apos;t load some data. Try again or contact support if this continues.")}
            </Typography>
          </Stack>

          <Button
            size="small"
            variant="outlined"
            startIcon={<RefreshOutlinedIcon sx={{ fontSize: 16 }} />}
            onClick={handleRetry}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              fontSize: 11,
              borderColor: isOffline ? "rgba(234,179,8,0.9)" : "#fee2e2",
              color: isOffline ? "#92400e" : "#b91c1c",
              backgroundColor: isDark ? "rgba(15,23,42,0.4)" : "transparent",
              "&:hover": {
                backgroundColor: isDark
                  ? "rgba(15,23,42,0.6)"
                  : "rgba(254,249,195,0.6)",
              },
            }}
          >
            Retry
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

// Preview wrapper for this canvas only
export default function AgentSystemErrorStatesPreview() {
  const [offlineClicks, setOfflineClicks] = useState(0);
  const [errorClicks, setErrorClicks] = useState(0);

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Global banner examples */}
      <AgentGlobalStatusBanner
        mode="offline"
        onRetry={() => setOfflineClicks((c) => c + 1)}
      />
      <AgentGlobalStatusBanner
        mode="error"
        message="Some Agent data failed to load. Please retry."
        onRetry={() => setErrorClicks((c) => c + 1)}
      />

      <Box className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 px-3 sm:px-6 py-4 max-w-6xl mx-auto w-full">
        <Box>
          <AgentNotFoundPage />
        </Box>
        <Box>
          <AgentAccessDeniedPage requiredRole="Supervisor" />
        </Box>
      </Box>

      <Box className="px-3 sm:px-6 pb-4 max-w-6xl mx-auto w-full">
        <Alert
          severity="info"
          sx={{
            borderRadius: 2,
            backgroundColor: "rgba(248,250,252,0.95)",
            color: EVZONE_GREY,
          }}
        >
          Offline retries: {offlineClicks} · Error retries: {errorClicks}
        </Alert>
      </Box>
    </Box>
  );
}

// Suggested tests (pseudo-code for a separate test file):
// - Render AgentNotFoundPage and verify that the Go back and Go to dashboard buttons call their handlers.
// - Render AgentAccessDeniedPage with a requiredRole and assert it displays the role text and triggers onRequestAccess/onGoHome when clicked.
// - Render AgentGlobalStatusBanner in offline and error modes and ensure Retry calls onRetry.
// - In AgentSystemErrorStatesPreview, simulate clicking Retry and verify offlineClicks/errorClicks increment.
