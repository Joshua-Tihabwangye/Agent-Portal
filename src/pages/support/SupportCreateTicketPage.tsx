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
        console.log("Submitting ticket:", formData);
        setSnackbar(true);
        setTimeout(() => {
            navigate("/agent/support");
        }, 1500);
    };

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
            <Box className="max-w-2xl mx-auto">
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate(-1)}
                    sx={{ mb: 2, color: EVZONE_GREY }}
                >
                    Back
                </Button>

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
