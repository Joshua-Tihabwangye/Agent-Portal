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
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CarRentalOutlinedIcon from "@mui/icons-material/CarRentalOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import OpenInNewOutlinedIcon from "@mui/icons-material/OpenInNewOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingOutlinedIcon from "@mui/icons-material/PendingOutlined";
import SpeedOutlinedIcon from "@mui/icons-material/SpeedOutlined";
import PeriodSelector from "../../components/shared/PeriodSelector";
import type { PeriodValue } from "../../components/shared/PeriodSelector";
import { RevenuePieChart, TrendBarChart, CHART_COLORS } from "../../components/shared/AnalyticsCharts";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Service types with their details
const SERVICE_TYPES = [
    {
        key: "ride",
        label: "Ride",
        description: "Move people from A to B",
        icon: <DirectionsCarOutlinedIcon sx={{ fontSize: 28 }} />,
        href: "/agent/dispatch/new/ride",
        color: CHART_COLORS[0],
    },
    {
        key: "delivery",
        label: "Delivery",
        description: "Send packages and parcels",
        icon: <LocalShippingOutlinedIcon sx={{ fontSize: 28 }} />,
        href: "/agent/dispatch/new/delivery",
        color: CHART_COLORS[1],
    },
    {
        key: "rental",
        label: "Car Rental",
        description: "Self-drive vehicle hire",
        icon: <CarRentalOutlinedIcon sx={{ fontSize: 28 }} />,
        href: "/agent/dispatch/new/rental",
        color: CHART_COLORS[2],
    },
    {
        key: "school-shuttle",
        label: "School Shuttle",
        description: "Student transport services",
        icon: <DirectionsBusOutlinedIcon sx={{ fontSize: 28 }} />,
        href: "/agent/dispatch/new/school-shuttle",
        color: CHART_COLORS[3],
    },
    {
        key: "tour",
        label: "Tours & Charters",
        description: "Group travel and tours",
        icon: <ExploreOutlinedIcon sx={{ fontSize: 28 }} />,
        href: "/agent/dispatch/new/tour",
        color: CHART_COLORS[4],
    },
    {
        key: "ems",
        label: "Ambulance / EMS",
        description: "Emergency medical response",
        icon: <LocalHospitalOutlinedIcon sx={{ fontSize: 28 }} />,
        href: "/agent/dispatch/new/ems",
        color: CHART_COLORS[5],
    },
];

// Mock analytics data
const mockAnalytics = {
    dispatchTrend: [
        { name: "Mon", value: 45 },
        { name: "Tue", value: 52 },
        { name: "Wed", value: 48 },
        { name: "Thu", value: 61 },
        { name: "Fri", value: 55 },
        { name: "Sat", value: 38 },
        { name: "Sun", value: 25 },
    ],
    serviceDistribution: [
        { name: "Ride", value: 156 },
        { name: "Delivery", value: 89 },
        { name: "Rental", value: 34 },
        { name: "School", value: 45 },
        { name: "Tours", value: 23 },
        { name: "EMS", value: 12 },
    ],
};

// Recent dispatches
const recentDispatches = [
    {
        id: "BK-2048",
        type: "Ride",
        customer: "Sarah K.",
        from: "Nakasero Hill",
        to: "Bugolobi Flats",
        status: "active",
        statusLabel: "In Progress",
        createdAt: "5 min ago",
    },
    {
        id: "BK-2049",
        type: "EMS",
        customer: "Emergency",
        from: "Ntinda Junction",
        to: "Mulago Hospital",
        status: "urgent",
        statusLabel: "Urgent",
        createdAt: "8 min ago",
    },
    {
        id: "BK-2050",
        type: "Delivery",
        customer: "James M.",
        from: "Industrial Area",
        to: "Kampala Road",
        status: "pending",
        statusLabel: "Pending",
        createdAt: "12 min ago",
    },
    {
        id: "BK-2051",
        type: "Ride",
        customer: "Linda N.",
        from: "Kololo",
        to: "Entebbe Airport",
        status: "active",
        statusLabel: "In Progress",
        createdAt: "15 min ago",
    },
    {
        id: "BK-2052",
        type: "School Shuttle",
        customer: "Kampala Int. School",
        from: "Muyenga",
        to: "Various stops",
        status: "completed",
        statusLabel: "Completed",
        createdAt: "22 min ago",
    },
];

// Summary metrics
const getSummaryMetrics = (period: PeriodValue) => {
    // In a real app, these would be fetched based on period
    const multiplier = period === "today" ? 1 : period === "week" ? 7 : period === "month" ? 30 : 365;
    return {
        active: Math.floor(24 * (multiplier / 30)),
        pending: Math.floor(8 * (multiplier / 30)),
        completed: Math.floor(156 * multiplier),
        avgResponseTime: "4m 32s",
    };
};

export default function DispatchHubPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const navigate = useNavigate();
    const [period, setPeriod] = useState<PeriodValue>("today");

    const metrics = getSummaryMetrics(period);

    const getStatusColor = (status: string) => {
        switch (status) {
            case "active":
                return { bg: "rgba(22,163,74,0.14)", color: "#166534" };
            case "urgent":
                return { bg: "rgba(239,68,68,0.14)", color: "#dc2626" };
            case "pending":
                return { bg: "rgba(250,204,21,0.14)", color: "#92400e" };
            case "completed":
                return { bg: "rgba(148,163,184,0.14)", color: EVZONE_GREY };
            default:
                return { bg: "rgba(148,163,184,0.14)", color: EVZONE_GREY };
        }
    };

    const getServiceIcon = (type: string) => {
        const service = SERVICE_TYPES.find(s => s.label === type);
        return service?.icon || <DirectionsCarOutlinedIcon />;
    };

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4 w-full">
            {/* Breadcrumb Navigation */}
            <PageBreadcrumb
                items={[]}
                current="Dispatch Centre"
            />
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
                        Dispatch Centre
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{ color: EVZONE_GREY, maxWidth: 520 }}
                    >
                        Create and manage dispatches across all service types. Monitor active bookings and driver assignments.
                    </Typography>
                </Box>

                <Stack direction="row" spacing={2} alignItems="center">
                    <PeriodSelector value={period} onChange={setPeriod} compact />
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddOutlinedIcon />}
                        onClick={() => navigate("/agent/dispatch/new")}
                        sx={{
                            borderRadius: 999,
                            textTransform: "none",
                            fontWeight: 700,
                            backgroundColor: EVZONE_GREEN,
                            "&:hover": { backgroundColor: "#02b57a" },
                        }}
                    >
                        New Dispatch
                    </Button>
                </Stack>
            </Box>

            {/* Summary Metric Cards */}
            <Grid container spacing={2} className="mb-6">
                <Grid size={{ xs: 6, sm: 3 }}>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            transition: "all 0.2s ease",
                            "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 16px ${EVZONE_GREEN}15` },
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: "rgba(22,163,74,0.12)", color: "#16a34a", display: "flex" }}>
                                    <SpeedOutlinedIcon sx={{ fontSize: 18 }} />
                                </Box>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY, fontWeight: 600 }}>ACTIVE</Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#0f172a" }}>
                                {metrics.active}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            transition: "all 0.2s ease",
                            "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 16px ${EVZONE_ORANGE}15` },
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: "rgba(250,204,21,0.12)", color: "#f59e0b", display: "flex" }}>
                                    <PendingOutlinedIcon sx={{ fontSize: 18 }} />
                                </Box>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY, fontWeight: 600 }}>PENDING</Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#0f172a" }}>
                                {metrics.pending}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            transition: "all 0.2s ease",
                            "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 16px ${CHART_COLORS[2]}15` },
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: "rgba(34,197,94,0.12)", color: EVZONE_GREEN, display: "flex" }}>
                                    <CheckCircleOutlineIcon sx={{ fontSize: 18 }} />
                                </Box>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY, fontWeight: 600 }}>COMPLETED</Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#0f172a" }}>
                                {metrics.completed}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid size={{ xs: 6, sm: 3 }}>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            transition: "all 0.2s ease",
                            "&:hover": { transform: "translateY(-2px)", boxShadow: `0 8px 16px ${CHART_COLORS[3]}15` },
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                                <Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: "rgba(139,92,246,0.12)", color: "#8b5cf6", display: "flex" }}>
                                    <AccessTimeOutlinedIcon sx={{ fontSize: 18 }} />
                                </Box>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY, fontWeight: 600 }}>AVG RESPONSE</Typography>
                            </Stack>
                            <Typography variant="h4" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#0f172a" }}>
                                {metrics.avgResponseTime}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {/* Analytics Charts */}
            <Grid container spacing={3} className="mb-6">
                <Grid size={{ xs: 12, md: 7 }}>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            p: 2,
                            height: "100%",
                        }}
                    >
                        <TrendBarChart
                            title="Dispatch Volume"
                            data={mockAnalytics.dispatchTrend}
                            height={220}
                        />
                    </Card>
                </Grid>

                <Grid size={{ xs: 12, md: 5 }}>
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            p: 2,
                            height: "100%",
                        }}
                    >
                        <RevenuePieChart
                            title="Service Distribution"
                            data={mockAnalytics.serviceDistribution}
                            height={220}
                            showLegend={true}
                            showChartLabels={false}
                        />
                    </Card>
                </Grid>
            </Grid>

            {/* Quick Launch Service Cards */}
            <Box className="mb-6">
                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                        Quick Launch
                    </Typography>
                    <Button
                        size="small"
                        startIcon={<DashboardOutlinedIcon sx={{ fontSize: 16 }} />}
                        onClick={() => navigate("/agent/dispatch/board")}
                        sx={{
                            textTransform: "none",
                            fontWeight: 600,
                            color: EVZONE_GREEN,
                        }}
                    >
                        Open Dispatch Board
                    </Button>
                </Stack>

                <Grid container spacing={2}>
                    {SERVICE_TYPES.map((service) => (
                        <Grid size={{ xs: 6, sm: 4, lg: 2 }} key={service.key}>
                            <Card
                                elevation={0}
                                sx={{
                                    borderRadius: 3,
                                    backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                                    border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                                    transition: "all 0.2s ease",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: `0 12px 24px ${service.color}20`,
                                        borderColor: `${service.color}50`,
                                    },
                                }}
                                onClick={() => navigate(service.href)}
                            >
                                <CardContent sx={{ p: 2, textAlign: "center" }}>
                                    <Box
                                        sx={{
                                            p: 1.5,
                                            borderRadius: 2,
                                            bgcolor: `${service.color}12`,
                                            color: service.color,
                                            display: "inline-flex",
                                            mb: 1.5,
                                        }}
                                    >
                                        {service.icon}
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        fontWeight={700}
                                        sx={{ color: isDark ? "#e5e7eb" : "#111827", mb: 0.5 }}
                                    >
                                        {service.label}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: EVZONE_GREY, display: "block", lineHeight: 1.3 }}
                                    >
                                        {service.description}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>

            {/* Recent Dispatches List */}
            <Card
                elevation={0}
                sx={{
                    borderRadius: 3,
                    backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                    border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                }}
            >
                <CardContent sx={{ p: 2.5 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <LocalShippingOutlinedIcon sx={{ fontSize: 20, color: EVZONE_GREEN }} />
                            <Typography variant="subtitle1" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                Recent Dispatches
                            </Typography>
                        </Stack>
                        <IconButton size="small">
                            <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                    </Stack>

                    <List disablePadding>
                        {recentDispatches.map((dispatch) => {
                            const statusStyle = getStatusColor(dispatch.status);
                            return (
                                <ListItemButton
                                    key={dispatch.id}
                                    onClick={() => navigate(`/agent/dispatch/${dispatch.id}`)}
                                    sx={{
                                        borderRadius: 2,
                                        mb: 1,
                                        px: 1.5,
                                        py: 1,
                                        backgroundColor: isDark ? "rgba(15,23,42,0.6)" : "rgba(248,250,252,0.8)",
                                        border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,0.8)"}`,
                                        "&:hover": {
                                            backgroundColor: isDark ? "rgba(30,41,59,0.5)" : "rgba(241,245,249,1)",
                                            borderColor: `${EVZONE_GREEN}40`,
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ minWidth: 36, color: EVZONE_GREY }}>
                                        {getServiceIcon(dispatch.type)}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Typography variant="body2" fontWeight={600} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                                        {dispatch.id}
                                                    </Typography>
                                                    <Chip
                                                        size="small"
                                                        label={dispatch.type}
                                                        sx={{
                                                            height: 18,
                                                            fontSize: 10,
                                                            borderRadius: 999,
                                                            bgcolor: "rgba(148,163,184,0.1)",
                                                            color: EVZONE_GREY,
                                                        }}
                                                    />
                                                </Stack>
                                                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                    {dispatch.createdAt}
                                                </Typography>
                                            </Stack>
                                        }
                                        secondary={
                                            <Stack spacing={0.25}>
                                                <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                                                    {dispatch.customer} · {dispatch.from} → {dispatch.to}
                                                </Typography>
                                            </Stack>
                                        }
                                    />
                                    <Stack spacing={0.5} alignItems="flex-end" sx={{ ml: 2 }}>
                                        <Chip
                                            size="small"
                                            label={dispatch.statusLabel}
                                            sx={{
                                                height: 20,
                                                fontSize: 10,
                                                borderRadius: 999,
                                                bgcolor: statusStyle.bg,
                                                color: statusStyle.color,
                                                fontWeight: 600,
                                            }}
                                        />
                                        <IconButton size="small" sx={{ p: 0.25 }}>
                                            <OpenInNewOutlinedIcon sx={{ fontSize: 14, color: EVZONE_GREY }} />
                                        </IconButton>
                                    </Stack>
                                </ListItemButton>
                            );
                        })}
                    </List>

                    <Button
                        fullWidth
                        variant="text"
                        size="small"
                        onClick={() => navigate("/agent/dispatch/board")}
                        sx={{
                            mt: 1,
                            textTransform: "none",
                            fontWeight: 600,
                            color: EVZONE_GREEN,
                        }}
                    >
                        View all dispatches
                    </Button>
                </CardContent>
            </Card>
        </Box>
    );
}
