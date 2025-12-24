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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

export default function AgentLiveOpsTripDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Placeholder data – in real usage, fetch by :tripId
  const trip = {
    code: "8F21",
    type: "Ride",
    status: "In progress",
    createdAt: "Today · 09:12",
    pickup: "Nakasero Hill Road",
    dropoff: "Bugolobi Flats, Block C",
    rider: "Sarah K.",
    riderPhone: "+256 700 200 168",
    driver: "James M.",
    driverVehicle: "Nissan Leaf · UBF 341X",
    driverPhone: "+256 780 300 245",
    eta: "7 min",
  };

  const statusColor = trip.status === "In progress" ? "#0369a1" : "#166534";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-xl mx-auto">
        {/* Header */}
        <Box className="mb-3 flex items-center justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Trip {trip.code}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY }}
            >
              {trip.type} · {trip.createdAt}
            </Typography>
          </Box>
          <Chip
            size="small"
            label={trip.status}
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor:
                trip.status === "In progress"
                  ? "rgba(56,189,248,0.2)"
                  : "rgba(22,163,74,0.16)",
              color: statusColor,
              border:
                trip.status === "In progress"
                  ? "1px solid rgba(56,189,248,0.6)"
                  : "1px solid rgba(34,197,94,0.6)",
            }}
          />
        </Box>

        {/* Map snippet */}
        <Card
          elevation={1}
          sx={{
            borderRadius: 3,
            mb: 2,
            backgroundColor: isDark ? "#020617" : "#ffffff",
            border:
              "1px solid " +
              (isDark
                ? "rgba(30,64,175,0.7)"
                : "rgba(226,232,240,1)"),
          }}
        >
          <CardContent sx={{ p: 1.6 }}>
            <Box
              sx={{
                borderRadius: 18,
                overflow: "hidden",
                height: 140,
                mb: 1.5,
                background:
                  "linear-gradient(135deg, #e0f2fe, #ecfeff, #f9fafb)",
                position: "relative",
              }}
            >
              {/* Simple route line */}
              <Box
                sx={{
                  position: "absolute",
                  left: "18%",
                  top: "20%",
                  width: "64%",
                  height: "3px",
                  background:
                    "linear-gradient(90deg, rgba(56,189,248,0.8), rgba(3,205,140,0.9))",
                }}
              />

              {/* Pickup marker */}
              <Box
                sx={{
                  position: "absolute",
                  left: "18%",
                  top: "20%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <Box className="w-3 h-3 rounded-full bg-emerald-500" />
              </Box>

              {/* Dropoff marker */}
              <Box
                sx={{
                  position: "absolute",
                  right: "18%",
                  top: "20%",
                  transform: "translate(50%, -50%)",
                }}
              >
                <Box className="w-3 h-3 rounded-full bg-orange-400" />
              </Box>

              {/* Trip label */}
              <Box
                sx={{
                  position: "absolute",
                  bottom: 10,
                  left: 12,
                  borderRadius: 999,
                  px: 1.4,
                  py: 0.6,
                  backgroundColor: "rgba(15,23,42,0.85)",
                }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: "#e5e7eb", fontSize: 11 }}
                >
                  ETA {trip.eta} · 3.4 km remaining
                </Typography>
              </Box>
            </Box>

            {/* Origin / destination */}
            <Stack spacing={1.2}>
              <Stack direction="row" spacing={1.2} alignItems="flex-start">
                <PlaceOutlinedIcon
                  sx={{ fontSize: 18, color: EVZONE_GREEN, mt: 0.2 }}
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, textTransform: "uppercase" }}
                  >
                    Pickup
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    {trip.pickup}
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.2} alignItems="flex-start">
                <PlaceOutlinedIcon
                  sx={{ fontSize: 18, color: EVZONE_ORANGE, mt: 0.2 }}
                />
                <Box>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, textTransform: "uppercase" }}
                  >
                    Drop-off
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    {trip.dropoff}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Rider & driver cards */}
        <Stack spacing={2} className="mb-3">
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
                mb={1.3}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <PersonOutlineOutlinedIcon
                    sx={{ fontSize: 18, color: EVZONE_GREEN }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Rider
                  </Typography>
                </Stack>
                <Chip
                  size="small"
                  label="Verified"
                  sx={{
                    borderRadius: 999,
                    fontSize: 10,
                    textTransform: "none",
                    backgroundColor: "rgba(22,163,74,0.12)",
                    color: "#166534",
                    border: "1px solid rgba(34,197,94,0.5)",
                  }}
                />
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: isDark ? "#e5e7eb" : "#111827",
                }}
              >
                {trip.rider}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY }}
              >
                {trip.riderPhone}
              </Typography>

              <Stack direction="row" spacing={1.2} sx={{ mt: 1.5 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PhoneEnabledOutlinedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 12,
                  }}
                >
                  Call rider
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 12,
                  }}
                >
                  Open chat
                </Button>
              </Stack>
            </CardContent>
          </Card>

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
                mb={1.3}
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
                    Driver
                  </Typography>
                </Stack>
                <Chip
                  size="small"
                  label="EV · 64% battery"
                  sx={{
                    borderRadius: 999,
                    fontSize: 10,
                    textTransform: "none",
                    backgroundColor: "rgba(3,205,140,0.12)",
                    color: "#047857",
                    border: "1px solid rgba(34,197,94,0.5)",
                  }}
                />
              </Stack>

              <Typography
                variant="body2"
                sx={{
                  fontWeight: 600,
                  color: isDark ? "#e5e7eb" : "#111827",
                }}
              >
                {trip.driver}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY, display: "block" }}
              >
                {trip.driverVehicle}
              </Typography>
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY }}
              >
                {trip.driverPhone}
              </Typography>

              <Stack direction="row" spacing={1.2} sx={{ mt: 1.5 }}>
                <Button
                  variant="outlined"
                  size="small"
                  startIcon={<PhoneEnabledOutlinedIcon sx={{ fontSize: 16 }} />}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 12,
                  }}
                >
                  Call driver
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 12,
                  }}
                >
                  Message driver
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Stack>

        {/* Timeline & actions */}
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
                <TimelineOutlinedIcon
                  sx={{ fontSize: 18, color: EVZONE_GREEN }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                  }}
                >
                  Trip timeline
                </Typography>
              </Stack>
              <Chip
                size="small"
                label="Live"
                sx={{
                  borderRadius: 999,
                  fontSize: 10,
                  textTransform: "none",
                  backgroundColor: "rgba(248,113,113,0.12)",
                  color: "#b91c1c",
                  border: "1px solid rgba(248,113,113,0.5)",
                }}
              />
            </Stack>

            <Stack spacing={1.4} sx={{ mb: 2 }}>
              <Stack direction="row" spacing={1.6} alignItems="flex-start">
                <Box className="flex flex-col items-center">
                  <Box className="w-2 h-2 rounded-full bg-emerald-500" />
                  <Box className="w-px flex-1 mt-1 bg-emerald-200" />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Driver accepted trip
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    09:13 · Driver was 1.2 km away
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.6} alignItems="flex-start">
                <Box className="flex flex-col items-center">
                  <Box className="w-2 h-2 rounded-full bg-sky-500" />
                  <Box className="w-px flex-1 mt-1 bg-sky-200" />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Driver arrived at pickup
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    09:19 · Rider on board at 09:21
                  </Typography>
                </Box>
              </Stack>

              <Stack direction="row" spacing={1.6} alignItems="flex-start">
                <Box className="flex flex-col items-center">
                  <Box className="w-2 h-2 rounded-full bg-orange-400" />
                  <Box className="w-px flex-1 mt-1 bg-orange-200" />
                </Box>
                <Box flex={1}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    En route to destination
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    09:23 · Current speed 32 km/h
                  </Typography>
                </Box>
              </Stack>
            </Stack>

            <Divider sx={{ mb: 1.5 }} />

            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
            >
              Actions
            </Typography>

            <Stack spacing={1.2}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: EVZONE_GREEN,
                  "&:hover": {
                    backgroundColor: "#059669",
                  },
                }}
              >
                Mark for supervisor follow-up
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<ReportProblemOutlinedIcon sx={{ fontSize: 18 }} />}
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontSize: 13,
                  color: "#b91c1c",
                  borderColor: "rgba(248,113,113,0.7)",
                  "&:hover": {
                    borderColor: "#b91c1c",
                    backgroundColor: "rgba(254,226,226,0.5)",
                  },
                }}
              >
                Flag as incident / escalate to Safety
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
