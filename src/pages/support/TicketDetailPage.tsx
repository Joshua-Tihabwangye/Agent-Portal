import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItemButton,
  ListItemText,
  Snackbar,
  Alert,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Macros for quick responses
const macros = [
  { id: 1, name: "Apology - Late Arrival", text: "We sincerely apologize for the inconvenience caused by the late arrival. We take this seriously and are reviewing the trip details." },
  { id: 2, name: "Refund Process", text: "Your refund request has been submitted. Please allow 3-5 business days for the amount to reflect in your account." },
  { id: 3, name: "Driver Follow-up", text: "We have contacted the driver regarding this issue and will update you once we have more information." },
  { id: 4, name: "Escalation Notice", text: "This issue has been escalated to our safety team for further review. We will contact you within 24 hours." },
];

// Placeholder ticket; in a real app load via ticketId.
// Default ticket for fallback
const defaultTicket = {
  id: "TCK-9012",
  type: "Trip issue",
  channel: "In-app",
  userType: "Rider",
  userName: "Sarah K.",
  userPhone: "+256 700 200 168",
  status: "In progress",
  priority: "High",
  createdAt: "Today · 09:22",
  tripId: "BK-2048",
  subject: "Driver arrived very late",
  summary:
    "Rider reports that the driver took more than 20 minutes to arrive at pickup despite being nearby.",
};

const getTicketStatusColor = (status: string, isDark: boolean) => {
  switch (status) {
    case "In progress": return isDark ? "#38bdf8" : "#0284c7";
    case "Resolved": return "#16a34a";
    case "Rejected": return "#dc2626";
    case "Pending": return "#f59e0b";
    default: return isDark ? "#94a3b8" : "#64748b";
  }
};

const getTicketStatusBg = (status: string) => {
  switch (status) {
    case "In progress": return "rgba(56,189,248,0.2)";
    case "Resolved": return "rgba(22,163,74,0.16)";
    case "Rejected": return "rgba(220,38,38,0.16)";
    case "Pending": return "rgba(245,158,11,0.16)";
    default: return "rgba(148,163,184,0.16)";
  }
};

interface ChatMessage {
  sender: "rider" | "agent";
  text: string;
  time: string;
}

export default function AgentTicketDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const [reply, setReply] = useState("");
  const [internalNote, setInternalNote] = useState("");
  const [macroDialogOpen, setMacroDialogOpen] = useState(false);
  const [callSnackbar, setCallSnackbar] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { sender: "rider", text: "Driver kept changing the pickup point and arrived very late. I almost missed my appointment.", time: "09:22" },
    { sender: "agent", text: "Thanks for explaining. I will review the trip timeline and get back to you with an update.", time: "09:25" },
  ]);

  const { ticketId } = useParams();
  const [ticket, setTicket] = useState(defaultTicket);
  const [status, setStatus] = useState(defaultTicket.status);

  // Load ticket from storage
  React.useEffect(() => {
    if (ticketId) {
      try {
        const stored = window.sessionStorage.getItem("evzone_tickets");
        if (stored) {
          const tickets = JSON.parse(stored);
          const found = tickets.find((t: any) => t.id === ticketId);
          if (found) {
            setTicket(found);
            setStatus(found.status);
            // Ensure defaults for missing fields if coming from queue
            if (!found.userName) {
              setTicket(prev => ({
                ...prev,
                // polyfill missing fields for demo
                channel: "In-app",
                userType: "Rider",
                userName: found.user ? found.user.split("·")[1]?.trim() || found.user : "Sarah K.",
                userPhone: "+256 700 200 168",
                tripId: "BK-2048",
                summary: found.summary || found.subject,
                ...found
              }));
            }
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [ticketId]);

  // Helper to persist standard status changes
  const updateTicketStatus = (newStatus: string) => {
    setStatus(newStatus);

    // Update in storage
    try {
      const stored = window.sessionStorage.getItem("evzone_tickets");
      if (stored) {
        const tickets = JSON.parse(stored);
        const updated = tickets.map((t: any) => t.id === ticket.id ? { ...t, status: newStatus } : t);
        window.sessionStorage.setItem("evzone_tickets", JSON.stringify(updated));
      }
    } catch (e) {
      console.error("Failed to update ticket", e);
    }

    setSnackbar({ open: true, message: `Ticket marked as ${newStatus}`, severity: "success" });
  };
  const [snackbar, setSnackbar] = useState<{ open: boolean, message: string, severity: "success" | "info" }>({ open: false, message: "", severity: "info" });

  const handleSendReply = () => {
    if (!reply.trim()) return;
    const newMessage: ChatMessage = {
      sender: "agent",
      text: reply,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages([...messages, newMessage]);
    setReply("");
  };

  const handleInsertMacro = (macroText: string) => {
    setReply(macroText);
    setMacroDialogOpen(false);
  };

  const handleCall = () => {
    window.open(`tel:${ticket.userPhone.replace(/\s/g, "")}`, "_self");
    setCallSnackbar(true);
  };

  const handleAddNote = () => {
    if (!internalNote.trim()) return;
    console.log("Add internal note", { ticketId: ticket.id, internalNote });
    setInternalNote("");
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="w-full">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[{ label: "Support", href: "/agent/support" }]}
          current={`Ticket ${ticket.id}`}
        />
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Ticket {ticket.id}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              {ticket.type} · {ticket.subject}
            </Typography>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Stack direction="row" spacing={1} mb={0.5}>
              {status !== "Resolved" && status !== "Rejected" && (
                <>
                  <Button size="small" variant="outlined" color="warning" onClick={() => updateTicketStatus("Pending")} sx={{ borderRadius: 999, fontSize: 11, py: 0.1 }}>
                    Pending
                  </Button>
                  {/* Approve button for New tickets */}
                  {status === "New" && (
                    <Button size="small" variant="contained" onClick={() => updateTicketStatus("In progress")} sx={{ borderRadius: 999, fontSize: 11, py: 0.1, bgcolor: EVZONE_GREEN, "&:hover": { bgcolor: "#059669" } }}>
                      Approve
                    </Button>
                  )}
                  <Button size="small" variant="outlined" color="error" onClick={() => updateTicketStatus("Rejected")} sx={{ borderRadius: 999, fontSize: 11, py: 0.1 }}>
                    Reject
                  </Button>
                  <Button size="small" variant="contained" onClick={() => updateTicketStatus("Resolved")} sx={{ borderRadius: 999, fontSize: 11, py: 0.1, bgcolor: EVZONE_GREEN, "&:hover": { bgcolor: "#059669" } }}>
                    Resolve
                  </Button>
                </>
              )}
              {status === "Resolved" && (
                <Button size="small" variant="outlined" onClick={() => updateTicketStatus("In progress")} sx={{ borderRadius: 999, fontSize: 11 }}>
                  Re-open
                </Button>
              )}
            </Stack>
            <Chip
              label={status}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor: getTicketStatusBg(status),
                color: getTicketStatusColor(status, isDark),
                border: `1px solid ${getTicketStatusColor(status, isDark)}60`,
              }}
            />
            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
              {ticket.createdAt}
            </Typography>
          </Stack>
        </Box>

        <Grid container spacing={2.4}>
          {/* Left column: summary and user */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
                mb: 2,
              }}
            >
              <CardContent sx={{ p: 2.2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                    mb: 1,
                  }}
                >
                  Ticket summary
                </Typography>

                <Stack spacing={0.8}>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Type & channel
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {ticket.type} · {ticket.channel}
                    </Typography>
                  </Stack>

                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Priority
                    </Typography>
                    <Chip
                      size="small"
                      label={ticket.priority}
                      sx={{
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        backgroundColor:
                          ticket.priority === "High"
                            ? "rgba(248,113,113,0.18)"
                            : "rgba(250,204,21,0.18)",
                        color:
                          ticket.priority === "High" ? "#b91c1c" : "#92400e",
                      }}
                    />
                  </Stack>

                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Linked trip
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {ticket.tripId}
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Summary
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {ticket.summary}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

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
              <CardContent sx={{ p: 2.2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                    mb: 1,
                  }}
                >
                  User
                </Typography>

                <Stack spacing={0.8}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PersonOutlineOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREEN }}
                    />
                    <Box>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {ticket.userName}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        {ticket.userType}
                      </Typography>
                    </Box>
                  </Stack>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <PhoneEnabledOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREY }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      {ticket.userPhone}
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  <Stack spacing={0.4}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Quick actions
                    </Typography>
                    <Stack direction="row" spacing={1.5} flexWrap="wrap">
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/agent/live-ops/trips/${ticket.tripId}`)}
                        startIcon={
                          <DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} />
                        }
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontSize: 12,
                        }}
                      >
                        View trip
                      </Button>
                      <Button
                        variant="outlined"
                        size="small"
                        onClick={() => navigate(`/agent/safety/incidents/new?ticketId=${ticket.id}`)}
                        startIcon={
                          <ReportProblemOutlinedIcon sx={{ fontSize: 16 }} />
                        }
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontSize: 12,
                        }}
                      >
                        Open incident
                      </Button>
                      <Button
                        variant="contained"
                        size="small"
                        onClick={handleCall}
                        startIcon={<CallOutlinedIcon sx={{ fontSize: 16 }} />}
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontSize: 12,
                          backgroundColor: EVZONE_GREEN,
                          "&:hover": { backgroundColor: "#059669" },
                        }}
                      >
                        Call user
                      </Button>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column: conversation and notes */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
                mb: 2,
              }}
            >
              <CardContent sx={{ p: 2.2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <SupportAgentOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Conversation
                    </Typography>
                  </Stack>
                  <Chip
                    label="Public reply"
                    size="small"
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(248,250,252,1)",
                      color: EVZONE_GREY,
                    }}
                  />
                </Stack>

                <Box
                  sx={{
                    mb: 1.5,
                    borderRadius: 3,
                    border: "1px solid rgba(203,213,225,0.9)",
                    backgroundColor: isDark
                      ? "rgba(15,23,42,0.9)"
                      : "rgba(248,250,252,0.95)",
                    p: 1.5,
                    minHeight: 120,
                    maxHeight: 280,
                    overflowY: "auto",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
                  >
                    Conversation history
                  </Typography>
                  {messages.map((msg, idx) => (
                    <Box
                      key={idx}
                      sx={{
                        mb: 1,
                        p: 1,
                        borderRadius: 2,
                        backgroundColor: msg.sender === "agent"
                          ? (isDark ? "rgba(3,205,140,0.15)" : "rgba(3,205,140,0.1)")
                          : (isDark ? "rgba(30,41,59,0.8)" : "rgba(241,245,249,0.8)"),
                        textAlign: msg.sender === "agent" ? "right" : "left",
                      }}
                    >
                      <Typography variant="caption" sx={{ color: EVZONE_GREY, display: "block", mb: 0.3 }}>
                        {msg.sender === "agent" ? "Agent" : "Rider"} · {msg.time}
                      </Typography>
                      <Typography variant="body2" sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                        {msg.text}
                      </Typography>
                    </Box>
                  ))}
                </Box>

                <Stack spacing={0.8}>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Write a reply
                  </Typography>
                  <TextField
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Reply to the rider or driver in a clear, calm tone."
                    multiline
                    minRows={3}
                    fullWidth
                    size="small"
                    InputProps={{ sx: { borderRadius: 3 } }}
                  />
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    spacing={1.5}
                  >
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => setMacroDialogOpen(true)}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 13,
                      }}
                    >
                      Insert macro
                    </Button>
                    <Button
                      onClick={handleSendReply}
                      disabled={!reply.trim()}
                      variant="contained"
                      size="small"
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 600,
                        backgroundColor: reply.trim()
                          ? EVZONE_GREEN
                          : "rgba(148,163,184,0.7)",
                        "&:hover": {
                          backgroundColor: reply.trim()
                            ? "#059669"
                            : undefined,
                        },
                      }}
                    >
                      Send reply
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

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
              <CardContent sx={{ p: 2.2 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <NoteAltOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Internal notes
                    </Typography>
                  </Stack>
                  <Chip
                    size="small"
                    label="Internal only"
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(248,250,252,1)",
                      color: EVZONE_GREY,
                    }}
                  />
                </Stack>

                <Stack spacing={0.8}>
                  <TextField
                    value={internalNote}
                    onChange={(e) => setInternalNote(e.target.value)}
                    placeholder="Add a note for other agents (never shown to riders or drivers)."
                    multiline
                    minRows={3}
                    fullWidth
                    size="small"
                    InputProps={{ sx: { borderRadius: 3 } }}
                  />
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY, maxWidth: 260 }}
                    >
                      Use notes for context on previous calls, suspected
                      abuse, or follow up actions.
                    </Typography>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={handleAddNote}
                      disabled={!internalNote.trim()}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 600,
                        backgroundColor: internalNote.trim()
                          ? EVZONE_GREEN
                          : "rgba(148,163,184,0.7)",
                        "&:hover": {
                          backgroundColor: internalNote.trim()
                            ? "#059669"
                            : undefined,
                        },
                      }}
                    >
                      Save note
                    </Button>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Macro Dialog */}
      <Dialog open={macroDialogOpen} onClose={() => setMacroDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Insert Macro</DialogTitle>
        <DialogContent dividers>
          <Typography variant="body2" color="text.secondary" mb={2}>
            Select a pre-written response to insert into your reply.
          </Typography>
          <List disablePadding>
            {macros.map((macro) => (
              <ListItemButton
                key={macro.id}
                onClick={() => handleInsertMacro(macro.text)}
                sx={{ borderRadius: 2, mb: 0.5, border: "1px solid rgba(203,213,225,0.5)" }}
              >
                <ListItemText
                  primary={<Typography variant="subtitle2" fontWeight={600}>{macro.name}</Typography>}
                  secondary={macro.text.substring(0, 80) + "..."}
                />
              </ListItemButton>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setMacroDialogOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Call Snackbar */}
      <Snackbar
        open={callSnackbar}
        autoHideDuration={4000}
        onClose={() => setCallSnackbar(false)}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" onClose={() => setCallSnackbar(false)} sx={{ width: "100%" }}>
          Initiating call to {ticket.userPhone}...
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

// Suggested tests (to be implemented in a separate test file):
// - Render <AgentTicketDetailPage /> and assert that ticket.id and ticket.subject appear.
// - Simulate typing in the reply TextField, click "Send reply" and assert console/log handler is called.
// - Simulate typing in the internal note TextField, click "Save note" and assert console/log handler is called.
