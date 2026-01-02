import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Stack,
    CardActionArea,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";

const STORAGE_KEY = "evzone_tasks";

const initialTasks = [
    { id: "TSK-001", title: "Review urgent ticket #2094", due: "Today, 10:00", priority: "High", status: "Pending", notes: "" },
    { id: "TSK-002", title: "Verify driver documents (2)", due: "Today, 12:00", priority: "Medium", status: "Pending", notes: "" },
    { id: "TSK-003", title: "Weekly compliance report", due: "Tomorrow, 09:00", priority: "Low", status: "Pending", notes: "" },
    { id: "TSK-004", title: "Follow up with rider Sarah K.", due: "Today, 14:00", priority: "High", status: "Pending", notes: "" },
    { id: "TSK-005", title: "Review training module feedback", due: "Tomorrow, 11:00", priority: "Low", status: "Pending", notes: "" },
];

export default function TasksPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const [tasks, setTasks] = useState(() => {
        try {
            const stored = sessionStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : initialTasks;
        } catch {
            return initialTasks;
        }
    });

    const [selectedTask, setSelectedTask] = useState<any>(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [notes, setNotes] = useState("");

    const saveTasks = (updated: any[]) => {
        setTasks(updated);
        sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    };

    const handleTaskClick = (task: any) => {
        setSelectedTask(task);
        setNotes(task.notes || "");
        setDialogOpen(true);
    };

    const handleClose = () => {
        setDialogOpen(false);
        setSelectedTask(null);
    };

    const handleComplete = () => {
        const updated = tasks.map((t: any) =>
            t.id === selectedTask.id ? { ...t, status: "Completed", notes } : t
        );
        saveTasks(updated);
        handleClose();
    };

    const handleSaveNotes = () => {
        const updated = tasks.map((t: any) =>
            t.id === selectedTask.id ? { ...t, notes } : t
        );
        saveTasks(updated);
        handleClose();
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High": return { bg: "rgba(239,68,68,0.15)", color: "#dc2626", border: "#ef4444" };
            case "Medium": return { bg: "rgba(251,146,60,0.15)", color: "#ea580c", border: "#f97316" };
            case "Low": return { bg: "rgba(34,197,94,0.15)", color: "#16a34a", border: "#22c55e" };
            default: return { bg: "rgba(148,163,184,0.15)", color: EVZONE_GREY, border: "#94a3b8" };
        }
    };

    const pendingTasks = tasks.filter((t: any) => t.status === "Pending");
    const completedTasks = tasks.filter((t: any) => t.status === "Completed");

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
            <Box className="w-full">
                <PageBreadcrumb
                    items={[{ label: "Dashboard", href: "/agent/dashboard" }]}
                    current="My Tasks"
                />

                <Box className="mb-6">
                    <Typography variant="h5" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#111827", mb: 1 }}>
                        My Tasks
                    </Typography>
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                        Manage your daily tasks and priorities. Click a task to review and take action.
                    </Typography>
                </Box>

                {/* Pending Tasks */}
                <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5, color: isDark ? "#e5e7eb" : "#111827" }}>
                    Pending ({pendingTasks.length})
                </Typography>
                <Stack spacing={2} sx={{ mb: 4 }}>
                    {pendingTasks.map((task: any) => {
                        const priorityStyle = getPriorityColor(task.priority);
                        return (
                            <Card
                                key={task.id}
                                elevation={0}
                                sx={{
                                    borderRadius: 3,
                                    backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                                    border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                                }}
                            >
                                <CardActionArea onClick={() => handleTaskClick(task)}>
                                    <CardContent sx={{ p: 2 }}>
                                        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} spacing={1.5}>
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <AssignmentOutlinedIcon sx={{ color: EVZONE_GREY }} />
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
                                                sx={{
                                                    borderRadius: 999,
                                                    fontWeight: 600,
                                                    fontSize: 11,
                                                    backgroundColor: priorityStyle.bg,
                                                    color: priorityStyle.color,
                                                    border: `1px solid ${priorityStyle.border}`,
                                                    alignSelf: { xs: "flex-start", sm: "center" },
                                                    ml: { xs: 5.5, sm: 0 } // Align with text on mobile
                                                }}
                                            />
                                        </Stack>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        );
                    })}
                    {pendingTasks.length === 0 && (
                        <Typography variant="body2" sx={{ color: EVZONE_GREY, fontStyle: "italic" }}>
                            No pending tasks. Great job!
                        </Typography>
                    )}
                </Stack>

                {/* Completed Tasks */}
                {completedTasks.length > 0 && (
                    <>
                        <Typography variant="subtitle2" fontWeight={700} sx={{ mb: 1.5, color: isDark ? "#e5e7eb" : "#111827" }}>
                            Completed ({completedTasks.length})
                        </Typography>
                        <Stack spacing={2}>
                            {completedTasks.map((task: any) => (
                                <Card
                                    key={task.id}
                                    elevation={0}
                                    sx={{
                                        borderRadius: 3,
                                        backgroundColor: isDark ? "rgba(2,6,23,0.3)" : "rgba(248,250,252,0.8)",
                                        border: `1px solid ${isDark ? "rgba(148,163,184,0.05)" : "rgba(226,232,240,0.5)"}`,
                                        opacity: 0.7,
                                    }}
                                >
                                    <CardContent sx={{ p: 2 }}>
                                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                                            <Stack direction="row" spacing={2} alignItems="center">
                                                <CheckCircleOutlineOutlinedIcon sx={{ color: EVZONE_GREEN }} />
                                                <Typography
                                                    variant="subtitle1"
                                                    fontWeight={500}
                                                    sx={{
                                                        color: EVZONE_GREY,
                                                        textDecoration: "line-through",
                                                    }}
                                                >
                                                    {task.title}
                                                </Typography>
                                            </Stack>
                                            <Chip label="Completed" size="small" color="success" variant="outlined" />
                                        </Stack>
                                    </CardContent>
                                </Card>
                            ))}
                        </Stack>
                    </>
                )}
            </Box>

            {/* Task Detail Dialog */}
            <Dialog open={dialogOpen} onClose={handleClose} maxWidth="sm" fullWidth>
                <DialogTitle sx={{ fontWeight: 700 }}>
                    Task Details
                </DialogTitle>
                <DialogContent dividers>
                    {selectedTask && (
                        <Stack spacing={2}>
                            <Box>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>Task ID</Typography>
                                <Typography variant="body2" fontWeight={600}>{selectedTask.id}</Typography>
                            </Box>
                            <Box>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>Title</Typography>
                                <Typography variant="body1" fontWeight={600}>{selectedTask.title}</Typography>
                            </Box>
                            <Stack direction="row" spacing={3}>
                                <Box>
                                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>Due</Typography>
                                    <Typography variant="body2">{selectedTask.due}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>Priority</Typography>
                                    <Chip
                                        label={selectedTask.priority}
                                        size="small"
                                        sx={{
                                            ml: 1,
                                            borderRadius: 999,
                                            fontWeight: 600,
                                            fontSize: 10,
                                            backgroundColor: getPriorityColor(selectedTask.priority).bg,
                                            color: getPriorityColor(selectedTask.priority).color,
                                        }}
                                    />
                                </Box>
                            </Stack>
                            <Divider />
                            <Box>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY, mb: 1, display: "block" }}>
                                    Notes
                                </Typography>
                                <TextField
                                    multiline
                                    rows={3}
                                    fullWidth
                                    placeholder="Add notes about this task..."
                                    value={notes}
                                    onChange={(e) => setNotes(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                />
                            </Box>
                        </Stack>
                    )}
                </DialogContent>
                <DialogActions sx={{ px: 3, py: 2 }}>
                    <Button onClick={handleClose} color="inherit">Cancel</Button>
                    <Button onClick={handleSaveNotes} variant="outlined">Save Notes</Button>
                    <Button
                        onClick={handleComplete}
                        variant="contained"
                        sx={{ bgcolor: EVZONE_GREEN, "&:hover": { bgcolor: "#02b87d" } }}
                    >
                        Mark Complete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}
