import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Stack, Avatar, Button, Chip, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import FilterListIcon from "@mui/icons-material/FilterList";
import GroupAddOutlinedIcon from "@mui/icons-material/GroupAddOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import AssignmentLateOutlinedIcon from "@mui/icons-material/AssignmentLateOutlined";
import PeriodSelector from "../../components/shared/PeriodSelector";
import type { PeriodValue } from "../../components/shared/PeriodSelector";
import { RevenuePieChart, TrendBarChart, TrendLineChart, CHART_COLORS } from "../../components/shared/AnalyticsCharts";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";

const statCards = [
  {
    key: "cases",
    label: "Total cases",
    value: 142,
    trend: "+12%",
    icon: <SupportAgentOutlinedIcon fontSize="small" />,
    color: CHART_COLORS[0], // Green
  },
  {
    key: "sla",
    label: "SLA Breach Risk",
    value: 8,
    trend: "-2%",
    icon: <SpeedOutlinedIcon fontSize="small" />,
    color: CHART_COLORS[4], // Red
  },
  {
    key: "unassigned",
    label: "Unassigned",
    value: 15,
    trend: "+5",
    icon: <AssignmentLateOutlinedIcon fontSize="small" />,
    color: CHART_COLORS[6], // Amber
  },
  {
    key: "agents",
    label: "Agents online",
    value: 12,
    trend: "14 total",
    icon: <GroupAddOutlinedIcon fontSize="small" />,
    color: CHART_COLORS[2], // Blue
  },
];

// Mock analytics data
const mockSupervisorData = {
  performanceTrend: [
    { name: "Mon", value: 85, target: 80 }, { name: "Tue", value: 88, target: 80 },
    { name: "Wed", value: 92, target: 80 }, { name: "Thu", value: 78, target: 80 },
    { name: "Fri", value: 84, target: 80 }, { name: "Sat", value: 90, target: 80 },
    { name: "Sun", value: 95, target: 80 }
  ],
  categoryVolume: [
    { name: "Driver", value: 350 }, { name: "Rider", value: 420 },
    { name: "Payment", value: 150 }, { name: "Tech", value: 80 }
  ],
  hourlyVolume: [
    { name: "8am", value: 45 }, { name: "10am", value: 120 }, { name: "12pm", value: 160 },
    { name: "2pm", value: 140 }, { name: "4pm", value: 110 }, { name: "6pm", value: 90 }
  ]
};

const teamMembers = [
  { id: 1, name: "Sarah Williams", role: "Senior Agent", status: "online", metrics: "98% CSAT" },
  { id: 2, name: "Michael Chen", role: "Dispatch Specialist", status: "busy", metrics: "15 Cases" },
  { id: 3, name: "Jessica Taylor", role: "Support Agent", status: "online", metrics: "95% CSAT" },
  { id: 4, name: "David Miller", role: "Onboarding", status: "offline", metrics: "Last seen 2h ago" },
];

export default function SupervisorDashboardPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [period, setPeriod] = useState<PeriodValue>("week");

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
            Team Overview
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: EVZONE_GREY, maxWidth: 500 }}
          >
            Monitor team performance, SLA compliance, and support volume.
          </Typography>
        </Box>

        <Stack direction="row" spacing={2} alignItems="center">
          <PeriodSelector value={period} onChange={setPeriod} compact />
          <Button
            variant="outlined"
            size="small"
            startIcon={<FilterListIcon />}
            sx={{
              borderRadius: 2,
              borderColor: isDark ? "rgba(148,163,184,0.3)" : "rgba(226,232,240,1)",
              color: isDark ? "#cbd5e1" : "#475569",
              textTransform: "none",
              fontWeight: 600,
            }}
          >
            Filter
          </Button>
        </Stack>
      </Box>

      {/* Stats Overview */}
      <Grid container spacing={2} className="mb-6">
        {statCards.map((card) => (
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
                    label={card.trend}
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
                <Typography variant="h3" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#0f172a", mb: 0.5 }}>
                  {card.value}
                </Typography>
                <Typography variant="body2" sx={{ color: EVZONE_GREY, fontWeight: 500 }}>
                  {card.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={3}>
        {/* Main Performance Chart */}
        <Grid size={{ xs: 12, lg: 8 }}>
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
              title="Team Performance vs Target"
              data={mockSupervisorData.performanceTrend}
              dataKeys={["value", "target"]}
              height={320}
            />
          </Card>
        </Grid>

        {/* Categories Pie */}
        <Grid size={{ xs: 12, lg: 4 }}>
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
              title="Work Volume by Type"
              data={mockSupervisorData.categoryVolume}
              height={320}
              showLegend={true}
            />
          </Card>
        </Grid>

        {/* Hourly Volume Bar Chart */}
        <Grid size={{ xs: 12, md: 6 }}>
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
            <TrendBarChart
              title="Hourly Ticket Volume"
              data={mockSupervisorData.hourlyVolume}
              height={250}
            />
          </Card>
        </Grid>

        {/* Team Members List */}
        <Grid size={{ xs: 12, md: 6 }}>
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
            <Box className="flex items-center justify-between mb-4">
              <Typography variant="subtitle1" fontWeight={700} color={isDark ? "#e5e7eb" : "#111827"}>
                Team Status
              </Typography>
              <Button size="small" sx={{ color: EVZONE_GREEN, fontWeight: 600 }}>View All</Button>
            </Box>

            <Stack spacing={2}>
              {teamMembers.map((member) => (
                <Box
                  key={member.id}
                  className="flex items-center justify-between p-2 rounded-xl"
                  sx={{
                    "&:hover": { bgcolor: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.02)" }
                  }}
                >
                  <Box className="flex items-center gap-3">
                    <Avatar sx={{ width: 40, height: 40, bgcolor: isDark ? "#1e293b" : "#e2e8f0", color: isDark ? "#94a3b8" : "#64748b", fontWeight: 700, fontSize: 14 }}>
                      {member.name.split(" ").map(n => n[0]).join("")}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight={600} color={isDark ? "#e5e7eb" : "#1e293b"}>
                        {member.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {member.role}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className="flex flex-col items-end">
                    <Chip
                      label={member.status}
                      size="small"
                      sx={{
                        height: 20,
                        fontSize: 10,
                        fontWeight: 700,
                        bgcolor: member.status === "online" ? "rgba(3,205,140,0.1)" : member.status === "busy" ? "rgba(245,158,11,0.1)" : "rgba(100,116,139,0.1)",
                        color: member.status === "online" ? EVZONE_GREEN : member.status === "busy" ? "#f59e0b" : "#64748b"
                      }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                      {member.metrics}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
