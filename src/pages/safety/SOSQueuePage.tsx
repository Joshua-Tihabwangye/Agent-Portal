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
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const sampleSOS = [
  {
    id: "INC-7001",
    time: "Today · 09:05",
    location: "Ntinda Junction",
    userName: "Sarah K.",
    userType: "Rider",
    tripId: "BK-2060",
    severity: "High",
    status: "New",
  },
  {
    id: "INC-7002",
    time: "Today · 08:52",
    location: "Kira Road",
    userName: "Kato R.",
    userType: "Driver",
    tripId: "BK-2059",
    severity: "Medium",
    status: "Under review",
  },
  {
    id: "INC-7003",
    time: "Yesterday · 21:13",
    location: "Entebbe Highway",
    userName: "Linda N.",
    userType: "Driver",
    tripId: "BK-2040",
    severity: "High",
    status: "Escalated",
  },
  {
    id: "INC-7004",
    time: "2 days ago",
    location: "City Mall",
    userName: "Brian O.",
    userType: "Rider",
    tripId: "BK-2038",
    severity: "Low",
    status: "Resolved",
  },
];

const safetyAgents = [
  { name: "Grace Nakato", status: "Online", queue: 3 },
  { name: "Peter Ssemwanga", status: "Online", queue: 2 },
  { name: "Rose Atim", status: "Busy", queue: 5 },
  { name: "Moses Kizza", status: "Offline", queue: 0 },
];

// Route target: /agent/safety/sos
export default function AgentSafetySOSQueuePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [incidents, setIncidents] = useState(sampleSOS);
  const [agentsDialogOpen, setAgentsDialogOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const filtered = incidents.filter((s) => {
    const matchesQuery =
      !query ||
      s.id.toLowerCase().includes(query.toLowerCase()) ||
      s.userName.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || s.status.toLowerCase() === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleStatusClick = (key: string) => {
    setStatusFilter(key);
  };

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setIncidents([...sampleSOS]);
      setRefreshing(false);
    }, 800);
  };

  const handleIncidentClick = (incidentId: string) => {
    navigate(`/agent/safety/incidents/${incidentId}`);
  };

  const getSeverityChip = (severity: string) => {
    if (severity === "High") {
      return (
        <Chip
          size="small"
          label="High"
          sx={{
            borderRadius: 999,
            fontSize: 10,
            textTransform: "none",
            backgroundColor: "rgba(248,113,113,0.18)",
            color: "#b91c1c",
          }}
        />
      );
    }
    if (severity === "Medium") {
      return (
        <Chip
          size="small"
          label="Medium"
          sx={{
            borderRadius: 999,
            fontSize: 10,
            textTransform: "none",
            backgroundColor: "rgba(250,204,21,0.18)",
            color: "#92400e",
          }}
        />
      );
    }
    return (
      <Chip
        size="small"
        label="Low"
        sx={{
          borderRadius: 999,
          fontSize: 10,
          textTransform: "none",
          backgroundColor: "rgba(22,163,74,0.12)",
          color: "#166534",
        }}
      />
    );
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4">
      <Box className="w-full">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[]}
          current="SOS Queue"
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
              SOS queue
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Live safety alerts from riders and drivers. Triage quickly and
              escalate severe incidents according to protocol.
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="small"
            startIcon={<GroupOutlinedIcon />}
            onClick={() => setAgentsDialogOpen(true)}
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: isDark ? "rgba(248,113,113,0.2)" : "rgba(254,242,242,0.9)",
              color: isDark ? "#fecaca" : "#b91c1c",
              fontWeight: 600,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: isDark ? "rgba(248,113,113,0.3)" : "rgba(254,226,226,1)",
                boxShadow: "none",
              },
            }}
          >
            Safety agents
          </Button>
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
                  <ReportProblemOutlinedIcon
                    sx={{ fontSize: 20, color: "#f97316" }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Active SOS incidents
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    size="small"
                    placeholder="Search id, name or location"
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
                  <IconButton
                    size="small"
                    onClick={handleRefresh}
                    disabled={refreshing}
                    sx={{
                      animation: refreshing ? "spin 1s linear infinite" : "none",
                      "@keyframes spin": {
                        "0%": { transform: "rotate(0deg)" },
                        "100%": { transform: "rotate(360deg)" },
                      },
                    }}
                  >
                    <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Stack>

              {/* Status chips */}
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {["all", "new", "under review", "escalated", "resolved"].map((status) => (
                  <Chip
                    key={status}
                    label={status.charAt(0).toUpperCase() + status.slice(1)}
                    size="small"
                    onClick={() => handleStatusClick(status)}
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor:
                        statusFilter === status
                          ? status === "all" ? "rgba(3,205,140,0.16)"
                            : status === "new" ? "rgba(248,113,113,0.2)"
                              : status === "under review" ? "rgba(56,189,248,0.18)"
                                : status === "escalated" ? "rgba(129,140,248,0.2)"
                                  : "rgba(22,163,74,0.12)"
                          : "rgba(248,250,252,1)",
                      color:
                        statusFilter === status
                          ? status === "all" ? "#047857"
                            : status === "new" ? "#b91c1c"
                              : status === "under review" ? "#0369a1"
                                : status === "escalated" ? "#4f46e5"
                                  : "#166534"
                          : EVZONE_GREY,
                    }}
                  />
                ))}
              </Stack>

              <List disablePadding>
                {filtered.length === 0 && (
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, fontStyle: "italic" }}
                  >
                    No incidents match the current filters.
                  </Typography>
                )}

                {filtered.map((inc) => (
                  <ListItemButton
                    key={inc.id}
                    onClick={() => handleIncidentClick(inc.id)}
                    sx={{
                      borderRadius: 3,
                      mb: 1,
                      px: 1.5,
                      py: 1,
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(248,250,252,0.95)",
                      border: "1px solid rgba(203,213,225,0.9)",
                      cursor: "pointer",
                      "&:hover": {
                        backgroundColor: isDark
                          ? "rgba(30,41,59,0.9)"
                          : "rgba(241,245,249,1)",
                      },
                    }}
                  >
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <WarningAmberOutlinedIcon
                        sx={{
                          fontSize: 20,
                          color:
                            inc.severity === "High"
                              ? "#b91c1c"
                              : inc.severity === "Medium"
                                ? "#f97316"
                                : "#16a34a",
                        }}
                      />
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
                            {inc.id} · {inc.location}
                          </Typography>
                          {getSeverityChip(inc.severity)}
                        </Stack>
                      }
                      secondary={
                        <Stack spacing={0.2}>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            <PersonOutlineOutlinedIcon
                              sx={{ fontSize: 14, color: EVZONE_GREY }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY }}
                            >
                              {inc.userType} · {inc.userName}
                            </Typography>
                          </Stack>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            <PlaceOutlinedIcon
                              sx={{ fontSize: 14, color: EVZONE_GREY }}
                            />
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY }}
                            >
                              Trip {inc.tripId} · {inc.time}
                            </Typography>
                          </Stack>
                        </Stack>
                      }
                    />
                  </ListItemButton>
                ))}
              </List>
            </Stack>
          </CardContent>
        </Card>
      </Box>

      {/* Safety Agents Dialog */}
      <Dialog
        open={agentsDialogOpen}
        onClose={() => setAgentsDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ fontWeight: 700 }}>Safety Agents Online</DialogTitle>
        <DialogContent dividers>
          <Stack spacing={1.5}>
            {safetyAgents.map((agent, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 1.5,
                  borderRadius: 2,
                  backgroundColor: isDark ? "rgba(15,23,42,0.5)" : "rgba(248,250,252,1)",
                  border: "1px solid rgba(203,213,225,0.5)",
                }}
              >
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    {agent.name}
                  </Typography>
                  <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                    Queue: {agent.queue} incidents
                  </Typography>
                </Box>
                <Chip
                  label={agent.status}
                  size="small"
                  sx={{
                    borderRadius: 999,
                    fontSize: 10,
                    backgroundColor:
                      agent.status === "Online"
                        ? "rgba(22,163,74,0.12)"
                        : agent.status === "Busy"
                          ? "rgba(250,204,21,0.18)"
                          : "rgba(148,163,184,0.2)",
                    color:
                      agent.status === "Online"
                        ? "#166534"
                        : agent.status === "Busy"
                          ? "#92400e"
                          : EVZONE_GREY,
                  }}
                />
              </Box>
            ))}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setAgentsDialogOpen(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
