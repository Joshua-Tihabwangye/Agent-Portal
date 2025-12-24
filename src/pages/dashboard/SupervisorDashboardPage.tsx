import React from "react";
import { Box, Card, CardActionArea, CardContent, Typography, Stack, Chip, LinearProgress, Divider, Grid, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { EVFleetAnalyticsMicroWidgets } from "../../components/ev/EVFleetAnalyticsMicroWidgets";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const teamSummary = [
  {
    key: "tickets-today",
    label: "Tickets handled today",
    value: 124,
    meta: "+18 vs yesterday",
    icon: <GroupOutlinedIcon fontSize="small" />,
    href: "/agent/support/tickets",
  },
  {
    key: "sla",
    label: "Overall SLA",
    value: "95%",
    meta: "Target 92%",
    icon: <SpeedOutlinedIcon fontSize="small" />,
    href: "/agent/dashboard/supervisor",
  },
  {
    key: "aht",
    label: "Avg handle time",
    value: "5m 48s",
    meta: "Improved by 9%",
    icon: <TimelineOutlinedIcon fontSize="small" />,
    href: "/agent/support/tickets",
  },
  {
    key: "training",
    label: "Training completion",
    value: "88%",
    meta: "Core modules",
    icon: <WorkspacePremiumOutlinedIcon fontSize="small" />,
    href: "/agent/training",
  },
];

const topAgents = [
  {
    initials: "AK",
    name: "Amina K.",
    role: "Support Tier 1",
    handled: 32,
    sla: "98%",
  },
  {
    initials: "JM",
    name: "James M.",
    role: "Dispatch",
    handled: 21,
    sla: "96%",
  },
  {
    initials: "LN",
    name: "Linda N.",
    role: "Onboarding",
    handled: 18,
    sla: "94%",
  },
];

const incidentStats = [
  {
    label: "Open safety incidents",
    value: 4,
    color: "#b91c1c",
  },
  {
    label: "Resolved last 7 days",
    value: 19,
    color: "#16a34a",
  },
  {
    label: "Avg time to close",
    value: "2h 14m",
    color: "#fb923c",
  },
];

export default function AgentSupervisorDashboardPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const trainingCompletion = 88; // placeholder

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
            Supervisor dashboard
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: EVZONE_GREY, maxWidth: 520 }}
          >
            Monitor your team&apos;s workload, SLA performance, training and
            safety incidents across all Agent queues.
          </Typography>
        </Box>

        <Chip
          label="Supervisor view"
          size="small"
          sx={{
            borderRadius: 999,
            fontSize: 11,
            textTransform: "none",
            backgroundColor: isDark
              ? "rgba(15,23,42,0.9)"
              : "rgba(254,249,195,0.9)",
            border: "1px solid rgba(234,179,8,0.6)",
            color: isDark ? "#e5e7eb" : "#92400e",
            fontWeight: 600,
          }}
        />
      </Box>

      {/* Team summary cards */}
      <Grid container spacing={2} className="mb-4">
        {teamSummary.map((card) => (
          <Grid item xs={12} sm={6} lg={3} key={card.key}>
            <Card
              elevation={1}
              className="ev-gradient-soft"
              sx={{
                borderRadius: 3,
                backgroundColor: "transparent",
                boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
                border: "1px solid " + (isDark ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.65)"),
                overflow: "hidden",
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
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: isDark ? "#cbd5e1" : "#1f2937", display: "block", mt: 0.75 }}
                  >
                    {card.meta} · tap to open
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Set 18: Analytics micro widgets (EV fleet utilization & safety) */}
      <Box className="mb-4">
        <EVFleetAnalyticsMicroWidgets
          fleet={{
            utilizationPct: 71,
            avgBatteryPct: 58,
            lowBatteryDrivers: 6,
            chargingQueue: 3,
          }}
          safety={{
            sosToday: 2,
            sosUnresolved: 1,
            incidentRate: 0.6,
          }}
        />
      </Box>

      <Grid container spacing={2}>
        {/* Training and SLA distribution */}
        <Grid item xs={12} md={7}>
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
                    Training &amp; SLA overview
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Track completion of mandatory modules and SLA tiers.
                  </Typography>
                </Box>

                <Chip
                  size="small"
                  label="Team of 18 agents"
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor: "rgba(191,219,254,0.25)",
                    color: "#1d4ed8",
                    border: "1px solid rgba(59,130,246,0.45)",
                  }}
                />
              </Stack>

              <Box sx={{ mb: 2.5 }}>
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
                    Training completion (core modules)
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    {trainingCompletion}%
                  </Typography>
                </Stack>
                <LinearProgress
                  variant="determinate"
                  value={trainingCompletion}
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

              <Grid container spacing={1.5}>
                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                        color: EVZONE_GREY,
                        fontWeight: 600,
                      }}
                    >
                      Queue distribution
                    </Typography>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="body2"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Support Tier 1
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        52 tickets
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="body2"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Dispatch
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        28 bookings
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="body2"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Onboarding
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        17 drivers
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>

                <Grid item xs={12} sm={6}>
                  <Stack spacing={1}>
                    <Typography
                      variant="caption"
                      sx={{
                        textTransform: "uppercase",
                        letterSpacing: 0.4,
                        color: EVZONE_GREY,
                        fontWeight: 600,
                      }}
                    >
                      SLA tiers
                    </Typography>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="body2"
                        sx={{ color: EVZONE_GREY }}
                      >
                        &lt; 5 min
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#16a34a" }}
                      >
                        63%
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="body2"
                        sx={{ color: EVZONE_GREY }}
                      >
                        5–10 min
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#ea580c" }}
                      >
                        27%
                      </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent="space-between">
                      <Typography
                        variant="body2"
                        sx={{ color: EVZONE_GREY }}
                      >
                        &gt; 10 min
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{ fontWeight: 600, color: "#b91c1c" }}
                      >
                        10%
                      </Typography>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Top agents & incidents */}
        <Grid item xs={12} md={5}>
          <Stack spacing={2}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border: "1px solid " +
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
                  mb={2}
                >
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Top agents today
                  </Typography>
                  <Chip
                    size="small"
                    label="By volume &amp; SLA"
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(191,219,254,0.3)",
                      color: "#1d4ed8",
                    }}
                  />
                </Stack>

                <Stack spacing={1.2}>
                  {topAgents.map((agent) => (
                    <Box
                      key={agent.name}
                      className="flex items-center justify-between rounded-2xl px-3 py-2.5"
                      sx={{
                        backgroundColor: isDark
                          ? "rgba(15,23,42,0.9)"
                          : "rgba(248,250,252,0.95)",
                        border: "1px solid rgba(203,213,225,0.8)",
                      }}
                    >
                      <Box className="flex items-center gap-3">
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
                          {agent.initials}
                        </Avatar>
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            {agent.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {agent.role}
                          </Typography>
                        </Box>
                      </Box>

                      <Box className="text-right">
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {agent.handled} items
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: "#16a34a", fontWeight: 600 }}
                        >
                          SLA {agent.sla}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border: "1px solid " +
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
                  mb={2}
                >
                  <Box className="flex items-center gap-1.5">
                    <ReportProblemOutlinedIcon
                      sx={{ fontSize: 20, color: "#f97316" }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Safety &amp; incidents
                    </Typography>
                  </Box>

                  <Chip
                    size="small"
                    label="View SOS queue"
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(254,226,226,0.7)",
                      color: "#991b1b",
                    }}
                  />
                </Stack>

                <Grid container spacing={1.5}>
                  {incidentStats.map((stat) => (
                    <Grid item xs={12} sm={4} key={stat.label}>
                      <Box
                        className="rounded-2xl px-3 py-2.5 h-full"
                        sx={{
                          backgroundColor: isDark
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(248,250,252,0.95)",
                          border: "1px solid rgba(203,213,225,0.9)",
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY, display: "block" }}
                        >
                          {stat.label}
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            mt: 0.5,
                            fontWeight: 700,
                            color: stat.color,
                          }}
                        >
                          {stat.value}
                        </Typography>
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}
