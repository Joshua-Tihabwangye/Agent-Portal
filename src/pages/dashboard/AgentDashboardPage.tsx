import React, { useState } from "react";
import { Box, Card, CardActionArea, CardContent, Typography, Stack, Chip, LinearProgress, Divider, Button, IconButton, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import PlayArrowOutlinedIcon from "@mui/icons-material/PlayArrowOutlined";
import SnoozeOutlinedIcon from "@mui/icons-material/SnoozeOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import PeriodSelector from "../../components/shared/PeriodSelector";
import type { PeriodValue } from "../../components/shared/PeriodSelector";
import { RevenuePieChart, TrendLineChart, CHART_COLORS } from "../../components/shared/AnalyticsCharts";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const summaryCards = [
  {
    key: "tickets-open",
    label: "MY OPEN TICKETS",
    value: 8,
    icon: <SupportAgentOutlinedIcon fontSize="small" />,
    href: "/agent/support/tickets",
    color: CHART_COLORS[2], // Blue
    details: [
      { label: "Longest waiting", value: "45m", warning: true },
      { label: "High priority", value: "3", warning: true }
    ]
  },
  {
    key: "tickets-due",
    label: "DUE TODAY (SLA)",
    value: 3,
    icon: <AccessTimeOutlinedIcon fontSize="small" />,
    href: "/agent/support/tickets?filter=sla-due",
    color: CHART_COLORS[4], // Red
    details: [
      { label: "Next breach in", value: "17m", warning: true },
      { label: "At risk", value: "2", warning: true }
    ]
  },
  {
    key: "onboarding",
    label: "ONBOARDING CASES",
    value: 5,
    icon: <AssignmentTurnedInOutlinedIcon fontSize="small" />,
    href: "/agent/onboarding/drivers",
    color: CHART_COLORS[5], // Teal
    details: [
      { label: "Awaiting review", value: "3", warning: false },
      { label: "Missing docs", value: "2", warning: true }
    ]
  },
  {
    key: "dispatch",
    label: "ACTIVE DISPATCHES",
    value: 4,
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
    href: "/agent/dispatch/board",
    color: CHART_COLORS[1], // Orange
    details: [
      { label: "Stuck", value: "1", warning: true },
      { label: "Longest wait", value: "9m", warning: false }
    ]
  },
];

const todayTimeline = [
  {
    time: "09:00",
    title: "Follow-up on refund ticket",
    meta: "Rider dispute – trip ID 8F21",
    href: "/agent/support/tickets/TCK-8F21",
    status: "at-risk" as const,
    statusLabel: "At risk"
  },
  {
    time: "10:30",
    title: "Verify driver documents",
    meta: "2 new drivers – Kampala",
    href: "/agent/onboarding/drivers",
    status: "queued" as const,
    statusLabel: "Queued"
  },
  {
    time: "12:00",
    title: "Dispatch scheduled school shuttle",
    meta: "Morning school route – 14 students",
    href: "/agent/dispatch/board",
    status: "at-risk" as const,
    statusLabel: "At risk"
  },
  {
    time: "15:00",
    title: "Safety check: SOS follow-up",
    meta: "Review incident from last night",
    href: "/agent/safety/sos",
    status: "queued" as const,
    statusLabel: "Queued"
  },
];

// Mock analytics data - comprehensive agent metrics
const mockAnalytics = {
  ticketTrend: [
    { name: "Mon", value: 12, resolved: 10 }, { name: "Tue", value: 18, resolved: 15 }, { name: "Wed", value: 14, resolved: 12 },
    { name: "Thu", value: 22, resolved: 18 }, { name: "Fri", value: 16, resolved: 14 }, { name: "Sat", value: 8, resolved: 7 }, { name: "Sun", value: 5, resolved: 4 }
  ],
  ticketCategory: [
    { name: "Tech", value: 45 }, { name: "Billing", value: 25 }, { name: "Safety", value: 10 }, { name: "Other", value: 20 }
  ],
  responseTime: [
    { name: "Mon", value: 4.2 }, { name: "Tue", value: 3.8 }, { name: "Wed", value: 5.1 },
    { name: "Thu", value: 3.5 }, { name: "Fri", value: 4.0 }, { name: "Sat", value: 2.8 }, { name: "Sun", value: 2.2 }
  ],
  slaCompliance: [
    { name: "On Time", value: 92 }, { name: "Breached", value: 8 }
  ],
  performanceMetrics: {
    avgHandleTime: "6m 12s",
    firstResponseTime: "2m 45s",
    ticketsResolved: 14,
    customerSatisfaction: 4.7
  }
};

export default function AgentDashboardPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [period, setPeriod] = useState<PeriodValue>("today");

  const workloadCompletion = 65; // placeholder

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4 w-full">
      {/* Header */}
      <Box className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 800,
              color: isDark ? "#e5e7eb" : "#111827",
              mb: 0.5,
            }}
          >
            My dashboard
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: EVZONE_GREY, maxWidth: 460 }}
          >
            Overview of your daily tasks, tickets, and performance metrics.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <PeriodSelector value={period} onChange={setPeriod} compact />
          <Chip
            label="Agent view"
            size="small"
            sx={{
              borderRadius: 2,
              fontWeight: 700,
              backgroundColor: isDark ? "rgba(30,58,138,0.3)" : "rgba(219,234,254,0.7)",
              color: "#3b82f6",
              border: `1px solid ${isDark ? "#1e40af" : "#93c5fd"}`,
            }}
          />
        </Stack>
      </Box>

      {/* Summary cards - Full Width */}
      <Grid container spacing={2} className="mb-6">
        {summaryCards.map((card) => (
          <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.key}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                transition: "all 0.2s ease",
                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: `0 12px 24px ${card.color}15`,
                  borderColor: `${card.color}40`,
                },
              }}
            >
              <CardContent sx={{ p: 2.5 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                  <Box
                    sx={{
                      p: 1,
                      borderRadius: 2,
                      bgcolor: `${card.color}15`,
                      color: card.color,
                      display: "flex"
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#94a3b8" : "#64748b",
                      letterSpacing: 0.5
                    }}
                  >
                    {card.label}
                  </Typography>
                </Stack>

                <Typography variant="h3" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#0f172a", mb: 2 }}>
                  {card.value}
                </Typography>

                {/* Detail metrics */}
                <Stack spacing={1} mb={2}>
                  {card.details.map((detail, idx) => (
                    <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
                      <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                        {detail.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        fontWeight={700}
                        sx={{
                          color: detail.warning ? EVZONE_ORANGE : (isDark ? "#e5e7eb" : "#374151"),
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5
                        }}
                      >
                        {detail.warning && <WarningAmberOutlinedIcon sx={{ fontSize: 12 }} />}
                        {detail.value}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                {/* Open button */}
                <Button
                  variant="text"
                  size="small"
                  endIcon={<OpenInNewOutlinedIcon sx={{ fontSize: 14 }} />}
                  onClick={() => navigate(card.href)}
                  sx={{
                    width: "100%",
                    justifyContent: "flex-end",
                    color: card.color,
                    fontWeight: 600,
                    fontSize: 12,
                    p: 0,
                    "&:hover": {
                      backgroundColor: "transparent",
                      textDecoration: "underline"
                    }
                  }}
                >
                  Open
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Workload & SLA block */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
              border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
              height: "100%",
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="subtitle1" fontWeight={700}>
                  Workload Progress
                </Typography>
                <Typography variant="h6" fontWeight={800} color={EVZONE_GREEN}>
                  {workloadCompletion}%
                </Typography>
              </Stack>

              <Box sx={{ mb: 4 }}>
                <LinearProgress
                  variant="determinate"
                  value={workloadCompletion}
                  sx={{
                    height: 10,
                    borderRadius: 999,
                    backgroundColor: isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,0.6)",
                    "& .MuiLinearProgress-bar": {
                      backgroundImage: `linear-gradient(90deg, ${EVZONE_GREEN}, ${EVZONE_ORANGE})`,
                    },
                  }}
                />
              </Box>

              <Stack spacing={2} divider={<Divider flexItem sx={{ borderColor: isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,0.8)" }} />}>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Tickets Resolved</Typography>
                  <Typography variant="body2" fontWeight={700}>14</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Avg Handle Time</Typography>
                  <Typography variant="body2" fontWeight={700}>6m 12s</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">SLA Compliance</Typography>
                  <Typography variant="body2" fontWeight={700} color={EVZONE_GREEN}>98%</Typography>
                </Stack>
                <Stack direction="row" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">Oldest pending ticket</Typography>
                  <Typography variant="body2" fontWeight={700} color={EVZONE_ORANGE}>45m</Typography>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Analytics Section - New */}
        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
              border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
              height: "100%",
              p: 2
            }}
          >
            <TrendLineChart
              title="Ticket Volume"
              data={mockAnalytics.ticketTrend}
              dataKeys={["value"]}
              height={220}
            />
          </Card>
        </Grid>

        <Grid size={{ xs: 12, md: 12, lg: 4 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
              border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
              height: "100%",
              p: 2
            }}
          >
            <RevenuePieChart
              title="Work Distribution"
              data={mockAnalytics.ticketCategory}
              height={220}
              showLegend={true}
            />
          </Card>
        </Grid>

        {/* Timeline - Full Width Row */}
        <Grid size={{ xs: 12 }}>
          <Card
            elevation={0}
            sx={{
              borderRadius: 3,
              backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
              border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  Today&apos;s Schedule
                </Typography>
                <Chip
                  icon={<EventAvailableOutlinedIcon sx={{ fontSize: "16px !important" }} />}
                  label="Shift ends: 17:00"
                  size="small"
                  color="warning"
                  variant="outlined"
                />
              </Stack>

              <Grid container spacing={2}>
                {todayTimeline.map((item) => (
                  <Grid size={{ xs: 12, md: 6, lg: 3 }} key={item.time}>
                    <Box
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,0.8)"}`,
                        backgroundColor: isDark ? "rgba(15,23,42,0.4)" : "rgba(248,250,252,0.6)",
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: EVZONE_GREEN,
                          backgroundColor: isDark ? "rgba(3,205,140,0.05)" : "rgba(3,205,140,0.02)",
                        }
                      }}
                    >
                      {/* Header with time and status */}
                      <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1.5}>
                        <Box
                          sx={{
                            px: 1,
                            py: 0.5,
                            borderRadius: 1,
                            bgcolor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                            color: "text.secondary",
                            fontSize: 12,
                            fontWeight: 700,
                            height: "fit-content"
                          }}
                        >
                          {item.time}
                        </Box>
                        {item.status && (
                          <Chip
                            label={item.statusLabel}
                            size="small"
                            variant={item.status === "at-risk" ? "filled" : "outlined"}
                            color={item.status === "at-risk" ? "warning" : "default"}
                            sx={{
                              height: 20,
                              fontSize: 10,
                              fontWeight: 700,
                              ...(item.status !== "at-risk" && {
                                borderColor: isDark ? "rgba(148,163,184,0.2)" : "rgba(203,213,225,1)",
                                color: isDark ? "#94a3b8" : "#64748b"
                              })
                            }}
                          />
                        )}
                      </Stack>

                      {/* Content */}
                      <Box mb={2} sx={{ flexGrow: 1 }}>
                        <Typography variant="body2" fontWeight={700} mb={0.5} sx={{ color: isDark ? "#e5e7eb" : "#0f172a" }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" sx={{ lineHeight: 1.4, display: "block" }}>
                          {item.meta}
                        </Typography>
                      </Box>

                      {/* Actions */}
                      <Stack direction="row" spacing={1} mt="auto">
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<PlayArrowOutlinedIcon sx={{ fontSize: 16 }} />}
                          onClick={() => navigate(item.href)}
                          sx={{
                            bgcolor: EVZONE_GREEN,
                            color: "#0f172a",
                            fontWeight: 700,
                            fontSize: 11,
                            boxShadow: "none",
                            py: 0.5,
                            "&:hover": { bgcolor: "#02b57a" }
                          }}
                        >
                          Start
                        </Button>
                        <IconButton
                          size="small"
                          sx={{
                            borderRadius: 1,
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.2)" : "rgba(203,213,225,1)"}`,
                            color: "text.secondary"
                          }}
                        >
                          <SnoozeOutlinedIcon fontSize="small" sx={{ fontSize: 16 }} />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
