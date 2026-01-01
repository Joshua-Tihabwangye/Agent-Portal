import React from "react";
import { Box, Card, CardContent, Typography, Stack, Chip, Grid, Avatar, Divider, Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams, useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import StarRateRoundedIcon from "@mui/icons-material/StarRateRounded";
import WorkspacePremiumOutlinedIcon from "@mui/icons-material/WorkspacePremiumOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";

export default function SafetyAgentProfilePage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const { agentId } = useParams();
    const navigate = useNavigate();

    // Mock data - in real app fetch by agentId
    const agent = {
        id: agentId || "AGT-001",
        name: "Grace Nakato",
        role: "Senior Safety Agent",
        status: "Online",
        avatar: "/static/images/avatar/3.jpg", // Placeholder
        joinedDate: "Feb 2024",
        totalResolved: 142,
        avgResponseTime: "1m 30s",
        rating: 4.9,
        ranking: "Top 5%",
        recentActivity: [
            { id: "INC-7005", action: "Resolved SOS alert", time: "10 mins ago" },
            { id: "INC-6992", action: "Escalated to Police", time: "2 hours ago" },
            { id: "INC-6980", action: "Closed false alarm", time: "Yesterday" },
        ]
    };

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
            <Box className="max-w-6xl mx-auto">
                <PageBreadcrumb
                    items={[{ label: "SOS Queue", href: "/agent/safety/sos" }]}
                    current={agent.name}
                />

                {/* Header Profile Card */}
                <Card
                    elevation={0}
                    sx={{
                        mb: 3,
                        borderRadius: 4,
                        background: isDark
                            ? "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)"
                            : "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)",
                        border: `1px solid ${isDark ? "rgba(30,64,175,0.3)" : "rgba(226,232,240,1)"}`,
                    }}
                >
                    <CardContent sx={{ p: 4 }}>
                        <Grid container spacing={4} alignItems="center">
                            <Grid size={{ xs: 12, md: 8 }}>
                                <Stack direction="row" spacing={3} alignItems="center">
                                    <Avatar
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            bgcolor: EVZONE_GREEN,
                                            fontSize: 32,
                                            fontWeight: 700
                                        }}
                                    >
                                        {agent.name.charAt(0)}
                                    </Avatar>
                                    <Box>
                                        <Stack direction="row" spacing={1.5} alignItems="center" mb={0.5}>
                                            <Typography variant="h4" fontWeight={800} sx={{ color: isDark ? "#fff" : "#111827" }}>
                                                {agent.name}
                                            </Typography>
                                            <Chip
                                                label={agent.status}
                                                size="small"
                                                sx={{
                                                    bgcolor: "rgba(22,163,74,0.15)",
                                                    color: "#16a34a",
                                                    fontWeight: 600,
                                                    borderRadius: 2
                                                }}
                                            />
                                        </Stack>
                                        <Typography variant="body1" sx={{ color: EVZONE_GREY }}>
                                            {agent.role} · joined {agent.joinedDate}
                                        </Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                            <Grid size={{ xs: 12, md: 4 }}>
                                <Stack direction="row" spacing={1} justifyContent={{ md: "flex-end" }}>
                                    <Box sx={{ textAlign: "center", p: 2, bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(241,245,249,0.5)", borderRadius: 3 }}>
                                        <Typography variant="h6" fontWeight={800} color={EVZONE_GREEN}>{agent.rating}</Typography>
                                        <Typography variant="caption" color="text.secondary">Avg Rating</Typography>
                                    </Box>
                                    <Box sx={{ textAlign: "center", p: 2, bgcolor: isDark ? "rgba(0,0,0,0.2)" : "rgba(241,245,249,0.5)", borderRadius: 3 }}>
                                        <Typography variant="h6" fontWeight={800} color="#3b82f6">{agent.ranking}</Typography>
                                        <Typography variant="caption" color="text.secondary">Global Rank</Typography>
                                    </Box>
                                </Stack>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Grid container spacing={3}>
                    {/* Left: Stats */}
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Card sx={{
                            height: "100%",
                            borderRadius: 3,
                            bgcolor: isDark ? "#020617" : "#fff",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`
                        }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom>Performance</Typography>
                                <Stack spacing={2} mt={2}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" bgcolor={isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"} p={2} borderRadius={2}>
                                        <Stack direction="row" spacing={1.5}>
                                            <GppGoodOutlinedIcon sx={{ color: EVZONE_GREEN }} />
                                            <Typography variant="body2" fontWeight={600}>Resolved Incidents</Typography>
                                        </Stack>
                                        <Typography variant="subtitle1" fontWeight={700}>{agent.totalResolved}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" bgcolor={isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"} p={2} borderRadius={2}>
                                        <Stack direction="row" spacing={1.5}>
                                            <AccessTimeOutlinedIcon sx={{ color: "#f59e0b" }} />
                                            <Typography variant="body2" fontWeight={600}>Avg Response</Typography>
                                        </Stack>
                                        <Typography variant="subtitle1" fontWeight={700}>{agent.avgResponseTime}</Typography>
                                    </Stack>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center" bgcolor={isDark ? "rgba(255,255,255,0.03)" : "#f8fafc"} p={2} borderRadius={2}>
                                        <Stack direction="row" spacing={1.5}>
                                            <WorkspacePremiumOutlinedIcon sx={{ color: "#8b5cf6" }} />
                                            <Typography variant="body2" fontWeight={600}>Performance Tier</Typography>
                                        </Stack>
                                        <Typography variant="subtitle1" fontWeight={700}>Platinum</Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Right: Activity Log */}
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Card sx={{
                            height: "100%",
                            borderRadius: 3,
                            bgcolor: isDark ? "#020617" : "#fff",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`
                        }}>
                            <CardContent>
                                <Typography variant="h6" fontWeight={700} gutterBottom>Recent Activity Log</Typography>
                                <Stack spacing={0} divider={<Divider sx={{ borderStyle: "dashed" }} />}>
                                    {agent.recentActivity.map((act) => (
                                        <Box key={act.id} sx={{ py: 2 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Box>
                                                    <Typography variant="subtitle2" fontWeight={600} sx={{ color: isDark ? "#e5e7eb" : "#334155" }}>
                                                        {act.action}
                                                    </Typography>
                                                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                        Reference ID: {act.id}
                                                    </Typography>
                                                </Box>
                                                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                    {act.time}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    ))}
                                </Stack>
                                <Button variant="outlined" fullWidth sx={{ mt: 2, borderRadius: 2, textTransform: "none" }}>
                                    View Full History
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

            </Box>
        </Box>
    );
}
