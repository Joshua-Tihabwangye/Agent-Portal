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
  Avatar,
  Grid,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Enhanced sample data
const sampleDrivers = [
  {
    id: "DRV-101",
    name: "Michael K.",
    city: "Kampala",
    company: "Indep.",
    stage: "Docs pending review",
    status: "Under Review",
    date: "2025-05-10",
  },
  {
    id: "DRV-102",
    name: "Sarah T.",
    city: "Entebbe",
    company: "Fleet A",
    stage: "Extra info required",
    status: "Needs Info",
    date: "2025-05-12",
  },
  {
    id: "DRV-103",
    name: "John D.",
    city: "Kampala",
    company: "Fleet B",
    stage: "Onboarding complete",
    status: "Approved",
    date: "2025-05-08",
  },
  {
    id: "DRV-104",
    name: "David M.",
    city: "Jinja",
    company: "Indep.",
    stage: "Rejected by safety",
    status: "Rejected",
    date: "2025-05-09",
  },
  {
    id: "DRV-105",
    name: "Grace L.",
    city: "Kampala",
    company: "Fleet A",
    stage: "Face match check",
    status: "Under Review",
    date: "2025-05-14",
  },
  {
    id: "DRV-106",
    name: "James P.",
    city: "Mukono",
    company: "Indep.",
    stage: "Docs pending review",
    status: "Under Review",
    date: "2025-05-15",
  },
];

export default function AgentDriverOnboardingQueuePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDrivers = sampleDrivers.filter((d) => {
    const matchesStatus =
      statusFilter === "All" || d.status === statusFilter;
    const matchesSearch =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return { bg: "rgba(22,163,74,0.12)", text: "#166534", border: "#22c55e" };
      case "Rejected":
        return { bg: "rgba(239,68,68,0.12)", text: "#b91c1c", border: "#ef4444" };
      case "Needs Info":
        return { bg: "rgba(250,204,21,0.12)", text: "#a16207", border: "#eab308" };
      case "Under Review":
      default:
        return { bg: "rgba(56,189,248,0.12)", text: "#0369a1", border: "#38bdf8" };
    }
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      {/* Header */}
      <Box className="mb-6">
        <Typography
          variant="h5"
          sx={{
            fontWeight: 700,
            color: isDark ? "#e5e7eb" : "#111827",
            mb: 1,
          }}
        >
          Driver Onboarding
        </Typography>
        <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
          Manage driver applications, verify documents, and track onboarding status.
        </Typography>
      </Box>

      {/* Filters */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        alignItems="center"
        className="mb-6"
      >
        <Box
          className="flex items-center px-3 py-2 rounded-xl"
          sx={{
            backgroundColor: isDark ? "#0f172a" : "#ffffff",
            border: "1px solid " + (isDark ? "#1e293b" : "#e2e8f0"),
            minWidth: 280,
          }}
        >
          <IconButton size="small" sx={{ p: 0.5, mr: 0.5 }}>
            <FilterListOutlinedIcon fontSize="small" />
          </IconButton>
          <TextField
            variant="standard"
            placeholder="Search drivers"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{ disableUnderline: true }}
            sx={{ width: "100%" }}
          />
        </Box>

        <Stack direction="row" spacing={1} overflow="auto" sx={{ width: "100%", pb: 0.5 }}>
          {["All", "Approved", "Under Review", "Needs Info", "Rejected"].map((status) => (
            <Chip
              key={status}
              label={status}
              onClick={() => setStatusFilter(status)}
              sx={{
                fontWeight: 600,
                borderRadius: 2,
                backgroundColor:
                  statusFilter === status
                    ? isDark
                      ? "rgba(3,205,140,0.2)"
                      : "rgba(3,205,140,0.15)"
                    : "transparent",
                color:
                  statusFilter === status
                    ? EVZONE_GREEN
                    : EVZONE_GREY,
                border:
                  statusFilter === status
                    ? `1px solid ${EVZONE_GREEN}`
                    : "1px solid rgba(148,163,184,0.3)",
                "&:hover": {
                  backgroundColor:
                    statusFilter === status
                      ? isDark
                        ? "rgba(3,205,140,0.3)"
                        : "rgba(3,205,140,0.25)"
                      : "rgba(148,163,184,0.1)",
                },
              }}
            />
          ))}
        </Stack>
      </Stack>

      {/* Driver List */}
      <Grid container spacing={2}>
        {filteredDrivers.map((driver) => {
          const styles = getStatusColor(driver.status);
          return (
            <Grid size={{ xs: 12 }} key={driver.id}>
              <Card
                elevation={0}
                onClick={() => navigate(`/agent/onboarding/drivers/${driver.id}`)}
                sx={{
                  borderRadius: 3,
                  backgroundColor: isDark ? "#020617" : "#ffffff",
                  border: "1px solid " + (isDark ? "#1e293b" : "#e2e8f0"),
                  cursor: "pointer",
                  transition: "all 0.2s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)",
                    borderColor: EVZONE_GREEN,
                  },
                }}
              >
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    justifyContent="space-between"
                    alignItems={{ xs: "flex-start", sm: "center" }}
                    spacing={2}
                  >
                    <Stack direction="row" spacing={2} alignItems="center">
                      <Avatar
                        sx={{
                          width: 48,
                          height: 48,
                          bgcolor: isDark ? "#1e293b" : "#f1f5f9",
                          color: isDark ? "#94a3b8" : "#64748b",
                        }}
                      >
                        <AssignmentIndOutlinedIcon />
                      </Avatar>
                      <Box>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}
                        >
                          {driver.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                          {driver.id} · {driver.city} · {driver.company}
                        </Typography>
                      </Box>
                    </Stack>

                    <Stack direction="row" spacing={3} alignItems="center">
                      <Box sx={{ textAlign: "right", display: { xs: "none", md: "block" } }}>
                        <Typography variant="caption" sx={{ color: EVZONE_GREY, display: "block" }}>
                          Applied on
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 500 }}>
                          {driver.date}
                        </Typography>
                      </Box>

                      <Chip
                        label={driver.status}
                        size="small"
                        sx={{
                          borderRadius: 999,
                          fontWeight: 600,
                          backgroundColor: styles.bg,
                          color: styles.text,
                          border: `1px solid ${styles.border}`,
                        }}
                      />

                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          );
        })}

        {filteredDrivers.length === 0 && (
          <Box sx={{ width: "100%", textAlign: "center", py: 8 }}>
            <Typography variant="body1" sx={{ color: EVZONE_GREY }}>
              No drivers found matching your criteria.
            </Typography>
          </Box>
        )}
      </Grid>
    </Box>
  );
}
