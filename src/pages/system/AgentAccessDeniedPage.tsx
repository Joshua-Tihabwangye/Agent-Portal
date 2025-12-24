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
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

interface AgentAccessDeniedPageProps {
  requiredRole?: string;
  onGoHome?: () => void;
  onRequestAccess?: () => void;
}

// 50. /agent/access-denied – No Permission / Role mismatch
export function AgentAccessDeniedPage({ requiredRole, onGoHome, onRequestAccess }: AgentAccessDeniedPageProps) {
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

            <Chip
              label="Access control"
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

export default AgentAccessDeniedPage;

// Preview wrapper (kept for reference)
export function AgentAccessDeniedPreview() {
  const handleHome = () => {
    console.log("Preview: navigate to dashboard");
  };

  const handleRequest = () => {
    console.log("Preview: open request access flow");
  };

  return (
    <AgentAccessDeniedPage
      requiredRole="Supervisor"
      onGoHome={handleHome}
      onRequestAccess={handleRequest}
    />
  );
}

// Suggested tests (pseudo-code):
// - Render AgentAccessDeniedPage with requiredRole and verify that text renders.
// - Click Request access and Go to dashboard buttons and assert the correct handlers are called.
