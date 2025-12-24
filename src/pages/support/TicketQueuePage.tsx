import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  TextField,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import BugReportOutlinedIcon from "@mui/icons-material/BugReportOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const sampleTickets = [
  {
    id: "TCK-9012",
    type: "Trip issue",
    icon: <SupportAgentOutlinedIcon fontSize="small" />,
    subject: "Driver arrived very late",
    user: "Rider · Sarah K.",
    status: "New",
    priority: "High",
    createdAt: "Today · 09:22",
    sla: "15 min",
  },
  {
    id: "TCK-9013",
    type: "Payment",
    icon: <PaymentsOutlinedIcon fontSize="small" />,
    subject: "Double charge on last trip",
    user: "Rider · Brian O.",
    status: "In progress",
    priority: "Medium",
    createdAt: "Today · 08:47",
    sla: "32 min",
  },
  {
    id: "TCK-9014",
    type: "App bug",
    icon: <BugReportOutlinedIcon fontSize="small" />,
    subject: "Driver app keeps freezing",
    user: "Driver · Kato R.",
    status: "Waiting",
    priority: "Medium",
    createdAt: "Today · 08:15",
    sla: "1 h 10 min",
  },
  {
    id: "TCK-9015",
    type: "Safety",
    icon: <ReportProblemOutlinedIcon fontSize="small" />,
    subject: "Uncomfortable behaviour from rider",
    user: "Driver · Linda N.",
    status: "Escalated",
    priority: "High",
    createdAt: "Yesterday · 21:04",
    sla: "Escalated",
  },
];

// Route target: /agent/support/tickets
export default function AgentTicketQueuePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = sampleTickets.filter((t) => {
    const matchesQuery =
      !query ||
      t.id.toLowerCase().includes(query.toLowerCase()) ||
      t.subject.toLowerCase().includes(query.toLowerCase()) ||
      t.user.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || t.status.toLowerCase() === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleStatusClick = (key) => {
    setStatusFilter(key);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4">
      <Box className="max-w-6xl mx-auto">
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
              Support tickets
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Handle requests from riders and drivers. Use filters to focus on
              the queue that needs you most.
            </Typography>
          </Box>

          <Chip
            label="Support agents"
            size="small"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: isDark
                ? "rgba(15,23,42,0.9)"
                : "rgba(219,234,254,0.9)",
              border: "1px solid rgba(148,163,184,0.4)",
              color: isDark ? "#e5e7eb" : "#1e3a8a",
              fontWeight: 600,
            }}
          />
        </Box>

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
          <CardContent sx={{ p: 2.4 }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <SupportAgentOutlinedIcon
                    sx={{ fontSize: 20, color: EVZONE_GREEN }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Tickets in your queue
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    size="small"
                    placeholder="Search id, subject or user"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <SearchOutlinedIcon
                          sx={{ fontSize: 18, color: EVZONE_GREY, mr: 1 }}
                        />
                      ),
                      sx: {
                        borderRadius: 999,
                      },
                    }}
                    sx={{ minWidth: 220 }}
                  />
                  <IconButton size="small">
                    <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small">
                    <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Stack>

              {/* Status chips */}
              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label="All"
                  size="small"
                  onClick={() => handleStatusClick("all")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "all"
                        ? "rgba(3,205,140,0.16)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "all" ? "#047857" : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="New"
                  size="small"
                  onClick={() => handleStatusClick("new")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "new"
                        ? "rgba(56,189,248,0.18)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "new" ? "#0369a1" : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="In progress"
                  size="small"
                  onClick={() => handleStatusClick("in progress")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "in progress"
                        ? "rgba(22,163,74,0.16)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "in progress"
                        ? "#166534"
                        : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="Waiting"
                  size="small"
                  onClick={() => handleStatusClick("waiting")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "waiting"
                        ? "rgba(250,204,21,0.18)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "waiting" ? "#92400e" : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="Escalated"
                  size="small"
                  onClick={() => handleStatusClick("escalated")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "escalated"
                        ? "rgba(248,113,113,0.18)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "escalated"
                        ? "#b91c1c"
                        : EVZONE_GREY,
                  }}
                />
              </Stack>

              <List disablePadding>
                {filtered.length === 0 && (
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, fontStyle: "italic" }}
                  >
                    No tickets match the current filters.
                  </Typography>
                )}

                {filtered.map((ticket) => (
                  <ListItemButton
                    key={ticket.id}
                    sx={{
                      borderRadius: 3,
                      mb: 1,
                      px: 1.5,
                      py: 1,
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(248,250,252,0.95)",
                      border: "1px solid rgba(203,213,225,0.9)",
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      {ticket.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            {ticket.subject}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {ticket.id}
                          </Typography>
                        </Stack>
                      }
                      secondary={
                        <Stack spacing={0.2}>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {ticket.user}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {ticket.createdAt}
                          </Typography>
                        </Stack>
                      }
                    />
                    <Stack spacing={0.5} alignItems="flex-end">
                      <Chip
                        size="small"
                        label={ticket.status}
                        sx={{
                          borderRadius: 999,
                          fontSize: 10,
                          textTransform: "none",
                          backgroundColor:
                            ticket.status === "New"
                              ? "rgba(56,189,248,0.15)"
                              : ticket.status === "In progress"
                                ? "rgba(22,163,74,0.14)"
                                : ticket.status === "Waiting"
                                  ? "rgba(250,204,21,0.14)"
                                  : "rgba(248,113,113,0.14)",
                          color:
                            ticket.status === "New"
                              ? "#0369a1"
                              : ticket.status === "In progress"
                                ? "#166534"
                                : ticket.status === "Waiting"
                                  ? "#92400e"
                                  : "#b91c1c",
                        }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        SLA {ticket.sla}
                      </Typography>
                    </Stack>
                  </ListItemButton>
                ))}
              </List>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
