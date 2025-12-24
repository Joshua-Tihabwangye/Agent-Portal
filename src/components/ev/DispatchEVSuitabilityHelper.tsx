import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import BatteryChargingFullOutlinedIcon from "@mui/icons-material/BatteryChargingFullOutlined";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// 53. Dispatch “EV suitability” helper
// request: { distanceKm, estDurationMin, pickupArea, dropoffArea }
// excludedDrivers: [{ id, name, vehicle, battery, reason, distanceKm }]
export function DispatchEVSuitabilityHelper({
  request,
  excludedDrivers = [],
  onOverride,
  onViewGuidelines,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleOverride = () => {
    if (onOverride) onOverride();
    else console.log("DispatchEVSuitabilityHelper: override EV filter");
  };

  const handleGuidelines = () => {
    if (onViewGuidelines) onViewGuidelines();
    else console.log("DispatchEVSuitabilityHelper: view EV guidelines");
  };

  const totalExcluded = excludedDrivers.length;

  return (
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
      <CardContent sx={{ p: 2.4 }}>
        <Stack spacing={2}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <BatteryChargingFullOutlinedIcon
                sx={{ fontSize: 20, color: EVZONE_GREEN }}
              />
              <Typography
                variant="subtitle2"
                sx={{
                  fontWeight: 700,
                  color: isDark ? "#e5e7eb" : "#111827",
                }}
              >
                EV suitability explanation
              </Typography>
            </Stack>
            <Chip
              size="small"
              label={
                request
                  ? `${request.distanceKm} km · ${request.estDurationMin} min`
                  : "EV trip check"
              }
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor: "rgba(248,250,252,0.95)",
                color: EVZONE_GREY,
              }}
            />
          </Stack>

          {request && (
            <Box>
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY, display: "block" }}
              >
                Pickup: <strong>{request.pickupArea}</strong> · Drop-off:
                <strong> {request.dropoffArea}</strong>
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY, display: "block", mt: 0.25 }}
              >
                We estimate this trip is around {request.distanceKm} km and
                {request.estDurationMin} minutes.
              </Typography>
            </Box>
          )}

          <Divider sx={{ my: 0.5 }} />

          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <InfoOutlinedIcon sx={{ fontSize: 18, color: EVZONE_ORANGE }} />
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY }}
              >
                Some EV drivers were excluded automatically to ensure they
                have enough range and time to complete the trip safely.
              </Typography>
            </Stack>

            {totalExcluded === 0 && (
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY, fontStyle: "italic" }}
              >
                No drivers were excluded for EV reasons on this request.
              </Typography>
            )}

            {totalExcluded > 0 && (
              <Stack spacing={0.75}>
                {excludedDrivers.map((drv) => (
                  <Box
                    key={drv.id}
                    className="rounded-2xl px-3 py-1.5"
                    sx={{
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(248,250,252,0.95)",
                      border: "1px solid rgba(203,213,225,0.9)",
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{
                            color: isDark ? "#e5e7eb" : "#111827",
                            fontWeight: 500,
                          }}
                        >
                          {drv.name}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY, display: "block" }}
                        >
                          {drv.vehicle} · {drv.battery}% · {drv.distanceKm} km
                          from pickup
                        </Typography>
                      </Box>
                      <Chip
                        size="small"
                        label={drv.reason}
                        sx={{
                          borderRadius: 999,
                          fontSize: 10,
                          textTransform: "none",
                          backgroundColor:
                            drv.battery < 30
                              ? "rgba(248,113,113,0.18)"
                              : "rgba(254,243,199,0.7)",
                          color:
                            drv.battery < 30
                              ? "#b91c1c"
                              : "#92400e",
                        }}
                      />
                    </Stack>
                  </Box>
                ))}
              </Stack>
            )}
          </Stack>

          <Divider sx={{ my: 0.5 }} />

          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1.5}
            justifyContent="space-between"
            alignItems={{ xs: "flex-start", sm: "center" }}
          >
            <Stack direction="row" spacing={1} alignItems="flex-start">
              <WarningAmberOutlinedIcon
                sx={{ fontSize: 18, color: "#f97316", mt: 0.1 }}
              />
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY, maxWidth: 320 }}
              >
                You can override this filter in exceptional cases, but frequent
                overrides may increase the risk of mid-trip charging issues.
              </Typography>
            </Stack>

            <Stack direction="row" spacing={1}>
              <Button
                size="small"
                variant="outlined"
                onClick={handleGuidelines}
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontSize: 12,
                }}
              >
                View EV guidelines
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleOverride}
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontSize: 12,
                  fontWeight: 600,
                  backgroundColor: EVZONE_GREEN,
                  "&:hover": { backgroundColor: "#059669" },
                }}
              >
                Override for this trip
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Preview wrapper for this canvas only
export default function DispatchEVSuitabilityHelperPreview() {
  const sampleRequest = {
    distanceKm: 18,
    estDurationMin: 35,
    pickupArea: "Ntinda, Kampala",
    dropoffArea: "Entebbe Road",
  };

  const sampleExcluded = [
    {
      id: "drv-1",
      name: "Kato Robert",
      vehicle: "Nissan Leaf",
      battery: 24,
      distanceKm: 1.3,
      reason: "Battery too low for requested distance",
    },
    {
      id: "drv-2",
      name: "Linda Nanyonga",
      vehicle: "Hyundai Kona",
      battery: 42,
      distanceKm: 3.1,
      reason: "Limited buffer for return trip",
    },
  ];

  const handleOverride = () => {
    console.log("Preview: override EV suitability for this trip");
  };

  const handleGuidelines = () => {
    console.log("Preview: open EV guidelines");
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-3 sm:px-6 py-4">
      <DispatchEVSuitabilityHelper
        request={sampleRequest}
        excludedDrivers={sampleExcluded}
        onOverride={handleOverride}
        onViewGuidelines={handleGuidelines}
      />
    </Box>
  );
}

// Suggested tests (pseudo-code):
// - Render DispatchEVSuitabilityHelper with a request and excludedDrivers and verify reasons and data render correctly.
// - Click "View EV guidelines" and "Override for this trip" and assert their handlers are called.
// - Render with no excludedDrivers and confirm the "No drivers were excluded" message appears.
