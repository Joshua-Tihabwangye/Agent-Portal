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

  const [status, setStatus] = React.useState(trip.status);
  const [markedForFollowUp, setMarkedForFollowUp] = React.useState(false);
  const [incidentFlagged, setIncidentFlagged] = React.useState(false);

  const handleMarkFollowUp = () => {
    setMarkedForFollowUp(!markedForFollowUp);
  };

  const handleFlagIncident = () => {
    // Navigate to incident or toggle flag
    // For this context, let's toggle visual state for "Flag as incident"
    // Ideally this might open a modal or navigate to safety.
    const confirmed = window.confirm("Are you sure you want to flag this trip as an incident? This will escalate to the Safety Team.");
    if (confirmed) {
      setIncidentFlagged(true);
      alert("Trip flagged as incident. Safety team notified.");
    }
  };

  const handleCancelBooking = () => {
    const confirmed = window.confirm("Are you sure you want to cancel this booking? This action cannot be undone.");
    if (confirmed) {
      setStatus("Cancelled");
      // Logic to notify backend would go here
    }
  };

  const statusColor = status === "In progress" ? "#0369a1" : (status === "Cancelled" ? "#ef4444" : "#166534");

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
            label={status}
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor:
                status === "In progress"
                  ? "rgba(56,189,248,0.2)"
                  : status === "Cancelled"
                    ? "rgba(239,68,68,0.15)"
                    : "rgba(22,163,74,0.16)",
              color: statusColor,
              border:
                status === "In progress"
                  ? "1px solid rgba(56,189,248,0.6)"
                  : status === "Cancelled"
                    ? "1px solid rgba(239,68,68,0.5)"
                    : "1px solid rgba(34,197,94,0.6)",
            }}
          />
        </Box>

        {/* Map Placeholder */}
        <Card
          elevation={1}
          sx={{
            mb: 2,
            borderRadius: 3,
            backgroundColor: isDark ? "#020617" : "#ffffff",
            border:
              "1px solid " +
              (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              height: 180,
              backgroundColor: isDark ? "#1e293b" : "#e2e8f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <PlaceOutlinedIcon sx={{ fontSize: 40, color: EVZONE_GREY, opacity: 0.5 }} />
            <Typography variant="caption" sx={{ color: EVZONE_GREY, position: "absolute", bottom: 10, right: 10 }}>
              Map View
            </Typography>
            {/* Simulated route line */}
            <Box sx={{ position: 'absolute', top: '40%', left: '20%', width: '60%', height: 2, bgcolor: EVZONE_GREEN, transform: 'rotate(10deg)' }} />
            <Box sx={{ position: 'absolute', top: '38%', left: '19%', width: 10, height: 10, borderRadius: '50%', bgcolor: '#fff', border: `3px solid ${EVZONE_GREEN}` }} />
            <Box sx={{ position: 'absolute', bottom: '45%', right: '19%', width: 10, height: 10, borderRadius: '50%', bgcolor: '#fff', border: `3px solid ${EVZONE_ORANGE}` }} />
          </Box>
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: EVZONE_GREEN }} />
                <Box>
                  <Typography variant="caption" sx={{ color: EVZONE_GREY, display: 'block' }}>Pickup</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? '#e5e7eb' : '#111827' }}>{trip.pickup}</Typography>
                </Box>
              </Stack>
              <Divider orientation="vertical" flexItem sx={{ ml: 0.5, height: 10, borderLeftStyle: 'dashed' }} />
              <Stack direction="row" spacing={2} alignItems="center">
                <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: EVZONE_ORANGE }} />
                <Box>
                  <Typography variant="caption" sx={{ color: EVZONE_GREY, display: 'block' }}>Dropoff</Typography>
                  <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? '#e5e7eb' : '#111827' }}>{trip.dropoff}</Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

        {/* Driver & Rider Info */}
        <Card
          elevation={1}
          sx={{
            mb: 2,
            borderRadius: 3,
            backgroundColor: isDark ? "#020617" : "#ffffff",
            border:
              "1px solid " +
              (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
          }}
        >
          <CardContent sx={{ p: 2 }}>
            <Stack spacing={2} divider={<Divider />}>
              {/* Rider */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'rgba(3,205,140,0.1)', color: EVZONE_GREEN }}>
                    <PersonOutlineOutlinedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>Rider</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: isDark ? '#e5e7eb' : '#111827' }}>{trip.rider}</Typography>
                  </Box>
                </Stack>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ color: EVZONE_GREY, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PhoneEnabledOutlinedIcon sx={{ fontSize: 14 }} /> {trip.riderPhone}
                  </Typography>
                </Box>
              </Stack>

              {/* Driver */}
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" spacing={1.5} alignItems="center">
                  <Box sx={{ p: 1, borderRadius: '50%', bgcolor: 'rgba(3,205,140,0.1)', color: EVZONE_GREEN }}>
                    <DirectionsCarOutlinedIcon fontSize="small" />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>Driver</Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600, color: isDark ? '#e5e7eb' : '#111827' }}>{trip.driver}</Typography>
                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>{trip.driverVehicle}</Typography>
                  </Box>
                </Stack>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="caption" sx={{ color: EVZONE_GREY, display: 'flex', alignItems: 'center', gap: 0.5 }}>
                    <PhoneEnabledOutlinedIcon sx={{ fontSize: 14 }} /> {trip.driverPhone}
                  </Typography>
                </Box>
              </Stack>
            </Stack>
          </CardContent>
        </Card>

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
              {status === "In progress" && (
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
              )}
            </Stack>

            {/* ... timeline items ... */}

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
                variant={markedForFollowUp ? "contained" : "outlined"}
                onClick={handleMarkFollowUp}
                disabled={status === "Cancelled"}
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontSize: 14,
                  fontWeight: 600,
                  backgroundColor: markedForFollowUp ? EVZONE_GREEN : "transparent",
                  color: markedForFollowUp ? "#fff" : EVZONE_GREEN,
                  borderColor: EVZONE_GREEN,
                  "&:hover": {
                    backgroundColor: markedForFollowUp ? "#059669" : "rgba(3,205,140,0.1)",
                  },
                }}
              >
                {markedForFollowUp ? "Marked for supervisor follow-up" : "Mark for supervisor follow-up"}
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<ReportProblemOutlinedIcon sx={{ fontSize: 18 }} />}
                onClick={handleFlagIncident}
                disabled={status === "Cancelled" || incidentFlagged}
                sx={{
                  borderRadius: 999,
                  textTransform: "none",
                  fontSize: 13,
                  color: "#b91c1c",
                  borderColor: "rgba(248,113,113,0.7)",
                  backgroundColor: incidentFlagged ? "rgba(248,113,113,0.1)" : "transparent",
                  "&:hover": {
                    borderColor: "#b91c1c",
                    backgroundColor: "rgba(254,226,226,0.5)",
                  },
                }}
              >
                {incidentFlagged ? "Incident Flagged" : "Flag as incident / escalate to Safety"}
              </Button>

              {status !== "Cancelled" && (
                <Button
                  fullWidth
                  variant="text"
                  onClick={handleCancelBooking}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 13,
                    color: EVZONE_GREY,
                    "&:hover": {
                      color: "#b91c1c",
                      backgroundColor: "rgba(248,113,113,0.1)",
                    },
                  }}
                >
                  Cancel booking
                </Button>
              )}
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
