import React, { useState } from "react";
import { Box, Card, CardActionArea, CardContent, Typography, Stack, Chip, LinearProgress, Divider, Button, IconButton, Grid, Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import PeriodSelector from "../../components/shared/PeriodSelector";
import type { PeriodValue } from "../../components/shared/PeriodSelector";
import { RevenuePieChart, TrendLineChart, CHART_COLORS } from "../../components/shared/AnalyticsCharts"; // Corrected import (removed duplicates if any)

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Mock data
const summaryCards = [
  {
    key: "tasks",
    title: "Tasks Due",
    value: "12",
    icon: <AssignmentTurnedInOutlinedIcon />,
    color: "#3b82f6", // Blue
    href: "/agent/dashboard/tasks",
    details: [
      { label: "High priority", value: "3", warning: true },
      { label: "Overdue", value: "1", warning: true }
    ]
  },
  {
    key: "tickets",
    title: "Open Tickets",
    value: "5",
    icon: <WarningAmberOutlinedIcon />,
    color: "#ef4444", // Red
    href: "/agent/support/tickets",
    details: [
      { label: "Unassigned", value: "2", warning: true },
      { label: "SLA breached", value: "0", warning: false }
    ]
  },
  {
    key: "earnings",
    title: "Earnings",
    value: "UGX 850k",
    icon: <AttachMoneyOutlinedIcon />,
    color: EVZONE_GREEN,
    href: "/agent/dashboard/analytics",
    details: [
      { label: "vs last week", value: "+12%", warning: false },
      { label: "Today", value: "150k", warning: false }
    ]
  },
  {
    key: "onboarding",
    title: "Driver Apps",
    value: "8",
    icon: <PersonAddOutlinedIcon />,
    color: CHART_COLORS[1], // Orange
    href: "/agent/onboarding/drivers",
    details: [
      { label: "Stuck", value: "1", warning: true },
      { label: "Longest wait", value: "9m", warning: false }
    ]
  },
];

const todayTimeline = [
  {
    time: "09:00",
    title: "Shift started",
    meta: "Checked in at 08:55",
    status: "done" as const,
    statusLabel: "Done"
  },
  {
    time: "09:30",
    title: "Review urgent ticket #2094",
    meta: "Payment dispute - Driver J. Doe",
    href: "/agent/support/tickets/2094",
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
    meta: "Incident #5502 resolution",
    href: "/agent/safety/sos",
    status: "queued" as const,
    statusLabel: "Queued"
  },
];

// Period-based mock data
const mockDataByPeriod = {
  today: {
    ticketTrend: [
      { name: "8AM", value: 2, resolved: 1 }, { name: "9AM", value: 3, resolved: 2 }, { name: "10AM", value: 4, resolved: 3 },
      { name: "11AM", value: 2, resolved: 2 }, { name: "12PM", value: 5, resolved: 4 }, { name: "1PM", value: 3, resolved: 2 }, { name: "2PM", value: 4, resolved: 3 }
    ],
    ticketCategory: [
      { name: "Tech", value: 8 }, { name: "Billing", value: 5 }, { name: "Safety", value: 2 }, { name: "Other", value: 3 }
    ],
    performanceMetrics: {
      avgHandleTime: "5m 45s",
      firstResponseTime: "2m 10s",
      ticketsResolved: 14,
      customerSatisfaction: 4.8
    },
    summaryCards: {
      tasks: "5", openTickets: "8", earnings: "UGX 150k", driverApps: "3"
    }
  },
  week: {
    ticketTrend: [
      { name: "Mon", value: 12, resolved: 10 }, { name: "Tue", value: 18, resolved: 15 }, { name: "Wed", value: 14, resolved: 12 },
      { name: "Thu", value: 22, resolved: 18 }, { name: "Fri", value: 16, resolved: 14 }, { name: "Sat", value: 8, resolved: 7 }, { name: "Sun", value: 5, resolved: 4 }
    ],
    ticketCategory: [
      { name: "Tech", value: 45 }, { name: "Billing", value: 25 }, { name: "Safety", value: 10 }, { name: "Other", value: 20 }
    ],
    performanceMetrics: {
      avgHandleTime: "6m 12s",
      firstResponseTime: "2m 45s",
      ticketsResolved: 95,
      customerSatisfaction: 4.7
    },
    summaryCards: {
      tasks: "12", openTickets: "18", earnings: "UGX 850k", driverApps: "8"
    }
  },
  month: {
    ticketTrend: [
      { name: "Week 1", value: 85, resolved: 72 }, { name: "Week 2", value: 92, resolved: 80 },
      { name: "Week 3", value: 78, resolved: 68 }, { name: "Week 4", value: 95, resolved: 88 }
    ],
    ticketCategory: [
      { name: "Tech", value: 180 }, { name: "Billing", value: 95 }, { name: "Safety", value: 45 }, { name: "Other", value: 80 }
    ],
    performanceMetrics: {
      avgHandleTime: "6m 30s",
      firstResponseTime: "3m 00s",
      ticketsResolved: 350,
      customerSatisfaction: 4.6
    },
    summaryCards: {
      tasks: "48", openTickets: "65", earnings: "UGX 3.4M", driverApps: "32"
    }
  },
  year: {
    ticketTrend: [
      { name: "Jan", value: 320 }, { name: "Feb", value: 280 }, { name: "Mar", value: 350 },
      { name: "Apr", value: 410 }, { name: "May", value: 380 }, { name: "Jun", value: 420 },
      { name: "Jul", value: 450 }, { name: "Aug", value: 400 }, { name: "Sep", value: 380 },
      { name: "Oct", value: 420 }, { name: "Nov", value: 390 }, { name: "Dec", value: 350 }
    ],
    ticketCategory: [
      { name: "Tech", value: 2100 }, { name: "Billing", value: 1200 }, { name: "Safety", value: 550 }, { name: "Other", value: 900 }
    ],
    performanceMetrics: {
      avgHandleTime: "6m 15s",
      firstResponseTime: "2m 50s",
      ticketsResolved: 4750,
      customerSatisfaction: 4.7
    },
    summaryCards: {
      tasks: "580", openTickets: "820", earnings: "UGX 42M", driverApps: "390"
    }
  }
};

export default function AgentDashboardPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [period, setPeriod] = useState<PeriodValue>("today");
  const [statusFilter, setStatusFilter] = useState("all");

  // Time Picker Logic
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [activeTimeId, setActiveTimeId] = useState<string | null>(null);

  const handleTimeClick = (event: React.MouseEvent<HTMLElement>, timeId: string) => {
    setAnchorEl(event.currentTarget);
    setActiveTimeId(timeId);
  };

  const handleTimeClose = () => {
    setAnchorEl(null);
    setActiveTimeId(null);
  };

  const timeSlots = [];
  for (let i = 8; i <= 18; i++) {
    timeSlots.push(`${i.toString().padStart(2, '0')}:00`);
    timeSlots.push(`${i.toString().padStart(2, '0')}:30`);
  }

  const handleTimeSelect = (time: string) => {
    console.log(`Updated time for ${activeTimeId} to ${time}`);
    handleTimeClose();
  };

  const workloadCompletion = 65; // placeholder

  // Get current data based on period selection
  const periodKey = period === "today" ? "today" : period === "week" ? "week" : period === "month" ? "month" : "year";
  const currentData = mockDataByPeriod[periodKey];

  // Updated Summary Cards Data matching screenshot
  const updatedSummaryCards = [
    {
      key: "tickets",
      title: "MY OPEN TICKETS",
      value: "8",
      icon: <AssignmentTurnedInOutlinedIcon />,
      color: "#3b82f6", // Blue
      href: "/agent/support/tickets",
      details: [
        { label: "Longest waiting", value: "45m", warning: true },
        { label: "High priority", value: "3", warning: true }
      ]
    },
    {
      key: "sla",
      title: "DUE TODAY (SLA)",
      value: "3",
      icon: <AccessTimeOutlinedIcon />, // Clock icon
      color: "#ef4444", // Red
      href: "/agent/dashboard/tasks",
      details: [
        { label: "Next breach in", value: "17m", warning: true },
        { label: "At risk", value: "2", warning: true }
      ]
    },
    {
      key: "onboarding",
      title: "ONBOARDING CASES",
      value: "5",
      icon: <AssignmentTurnedInOutlinedIcon />, // Clipboard
      color: "#14b8a6", // Teal
      href: "/agent/onboarding/cases",
      details: [
        { label: "Awaiting review", value: "3", warning: false },
        { label: "Missing docs", value: "2", warning: true }
      ]
    },
    {
      key: "dispatch",
      title: "ACTIVE DISPATCHES",
      value: "4",
      icon: <DirectionsCarOutlinedIcon />,
      color: "#f97316", // Orange
      href: "/agent/dispatch",
      details: [
        { label: "Stuck", value: "1", warning: true },
        { label: "Longest wait", value: "9m", warning: false }
      ]
    },
  ];

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4">
      <Box className="w-full">
        {/* Time Selection Popover */}
        <Popover
          open={Boolean(anchorEl)}
          anchorEl={anchorEl}
          onClose={handleTimeClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          <Box sx={{ p: 1, maxHeight: 300, overflowY: 'auto' }}>
            <Stack spacing={0.5}>
              {timeSlots.map((time) => (
                <Button
                  key={time}
                  size="small"
                  variant="text"
                  onClick={() => handleTimeSelect(time)}
                  sx={{
                    color: isDark ? '#fff' : '#0f172a',
                    justifyContent: 'flex-start',
                    minWidth: 100
                  }}
                >
                  {time}
                </Button>
              ))}
            </Stack>
          </Box>
        </Popover>

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

        {/* Row 1: Summary Cards */}
        <Grid container spacing={2} className="mb-6">
          {updatedSummaryCards.map((card) => (
            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={card.key}>
              <Card
                elevation={0}
                sx={{
                  borderRadius: 3,
                  backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                  border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                  boxShadow: isDark ? 'none' : '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
                  transition: "all 0.2s ease",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: `0 12px 24px ${card.color}15`,
                    borderColor: `${card.color}40`,
                  },
                }}
              >
                <CardContent sx={{ p: 2.5 }}>
                  <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                    <Box
                      sx={{
                        p: 1,
                        borderRadius: "50%",
                        bgcolor: `${card.color}15`,
                        color: card.color,
                        display: "flex",
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Typography
                      variant="caption"
                      fontWeight={700}
                      sx={{ color: isDark ? "#94a3b8" : "#64748b", textTransform: "uppercase", letterSpacing: 0.5 }}
                    >
                      {card.title}
                    </Typography>
                  </Stack>

                  <Typography variant="h3" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#0f172a", mb: 3 }}>
                    {card.value}
                  </Typography>

                  <Stack spacing={1}>
                    {card.details.map((detail, idx) => (
                      <Stack key={idx} direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                          {detail.label}
                        </Typography>
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                          {detail.warning && <WarningAmberOutlinedIcon sx={{ fontSize: 14, color: detail.warning ? "#f59e0b" : "inherit" }} />}
                          <Typography
                            variant="body2"
                            fontWeight={700}
                            sx={{
                              color: detail.warning ? "#f59e0b" : (isDark ? "#cbd5e1" : "#475569"),
                            }}
                          >
                            {detail.value}
                          </Typography>
                        </Stack>
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
                      mt: 2,
                      mb: -1,
                      "&:hover": { backgroundColor: "transparent", opacity: 0.8 }
                    }}
                  >
                    Open
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Row 2: Metrics & Charts */}
        <Grid container spacing={3} className="mb-6">
          {/* Workload Progress */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                height: "100%",
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                  <Typography variant="h6" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                    Workload Progress
                  </Typography>
                  <Typography variant="h6" fontWeight={800} sx={{ color: EVZONE_GREEN }}>
                    {workloadCompletion}%
                  </Typography>
                </Stack>

                <Box mb={4}>
                  <LinearProgress
                    variant="determinate"
                    value={workloadCompletion}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      bgcolor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
                      "& .MuiLinearProgress-bar": {
                        bgcolor: "warning.main", // Orange/Yellowish to match screenshot
                        borderRadius: 5,
                      }
                    }}
                  />
                </Box>

                <Stack spacing={2.5}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>Tickets Resolved</Typography>
                    <Typography variant="body1" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#0f172a" }}>14</Typography>
                  </Stack>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>Avg Handle Time</Typography>
                    <Typography variant="body1" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#0f172a" }}>6m 12s</Typography>
                  </Stack>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>SLA Compliance</Typography>
                    <Typography variant="body1" fontWeight={700} sx={{ color: EVZONE_GREEN }}>98%</Typography>
                  </Stack>
                  <Divider sx={{ borderStyle: 'dashed' }} />
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>Oldest pending ticket</Typography>
                    <Typography variant="body1" fontWeight={700} sx={{ color: "#f59e0b" }}>45m</Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Ticket Volume */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                height: "100%",
                p: 2
              }}
            >
              <TrendLineChart
                title="Ticket Volume"
                data={currentData.ticketTrend}
                height={280}
                dataKeys={["value"]}
              />
            </Card>
          </Grid>

          {/* Work Distribution */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                height: "100%",
                p: 2
              }}
            >
              <RevenuePieChart
                title="Work Distribution"
                data={currentData.ticketCategory}
                height={280}
                showLegend={true}
                showChartLabels={false}
              />
            </Card>
          </Grid>
        </Grid>

        {/* Row 3: Today's Schedule (Full Width) */}
        <Grid container spacing={3}>
          <Grid size={{ xs: 12 }}>
            <Card
              elevation={0}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                  <Box>
                    <Typography variant="h6" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                      Today's Schedule
                    </Typography>
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                      {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </Typography>
                  </Box>
                  <Chip
                    icon={<AccessTimeOutlinedIcon sx={{ fontSize: 16 }} />}
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
                          backgroundColor: isDark ? "rgba(15,23,42,0.4)" : "#ffffff", // Light background for cards
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
                          {item.status && (
                            <Chip
                              label={item.statusLabel}
                              size="small"
                              variant={item.status === "at-risk" ? "filled" : "outlined"}
                              color={item.status === "at-risk" ? "warning" : "default"}
                              sx={{
                                height: 20,
                                fontSize: 10,
                                fontWeight: 600,
                              }}
                            />
                          )}
                          <Box
                            onClick={(e) => handleTimeClick(e, item.time)}
                            sx={{
                              px: 1,
                              py: 0.5,
                              borderRadius: 1,
                              bgcolor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                              color: "text.secondary",
                              fontSize: 12,
                              fontWeight: 700,
                              height: "fit-content",
                              cursor: "pointer",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              "&:hover": {
                                bgcolor: isDark ? "rgba(255,255,255,0.1)" : "#e2e8f0",
                                color: isDark ? "#fff" : "#0f172a",
                              }
                            }}
                          >
                            {item.time}
                            <AccessTimeOutlinedIcon sx={{ fontSize: 14 }} />
                          </Box>
                        </Stack>

                        <Typography variant="subtitle2" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#0f172a", mb: 0.5, lineHeight: 1.3 }}>
                          {item.title}
                        </Typography>
                        <Typography variant="caption" sx={{ color: EVZONE_GREY, display: "block", mb: 2, flex: 1 }}>
                          {item.meta}
                        </Typography>

                        {item.href && (
                          <Button
                            size="small"
                            variant="outlined"
                            onClick={() => navigate(item.href)}
                            sx={{
                              alignSelf: "flex-start",
                              borderRadius: 2,
                              textTransform: "none",
                              fontSize: 11,
                              py: 0.25,
                              px: 1.5,
                              borderColor: isDark ? "rgba(148,163,184,0.3)" : "rgba(203,213,225,0.8)",
                              color: isDark ? "#cbd5e1" : "#64748b",
                              "&:hover": {
                                borderColor: EVZONE_GREEN,
                                color: EVZONE_GREEN,
                                backgroundColor: "transparent"
                              }
                            }}
                          >
                            View Details
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
