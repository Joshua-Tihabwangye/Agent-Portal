import React, { useState } from "react";
import {
  Box,
  Typography,
  Stack,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import WifiOffOutlinedIcon from "@mui/icons-material/WifiOffOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import Alert from "@mui/material/Alert";

const EVZONE_GREY = "#6b7280";

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
export default function AgentGlobalStatusBannerPreview() {
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

      <Box className="flex-1 flex items-center justify-center px-3 sm:px-6">
        <Alert
          severity="info"
          sx={{
            borderRadius: 2,
            backgroundColor: "rgba(248,250,252,0.95)",
            color: EVZONE_GREY,
            maxWidth: 480,
          }}
        >
          Offline retries: {offlineClicks} · Error retries: {errorClicks}
        </Alert>
      </Box>
    </Box>
  );
}

// Suggested tests (pseudo-code):
// - Render AgentGlobalStatusBanner in offline mode and assert default offline message appears.
// - Render in error mode with a custom message and ensure it overrides the default.
// - Simulate clicking Retry and verify onRetry is called.
