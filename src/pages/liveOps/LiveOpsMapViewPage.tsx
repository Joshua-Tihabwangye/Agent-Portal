import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  IconButton,
  Grid,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useNavigate } from "react-router-dom";
import { LiveOpsBatteryOverlay } from "../../components/ev/LiveOpsBatteryOverlay";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const activeTrips = [
  {
    id: "8F21",
    type: "Ride",
    from: "Nakasero Hill",
    to: "Bugolobi Flats",
    status: "In progress",
    driver: "James M.",
    rider: "Sarah K.",
    eta: "7 min",
  },
  {
    id: "DL42",
    type: "Delivery",
    from: "EVzone Hub - CBD",
    to: "Makerere Hostel",
    status: "Picked up",
    driver: "Amina K.",
    rider: "Parcel for Brian",
    eta: "18 min",
  },
  {
    id: "SC12",
    type: "School shuttle",
    from: "Green Valley Estate",
    to: "Little Stars School",
    status: "Boarding",
    driver: "School Fleet 4",
    rider: "14 students",
    eta: "Scheduled 07:30",
  },
];

const activeDrivers = [
  {
    id: "DRV-102",
    name: "Kato R.",
    vehicle: "Nissan Leaf",
    battery: 78,
    status: "Available",
  },
  {
    id: "DRV-287",
    name: "Linda N.",
    vehicle: "e-Bike Fleet",
    battery: 46,
    status: "On trip",
  },
  {
    id: "DRV-364",
    name: "Omar S.",
    vehicle: "Hyundai Kona",
    battery: 32,
    status: "Finishing trip",
  },
];

export default function AgentLiveOpsPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
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
            Live operations
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: EVZONE_GREY, maxWidth: 520 }}
          >
            Monitor online drivers, active trips and safety alerts in real
            time.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label="Kampala"
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
            }}
          />
          <IconButton size="small">
            <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton size="small">
            <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </Box>

      <Grid container spacing={2}>
        {/* Map column */}
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card
            elevation={1}
            sx={{
              borderRadius: 3,
              height: { xs: 320, sm: 380, md: 420 },
              backgroundColor: isDark ? "#020617" : "#ffffff",
              border:
                "1px solid " +
                (isDark
                  ? "rgba(30,64,175,0.7)"
                  : "rgba(226,232,240,1)"),
              overflow: "hidden",
            }}
          >
            <CardContent sx={{ p: 2, height: "100%", display: "flex", flexDirection: "column" }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ mb: 1.5 }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <PlaceOutlinedIcon
                    sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Map view
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <Chip
                    label="Drivers: 32 online"
                    size="small"
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(22,163,74,0.12)",
                      color: "#166534",
                      border: "1px solid rgba(34,197,94,0.5)",
                    }}
                  />
                </Stack>
              </Stack>

              {/* Map placeholder */}
              <Box
                sx={{
                  position: "relative",
                  flex: 1,
                  borderRadius: 20,
                  overflow: "hidden",
                  background:
                    "radial-gradient(circle at 0 0, rgba(59,130,246,0.18), transparent 55%)," +
                    "radial-gradient(circle at 100% 100%, rgba(16,185,129,0.18), transparent 55%)," +
                    (isDark
                      ? "#020617"
                      : "linear-gradient(145deg, #e0f2fe, #f9fafb)"),
                }}
              >
                {/* Grid lines */}
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

                {/* Battery overlay (Set 18: component 52) */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 12,
                    right: 12,
                    zIndex: 3,
                    maxWidth: 340,
                  }}
                >
                  <LiveOpsBatteryOverlay
                    drivers={activeDrivers.map((d) => ({
                      id: d.id,
                      name: d.name,
                      vehicle: d.vehicle,
                      battery: d.battery,
                      distanceKm: 0,
                      inTrip: String(d.status).toLowerCase().includes("trip"),
                    }))}
                    onSelectDriver={(d) => navigate(`/agent/live-ops/drivers/${encodeURIComponent(d.id)}`)}
                  />
                </Box>

                {/* Pickup / drop markers and drivers (static demo) */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "18%",
                    left: "20%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Box className="flex flex-col items-center">
                    <Box className="w-3 h-3 rounded-full bg-emerald-500" />
                    <Typography
                      variant="caption"
                      sx={{ color: "#ecfdf5", fontSize: 10 }}
                    >
                      Pickup cluster
                    </Typography>
                  </Box>
                </Box>

                <Box
                  sx={{
                    position: "absolute",
                    bottom: "20%",
                    right: "18%",
                    transform: "translate(50%, 50%)",
                  }}
                >
                  <Box className="flex flex-col items-center">
                    <Box className="w-3 h-3 rounded-full bg-orange-400" />
                    <Typography
                      variant="caption"
                      sx={{ color: "#fff7ed", fontSize: 10 }}
                    >
                      Drop-off cluster
                    </Typography>
                  </Box>
                </Box>

                {/* Driver markers */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "32%",
                    left: "55%",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 26,
                      height: 26,
                      backgroundColor: "rgba(34,197,94,0.9)",
                      color: "#022c22",
                      fontSize: 13,
                    }}
                  >
                    D1
                  </Avatar>
                </Box>
                <Box
                  sx={{
                    position: "absolute",
                    top: "60%",
                    left: "40%",
                  }}
                >
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
                <Box
                  sx={{
                    position: "absolute",
                    top: "45%",
                    left: "75%",
                  }}
                >
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
                    <Box className="w-2 h-2 rounded-full bg-orange-400" />
                    <Typography
                      variant="caption"
                      sx={{ color: "#ffedd5", fontSize: 10 }}
                    >
                      Drop-off
                    </Typography>
                  </Box>
                  <Box className="flex items-center gap-1 ml-2">
                    <Box className="w-2 h-2 rounded-full bg-sky-400" />
                    <Typography
                      variant="caption"
                      sx={{ color: "#e0f2fe", fontSize: 10 }}
                    >
                      Driver
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Right panel: trips & drivers */}
        <Grid size={{ xs: 12, lg: 5 }}>
          <Stack spacing={2}>
            {/* Active trips */}
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
                      Active trips
                    </Typography>
                  </Stack>
                  <Chip
                    size="small"
                    label="All types"
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(248,250,252,0.9)",
                      color: EVZONE_GREY,
                      border: "1px solid rgba(203,213,225,0.9)",
                    }}
                  />
                </Stack>

                <Stack spacing={1.2}>
                  {activeTrips.map((trip) => (
                    <Box
                      key={trip.id}
                      className="rounded-2xl px-3 py-2.5"
                      onClick={() => navigate(`/agent/live-ops/trips/${encodeURIComponent(trip.id)}`)}
                      sx={{
                        cursor: "pointer",
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
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {trip.type} · {trip.id}
                        </Typography>
                        <Chip
                          size="small"
                          label={trip.status}
                          sx={{
                            borderRadius: 999,
                            fontSize: 10,
                            textTransform: "none",
                            backgroundColor:
                              trip.status === "In progress"
                                ? "rgba(56,189,248,0.18)"
                                : "rgba(250,204,21,0.18)",
                            color:
                              trip.status === "In progress"
                                ? "#0369a1"
                                : "#854d0e",
                          }}
                        />
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY, display: "block", mt: 0.4 }}
                      >
                        {trip.from} → {trip.to}
                      </Typography>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        sx={{ mt: 0.6 }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          Driver: {trip.driver}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          ETA {trip.eta}
                        </Typography>
                      </Stack>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            {/* Drivers */}
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
                    <LocalShippingOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Drivers overview
                    </Typography>
                  </Stack>
                  <Chip
                    size="small"
                    label="3 of 32"
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(248,250,252,0.9)",
                      color: EVZONE_GREY,
                      border: "1px solid rgba(203,213,225,0.9)",
                    }}
                  />
                </Stack>

                <Stack spacing={1.1}>
                  {activeDrivers.map((driver) => (
                    <Box
                      key={driver.id}
                      className="flex items-center justify-between rounded-2xl px-3 py-2.5"
                      onClick={() => navigate(`/agent/live-ops/drivers/${encodeURIComponent(driver.id)}`)}
                      sx={{
                        cursor: "pointer",
                        backgroundColor: isDark
                          ? "rgba(15,23,42,0.9)"
                          : "rgba(248,250,252,0.95)",
                        border: "1px solid rgba(203,213,225,0.9)",
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
                            sx={{ color: EVZONE_GREY }}
                          >
                            {driver.vehicle}
                          </Typography>
                        </Box>
                      </Box>

                      <Box className="text-right">
                        <Typography
                          variant="caption"
                          sx={{
                            color:
                              driver.status === "Available"
                                ? "#16a34a"
                                : "#ea580c",
                            fontWeight: 600,
                          }}
                        >
                          {driver.status}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY, display: "block" }}
                        >
                          Battery {driver.battery}%
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  sx={{ mt: 1.5 }}
                >
                  <ReportProblemOutlinedIcon
                    sx={{ fontSize: 16, color: "#f97316" }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    1 driver below 20% battery. Consider routing to charging.
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
