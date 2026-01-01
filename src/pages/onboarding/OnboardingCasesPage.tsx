import React from "react";
import { Box, Typography, Card, CardContent, Chip, Stack, Button, Avatar } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";

const EVZONE_GREY = "#6b7280";

export default function OnboardingCasesPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const cases = [
        { id: "CS-101", name: "John Doe", type: "Driver", status: "Awaiting Review", time: "2h ago" },
        { id: "CS-102", name: "Jane Smith", type: "Driver", status: "Missing Docs", time: "5h ago" },
    ];

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
                        Review pending onboarding applications.
                    </Typography>
                </Box>

                <Stack spacing={2}>
                    {cases.map((c) => (
                        <Card
                            key={c.id}
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            }}
                        >
                            <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
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
                                    <Chip label={c.status} size="small" color="primary" variant="outlined" />
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
