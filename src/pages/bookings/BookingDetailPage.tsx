import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Grid,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useNavigate, useParams } from "react-router-dom";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Route target: /agent/bookings/:bookingId
// For now we use placeholder data; in a real app this would come from params + API/state.
export default function AgentBookingDetailPage() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const stored = (() => {
    try {
      const raw = window.localStorage.getItem("evzone_agent_bookings");
      if (!raw) return null;
      const list = JSON.parse(raw) as any[];
      return list.find((b) => String(b.id) === String(bookingId));
    } catch {
      return null;
    }
  })();

  const booking = stored?.summary
    ? {
      id: stored.id,
      type: stored.summary.type,
      clientType: stored.summary.clientType,
      createdAt: stored.createdAt ? new Date(stored.createdAt).toLocaleString() : "—",
      status: stored.status || "New",
      riderName: stored.summary.riderName,
      riderPhone: stored.summary.riderPhone,
      pickup: stored.summary.pickup,
      dropoff: stored.summary.dropoff,
      time: stored.summary.time,
      passengers: stored.passengers || 1,
      notes: stored.notes || stored.instructions || "",
      driverName: stored.summary.driverName || stored?.assignedDriver?.name || "",
      driverVehicle: stored.summary.driverVehicle || stored?.assignedDriver?.vehicle || "",
      driverPhone: "—",
      driverBattery: stored?.assignedDriver?.battery ?? 72,
    }
    : {
      id: bookingId || "BK-2048",
      type: "Ride",
      clientType: "Rider",
      createdAt: "Today · 09:12",
      status: "In progress",
      riderName: "Sarah K.",
      riderPhone: "+256 700 200 168",
      pickup: "Nakasero Hill Road",
      dropoff: "Bugolobi Flats, Block C",
      time: "Now",
      passengers: 1,
      notes: "Rider requested quiet car.",
      driverName: "Kato Robert",
      driverVehicle: "Nissan Leaf · UBF 341X",
      driverPhone: "+256 704 000 111",
      driverBattery: 72,
    };

  const timeline = [
    {
      label: "Created",
      detail: "Booking captured by agent",
      time: "09:12",
    },
    {
      label: "Driver assigned",
      detail: "DRV-102 accepted",
      time: "09:13",
    },
    {
      label: "Driver at pickup",
      detail: "Waiting for rider",
      time: "09:19",
    },
    {
      label: "In progress",
      detail: "En route to destination",
      time: "09:23",
    },
  ];

  const iconForType =
    booking.type === "Ride" ? (
      <DirectionsCarOutlinedIcon sx={{ fontSize: 20, color: EVZONE_GREEN }} />
    ) : booking.type === "Delivery" ? (
      <LocalShippingOutlinedIcon sx={{ fontSize: 20, color: EVZONE_ORANGE }} />
    ) : (
      <LocalHospitalOutlinedIcon sx={{ fontSize: 20, color: "#b91c1c" }} />
    );

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-3xl mx-auto">
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
              Booking {booking.id}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Full details for this booking. You can review the timeline,
              driver, and rider info before making changes or escalating.
            </Typography>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={booking.status}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor:
                  booking.status === "In progress"
                    ? "rgba(56,189,248,0.2)"
                    : "rgba(22,163,74,0.16)",
                color:
                  booking.status === "In progress" ? "#0369a1" : "#166534",
                border:
                  booking.status === "In progress"
                    ? "1px solid rgba(56,189,248,0.6)"
                    : "1px solid rgba(34,197,94,0.6)",
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              {booking.createdAt}
            </Typography>
          </Stack>
        </Box>

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
            <Grid container spacing={2.4}>
              {/* Booking & rider */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={1.6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {iconForType}
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Booking details
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      label={booking.type}
                      sx={{
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        backgroundColor: "rgba(240,253,250,1)",
                        color: "#047857",
                        border: "1px solid rgba(34,197,94,0.6)",
                      }}
                    />
                    <Chip
                      size="small"
                      label={booking.clientType}
                      sx={{
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        backgroundColor: "rgba(248,250,252,1)",
                        color: EVZONE_GREY,
                        border: "1px solid rgba(203,213,225,0.9)",
                      }}
                    />
                  </Stack>

                  <Stack spacing={0.8}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY, textTransform: "uppercase" }}
                    >
                      Rider
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PersonOutlineOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN }}
                      />
                      <Box>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {booking.riderName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          {booking.riderPhone}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack spacing={0.8}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY, textTransform: "uppercase" }}
                    >
                      Pickup & drop-off
                    </Typography>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <PlaceOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN, mt: 0.3 }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
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
                          {booking.pickup}
                        </Typography>
                      </Box>
                    </Stack>
                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <PlaceOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_ORANGE, mt: 0.3 }}
                      />
                      <Box>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
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
                          {booking.dropoff}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>

                  <Stack spacing={0.4} sx={{ mt: 1.2 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        {booking.time} · {booking.passengers} passenger
                        {booking.passengers > 1 ? "s" : ""}
                      </Typography>
                    </Stack>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Notes: {booking.notes}
                    </Typography>
                  </Stack>
                </Stack>
              </Grid>

              {/* Driver & timeline */}
              <Grid size={{ xs: 12, md: 6 }}>
                <Stack spacing={1.8}>
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
                      Driver & status timeline
                    </Typography>
                  </Stack>

                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(248,250,252,0.95)",
                      border: "1px solid rgba(203,213,225,0.9)",
                    }}
                  >
                    <CardContent sx={{ p: 1.8 }}>
                      <Stack spacing={0.8}>
                        <Typography
                          variant="caption"
                          sx={{
                            color: EVZONE_GREY,
                            textTransform: "uppercase",
                          }}
                        >
                          Driver
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {booking.driverName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY, display: "block" }}
                        >
                          {booking.driverVehicle}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          {booking.driverPhone} · Battery {booking.driverBattery}%
                        </Typography>
                      </Stack>

                      <Divider sx={{ my: 1.4 }} />

                      <Stack spacing={1.2}>
                        {timeline.map((item, idx) => (
                          <Stack
                            key={item.label}
                            direction="row"
                            spacing={1.6}
                            alignItems="flex-start"
                          >
                            <Box className="flex flex-col items-center">
                              <Box
                                className="w-2 h-2 rounded-full"
                                sx={{
                                  backgroundColor:
                                    idx === timeline.length - 1
                                      ? EVZONE_ORANGE
                                      : EVZONE_GREEN,
                                }}
                              />
                              {idx !== timeline.length - 1 && (
                                <Box
                                  className="w-px flex-1 mt-1"
                                  sx={{
                                    background:
                                      "linear-gradient(to bottom, rgba(148,163,184,0.7), transparent)",
                                  }}
                                />
                              )}
                            </Box>
                            <Box flex={1}>
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: 600,
                                  color: isDark ? "#e5e7eb" : "#111827",
                                }}
                              >
                                {item.label}
                              </Typography>
                              <Typography
                                variant="caption"
                                sx={{ color: EVZONE_GREY }}
                              >
                                {item.detail} · {item.time}
                              </Typography>
                            </Box>
                          </Stack>
                        ))}
                      </Stack>
                    </CardContent>
                  </Card>

                  <Card
                    elevation={0}
                    sx={{
                      borderRadius: 3,
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(255,251,235,0.95)",
                      border: "1px solid rgba(252,211,77,0.7)",
                    }}
                  >
                    <CardContent sx={{ p: 1.6 }}>
                      <Stack direction="row" spacing={1} alignItems="flex-start">
                        <ReportProblemOutlinedIcon
                          sx={{ fontSize: 18, color: "#f97316", mt: 0.2 }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          If there is an issue (e.g. driver no-show, rider
                          cancelling at pickup, safety concern), follow your
                          dispute or safety playbook and record notes in the
                          ticket system.
                        </Typography>
                      </Stack>
                    </CardContent>
                  </Card>
                </Stack>
              </Grid>
            </Grid>

            <Stack
              direction="row"
              justifyContent="space-between"
              sx={{ mt: 3 }}
            >
              <Button
                variant="text"
                size="small"
                onClick={() => navigate("/agent/bookings")}
                sx={{
                  textTransform: "none",
                  fontSize: 13,
                  color: EVZONE_GREY,
                }}
              >
                Back to My bookings
              </Button>

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    console.log("Mark for follow-up", booking.id);
                    window.alert("Marked for follow-up (demo)");
                  }}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 13,
                  }}
                >
                  Mark for follow-up
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => {
                    console.log("Cancel booking", booking.id);
                    window.alert("Cancel requested (demo)");
                  }}
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 13,
                    color: "#b91c1c",
                    borderColor: "rgba(248,113,113,0.7)",
                    "&:hover": {
                      borderColor: "#b91c1c",
                    },
                  }}
                >
                  Cancel booking
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
