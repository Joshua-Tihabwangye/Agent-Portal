import React, { useState } from "react";
import { Box, Card, CardActionArea, CardContent, Typography, Stack, Chip, LinearProgress, Divider, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined";
import PeriodSelector from "../../components/shared/PeriodSelector";
import type { PeriodValue } from "../../components/shared/PeriodSelector";
import { RevenuePieChart, TrendLineChart, CHART_COLORS } from "../../components/shared/AnalyticsCharts";

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
    color: CHART_COLORS[2], // Blue
  },
  {
    key: "tickets-due",
    label: "Due today (SLA)",
    value: 3,
    chip: "Within 1 hour",
    icon: <AccessTimeOutlinedIcon fontSize="small" />,
    href: "/agent/support/tickets",
    color: CHART_COLORS[4], // Red
  },
  {
    key: "onboarding",
    label: "Onboarding cases",
    value: 5,
    chip: "Drivers awaiting review",
    icon: <AssignmentTurnedInOutlinedIcon fontSize="small" />,
    href: "/agent/onboarding/drivers",
    color: CHART_COLORS[5], // Teal
  },
  {
    key: "dispatch",
    label: "Active dispatches",
    value: 4,
    chip: "In progress",
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
    href: "/agent/dispatch/board",
    color: CHART_COLORS[1], // Orange
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
              <CardActionArea onClick={() => navigate(card.href)} sx={{ height: "100%", p: 2 }}>
                <Stack direction="row" justifyContent="space-between" mb={2}>
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
                  <Chip
                    label={card.chip}
                    size="small"
                    sx={{
                      height: 20,
                      fontSize: 10,
                      fontWeight: 700,
                      bgcolor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
                      color: isDark ? "#94a3b8" : "#64748b"
                    }}
                  />
                </Stack>
                <Typography variant="h4" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#0f172a", mb: 0.5 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" sx={{ color: EVZONE_GREY, fontWeight: 500 }}>
                  {card.label}
                </Typography>
              </CardActionArea>
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
                      onClick={() => navigate(item.href)}
                      sx={{
                        p: 2,
                        borderRadius: 2,
                        cursor: "pointer",
                        border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,0.8)"}`,
                        backgroundColor: isDark ? "rgba(15,23,42,0.4)" : "rgba(248,250,252,0.6)",
                        transition: "all 0.2s",
                        "&:hover": {
                          borderColor: EVZONE_GREEN,
                          backgroundColor: isDark ? "rgba(3,205,140,0.05)" : "rgba(3,205,140,0.02)",
                        }
                      }}
                    >
                      <Stack direction="row" spacing={1.5}>
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
                        <Box>
                          <Typography variant="body2" fontWeight={600} mb={0.5}>
                            {item.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.meta}
                          </Typography>
                        </Box>
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
