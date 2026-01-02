import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Chip,
    Stack,
    Button,
    IconButton,
    CardActionArea,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import DraftsOutlinedIcon from "@mui/icons-material/DraftsOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";
const DRAFTS_STORAGE_KEY = "evzone_drafts";

export interface Draft {
    id: string;
    type: "ticket" | "dispatch" | "incident";
    title: string;
    createdAt: string;
    data: any;
}

export function saveDraft(draft: Draft) {
    try {
        const stored = sessionStorage.getItem(DRAFTS_STORAGE_KEY);
        const drafts: Draft[] = stored ? JSON.parse(stored) : [];
        // Update existing or add new
        const existingIndex = drafts.findIndex(d => d.id === draft.id);
        if (existingIndex >= 0) {
            drafts[existingIndex] = draft;
        } else {
            drafts.unshift(draft);
        }
        sessionStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    } catch (e) {
        console.error("Failed to save draft:", e);
    }
}

export function getDrafts(): Draft[] {
    try {
        const stored = sessionStorage.getItem(DRAFTS_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch {
        return [];
    }
}

export function deleteDraft(id: string) {
    try {
        const drafts = getDrafts().filter(d => d.id !== id);
        sessionStorage.setItem(DRAFTS_STORAGE_KEY, JSON.stringify(drafts));
    } catch (e) {
        console.error("Failed to delete draft:", e);
    }
}

export default function DraftsPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const navigate = useNavigate();

    const [drafts, setDrafts] = useState<Draft[]>([]);

    useEffect(() => {
        setDrafts(getDrafts());
    }, []);

    const handleDelete = (id: string) => {
        deleteDraft(id);
        setDrafts(getDrafts());
    };

    const handleResume = (draft: Draft) => {
        // Navigate to appropriate page with draft data
        switch (draft.type) {
            case "ticket":
                navigate("/agent/support/tickets/new", { state: { draft: draft.data } });
                break;
            case "dispatch":
                navigate("/agent/dispatch/new", { state: { draft: draft.data } });
                break;
            case "incident":
                navigate("/agent/safety/incidents/new", { state: { draft: draft.data } });
                break;
            default:
                break;
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case "ticket":
                return <ConfirmationNumberOutlinedIcon fontSize="small" />;
            case "dispatch":
                return <LocalShippingOutlinedIcon fontSize="small" />;
            case "incident":
                return <DirectionsCarOutlinedIcon fontSize="small" />;
            default:
                return <DraftsOutlinedIcon fontSize="small" />;
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case "ticket": return { bg: "rgba(251,146,60,0.15)", color: "#ea580c" };
            case "dispatch": return { bg: "rgba(56,189,248,0.15)", color: "#0284c7" };
            case "incident": return { bg: "rgba(248,113,113,0.15)", color: "#dc2626" };
            default: return { bg: "rgba(148,163,184,0.15)", color: EVZONE_GREY };
        }
    };

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
            <Box className="max-w-5xl mx-auto">
                <PageBreadcrumb
                    items={[{ label: "Dashboard", href: "/agent/dashboard" }]}
                    current="My Drafts"
                />

                <Box className="mb-6">
                    <Typography variant="h5" fontWeight={800} sx={{ color: isDark ? "#e5e7eb" : "#111827", mb: 1 }}>
                        My Drafts
                    </Typography>
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                        Resume working on saved drafts. Drafts are stored locally in your browser session.
                    </Typography>
                </Box>

                {drafts.length === 0 ? (
                    <Card
                        elevation={0}
                        sx={{
                            borderRadius: 3,
                            backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                            border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            textAlign: "center",
                            py: 6,
                        }}
                    >
                        <DraftsOutlinedIcon sx={{ fontSize: 48, color: EVZONE_GREY, mb: 2 }} />
                        <Typography variant="body1" sx={{ color: EVZONE_GREY }}>
                            No drafts saved yet.
                        </Typography>
                        <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                            When you save a ticket, dispatch, or incident as draft, it will appear here.
                        </Typography>
                    </Card>
                ) : (
                    <Stack spacing={2}>
                        {drafts.map((draft) => {
                            const typeStyle = getTypeColor(draft.type);
                            return (
                                <Card
                                    key={draft.id}
                                    elevation={0}
                                    sx={{
                                        borderRadius: 3,
                                        backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                                        border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                                    }}
                                >
                                    <CardActionArea onClick={() => handleResume(draft)}>
                                        <CardContent sx={{ p: 2 }}>
                                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                                <Stack direction="row" spacing={2} alignItems="center">
                                                    <Box
                                                        sx={{
                                                            width: 36,
                                                            height: 36,
                                                            borderRadius: 2,
                                                            display: "flex",
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                            bgcolor: typeStyle.bg,
                                                            color: typeStyle.color,
                                                        }}
                                                    >
                                                        {getTypeIcon(draft.type)}
                                                    </Box>
                                                    <Box>
                                                        <Typography variant="subtitle1" fontWeight={600} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                                            {draft.title || `Untitled ${draft.type}`}
                                                        </Typography>
                                                        <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                            {draft.type.charAt(0).toUpperCase() + draft.type.slice(1)} · Saved {draft.createdAt}
                                                        </Typography>
                                                    </Box>
                                                </Stack>
                                                <Stack direction="row" spacing={1} alignItems="center">
                                                    <Chip
                                                        label="Draft"
                                                        size="small"
                                                        sx={{
                                                            borderRadius: 999,
                                                            fontSize: 10,
                                                            bgcolor: "rgba(148,163,184,0.15)",
                                                            color: EVZONE_GREY,
                                                        }}
                                                    />
                                                    <IconButton
                                                        size="small"
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            handleDelete(draft.id);
                                                        }}
                                                        sx={{ color: "#dc2626" }}
                                                    >
                                                        <DeleteOutlinedIcon fontSize="small" />
                                                    </IconButton>
                                                </Stack>
                                            </Stack>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            );
                        })}
                    </Stack>
                )}
            </Box>
        </Box>
    );
}
