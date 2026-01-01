import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Button,
    TextField,
    MenuItem,
    FormControlLabel,
    Switch,
    Snackbar,
    Alert,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useSearchParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SendIcon from "@mui/icons-material/Send";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";

export default function SupportCreateTicketPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const incidentId = searchParams.get("incidentId");

    const [formData, setFormData] = useState({
        subject: incidentId ? `Incident Follow-up: ${incidentId}` : "",
        category: "Safety",
        description: incidentId ? `Related to incident ${incidentId}. ` : "",
        isHighPriority: false,
    });

    const [snackbar, setSnackbar] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Construct new ticket
        const newTicket = {
            id: `TCK-${Math.floor(1000 + Math.random() * 9000)}`,
            type: formData.category === "Billing" ? "Payment" : formData.category === "Safety" ? "Safety" : formData.category === "Technical" ? "App bug" : "Trip issue",
            subject: formData.subject,
            user: "Agent Created", // Placeholder as form doesn't have user selection
            status: "New",
            priority: formData.isHighPriority ? "High" : "Medium",
            createdAt: "Just now",
            sla: formData.isHighPriority ? "4h" : "24h",
            summary: formData.description,
            // Add read state for queue
            read: true,
        };

        // 2. Get existing or init
        let currentTickets = [];
        try {
            const stored = window.sessionStorage.getItem("evzone_tickets");
            if (stored) {
                currentTickets = JSON.parse(stored);
            } else {
                // If not initialized, we shouldn't overwrite the queue page's opportunity to init defaults.
                // However, to ensure this ticket shows up WITH defaults, we should init defaults here if missing.
                // We'll use a minimal set or empty if we prefer, but let's try to be consistent.
                // Ideally we'd import sampleTickets, but let's just make a fresh array if empty.
                // actually, let's just push to array. Queue page handles "if stored exists, return it".
                // So if we save JUST this ticket, the Queue page will only show this ticket.
                // That's acceptable for now, or we can duplicate the sample data here. 
                // Let's duplicate strictly necessary sample data to emulate the "demo" feel if user starts here.
                currentTickets = [
                    { id: "TCK-9012", type: "Trip issue", subject: "Driver arrived very late", user: "Rider · Sarah K.", status: "New", priority: "High", createdAt: "Today · 09:22", sla: "15 min", read: false },
                    { id: "TCK-9013", type: "Payment", subject: "Double charge on last trip", user: "Rider · Brian O.", status: "In progress", priority: "Medium", createdAt: "Today · 08:47", sla: "32 min", read: false },
                    { id: "TCK-9014", type: "App bug", subject: "Driver app keeps freezing", user: "Driver · Kato R.", status: "Waiting", priority: "Medium", createdAt: "Today · 08:15", sla: "1 h 10 min", read: true },
                    { id: "TCK-9015", type: "Safety", subject: "Uncomfortable behaviour from rider", user: "Driver · Linda N.", status: "Escalated", priority: "High", createdAt: "Yesterday · 21:04", sla: "Escalated", read: true },
                ];
            }
        } catch (err) {
            console.error(err);
            currentTickets = [];
        }

        // 3. Append
        const updated = [newTicket, ...currentTickets];
        window.sessionStorage.setItem("evzone_tickets", JSON.stringify(updated));

        setSnackbar(true);
        setTimeout(() => {
            navigate("/agent/support");
        }, 1500);
    };

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
            <Box className="w-full">
                {/* Breadcrumb Navigation */}
                <PageBreadcrumb
                    items={[{ label: "Support", href: "/agent/support" }]}
                    current="Create Ticket"
                />

                <Typography
                    variant="h5"
                    sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 3,
                    }}
                >
                    Create New Ticket
                </Typography>

                <Card
                    elevation={1}
                    sx={{
                        borderRadius: 3,
                        backgroundColor: isDark ? "#020617" : "#ffffff",
                        border:
                            "1px solid " +
                            (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
                    }}
                >
                    <CardContent sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    label="Subject"
                                    fullWidth
                                    required
                                    value={formData.subject}
                                    onChange={(e) =>
                                        setFormData({ ...formData, subject: e.target.value })
                                    }
                                />

                                <TextField
                                    select
                                    label="Category"
                                    fullWidth
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({ ...formData, category: e.target.value })
                                    }
                                >
                                    <MenuItem value="Safety">Safety Incident</MenuItem>
                                    <MenuItem value="Billing">Billing Issue</MenuItem>
                                    <MenuItem value="Technical">Technical Support</MenuItem>
                                    <MenuItem value="General">General Inquiry</MenuItem>
                                </TextField>

                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    required
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({ ...formData, description: e.target.value })
                                    }
                                />

                                <FormControlLabel
                                    control={
                                        <Switch
                                            checked={formData.isHighPriority}
                                            onChange={(e) =>
                                                setFormData({
                                                    ...formData,
                                                    isHighPriority: e.target.checked,
                                                })
                                            }
                                            color="error"
                                        />
                                    }
                                    label="High Priority"
                                />

                                <Button
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    startIcon={<SendIcon />}
                                    sx={{
                                        borderRadius: 999,
                                        backgroundColor: EVZONE_GREEN,
                                        "&:hover": {
                                            backgroundColor: "#059669",
                                        },
                                        fontWeight: 700,
                                        textTransform: "none",
                                        alignSelf: "flex-end",
                                        px: 4
                                    }}
                                >
                                    Create Ticket
                                </Button>
                            </Stack>
                        </form>
                    </CardContent>
                </Card>
            </Box>

            <Snackbar
                open={snackbar}
                autoHideDuration={2000}
                onClose={() => setSnackbar(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
                <Alert severity="success" sx={{ width: "100%" }}>
                    Ticket created successfully! Redirecting...
                </Alert>
            </Snackbar>
        </Box>
    );
}
