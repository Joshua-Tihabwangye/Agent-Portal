import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EvStationOutlinedIcon from "@mui/icons-material/EvStationOutlined";
import ElectricCarOutlinedIcon from "@mui/icons-material/ElectricCarOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// 54. Analytics micro widgets (EV fleet utilization & safety)
// Props: { utilization, lowBatteryShare, safetyIncidents }
export function EVFleetAnalyticsMicroWidgets({
  utilization = { inUsePct: 68, onlinePct: 84 },
  lowBatteryShare = 14, // % of EVs below 30%
  safetyIncidents = { last7Days: 5, batteryRelated: 1 },
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const onlinePct = utilization.onlinePct || 0;
  const inUsePct = utilization.inUsePct || 0;

  return (
    <Grid container spacing={1.5}>
      {/* Utilization widget */}
      <Grid item xs={12} sm={4}>
        <Card
          elevation={1}
          sx={{
            borderRadius: 3,
            backgroundColor: isDark ? "#020617" : "#ffffff",
            border:
              "1px solid " +
              (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <ElectricCarOutlinedIcon
                    sx={{ fontSize: 18, color: EVZONE_GREEN }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                      fontWeight: 600,
                      color: EVZONE_GREY,
                    }}
                  >
                    EV utilization
                  </Typography>
                </Stack>
                <Chip
                  size="small"
                  label={`${inUsePct}% in trips`}
                  sx={{
                    borderRadius: 999,
                    fontSize: 10,
                    textTransform: "none",
                    backgroundColor: "rgba(240,253,250,1)",
                    color: "#047857",
                    border: "1px solid rgba(34,197,94,0.5)",
                  }}
                />
              </Stack>

              <Stack spacing={0.5}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Online EVs
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    {onlinePct}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={onlinePct}
                  sx={{
                    height: 6,
                    borderRadius: 999,
                    backgroundColor: isDark
                      ? "rgba(30,64,175,0.5)"
                      : "rgba(226,232,240,0.9)",
                    "& .MuiLinearProgress-bar": {
                      backgroundImage:
                        "linear-gradient(90deg, " +
                        EVZONE_GREEN +
                        ", " +
                        EVZONE_ORANGE +
                        ")",
                    },
                  }}
                />
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Low battery widget */}
      <Grid item xs={12} sm={4}>
        <Card
          elevation={1}
          sx={{
            borderRadius: 3,
            backgroundColor: isDark ? "#020617" : "#ffffff",
            border:
              "1px solid " +
              (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <EvStationOutlinedIcon
                    sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                      fontWeight: 600,
                      color: EVZONE_GREY,
                    }}
                  >
                    Low battery EVs
                  </Typography>
                </Stack>
                <Chip
                  size="small"
                  label={`${lowBatteryShare}% &lt; 30%`}
                  sx={{
                    borderRadius: 999,
                    fontSize: 10,
                    textTransform: "none",
                    backgroundColor: "rgba(254,242,242,1)",
                    color: "#b91c1c",
                    border: "1px solid rgba(248,113,113,0.6)",
                  }}
                />
              </Stack>

              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY }}
              >
                Aim to keep this under 10% by routing EVs to chargers between
                trips.
              </Typography>
            </Stack>
          </CardContent>
        </Card>
      </Grid>

      {/* Safety widget */}
      <Grid item xs={12} sm={4}>
        <Card
          elevation={1}
          sx={{
            borderRadius: 3,
            backgroundColor: isDark ? "#020617" : "#ffffff",
            border:
              "1px solid " +
              (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={1}>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1} alignItems="center">
                  <ReportProblemOutlinedIcon
                    sx={{ fontSize: 18, color: "#f97316" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      textTransform: "uppercase",
                      letterSpacing: 0.4,
                      fontWeight: 600,
                      color: EVZONE_GREY,
                    }}
                  >
                    EV safety
                  </Typography>
                </Stack>
                <Chip
                  size="small"
                  label={`${safetyIncidents.last7Days} in 7 days`}
                  sx={{
                    borderRadius: 999,
                    fontSize: 10,
                    textTransform: "none",
                    backgroundColor: "rgba(254,243,199,1)",
                    color: "#92400e",
                    border: "1px solid rgba(250,204,21,0.6)",
                  }}
                />
              </Stack>

              <Stack spacing={0.2}>
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block" }}
                >
                  Battery-related incidents: {safetyIncidents.batteryRelated}
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block" }}
                >
                  Focus coaching on pre-trip checks, charger selection and
                  route planning for EVs.
                </Typography>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

// Preview wrapper for this canvas only
export default function EVFleetAnalyticsMicroWidgetsPreview() {
  const sampleUtilization = { inUsePct: 72, onlinePct: 86 };
  const sampleLowBatteryShare = 12;
  const sampleSafety = { last7Days: 7, batteryRelated: 2 };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4 flex items-center justify-center">
      <Box className="max-w-4xl w-full">
        <EVFleetAnalyticsMicroWidgets
          utilization={sampleUtilization}
          lowBatteryShare={sampleLowBatteryShare}
          safetyIncidents={sampleSafety}
        />
      </Box>
    </Box>
  );
}

// Suggested tests (pseudo-code):
// - Render EVFleetAnalyticsMicroWidgets with various props and verify that utilization, low battery share and safety incident numbers render correctly.
// - Ensure LinearProgress for onlinePct reflects the correct percentage.
// - Confirm that widgets remain readable in both light and dark theme modes.
