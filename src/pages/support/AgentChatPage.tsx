import React, { useState } from "react";
import {
    Box,
    Typography,
    Card,
    CardContent,
    Stack,
    TextField,
    IconButton,
    Avatar,
    Paper,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";

export default function AgentChatPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const { agentId } = useParams();
    const agentName = agentId ? decodeURIComponent(agentId) : "Agent";

    const [message, setMessage] = useState("");
    const [history, setHistory] = useState([
        { id: 1, sender: "agent", text: `Hi there! This is ${agentName}. How can I maintain the platform standards today?`, time: "09:00" },
        { id: 2, sender: "me", text: "Hey! I just wanted to check on the status of Ticket #2094.", time: "09:02" },
        { id: 3, sender: "agent", text: "Sure, let me pull that up for you. One moment please.", time: "09:03" },
    ]);

    const handleSend = () => {
        if (!message.trim()) return;
        const newMsg = {
            id: history.length + 1,
            sender: "me",
            text: message,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setHistory([...history, newMsg]);
        setMessage("");

        // Simulate reply
        setTimeout(() => {
            setHistory(prev => [...prev, {
                id: prev.length + 1,
                sender: "agent",
                text: "I see it's currently pending review by the safety team.",
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }]);
        }, 1500);
    };

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4 flex flex-col">
            <Box className="max-w-4xl mx-auto w-full flex-1 flex flex-col">
                <PageBreadcrumb
                    items={[
                        { label: "Dashboard", href: "/agent/dashboard" },
                        { label: "Agents", href: "/agent/dashboard/analytics" }, // Approximated parent
                    ]}
                    current={`Chat with ${agentName}`}
                />

                <Card
                    elevation={0}
                    sx={{
                        flex: 1,
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "#ffffff",
                        border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                        mt: 2,
                        overflow: "hidden",
                        minHeight: "600px",
                    }}
                >
                    {/* Chat Header */}
                    <Box sx={{ p: 2, borderBottom: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}` }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar sx={{ bgcolor: isDark ? "rgba(255,255,255,0.05)" : "#f1f5f9", color: EVZONE_GREEN }}>
                                <SupportAgentOutlinedIcon />
                            </Avatar>
                            <Box>
                                <Typography variant="subtitle1" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                    {agentName}
                                </Typography>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                    Typically replies within 5 minutes
                                </Typography>
                            </Box>
                        </Stack>
                    </Box>

                    {/* Messages Area */}
                    <Box sx={{ flex: 1, p: 3, overflowY: "auto", display: "flex", flexDirection: "column", gap: 2 }}>
                        {history.map((msg) => (
                            <Box
                                key={msg.id}
                                sx={{
                                    alignSelf: msg.sender === "me" ? "flex-end" : "flex-start",
                                    maxWidth: "70%",
                                }}
                            >
                                <Paper
                                    elevation={0}
                                    sx={{
                                        p: 2,
                                        borderRadius: 3,
                                        borderTopRightRadius: msg.sender === "me" ? 0 : 12,
                                        borderTopLeftRadius: msg.sender === "me" ? 12 : 0,
                                        bgcolor: msg.sender === "me" ? EVZONE_GREEN : (isDark ? "rgba(30,41,59,0.5)" : "#f1f5f9"),
                                        color: msg.sender === "me" ? "#fff" : (isDark ? "#e5e7eb" : "#111827"),
                                    }}
                                >
                                    <Typography variant="body2">{msg.text}</Typography>
                                </Paper>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY, mt: 0.5, display: "block", textAlign: msg.sender === "me" ? "right" : "left" }}>
                                    {msg.time}
                                </Typography>
                            </Box>
                        ))}
                    </Box>

                    {/* Input Area */}
                    <Box sx={{ p: 2, borderTop: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}` }}>
                        <Stack direction="row" spacing={2}>
                            <IconButton size="small">
                                <AttachFileOutlinedIcon />
                            </IconButton>
                            <TextField
                                fullWidth
                                size="small"
                                placeholder="Type a message..."
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        borderRadius: 999,
                                    }
                                }}
                            />
                            <IconButton onClick={handleSend} color="primary" disabled={!message.trim()}>
                                <SendOutlinedIcon sx={{ color: message.trim() ? EVZONE_GREEN : EVZONE_GREY }} />
                            </IconButton>
                        </Stack>
                    </Box>
                </Card>
            </Box>
        </Box>
    );
}
