import React from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    Button,
    Grid as Grid2,
    Avatar,
    Snackbar,
    Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";

export default function AgentProfilePage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const { agentId } = useParams();
    const navigate = useNavigate();
    const [callSnackbarOpen, setCallSnackbarOpen] = React.useState(false);

    // Mock data - in a real app, fetch based on agentId
    const agent = {
        name: agentId ? decodeURIComponent(agentId) : "Agent Details",
        role: "Support Specialist",
        team: "Support Tier 1",
        status: "Active",
        email: "agent@evzone.com",
        phone: "+256 700 123 456",
        joined: "Aug 2024",
        stats: {
            csat: 4.8,
            ticketsError: "0.2%",
            avgHandleTime: "5m 12s",
            ticketsResolved: 1240,
        },
    };

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
            <Box className="w-full">
                <PageBreadcrumb
                    items={[
                        { label: "Dashboard", href: "/agent/dashboard" },
                        { label: "Analytics", href: "/agent/dashboard/analytics" },
                    ]}
                    current={agent.name}
                />

                {/* Profile Header */}
                <Card
                    elevation={0}
                    sx={{
                        borderRadius: 3,
                        backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                        border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                        mb: 3,
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <Stack
                            direction={{ xs: "column", md: "row" }}
                            justifyContent="space-between"
                            alignItems={{ xs: "flex-start", md: "center" }}
                            spacing={3}
                        >
                            <Stack direction="row" spacing={3} alignItems="center">
                                <Avatar
                                    sx={{
                                        width: 80,
                                        height: 80,
                                        bgcolor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9",
                                        color: EVZONE_GREEN,
                                    }}
                                >
                                    <SupportAgentOutlinedIcon sx={{ fontSize: 40 }} />
                                </Avatar>
                                <Box>
                                    <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                                        <Typography
                                            variant="h5"
                                            fontFamily="Outfit, sans-serif"
                                            fontWeight={700}
                                            sx={{ color: isDark ? "#e5e7eb" : "#111827" }}
                                        >
                                            {agent.name}
                                        </Typography>
                                        <VerifiedOutlinedIcon sx={{ fontSize: 20, color: "#3b82f6" }} />
                                    </Stack>
                                    <Typography variant="body2" sx={{ color: EVZONE_GREY, mb: 0.5 }}>
                                        {agent.role} · {agent.team}
                                    </Typography>
                                    <Stack direction="row" spacing={2} alignItems="center">
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <EmailOutlinedIcon sx={{ fontSize: 14, color: EVZONE_GREY }} />
                                            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                {agent.email}
                                            </Typography>
                                        </Stack>
                                        <Stack direction="row" spacing={0.5} alignItems="center">
                                            <PhoneEnabledOutlinedIcon sx={{ fontSize: 14, color: EVZONE_GREY }} />
                                            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                {agent.phone}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>

                            <Stack direction="row" spacing={1.5}>
                                <Button
                                    variant="outlined"
                                    startIcon={<PhoneEnabledOutlinedIcon />}
                                    onClick={() => setCallSnackbarOpen(true)}
                                    sx={{
                                        borderRadius: 999,
                                        textTransform: "none",
                                        borderColor: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.12)",
                                        color: isDark ? "#e5e7eb" : "#374151",
                                    }}
                                >
                                    Call
                                </Button>
                                <Button
                                    variant="contained"
                                    startIcon={<ChatBubbleOutlineOutlinedIcon />}
                                    onClick={() => navigate(`/agent/support/chat/${encodeURIComponent(agent.name)}`)}
                                    sx={{
                                        borderRadius: 999,
                                        textTransform: "none",
                                        backgroundColor: EVZONE_GREEN,
                                        "&:hover": { backgroundColor: "#02b87d" },
                                    }}
                                >
                                    Message
                                </Button>
                            </Stack>
                        </Stack>
                    </CardContent>
                </Card>

                <Snackbar
                    open={callSnackbarOpen}
                    autoHideDuration={4000}
                    onClose={() => setCallSnackbarOpen(false)}
                    anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                >
                    <Alert
                        onClose={() => setCallSnackbarOpen(false)}
                        severity="success"
                        sx={{ width: "100%", borderRadius: 4 }}
                    >
                        Calling {agent.phone}...
                    </Alert>
                </Snackbar>

                {/* Stats Grid */}
                <Grid2 container spacing={3}>
                    <Grid2 size={{ xs: 12, md: 8 }}>
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
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{ color: isDark ? "#e5e7eb" : "#111827", mb: 3 }}
                                >
                                    Performance Overview
                                </Typography>
                                <Grid2 container spacing={2}>
                                    <Grid2 size={{ xs: 6, sm: 3 }}>
                                        <Box p={2} borderRadius={2} bgcolor={isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"}>
                                            <Typography variant="caption" color="text.secondary">CSAT Score</Typography>
                                            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                                                <StarOutlinedIcon sx={{ fontSize: 18, color: "#eab308" }} />
                                                <Typography variant="h6" fontWeight={700}>{agent.stats.csat}</Typography>
                                            </Stack>
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 6, sm: 3 }}>
                                        <Box p={2} borderRadius={2} bgcolor={isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"}>
                                            <Typography variant="caption" color="text.secondary">Resolved</Typography>
                                            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                                                <FactCheckOutlinedIcon sx={{ fontSize: 18, color: EVZONE_GREEN }} />
                                                <Typography variant="h6" fontWeight={700}>{agent.stats.ticketsResolved}</Typography>
                                            </Stack>
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 6, sm: 3 }}>
                                        <Box p={2} borderRadius={2} bgcolor={isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"}>
                                            <Typography variant="caption" color="text.secondary">Avg Handle Time</Typography>
                                            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                                                <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: "#3b82f6" }} />
                                                <Typography variant="h6" fontWeight={700}>{agent.stats.avgHandleTime}</Typography>
                                            </Stack>
                                        </Box>
                                    </Grid2>
                                    <Grid2 size={{ xs: 6, sm: 3 }}>
                                        <Box p={2} borderRadius={2} bgcolor={isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"}>
                                            <Typography variant="caption" color="text.secondary">Error Rate</Typography>
                                            <Stack direction="row" alignItems="center" spacing={0.5} mt={0.5}>
                                                <Typography variant="h6" fontWeight={700} color="#ef4444">{agent.stats.ticketsError}</Typography>
                                            </Stack>
                                        </Box>
                                    </Grid2>
                                </Grid2>
                            </CardContent>
                        </Card>
                    </Grid2>

                    <Grid2 size={{ xs: 12, md: 4 }}>
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
                                <Typography
                                    variant="h6"
                                    fontWeight={700}
                                    sx={{ color: isDark ? "#e5e7eb" : "#111827", mb: 2 }}
                                >
                                    Recent Activity
                                </Typography>
                                <Stack spacing={2}>
                                    {[1, 2, 3].map((i) => (
                                        <Box key={i}>
                                            <Typography variant="body2" sx={{ color: isDark ? "#e5e7eb" : "#111827", fontWeight: 500 }}>
                                                Resolved ticket #209{i}
                                            </Typography>
                                            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                2 hours ago · Payment issue
                                            </Typography>
                                        </Box>
                                    ))}
                                    <Button
                                        variant="text"
                                        size="small"
                                        sx={{ alignSelf: 'flex-start' }}
                                        onClick={() => navigate('/agent/dashboard/tasks')}
                                    >
                                        View all activity
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid2>
                </Grid2>
            </Box>
        </Box>
    );
}
