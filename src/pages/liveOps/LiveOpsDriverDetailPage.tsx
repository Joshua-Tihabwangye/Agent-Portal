import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  LinearProgress,
  Divider,
  Avatar,
  Grid,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

export default function AgentLiveOpsDriverDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [callSnackbar, setCallSnackbar] = useState(false);

  // Placeholder driver data – normally fetched by :driverId
  const driver = {
    name: "Kato Robert",
    id: "DRV-102",
    rating: 4.8,
    tripsToday: 9,
    onlineSince: "06:45",
    status: "Available",
    vehicle: "Nissan Leaf · UBF 341X",
    city: "Kampala",
    battery: 78,
    phone: "+256 704 000 111",
  };

  const recentTrips = [
    {
      id: "8F10",
      type: "Ride",
      from: "Kira Road",
      to: "Naguru Estate",
      time: "42 min ago",
      fare: "UGX 18,400",
    },
    {
      id: "DL39",
      type: "Delivery",
      from: "EVzone Hub - CBD",
      to: "Makerere Hostel",
      time: "1h 12m ago",
      fare: "UGX 12,000",
    },
    {
      id: "8E97",
      type: "Ride",
      from: "Bugolobi Market",
      to: "Luzira Lakeside",
      time: "2h 05m ago",
      fare: "UGX 23,600",
    },
  ];

  const batteryColor =
    driver.battery >= 60
      ? "#16a34a"
      : driver.battery >= 30
        ? "#f97316"
        : "#b91c1c";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-3xl mx-auto">
        {/* Header */}
        <Box className="mb-4 flex items-center justify-between gap-2">
          <Box className="flex items-center gap-3">
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "rgba(3,205,140,0.16)",
                color: "#047857",
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
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: isDark ? "#e5e7eb" : "#111827",
                }}
              >
                {driver.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: EVZONE_GREY }}
              >
                {driver.vehicle}
              </Typography>
            </Box>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              size="small"
              label={driver.status}
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor:
                  driver.status === "Available"
                    ? "rgba(22,163,74,0.12)"
                    : "rgba(250,204,21,0.16)",
                color:
                  driver.status === "Available" ? "#166534" : "#92400e",
                border:
                  driver.status === "Available"
                    ? "1px solid rgba(34,197,94,0.45)"
                    : "1px solid rgba(250,204,21,0.5)",
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              Online since {driver.onlineSince}
            </Typography>
          </Stack>
        </Box>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
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
              <CardContent sx={{ p: 2.4 }}>
                <Stack spacing={1.8}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Stack direction="row" spacing={1} alignItems="center">
                      <DirectionsCarOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Driver profile
                      </Typography>
                    </Stack>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <StarBorderOutlinedIcon
                        sx={{ fontSize: 16, color: "#fbbf24" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#fbbf24" }}
                      >
                        {driver.rating.toFixed(1)}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: EVZONE_GREY,
                          textTransform: "uppercase",
                        }}
                      >
                        Driver ID
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {driver.id}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: EVZONE_GREY,
                          textTransform: "uppercase",
                        }}
                      >
                        City
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {driver.city}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" justifyContent="space-between">
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: EVZONE_GREY,
                          textTransform: "uppercase",
                        }}
                      >
                        Trips today
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {driver.tripsToday}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{
                          color: EVZONE_GREY,
                          textTransform: "uppercase",
                        }}
                      >
                        Phone
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {driver.phone}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1.2} flexWrap="wrap">
                    <Chip
                      size="small"
                      icon={<PhoneEnabledOutlinedIcon sx={{ fontSize: 16 }} />}
                      label="Call driver"
                      onClick={() => {
                        window.open(`tel:${driver.phone.replace(/\s/g, "")}`, "_self");
                        setCallSnackbar(true);
                      }}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 12,
                        cursor: "pointer",
                        backgroundColor: EVZONE_GREEN,
                        color: "#020617",
                        border: "1px solid " + EVZONE_GREEN,
                        "&:hover": { backgroundColor: "#059669" },
                      }}
                    />
                    <Chip
                      size="small"
                      icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
                      label="Driver profile"
                      onClick={() => navigate(`/agent/drivers/${driver.id}`)}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 12,
                        cursor: "pointer",
                        backgroundColor: "rgba(219,234,254,0.9)",
                        color: "#1d4ed8",
                        border: "1px solid rgba(59,130,246,0.5)",
                      }}
                    />
                    <Chip
                      size="small"
                      icon={<DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} />}
                      label="View trips"
                      onClick={() => navigate(`/agent/bookings?driverId=${driver.id}`)}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 12,
                        cursor: "pointer",
                        backgroundColor: "rgba(248,250,252,0.95)",
                        color: EVZONE_GREY,
                        border: "1px solid rgba(203,213,225,0.9)",
                      }}
                    />
                    <Chip
                      size="small"
                      icon={<ChatOutlinedIcon sx={{ fontSize: 16 }} />}
                      label="Open chat"
                      onClick={() => navigate(`/agent/support/tickets/new?driverId=${driver.id}`)}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 12,
                        cursor: "pointer",
                        backgroundColor: "rgba(248,250,252,0.95)",
                        color: EVZONE_GREY,
                        border: "1px solid rgba(203,213,225,0.9)",
                      }}
                    />
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                mt: 2,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark
                    ? "rgba(30,64,175,0.7)"
                    : "rgba(226,232,240,1)"),
              }}
            >
              <CardContent sx={{ p: 2.4 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <BoltOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      EV status
                    </Typography>
                  </Stack>
                  <Chip
                    size="small"
                    label={driver.battery + "% battery"}
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(15,23,42,0.05)",
                      color: batteryColor,
                      border: "1px solid " + batteryColor + "33",
                    }}
                  />
                </Stack>

                <Box sx={{ mb: 1.5 }}>
                  <LinearProgress
                    variant="determinate"
                    value={driver.battery}
                    sx={{
                      height: 10,
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
                </Box>

                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block" }}
                >
                  Recommend routing to charging if next trip estimate &gt; 20 km.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column: recent trips */}
          <Grid size={{ xs: 12, md: 6 }}>
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
              <CardContent sx={{ p: 2.4 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <TimelineOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Recent trips
                    </Typography>
                  </Stack>
                  <Chip
                    size="small"
                    label="Last 3 trips"
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
                  {recentTrips.map((trip) => (
                    <Box
                      key={trip.id}
                      className="rounded-2xl px-3 py-2.5"
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
                        sx={{ mb: 0.4 }}
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
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          {trip.time}
                        </Typography>
                      </Stack>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY, display: "block" }}
                      >
                        {trip.from} → {trip.to}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        {trip.fare}
                      </Typography>
                    </Box>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block" }}
                >
                  Use this view to check recent patterns before assigning
                  long trips or handling disputes.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Call Snackbar */}
      <Snackbar
        open={callSnackbar}
        autoHideDuration={4000}
        onClose={() => setCallSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setCallSnackbar(false)} sx={{ width: "100%" }}>
          Initiating call to {driver.phone}...
        </Alert>
      </Snackbar>
    </Box>
  );
}
