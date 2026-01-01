import React, { useState, useEffect } from "react";
import { Box, Typography, Card, CardContent, Chip, Stack, Avatar, CardActionArea, Tabs, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import InboxOutlinedIcon from "@mui/icons-material/InboxOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";

const EVZONE_GREY = "#6b7280";
const STORAGE_KEY = "evzone_driver_onboarding_status";

// Unified data source (matching Queue page)
const initialCases = [
    { id: "DRV-101", name: "Michael K.", type: "Driver", status: "Under Review", time: "2h ago" },
    { id: "DRV-102", name: "Sarah T.", type: "Driver", status: "Needs Info", time: "5h ago" },
    { id: "DRV-103", name: "John D.", type: "Driver", status: "Approved", time: "1d ago" },
    { id: "DRV-104", name: "David M.", type: "Driver", status: "Rejected", time: "2d ago" },
    { id: "DRV-105", name: "Grace L.", type: "Driver", status: "Under Review", time: "3h ago" },
    { id: "DRV-106", name: "James P.", type: "Driver", status: "Under Review", time: "Just now" },
];

export default function OnboardingCasesPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const navigate = useNavigate();

    const [tab, setTab] = useState("pending");
    const [cases, setCases] = useState(initialCases);

    // Sync status from storage
    useEffect(() => {
        try {
            const stored = window.sessionStorage.getItem(STORAGE_KEY);
            if (stored) {
                const statusMap = JSON.parse(stored);
                setCases(prev => prev.map(c => ({
                    ...c,
                    status: statusMap[c.id] || c.status
                })));
            }
        } catch (e) {
            console.error(e);
        }
    }, [tab]); // Reload when tab changes in case we came back

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Approved": return "success";
            case "Rejected": return "error";
            case "Needs Info": return "warning";
            case "Under Review":
            case "Awaiting Review":
            case "Pending":
                return "info";
            default: return "default";
        }
    };

    const isPending = (status: string) => {
        return ["Under Review", "Awaiting Review", "Pending", "Docs pending review"].includes(status);
    };

    const filteredCases = cases.filter(c => {
        if (tab === "pending") {
            return isPending(c.status);
        } else {
            // Processed
            return !isPending(c.status);
        }
    });

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
            <Box className="max-w-5xl mx-auto">
                <PageBreadcrumb
                    items={[{ label: "Onboarding", href: "/agent/onboarding/drivers" }]}
                    current="Cases"
                />

                <Box className="mb-6">
                    <Typography variant="h5" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#111827", mb: 1 }}>
                        Onboarding Cases
                    </Typography>
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                        Manage your inbox of pending driver applications.
                    </Typography>
                </Box>

                <Tabs
                    value={tab}
                    onChange={(e, v) => setTab(v)}
                    sx={{
                        mb: 3,
                        borderBottom: 1,
                        borderColor: 'divider'
                    }}
                >
                    <Tab
                        value="pending"
                        label="Pending Review"
                        icon={<InboxOutlinedIcon fontSize="small" />}
                        iconPosition="start"
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                    />
                    <Tab
                        value="processed"
                        label="Processed History"
                        icon={<HistoryOutlinedIcon fontSize="small" />}
                        iconPosition="start"
                        sx={{ textTransform: 'none', fontWeight: 600 }}
                    />
                </Tabs>

                <Stack spacing={2}>
                    {filteredCases.length === 0 && (
                        <Box py={4} textAlign="center">
                            <Typography color="text.secondary">
                                {tab === "pending" ? "No pending cases! Good job." : "No processed history yet."}
                            </Typography>
                        </Box>
                    )}

                    {filteredCases.map((c) => (
                        <Card
                            key={c.id}
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            }}
                        >
                            <CardActionArea onClick={() => navigate(`/agent/onboarding/drivers/${c.id}`)}>
                                <CardContent sx={{ p: 2 }}>
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Stack direction="row" spacing={2} alignItems="center">
                                            <Avatar sx={{ bgcolor: isDark ? "rgba(255,255,255,0.1)" : "#f1f5f9", color: EVZONE_GREY }}>
                                                <PersonAddOutlinedIcon fontSize="small" />
                                            </Avatar>
                                            <Box>
                                                <Typography variant="subtitle1" fontWeight={600} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                                    {c.name}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                    {c.type} · {c.time}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                        <Chip
                                            label={c.status}
                                            size="small"
                                            color={getStatusColor(c.status) as any}
                                            variant={c.status === "Approved" ? "filled" : "outlined"}
                                        />
                                    </Stack>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
