import React from "react";
import { Box, Typography, Card, CardContent, Chip, Stack, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREY = "#6b7280";

export default function TasksPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const tasks = [
        { id: 1, title: "Review urgent ticket #2094", due: "Today, 10:00", priority: "High", status: "Pending" },
        { id: 2, title: "Verify driver documents (2)", due: "Today, 12:00", priority: "Normal", status: "Pending" },
        { id: 3, title: "Weekly compliance report", due: "Tomorrow, 09:00", priority: "Low", status: "Pending" },
    ];

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
            <Box className="max-w-5xl mx-auto">
                <PageBreadcrumb
                    items={[{ label: "Dashboard", href: "/agent/dashboard" }]}
                    current="My Tasks"
                />

                <Box className="mb-6">
                    <Typography variant="h5" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#111827", mb: 1 }}>
                        My Tasks
                    </Typography>
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                        Manage your daily tasks and priorities.
                    </Typography>
                </Box>

                <Stack spacing={2}>
                    {tasks.map((task) => (
                        <Card
                            key={task.id}
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
                                        <CheckCircleOutlineOutlinedIcon sx={{ color: EVZONE_GREY }} />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight={600} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                                {task.title}
                                            </Typography>
                                            <Stack direction="row" spacing={1} alignItems="center">
                                                <AccessTimeOutlinedIcon sx={{ fontSize: 14, color: EVZONE_GREY }} />
                                                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                    Due: {task.due}
                                                </Typography>
                                            </Stack>
                                        </Box>
                                    </Stack>
                                    <Chip
                                        label={task.priority}
                                        size="small"
                                        color={task.priority === "High" ? "error" : "default"}
                                        variant={task.priority === "High" ? "filled" : "outlined"}
                                    />
                                </Stack>
                            </CardContent>
                        </Card>
                    ))}
                </Stack>
            </Box>
        </Box>
    );
}
