import React from "react";
import { Box, Card, CardActionArea, CardContent, Typography, Stack, Chip, LinearProgress, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const summaryCards = [
  {
    key: "tickets-open",
    label: "My open tickets",
    value: 8,
    chip: "+2 today",
    icon: <SupportAgentOutlinedIcon fontSize="small" />,
    href: "/agent/support/tickets",
  },
  {
    key: "tickets-due",
    label: "Due today (SLA)",
    value: 3,
    chip: "Within 1 hour",
    icon: <AccessTimeOutlinedIcon fontSize="small" />,
    href: "/agent/support/tickets",
  },
  {
    key: "onboarding",
    label: "Onboarding cases",
    value: 5,
    chip: "Drivers awaiting review",
    icon: <AssignmentTurnedInOutlinedIcon fontSize="small" />,
    href: "/agent/onboarding/drivers",
  },
  {
    key: "dispatch",
    label: "Active dispatches",
    value: 4,
    chip: "In progress",
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
    href: "/agent/dispatch/board",
  },
];

const todayTimeline = [
  {
    time: "09:00",
    title: "Follow-up on refund ticket",
    meta: "Rider dispute – trip ID 8F21",
    href: "/agent/support/tickets",
  },
  {
    time: "10:30",
    title: "Verify driver documents",
    meta: "2 new drivers – Kampala",
    href: "/agent/onboarding/drivers",
  },
  {
    time: "12:00",
    title: "Dispatch scheduled school shuttle",
    meta: "Morning school route – 14 students",
    href: "/agent/dispatch/board",
  },
  {
    time: "15:00",
    title: "Safety check: SOS follow-up",
    meta: "Review incident from last night",
    href: "/agent/safety/sos",
  },
];

export default function AgentDashboardPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const workloadCompletion = 65; // placeholder

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4">
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
            My dashboard
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: EVZONE_GREY, maxWidth: 460 }}
          >
            See your tickets, onboarding cases and dispatch workload for today.
          </Typography>
        </Box>

        <Chip
          label="Agent view"
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

      {/* Summary cards */}
      <Grid container spacing={2} className="mb-4">
        {summaryCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.key}>
            <Card
              elevation={1}
              className="ev-gradient-soft"
              sx={{
                borderRadius: 3,
                backgroundColor: "transparent",
                boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
                overflow: "hidden",
                border: "1px solid " + (isDark ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.65)"),
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 16px 40px rgba(2,6,23,0.18)",
                },
              }}
            >
              <CardActionArea onClick={() => navigate(card.href)} sx={{ height: "100%" }}>
                <CardContent sx={{ py: 1.8, px: 2.2 }}>
                  <Stack direction="row" justifyContent="space-between" mb={1}>
                    <Typography
                      variant="caption"
                      sx={{
                        color: isDark ? "#cbd5e1" : "#0f172a",
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                        fontWeight: 700,
                      }}
                    >
                      {card.label}
                    </Typography>
                    <Box
                      className="flex items-center justify-center rounded-full"
                      sx={{
                        width: 30,
                        height: 30,
                        backgroundColor: "rgba(255,255,255,0.32)",
                        border: "1px solid rgba(255,255,255,0.5)",
                        color: "#0f172a",
                      }}
                    >
                      {card.icon}
                    </Box>
                  </Stack>
                  <Stack direction="row" alignItems="baseline" spacing={1}>
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: 800,
                        color: isDark ? "#e2e8f0" : "#0f172a",
                      }}
                    >
                      {card.value}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: isDark ? "#cbd5e1" : "#1e293b" }}
                    >
                      items
                    </Typography>
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: isDark ? "#cbd5e1" : "#1f2937", display: "block", mt: 0.75 }}
                  >
                    {card.chip} · tap to open
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={2}>
        {/* Workload & SLA block */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            elevation={1}
            sx={{
              borderRadius: 3,
              backgroundColor: isDark ? "#020617" : "#ffffff",
              border: "1px solid " +
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
                mb={2}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Today&apos;s workload
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Progress across your current assigned items.
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label="SLA 92%"
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

              <Box sx={{ mb: 2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography
                    variant="body2"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Completion towards end of shift
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    {workloadCompletion}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={workloadCompletion}
                  sx={{
                    height: 8,
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

              <Divider
                sx={{
                  my: 2,
                  borderColor: isDark
                    ? "rgba(30,64,175,0.7)"
                    : "rgba(226,232,240,1)",
                }}
              />

              <Stack spacing={1.5}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Tickets resolved today
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    14
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Average handle time
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    6m 12s
                  </Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography
                    variant="body2"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Oldest pending ticket
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: "#b45309",
                    }}
                  >
                    38 min
                  </Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Today timeline */}
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card
            elevation={1}
            sx={{
              borderRadius: 3,
              backgroundColor: isDark ? "#020617" : "#ffffff",
              border: "1px solid " +
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
                mb={2}
              >
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Today&apos;s focus
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Upcoming tasks and checkpoints
                  </Typography>
                </Box>

                <Stack direction="row" spacing={1} alignItems="center">
                  <EventAvailableOutlinedIcon
                    sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                  />
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Shift ends in 5h 20m
                  </Typography>
                </Stack>
              </Stack>

              <Stack spacing={1.6}>
                {todayTimeline.map((item) => (
                  <Box
                    key={item.time}
                    className="flex gap-3 cursor-pointer"
                    onClick={() => navigate(item.href)}
                    sx={{
                      "&:hover .timeline-item": {
                        backgroundColor: isDark
                          ? "rgba(3,205,140,0.08)"
                          : "rgba(3,205,140,0.06)",
                        borderColor: EVZONE_GREEN,
                      },
                    }}
                  >
                    <Box className="flex flex-col items-center mt-0.5">
                      <Typography
                        variant="caption"
                        sx={{
                          color: EVZONE_GREY,
                          fontVariantNumeric: "tabular-nums",
                        }}
                      >
                        {item.time}
                      </Typography>
                      <Box
                        className="w-px flex-1 mt-1"
                        sx={{
                          background:
                            "linear-gradient(to bottom, rgba(148,163,184,0.7), transparent)",
                        }}
                      />
                    </Box>

                    <Box
                      className="timeline-item flex-1 rounded-2xl px-3 py-2.5"
                      sx={{
                        backgroundColor: isDark
                          ? "rgba(15,23,42,0.9)"
                          : "rgba(248,250,252,0.9)",
                        border: "1px solid rgba(203,213,225,0.7)",
                        transition: "background-color 0.2s ease, border-color 0.2s ease",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {item.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        {item.meta}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
