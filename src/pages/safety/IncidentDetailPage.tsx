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
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import BlockOutlinedIcon from "@mui/icons-material/BlockOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Placeholder incident; in real app load via incidentId.
const incident = {
  id: "INC-7001",
  severity: "High",
  status: "Under review",
  time: "Today · 09:05",
  location: "Ntinda Junction",
  description:
    "Driver reports aggressive behaviour from rider, including verbal threats at pickup.",
  userType: "Driver",
  userName: "Kato R.",
  userPhone: "+256 704 000 111",
  tripId: "BK-2060",
  vehicle: "Nissan Leaf · UBF 341X",
};

export default function AgentIncidentDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

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
              Incident {incident.id}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Safety incident report. Review the details and take immediate
              actions if required.
            </Typography>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={incident.status}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor:
                  incident.status === "Under review"
                    ? "rgba(56,189,248,0.18)"
                    : "rgba(22,163,74,0.16)",
                color:
                  incident.status === "Under review" ? "#0369a1" : "#166534",
                border:
                  incident.status === "Under review"
                    ? "1px solid rgba(56,189,248,0.6)"
                    : "1px solid rgba(34,197,94,0.6)",
              }}
            />
            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
              {incident.time}
            </Typography>
          </Stack>
        </Box>

        <Grid container spacing={2.4}>
          {/* Left column: summary & user */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
                mb: 2,
              }}
            >
              <CardContent sx={{ p: 2.2 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mb={1}
                >
                  <WarningAmberOutlinedIcon
                    sx={{ fontSize: 20, color: "#f97316" }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Incident summary
                  </Typography>
                </Stack>

                <Stack spacing={0.8}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      label={incident.severity + " severity"}
                      sx={{
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        backgroundColor:
                          incident.severity === "High"
                            ? "rgba(248,113,113,0.2)"
                            : incident.severity === "Medium"
                              ? "rgba(250,204,21,0.18)"
                              : "rgba(22,163,74,0.12)",
                        color:
                          incident.severity === "High"
                            ? "#b91c1c"
                            : incident.severity === "Medium"
                              ? "#92400e"
                              : "#166534",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Trip {incident.tripId}
                    </Typography>
                  </Stack>

                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Location
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <PlaceOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {incident.location}
                      </Typography>
                    </Stack>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Description
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: isDark ? "#e5e7eb" : "#111827" }}
                    >
                      {incident.description}
                    </Typography>
                  </Stack>
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
                  (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
              }}
            >
              <CardContent sx={{ p: 2.2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                    mb: 1,
                  }}
                >
                  Involved user
                </Typography>

                <Stack spacing={0.8}>
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
                        {incident.userName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        {incident.userType}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneEnabledOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREY }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      {incident.userPhone}
                    </Typography>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <DirectionsCarOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      {incident.vehicle}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column: timeline & quick actions */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
                mb: 2,
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
                    <AccessTimeOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Incident timeline
                    </Typography>
                  </Stack>
                  <Chip
                    size="small"
                    label="Live"
                    sx={{
                      borderRadius: 999,
                      fontSize: 10,
                      textTransform: "none",
                      backgroundColor: "rgba(248,113,113,0.18)",
                      color: "#b91c1c",
                      border: "1px solid rgba(248,113,113,0.6)",
                    }}
                  />
                </Stack>

                <Stack spacing={1.4}>
                  {["SOS triggered", "Agent acknowledged", "Action in progress"].map(
                    (label, idx, arr) => (
                      <Stack
                        key={label}
                        direction="row"
                        spacing={1.6}
                        alignItems="flex-start"
                      >
                        <Box className="flex flex-col items-center">
                          <Box
                            className="w-2 h-2 rounded-full"
                            sx={{
                              backgroundColor:
                                idx === 0
                                  ? "#b91c1c"
                                  : idx === arr.length - 1
                                    ? EVZONE_ORANGE
                                    : EVZONE_GREEN,
                            }}
                          />
                          {idx !== arr.length - 1 && (
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
                            {label}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {/* Placeholder times */}
                            {idx === 0
                              ? "09:05"
                              : idx === 1
                                ? "09:06"
                                : "09:07"}
                          </Typography>
                        </Box>
                      </Stack>
                    )
                  )}
                </Stack>
              </CardContent>
            </Card>

            <EmergencyQuickActionsPanel
              isDark={isDark}
              userName={incident.userName}
              userPhone={incident.userPhone}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function EmergencyQuickActionsPanel({ isDark, userName, userPhone }) {
  const handleCall = () => {
    console.log("Call user", { userName, userPhone });
  };

  const handleNotifySupervisor = () => {
    console.log("Notify supervisor about incident");
  };

  const handleFlagAccount = () => {
    console.log("Flag account for review", { userName });
  };

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
      <CardContent sx={{ p: 2.2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1.5}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <WarningAmberOutlinedIcon
              sx={{ fontSize: 18, color: "#f97316" }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Emergency quick actions
            </Typography>
          </Stack>
          <Chip
            size="small"
            label="Follow protocol"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: "rgba(248,250,252,1)",
              color: EVZONE_GREY,
            }}
          />
        </Stack>

        <Typography
          variant="caption"
          sx={{ color: EVZONE_GREY, display: "block", mb: 1.5 }}
        >
          Use these actions only when appropriate according to your internal
          safety and legal guidelines.
        </Typography>

        <Stack spacing={1.2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PhoneEnabledOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={handleCall}
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
            Call {userName}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <NotificationsActiveOutlinedIcon sx={{ fontSize: 18 }} />
            }
            onClick={handleNotifySupervisor}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              fontSize: 14,
            }}
          >
            Notify supervisor
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<FlagOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={handleFlagAccount}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              fontSize: 14,
              color: "#b91c1c",
              borderColor: "rgba(248,113,113,0.7)",
              "&:hover": {
                borderColor: "#b91c1c",
                backgroundColor: "rgba(254,226,226,0.6)",
              },
            }}
          >
            Flag account for review
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
