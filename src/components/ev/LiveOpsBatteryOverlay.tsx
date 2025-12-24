import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Avatar,
  Divider,
  Tooltip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import BatteryChargingFullOutlinedIcon from "@mui/icons-material/BatteryChargingFullOutlined";
import EvStationOutlinedIcon from "@mui/icons-material/EvStationOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// 52. Live ops battery overlay component (driver battery awareness in maps)
// drivers: [{ id, name, vehicle, battery, distanceKm, inTrip }]
export function LiveOpsBatteryOverlay({ drivers = [], onSelectDriver }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const sorted = [...drivers].sort((a, b) => a.battery - b.battery);

  const avgBattery = drivers.length
    ? Math.round(
        drivers.reduce((sum, d) => sum + (d.battery || 0), 0) / drivers.length
      )
    : 0;
  const lowBatteryCount = drivers.filter((d) => d.battery < 30).length;

  const getBatteryColor = (pct) => {
    if (pct >= 60) return "#16a34a";
    if (pct >= 30) return "#f97316";
    return "#b91c1c";
  };

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 3,
        backgroundColor: isDark ? "rgba(15,23,42,0.95)" : "rgba(15,23,42,0.92)",
        color: "#e5e7eb",
        border: "1px solid rgba(148,163,184,0.7)",
        maxWidth: 320,
      }}
    >
      <CardContent sx={{ p: 2 }}>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Stack direction="row" spacing={1} alignItems="center">
              <BatteryChargingFullOutlinedIcon
                sx={{ fontSize: 20, color: EVZONE_GREEN }}
              />
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 700, color: "#e5e7eb" }}
              >
                EV battery overview
              </Typography>
            </Stack>
            <Chip
              size="small"
              label={avgBattery + "% avg"}
              sx={{
                borderRadius: 999,
                fontSize: 10,
                textTransform: "none",
                backgroundColor: "rgba(15,118,110,0.25)",
                color: "#a7f3d0",
              }}
            />
          </Stack>

          <Stack spacing={0.75}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography
                variant="caption"
                sx={{ color: "#e5e7eb", opacity: 0.8 }}
              >
                Low battery EVs (&lt; 30%)
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: lowBatteryCount ? "#fecaca" : "#bbf7d0" }}
              >
                {lowBatteryCount} / {drivers.length || 0}
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={drivers.length ? (lowBatteryCount / drivers.length) * 100 : 0}
              sx={{
                height: 6,
                borderRadius: 999,
                backgroundColor: "rgba(15,23,42,0.9)",
                "& .MuiLinearProgress-bar": {
                  backgroundImage:
                    "linear-gradient(90deg, rgba(248,113,113,0.9), rgba(239,68,68,1))",
                },
              }}
            />
          </Stack>

          <Divider
            sx={{ borderColor: "rgba(148,163,184,0.4)", my: 0.5 }}
          />

          <Stack spacing={0.5}>
            {sorted.length === 0 && (
              <Typography
                variant="caption"
                sx={{ color: "#cbd5f5", opacity: 0.8 }}
              >
                No EV drivers online.
              </Typography>
            )}

            {sorted.map((driver) => {
              const color = getBatteryColor(driver.battery);
              const isLow = driver.battery < 30;
              const isMedium = driver.battery >= 30 && driver.battery < 60;
              const note = isLow
                ? "Route to charger soon"
                : isMedium
                ? "OK for short trips"
                : "Good for long trips";

              return (
                <Box
                  key={driver.id}
                  className="rounded-xl px-2.5 py-1.5 cursor-pointer"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    backgroundColor: isLow
                      ? "rgba(127,29,29,0.45)"
                      : "rgba(15,23,42,0.9)",
                    border: "1px solid rgba(148,163,184,0.6)",
                    "&:hover": {
                      borderColor: EVZONE_GREEN,
                    },
                  }}
                  onClick={() => onSelectDriver && onSelectDriver(driver)}
                >
                  <Box className="flex items-center gap-2.5">
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        fontSize: 12,
                        fontWeight: 700,
                        backgroundColor: "rgba(3,205,140,0.22)",
                        color: "#bbf7d0",
                      }}
                    >
                      {driver.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </Avatar>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "#e5e7eb", fontWeight: 500 }}
                      >
                        {driver.name}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: "#a5b4fc", display: "block" }}
                      >
                        {driver.vehicle} · {driver.distanceKm} km from pickup
                      </Typography>
                    </Box>
                  </Box>

                  <Stack spacing={0.1} alignItems="flex-end">
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography
                        variant="caption"
                        sx={{
                          color,
                          fontWeight: 700,
                        }}
                      >
                        {driver.battery}%
                      </Typography>
                    </Stack>
                    <Typography
                      variant="caption"
                      sx={{ color: "#e5e7eb", opacity: 0.8 }}
                    >
                      {note}
                    </Typography>
                  </Stack>
                </Box>
              );
            })}
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            sx={{ mt: 1 }}
          >
            <EvStationOutlinedIcon sx={{ fontSize: 16, color: "#a5b4fc" }} />
            <Typography
              variant="caption"
              sx={{ color: "#a5b4fc" }}
            >
              Avoid assigning long trips to EVs below 30% unless a charger is
              on route.
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Preview wrapper for this canvas only
export default function LiveOpsBatteryOverlayPreview() {
  const sampleDrivers = [
    {
      id: "drv-1",
      name: "Kato Robert",
      vehicle: "Nissan Leaf",
      battery: 22,
      distanceKm: 1.3,
      inTrip: false,
    },
    {
      id: "drv-2",
      name: "Linda Nanyonga",
      vehicle: "Hyundai Kona",
      battery: 54,
      distanceKm: 0.8,
      inTrip: true,
    },
    {
      id: "drv-3",
      name: "Omar Ssemanda",
      vehicle: "e-Bike Fleet",
      battery: 78,
      distanceKm: 2.1,
      inTrip: false,
    },
  ];

  const handleSelect = (driver) => {
    console.log("Preview: selected driver", driver.id);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-3 sm:px-6 py-4">
      <LiveOpsBatteryOverlay drivers={sampleDrivers} onSelectDriver={handleSelect} />
    </Box>
  );
}

// Suggested tests (pseudo-code):
// - Render LiveOpsBatteryOverlay with a set of drivers and verify they are sorted by battery ascending.
// - Verify lowBatteryCount and avgBattery are computed correctly for various inputs.
// - Simulate clicking a driver row and assert onSelectDriver is called with that driver object.
