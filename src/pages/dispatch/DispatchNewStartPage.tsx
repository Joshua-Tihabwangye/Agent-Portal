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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import WalkRoundedIcon from "@mui/icons-material/DirectionsWalkRounded";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import { useNavigate } from "react-router-dom";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const CLIENT_TYPES = [
  {
    key: "rider",
    label: "Rider",
    description: "Standard customer booking (phone or WhatsApp).",
    icon: <PersonOutlineOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    key: "corporate",
    label: "Corporate account",
    description: "Use a company or fleet billing profile.",
    icon: <BusinessCenterOutlinedIcon sx={{ fontSize: 20 }} />,
  },
  {
    key: "walk-in",
    label: "Walk-in",
    description: "Customer not yet registered in the app.",
    icon: <WalkRoundedIcon sx={{ fontSize: 20 }} />,
  },
];

const SERVICE_TYPES = [
  {
    key: "ride",
    label: "Ride",
    description: "Move people from A to B.",
    icon: <DirectionsCarOutlinedIcon sx={{ fontSize: 20 }} />,
    primary: true,
  },
  {
    key: "delivery",
    label: "Delivery",
    description: "Send parcels, food or documents.",
    icon: <LocalShippingOutlinedIcon sx={{ fontSize: 20 }} />,
    primary: true,
  },
  {
    key: "rental",
    label: "Car rental",
    description: "Longer bookings, hourly or daily.",
    icon: <DirectionsCarOutlinedIcon sx={{ fontSize: 20 }} />,
    primary: false,
  },
  {
    key: "school-shuttle",
    label: "School shuttle",
    description: "Seats on school routes.",
    icon: <DirectionsBusOutlinedIcon sx={{ fontSize: 20 }} />,
    primary: false,
  },
  {
    key: "tour",
    label: "Tour",
    description: "Pre-defined tour packages.",
    icon: <TourOutlinedIcon sx={{ fontSize: 20 }} />,
    primary: false,
  },
  {
    key: "ems",
    label: "Ambulance / EMS",
    description: "Emergency medical response.",
    icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 20 }} />,
    primary: false,
  },
];

// Route target: /agent/dispatch/new
export default function AgentDispatchNewStartPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [clientType, setClientType] = useState("rider");
  const [serviceType, setServiceType] = useState("ride");

  const handleContinue = () => {
    window.sessionStorage.setItem(
      "evzone_dispatch_draft",
      JSON.stringify({ clientType, serviceType })
    );
    navigate(`/agent/dispatch/new/${serviceType}`);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-4xl mx-auto">
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
              New manual booking
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Capture a booking from a phone call, WhatsApp or in-person
              request in a few quick steps.
            </Typography>
          </Box>

          <Chip
            label="Step 1 of 3 · Select type"
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
          {/* Client type */}
          <Grid item xs={12} md={5}>
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
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                    mb: 0.5,
                  }}
                >
                  Who is this booking for?
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block", mb: 1.5 }}
                >
                  Choose the client type based on how the request came in.
                </Typography>

                <Stack spacing={1.2}>
                  {CLIENT_TYPES.map((type) => {
                    const isActive = clientType === type.key;
                    return (
                      <Box
                        key={type.key}
                        onClick={() => setClientType(type.key)}
                        className="cursor-pointer rounded-2xl px-3 py-2.5"
                        sx={{
                          backgroundColor: isActive
                            ? isDark
                              ? "rgba(3,205,140,0.16)"
                              : "rgba(240,253,250,1)"
                            : isDark
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(248,250,252,0.95)",
                          border:
                            "1px solid " +
                            (isActive
                              ? "rgba(34,197,94,0.7)"
                              : "rgba(203,213,225,0.9)"),
                          display: "flex",
                          alignItems: "flex-start",
                          gap: 1,
                        }}
                      >
                        <Box
                          className="flex items-center justify-center rounded-full mt-0.5"
                          sx={{
                            width: 28,
                            height: 28,
                            backgroundColor: isActive
                              ? "rgba(3,205,140,0.2)"
                              : "rgba(15,23,42,0.06)",
                            color: isActive
                              ? "#047857"
                              : isDark
                              ? "#9ca3af"
                              : "#6b7280",
                          }}
                        >
                          {type.icon}
                        </Box>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            {type.label}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {type.description}
                          </Typography>
                        </Box>
                      </Box>
                    );
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Service type */}
          <Grid item xs={12} md={7}>
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
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                    mb: 0.5,
                  }}
                >
                  What service do they need?
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block", mb: 1.5 }}
                >
                  EV-first dispatch: you can create rides, deliveries and
                  more from one place.
                </Typography>

                <Grid container spacing={1.5}>
                  {SERVICE_TYPES.map((service) => {
                    const isActive = serviceType === service.key;
                    const isPrimary = service.primary;
                    return (
                      <Grid item xs={12} sm={6} key={service.key}>
                        <Box
                          onClick={() =>
                            isPrimary ? setServiceType(service.key) : null
                          }
                          className={
                            "rounded-2xl px-3 py-2.5 cursor-pointer" +
                            (isPrimary ? "" : " opacity-70")
                          }
                          sx={{
                            backgroundColor: isActive
                              ? isDark
                                ? "rgba(3,205,140,0.16)"
                                : "rgba(240,253,250,1)"
                              : isDark
                              ? "rgba(15,23,42,0.9)"
                              : "rgba(248,250,252,0.95)",
                            border:
                              "1px solid " +
                              (isActive
                                ? "rgba(34,197,94,0.7)"
                                : "rgba(203,213,225,0.9)"),
                            display: "flex",
                            alignItems: "flex-start",
                            gap: 1,
                          }}
                        >
                          <Box
                            className="flex items-center justify-center rounded-full mt-0.5"
                            sx={{
                              width: 28,
                              height: 28,
                              backgroundColor: isActive
                                ? "rgba(3,205,140,0.2)"
                                : "rgba(15,23,42,0.06)",
                              color: isActive
                                ? "#047857"
                                : isDark
                                ? "#9ca3af"
                                : "#6b7280",
                            }}
                          >
                            {service.icon}
                          </Box>
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: isDark ? "#e5e7eb" : "#111827",
                              }}
                            >
                              {service.label}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY, display: "block" }}
                            >
                              {service.description}
                            </Typography>
                            {!isPrimary && (
                              <Typography
                                variant="caption"
                                sx={{
                                  color: EVZONE_GREY,
                                  fontStyle: "italic",
                                }}
                              >
                                Coming soon in this build.
                              </Typography>
                            )}
                          </Box>
                        </Box>
                      </Grid>
                    );
                  })}
                </Grid>

                <Stack
                  direction="row"
                  justifyContent="flex-end"
                  spacing={1.5}
                  sx={{ mt: 2.5 }}
                >
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontSize: 13,
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleContinue}
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
                    Continue
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
