import React, { useState } from "react";
import { Box, Typography, Card, CardContent, Chip, Stack, useTheme, Grid, Button, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PeriodSelector from "../../components/shared/PeriodSelector";
import type { PeriodValue } from "../../components/shared/PeriodSelector";
import {
    MetricCard,
    RevenuePieChart,
    TrendBarChart,
    TrendLineChart,
    CHART_COLORS
} from "../../components/shared/AnalyticsCharts";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";

// Mock data that would normally come from an API based on the selected period
const mockData = {
    today: {
        revenue: 4250,
        tickets: 48,
        aht: "5m 12s",
        csat: "4.8/5",
        revenueTrend: [
            { name: "8am", value: 120 }, { name: "10am", value: 450 }, { name: "12pm", value: 980 },
            { name: "2pm", value: 850 }, { name: "4pm", value: 1100 }, { name: "6pm", value: 750 }
        ],
        categoryDist: [
            { name: "Booking Issues", value: 15 }, { name: "Payment", value: 12 },
            { name: "Driver", value: 8 }, { name: "App/Tech", value: 13 }
        ]
    },
    week: {
        revenue: 32450,
        tickets: 342,
        aht: "5m 45s",
        csat: "4.7/5",
        revenueTrend: [
            { name: "Mon", value: 4200 }, { name: "Tue", value: 3800 }, { name: "Wed", value: 5100 },
            { name: "Thu", value: 4900 }, { name: "Fri", value: 6500 }, { name: "Sat", value: 5200 }, { name: "Sun", value: 2750 }
        ],
        categoryDist: [
            { name: "Booking Issues", value: 120 }, { name: "Payment", value: 85 },
            { name: "Driver", value: 45 }, { name: "App/Tech", value: 92 }
        ]
    },
    month: {
        revenue: 145200,
        tickets: 1520,
        aht: "6m 02s",
        csat: "4.6/5",
        revenueTrend: [
            { name: "Week 1", value: 32000 }, { name: "Week 2", value: 38000 },
            { name: "Week 3", value: 35000 }, { name: "Week 4", value: 40200 }
        ],
        categoryDist: [
            { name: "Booking Issues", value: 550 }, { name: "Payment", value: 320 },
            { name: "Driver", value: 210 }, { name: "App/Tech", value: 440 }
        ]
    },
    year: {
        revenue: 1450000,
        tickets: 18500,
        aht: "5m 55s",
        csat: "4.7/5",
        revenueTrend: [
            { name: "Jan", value: 105000 }, { name: "Feb", value: 110000 }, { name: "Mar", value: 125000 },
            { name: "Apr", value: 115000 }, { name: "May", value: 130000 }, { name: "Jun", value: 140000 },
            { name: "Jul", value: 135000 }, { name: "Aug", value: 150000 }, { name: "Sep", value: 145000 },
            { name: "Oct", value: 155000 }, { name: "Nov", value: 160000 }, { name: "Dec", value: 80000 }
        ],
        categoryDist: [
            { name: "Booking Issues", value: 6500 }, { name: "Payment", value: 4200 },
            { name: "Driver", value: 2800 }, { name: "App/Tech", value: 5000 }
        ]
    }
};

export default function AnalyticsDashboardPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const [period, setPeriod] = useState<PeriodValue>("week");
    const navigate = useNavigate();

    // Get data for selected period
    const data = mockData[period];

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-6 w-full">
            {/* Header */}
            <Box className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <Box>
                    <Typography
                        variant="h5"
                        sx={{ fontWeight: 800, color: isDark ? "#e5e7eb" : "#111827", mb: 0.5 }}
                    >
                        Analytics Overview
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#64748b" }}>
                        Track revenue, team performance, and operational metrics.
                    </Typography>
                </Box>
                <PeriodSelector value={period} onChange={setPeriod} />
            </Box>

            {/* KPI Cards */}
            <Grid container spacing={2} className="mb-6">
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <MetricCard
                        label="Total Revenue"
                        value={`$${data.revenue.toLocaleString()}`}
                        change="+12.5% vs last period"
                        changeType="positive"
                        icon={<AttachMoneyIcon />}
                        color={CHART_COLORS[0]} // Green
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <MetricCard
                        label="Tickets Resolved"
                        value={data.tickets}
                        change="+5.2% vs last period"
                        changeType="positive"
                        icon={<ConfirmationNumberOutlinedIcon />}
                        color={CHART_COLORS[6]} // Amber
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <MetricCard
                        label="Avg Handle Time"
                        value={data.aht}
                        change="-8.1% (Improved)"
                        changeType="positive"
                        icon={<SupportAgentOutlinedIcon />}
                        color={CHART_COLORS[2]} // Blue
                    />
                </Grid>
                <Grid size={{ xs: 12, sm: 6, lg: 3 }}>
                    <MetricCard
                        label="CSAT Score"
                        value={data.csat}
                        change="-0.1 vs last period"
                        changeType="negative"
                        icon={<ThumbUpOutlinedIcon />}
                        color={CHART_COLORS[1]} // Orange
                    />
                </Grid>
            </Grid>



            {/* Main Charts */}
            <Grid container spacing={3}>
                {/* Revenue Trend */}
                <Grid size={{ xs: 12, lg: 7 }}>
                    <Card
                        elevation={0}
                        sx={{
                            p: 2,
                            height: "100%",
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                        }}
                    >
                        <TrendLineChart
                            title="Revenue Trend"
                            data={data.revenueTrend}
                            dataKeys={["value"]}
                            height={260}
                        />
                    </Card>
                </Grid>

                {/* Support Distribution */}
                <Grid size={{ xs: 12, lg: 5 }}>
                    <Card
                        elevation={0}
                        sx={{
                            p: 2,
                            height: "100%",
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                        }}
                    >
                        <RevenuePieChart
                            title="Ticket Categories"
                            data={data.categoryDist}
                            height={320}
                        />
                    </Card>
                </Grid>


                {/* Agent Performance (Mock Table) */}
                <Grid size={{ xs: 12 }}>
                    <Card
                        elevation={0}
                        sx={{
                            p: 2,
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                        }}
                    >
                        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={3}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}>
                                Top Performing Agents
                            </Typography>
                            <Chip label="Based on CSAT & volume" size="small" color="primary" variant="outlined" />
                        </Stack>

                        <Grid container spacing={2}>
                            {["Alex Johnson", "Sarah Williams", "Michael Chen", "Emily Davis"].map((agent, i) => (
                                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={agent}>
                                    <Box
                                        onClick={() => navigate(`/agent/safety/agents/${encodeURIComponent(agent)}`)}
                                        sx={{
                                            p: 2,
                                            borderRadius: 2,
                                            bgcolor: isDark ? "rgba(15,23,42,0.5)" : "rgba(241,245,249,0.5)",
                                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                                            cursor: "pointer",
                                            transition: "all 0.2s",
                                            "&:hover": {
                                                bgcolor: isDark ? "rgba(15,23,42,0.8)" : "rgba(241,245,249,1)",
                                                borderColor: "#03cd8c",
                                            }
                                        }}
                                    >
                                        <Typography variant="subtitle2" fontWeight={700}>{agent}</Typography>
                                        <Typography variant="caption" color="text.secondary">Support Specialist</Typography>
                                        <Stack direction="row" justifyContent="space-between" mt={1.5}>
                                            <Box>
                                                <Typography variant="caption" display="block" color="text.secondary">Tickets</Typography>
                                                <Typography variant="body2" fontWeight={600}>{120 - (i * 12)}</Typography>
                                            </Box>
                                            <Box>
                                                <Typography variant="caption" display="block" color="text.secondary">CSAT</Typography>
                                                <Typography variant="body2" fontWeight={600} color={CHART_COLORS[0]}>{4.9 - (i * 0.1)}</Typography>
                                            </Box>
                                        </Stack>
                                        <Button
                                            size="small"
                                            variant="outlined"
                                            fullWidth
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // Navigate to chat/conversation with this agent
                                                navigate(`/agent/support/chat/${encodeURIComponent(agent)}`);
                                            }}
                                            sx={{
                                                mt: 1.5,
                                                borderRadius: 999,
                                                textTransform: "none",
                                                fontSize: 12,
                                            }}
                                        >
                                            Open Chat
                                        </Button>
                                    </Box>
                                </Grid>
                            ))}
                        </Grid>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    );
}
