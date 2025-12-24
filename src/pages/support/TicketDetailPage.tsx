import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Grid,
  Divider,
  TextField,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Placeholder ticket; in a real app load via ticketId.
const ticket = {
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

export default function AgentTicketDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [reply, setReply] = useState("");
  const [internalNote, setInternalNote] = useState("");

  const handleSendReply = () => {
    if (!reply.trim()) return;
    console.log("Send reply", { ticketId: ticket.id, reply });
    setReply("");
  };

  const handleAddNote = () => {
    if (!internalNote.trim()) return;
    console.log("Add internal note", { ticketId: ticket.id, internalNote });
    setInternalNote("");
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-4xl mx-auto">
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
            <Chip
              label={ticket.status}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor:
                  ticket.status === "In progress"
                    ? "rgba(56,189,248,0.2)"
                    : "rgba(22,163,74,0.16)",
                color:
                  ticket.status === "In progress" ? "#0369a1" : "#166534",
                border:
                  ticket.status === "In progress"
                    ? "1px solid rgba(56,189,248,0.6)"
                    : "1px solid rgba(34,197,94,0.6)",
              }}
            />
            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
              {ticket.createdAt}
            </Typography>
          </Stack>
        </Box>

        <Grid container spacing={2.4}>
          {/* Left column: summary and user */}
          <Grid item xs={12} md={5}>
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
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column: conversation and notes */}
          <Grid item xs={12} md={7}>
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
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, display: "block", mb: 0.5 }}
                  >
                    Conversation history (placeholder)
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: isDark ? "#e5e7eb" : "#111827" }}
                  >
                    Rider: "Driver kept changing the pickup point and arrived
                    very late. I almost missed my appointment."
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: isDark ? "#e5e7eb" : "#111827",
                      mt: 0.8,
                    }}
                  >
                    Agent: "Thanks for explaining. I will review the trip
                    timeline and get back to you with an update."
                  </Typography>
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
    </Box>
  );
}

// Suggested tests (to be implemented in a separate test file):
// - Render <AgentTicketDetailPage /> and assert that ticket.id and ticket.subject appear.
// - Simulate typing in the reply TextField, click "Send reply" and assert console/log handler is called.
// - Simulate typing in the internal note TextField, click "Save note" and assert console/log handler is called.
