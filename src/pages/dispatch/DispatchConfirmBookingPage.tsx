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
  Avatar,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useNavigate } from "react-router-dom";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Route target: /agent/dispatch/new/confirm
export default function AgentDispatchConfirmBookingPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const draftRaw = window.sessionStorage.getItem("evzone_dispatch_draft");
  const draft = draftRaw ? JSON.parse(draftRaw) : {};
  const summary = {
    type: String(draft?.serviceType || "ride").toUpperCase(),
    code: draft?.code || "BK-" + Math.floor(1000 + Math.random() * 9000),
    clientType: draft?.clientType || "Rider",
    riderName: draft?.riderName || draft?.contactName || draft?.callerName || "Customer",
    riderPhone: draft?.riderPhone || draft?.contactPhone || draft?.callerPhone || "",
    pickup: draft?.pickup || draft?.pickupLocation || draft?.pickupBranch || draft?.pickupStop || "",
    dropoff: draft?.dropoff || draft?.destinationFacility || draft?.dropoffBranch || draft?.dropoffStop || "",
    time: draft?.timeMode === "later" ? draft?.scheduledTime : "Now",
    driverName: draft?.assignedDriver?.name || "",
    driverVehicle: draft?.assignedDriver?.vehicle || "",
    driverId: draft?.assignedDriverId || "",
    eta: "7 min",
    estimate: "UGX 23,400",
  };

  const handleCreateBooking = () => {
    const bookingId = summary.code;
    const booking = {
      id: bookingId,
      createdAt: new Date().toISOString(),
      status: "New",
      ...draft,
      summary,
    };
    const existingRaw = window.localStorage.getItem("evzone_agent_bookings");
    const existing = existingRaw ? JSON.parse(existingRaw) : [];
    window.localStorage.setItem("evzone_agent_bookings", JSON.stringify([booking, ...existing]));
    window.sessionStorage.removeItem("evzone_dispatch_draft");
    navigate(`/agent/bookings/${encodeURIComponent(bookingId)}`);
  };

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
              Confirm booking
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Review the details and assigned driver with the caller before
              you create the booking. Make corrections if anything is wrong.
            </Typography>
          </Box>

          <Chip
            label="Final step · Review & create"
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
              <Grid item xs={12} md={6}>
                <Stack spacing={1.6}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    {summary.type === "Ride" ? (
                      <DirectionsCarOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN }}
                      />
                    ) : (
                      <LocalShippingOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                      />
                    )}
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Booking summary
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      label={summary.type}
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
                      label={summary.clientType}
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
                      Rider / caller
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
                          {summary.riderName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          {summary.riderPhone}
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
                          {summary.pickup}
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
                          {summary.dropoff}
                        </Typography>
                      </Box>
                    </Stack>
                  </Stack>

                  <Stack direction="row" spacing={1.5} sx={{ mt: 1.5 }}>
                    <Chip
                      size="small"
                      label={"Time: " + summary.time}
                      sx={{
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        backgroundColor: "rgba(248,250,252,1)",
                        color: EVZONE_GREY,
                        border: "1px solid rgba(203,213,225,0.9)",
                      }}
                    />
                    <Chip
                      size="small"
                      label={"Estimate: " + summary.estimate}
                      sx={{
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        backgroundColor: "rgba(240,253,250,1)",
                        color: "#047857",
                        border: "1px solid rgba(34,197,94,0.6)",
                      }}
                    />
                  </Stack>
                </Stack>
              </Grid>

              {/* Driver & final check */}
              <Grid item xs={12} md={6}>
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
                      Assigned driver
                    </Typography>
                  </Stack>

                  <Box
                    className="flex items-center justify-between rounded-2xl px-3 py-2.5"
                    sx={{
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(248,250,252,0.95)",
                      border: "1px solid rgba(203,213,225,0.9)",
                    }}
                  >
                    <Box className="flex items-center gap-2.5">
                      <Avatar
                        sx={{
                          width: 32,
                          height: 32,
                          backgroundColor: "rgba(3,205,140,0.18)",
                          color: "#047857",
                          fontSize: 14,
                          fontWeight: 700,
                        }}
                      >
                        {summary.driverName
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
                          {summary.driverName}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY, display: "block" }}
                        >
                          {summary.driverVehicle}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          ID {summary.driverId} · ETA {summary.eta}
                        </Typography>
                      </Box>
                    </Box>

                    <Chip
                      size="small"
                      label="Change driver"
                      sx={{
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        backgroundColor: "rgba(248,250,252,1)",
                        color: EVZONE_GREY,
                        border: "1px solid rgba(203,213,225,0.9)",
                      }}
                    />
                  </Box>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack spacing={0.8}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Read this summary back to the caller:
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? "#e5e7eb" : "#111827",
                        backgroundColor: isDark
                          ? "rgba(15,23,42,0.9)"
                          : "rgba(248,250,252,0.95)",
                        borderRadius: 16,
                        px: 2,
                        py: 1.2,
                      }}
                    >
                      {"I have booked a " +
                        summary.type.toLowerCase() +
                        " from " +
                        summary.pickup +
                        " to " +
                        summary.dropoff +
                        " for " +
                        summary.riderName +
                        ". Your driver will be " +
                        summary.driverName +
                        " in a " +
                        summary.driverVehicle +
                        ". They are approximately " +
                        summary.eta +
                        " away."}
                    </Typography>
                  </Stack>

                  <Stack spacing={1.2} sx={{ mt: 1 }}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <CheckCircleOutlineOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Once you create the booking, the driver will receive a
                        push notification and the rider will receive SMS / app
                        updates.
                      </Typography>
                    </Stack>
                  </Stack>
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
                sx={{
                  textTransform: "none",
                  fontSize: 13,
                  color: EVZONE_GREY,
                }}
              >
                Back to driver assignment
              </Button>

              <Stack direction="row" spacing={1.5}>
                <Button
                  variant="outlined"
                  size="small"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 13,
                  }}
                >
                  Save as draft
                </Button>
                <Button
                  onClick={handleCreateBooking}
                  variant="contained"
                  size="small"
                  sx={{
                    borderRadius: 999,
                    textTransform: "none",
                    fontSize: 13,
                    fontWeight: 600,
                    backgroundColor: EVZONE_GREEN,
                    "&:hover": {
                      backgroundColor: "#059669",
                    },
                  }}
                >
                  Create booking
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

// Basic usage test cases (pseudo-code, to be placed in a separate test file):
// - Render <AgentDispatchConfirmBookingPage /> and assert that summary.riderName appears.
// - Assert that clicking "Create booking" calls handleCreateBooking (use a spy in tests).
// - Assert that the confirmation sentence contains pickup, dropoff, riderName and driverName.
