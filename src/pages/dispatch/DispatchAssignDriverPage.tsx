import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Grid,
  Avatar,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import ElectricBoltOutlinedIcon from "@mui/icons-material/ElectricBoltOutlined";
import { useNavigate } from "react-router-dom";
import { DispatchEVSuitabilityHelper } from "../../components/ev/DispatchEVSuitabilityHelper";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const candidateDrivers = [
  {
    id: "DRV-102",
    name: "Kato Robert",
    vehicle: "Nissan Leaf · UBF 341X",
    distanceKm: 1.2,
    battery: 78,
    activeTrips: 0,
    score: 95,
  },
  {
    id: "DRV-287",
    name: "Linda Nanyonga",
    vehicle: "Hyundai Kona · UBJ 542C",
    distanceKm: 2.4,
    battery: 54,
    activeTrips: 1,
    score: 88,
  },
  {
    id: "DRV-364",
    name: "Omar Ssemanda",
    vehicle: "e-Bike Fleet",
    distanceKm: 0.9,
    battery: 32,
    activeTrips: 2,
    score: 80,
  },
];

// Route target: /agent/dispatch/new/assign
export default function AgentDispatchAssignDriverPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [selectedDriverId, setSelectedDriverId] = useState("DRV-102");

  const draftRaw = window.sessionStorage.getItem("evzone_dispatch_draft");
  const draft = draftRaw ? JSON.parse(draftRaw) : {};
  const request = {
    distanceKm: draft?.estimatedDistanceKm ?? 18,
    estDurationMin: draft?.estimatedDurationMin ?? 35,
    pickupArea: draft?.pickupArea ?? "Pickup",
    dropoffArea: draft?.dropoffArea ?? "Drop-off",
  };
  const excludedDrivers = candidateDrivers
    .filter((d) => d.battery < 40)
    .map((d) => ({
      id: d.id,
      name: d.name,
      vehicle: d.vehicle,
      battery: d.battery,
      distanceKm: d.distanceKm,
      reason: d.battery < 30 ? "Battery too low for requested distance" : "Limited buffer for return trip",
    }));

  const handleAssign = () => {
    if (!selectedDriverId) return;
    const raw = window.sessionStorage.getItem("evzone_dispatch_draft");
    const base = raw ? JSON.parse(raw) : {};
    const selected = candidateDrivers.find((d) => d.id === selectedDriverId);
    window.sessionStorage.setItem(
      "evzone_dispatch_draft",
      JSON.stringify({
        ...base,
        assignedDriverId: selectedDriverId,
        assignedDriver: selected,
      })
    );
    navigate("/agent/dispatch/new/confirm");
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-5xl mx-auto">
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Assign driver
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Review suggested EV drivers for this booking and choose the most
              suitable one based on distance, battery and workload.
            </Typography>
          </Box>

          <Chip
            label="Step 3 of 3 · Assign driver"
            size="small"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: isDark
                ? "rgba(15,23,42,0.9)"
                : "rgba(219,234,254,0.9)",
              border: "1px solid rgba(148,163,184,0.4)",
              color: isDark ? "#e5e7eb" : "#1e3a8a",
              fontWeight: 600,
            }}
          />
        </Box>

        <Grid container spacing={2}>
          {/* Map snippet */}
          <Grid item xs={12} lg={6}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark
                    ? "rgba(30,64,175,0.7)"
                    : "rgba(226,232,240,1)"),
                height: { xs: 260, md: 320 },
              }}
            >
              <CardContent sx={{ p: 2.2, height: "100%" }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <MapOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Pickup & nearby drivers
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <IconButton size="small">
                      <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                    <IconButton size="small">
                      <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
                    </IconButton>
                  </Stack>
                </Stack>

                <Box
                  sx={{
                    mt: 0.5,
                    borderRadius: 18,
                    overflow: "hidden",
                    position: "relative",
                    height: { xs: 180, md: 220 },
                    background:
                      "radial-gradient(circle at 0 0, rgba(59,130,246,0.18), transparent 55%)," +
                      "radial-gradient(circle at 100% 100%, rgba(16,185,129,0.18), transparent 55%)," +
                      (isDark
                        ? "#020617"
                        : "linear-gradient(145deg, #e0f2fe, #f9fafb)"),
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage:
                        "linear-gradient(to right, rgba(148,163,184,0.25) 1px, transparent 1px)," +
                        "linear-gradient(to bottom, rgba(148,163,184,0.25) 1px, transparent 1px)",
                      backgroundSize: "40px 40px",
                      opacity: isDark ? 0.4 : 0.6,
                    }}
                  />

                  {/* Pickup marker */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Box className="flex flex-col items-center">
                      <Box className="w-3 h-3 rounded-full bg-emerald-500" />
                      <Typography
                        variant="caption"
                        sx={{ color: "#ecfdf5", fontSize: 10 }}
                      >
                        Pickup
                      </Typography>
                    </Box>
                  </Box>

                  {/* Driver markers (example) */}
                  <Box sx={{ position: "absolute", top: "25%", left: "35%" }}>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: "rgba(34,197,94,0.9)",
                        color: "#022c22",
                        fontSize: 12,
                      }}
                    >
                      D1
                    </Avatar>
                  </Box>
                  <Box sx={{ position: "absolute", top: "30%", right: "18%" }}>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: "rgba(56,189,248,0.9)",
                        color: "#0b1120",
                        fontSize: 12,
                      }}
                    >
                      D2
                    </Avatar>
                  </Box>
                  <Box sx={{ position: "absolute", bottom: "18%", left: "22%" }}>
                    <Avatar
                      sx={{
                        width: 24,
                        height: 24,
                        backgroundColor: "rgba(248,250,252,0.95)",
                        color: "#0f172a",
                        fontSize: 12,
                      }}
                    >
                      D3
                    </Avatar>
                  </Box>

                  {/* Legend */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: 12,
                      bottom: 12,
                      borderRadius: 999,
                      px: 1.5,
                      py: 0.6,
                      backgroundColor: "rgba(15,23,42,0.85)",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    <Box className="flex items-center gap-1">
                      <Box className="w-2 h-2 rounded-full bg-emerald-400" />
                      <Typography
                        variant="caption"
                        sx={{ color: "#d1fae5", fontSize: 10 }}
                      >
                        Pickup
                      </Typography>
                    </Box>
                    <Box className="flex items-center gap-1 ml-2">
                      <Box className="w-2 h-2 rounded-full bg-sky-400" />
                      <Typography
                        variant="caption"
                        sx={{ color: "#e0f2fe", fontSize: 10 }}
                      >
                        Drivers
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block", mt: 1.5 }}
                >
                  You can still override the recommendation if needed, but
                  avoid overloading drivers with many active trips.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Driver list + EV suitability helper */}
          <Grid item xs={12} lg={6}>
            <Stack spacing={2}>
              <DispatchEVSuitabilityHelper
                request={request}
                excludedDrivers={excludedDrivers}
                onViewGuidelines={() => navigate("/agent/training")}
                onOverride={() => console.log("Override EV filter for this trip")}
              />
              <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark
                    ? "rgba(30,64,175,0.7)"
                    : "rgba(226,232,240,1)"),
                height: "100%",
              }}
              >
                <CardContent sx={{ p: 2.2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DirectionsCarOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Suggested drivers
                    </Typography>
                  </Stack>

                  <Chip
                    size="small"
                    label="Auto-sorted by score"
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(248,250,252,0.95)",
                      color: EVZONE_GREY,
                      border: "1px solid rgba(203,213,225,0.9)",
                    }}
                  />
                </Stack>

                <Stack spacing={1.2}>
                  {candidateDrivers.map((driver) => {
                    const isSelected = driver.id === selectedDriverId;
                    const batteryColor =
                      driver.battery >= 60
                        ? "#16a34a"
                        : driver.battery >= 30
                        ? "#f97316"
                        : "#b91c1c";
                    return (
                      <Box
                        key={driver.id}
                        onClick={() => setSelectedDriverId(driver.id)}
                        className="flex items-center justify-between rounded-2xl px-3 py-2.5 cursor-pointer"
                        sx={{
                          backgroundColor: isSelected
                            ? isDark
                              ? "rgba(3,205,140,0.16)"
                              : "rgba(240,253,250,1)"
                            : isDark
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(248,250,252,0.95)",
                          border:
                            "1px solid " +
                            (isSelected
                              ? "rgba(34,197,94,0.8)"
                              : "rgba(203,213,225,0.9)"),
                        }}
                      >
                        <Box className="flex items-center gap-2.5">
                          <Avatar
                            sx={{
                              width: 28,
                              height: 28,
                              backgroundColor: "rgba(3,205,140,0.18)",
                              color: "#047857",
                              fontSize: 13,
                              fontWeight: 700,
                            }}
                          >
                            {driver.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: isDark ? "#e5e7eb" : "#111827",
                              }}
                            >
                              {driver.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY, display: "block" }}
                            >
                              {driver.vehicle}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY }}
                            >
                              ~{driver.distanceKm} km from pickup · {" "}
                              {driver.activeTrips} active trips
                            </Typography>
                          </Box>
                        </Box>

                        <Box className="text-right">
                          <Stack
                            direction="row"
                            spacing={0.5}
                            justifyContent="flex-end"
                            alignItems="center"
                          >
                            <ElectricBoltOutlinedIcon
                              sx={{ fontSize: 15, color: batteryColor }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: batteryColor, fontWeight: 600 }}
                            >
                              {driver.battery}%
                            </Typography>
                          </Stack>
                          <Typography
                            variant="caption"
                            sx={{
                              color: isSelected ? EVZONE_GREEN : EVZONE_GREY,
                              fontWeight: isSelected ? 600 : 500,
                              mt: 0.3,
                            }}
                          >
                            Score {driver.score}
                            {isSelected ? " · Selected" : ""}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>

                <Stack
                  direction="row"
                  justifyContent="space-between"
                  sx={{ mt: 3 }}
                >
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => navigate(-1)}
                    sx={{
                      textTransform: "none",
                      fontSize: 13,
                      color: EVZONE_GREY,
                    }}
                  >
                    Back to details
                  </Button>

                  <Stack direction="row" spacing={1.5}>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate("/agent/dispatch/board")}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 13,
                      }}
                    >
                      Assign later
                    </Button>
                    <Button
                      onClick={handleAssign}
                      disabled={!selectedDriverId}
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 600,
                        backgroundColor: selectedDriverId
                          ? EVZONE_GREEN
                          : "rgba(148,163,184,0.7)",
                        "&:hover": {
                          backgroundColor: selectedDriverId
                            ? "#059669"
                            : undefined,
                        },
                      }}
                    >
                      Continue to confirmation
                    </Button>
                  </Stack>
                </Stack>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
