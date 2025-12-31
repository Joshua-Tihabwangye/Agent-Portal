import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  TextField,
  IconButton,
  Avatar,
  Grid,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Initial sample data
const initialDrivers = [
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

// Storage key for syncing status between pages
const STORAGE_KEY = "evzone_driver_onboarding_status";

export default function AgentDriverOnboardingQueuePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const [statusFilter, setStatusFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Load drivers from sessionStorage or use initial data
  const [drivers, setDrivers] = useState(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Merge with initial to handle new drivers
        return initialDrivers.map(d => ({
          ...d,
          status: parsed[d.id] || d.status,
        }));
      }
    } catch { /* ignore */ }
    return initialDrivers;
  });

  // Sync from sessionStorage on focus (when returning from case page)
  useEffect(() => {
    const handleFocus = () => {
      try {
        const stored = sessionStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          setDrivers(prev => prev.map(d => ({
            ...d,
            status: parsed[d.id] || d.status,
          })));
        }
      } catch { /* ignore */ }
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const updateDriverStatus = (driverId: string, newStatus: string) => {
    const updated = drivers.map(d =>
      d.id === driverId ? { ...d, status: newStatus } : d
    );
    setDrivers(updated);

    // Save to sessionStorage
    const statusMap: Record<string, string> = {};
    updated.forEach(d => { statusMap[d.id] = d.status; });
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(statusMap));
  };

  const filteredDrivers = drivers.filter((d) => {
    const matchesStatus = statusFilter === "All" || d.status === statusFilter;
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
      {/* Breadcrumb Navigation */}
      <PageBreadcrumb
        items={[]}
        current="Driver Onboarding"
      />
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

      {/* Driver Table */}
      <Card
        elevation={0}
        sx={{
          borderRadius: 3,
          backgroundColor: isDark ? "#020617" : "#ffffff",
          border: "1px solid " + (isDark ? "#1e293b" : "#e2e8f0"),
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ bgcolor: isDark ? "#0f172a" : "#f8fafc" }}>
              <TableCell sx={{ fontWeight: 700, color: isDark ? "#94a3b8" : "#64748b" }}>Name</TableCell>
              <TableCell sx={{ fontWeight: 700, color: isDark ? "#94a3b8" : "#64748b" }}>Role</TableCell>
              <TableCell sx={{ fontWeight: 700, color: isDark ? "#94a3b8" : "#64748b" }}>Status</TableCell>
              <TableCell align="center" sx={{ fontWeight: 700, color: isDark ? "#94a3b8" : "#64748b" }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredDrivers.map((driver) => {
              const styles = getStatusColor(driver.status);
              const initials = driver.name.split(' ').map(n => n[0]).join('');

              return (
                <TableRow
                  key={driver.id}
                  sx={{
                    "&:hover": { bgcolor: isDark ? "rgba(3,205,140,0.05)" : "rgba(3,205,140,0.02)" },
                    cursor: "pointer",
                  }}
                  onClick={() => navigate(`/agent/onboarding/drivers/${driver.id}`)}
                >
                  <TableCell>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        sx={{
                          width: 36,
                          height: 36,
                          fontSize: 14,
                          fontWeight: 700,
                          bgcolor: driver.status === "Approved" ? EVZONE_GREEN :
                            driver.status === "Rejected" ? "#ef4444" :
                              driver.status === "Needs Info" ? EVZONE_ORANGE : "#38bdf8",
                          color: "#fff",
                        }}
                      >
                        {initials}
                      </Avatar>
                      <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#e5e7eb" : "#111827" }}>
                        {driver.name}
                      </Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                      {driver.company === "Indep." ? "Independent" : driver.company}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 600,
                        color: styles.text,
                      }}
                    >
                      {driver.status}
                    </Typography>
                  </TableCell>
                  <TableCell align="center" onClick={(e) => e.stopPropagation()}>
                    <Stack direction="row" spacing={0.5} justifyContent="center">
                      <IconButton
                        size="small"
                        onClick={() => updateDriverStatus(driver.id, "Approved")}
                        sx={{
                          color: driver.status === "Approved" ? EVZONE_GREEN : EVZONE_GREY,
                          bgcolor: driver.status === "Approved" ? "rgba(3,205,140,0.15)" : "transparent",
                          "&:hover": { bgcolor: "rgba(3,205,140,0.2)" },
                        }}
                      >
                        <CheckCircleOutlineIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => updateDriverStatus(driver.id, "Rejected")}
                        sx={{
                          color: driver.status === "Rejected" ? "#ef4444" : EVZONE_GREY,
                          bgcolor: driver.status === "Rejected" ? "rgba(239,68,68,0.15)" : "transparent",
                          "&:hover": { bgcolor: "rgba(239,68,68,0.2)" },
                        }}
                      >
                        <CancelOutlinedIcon fontSize="small" />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => updateDriverStatus(driver.id, "Needs Info")}
                        sx={{
                          color: driver.status === "Needs Info" ? EVZONE_ORANGE : EVZONE_GREY,
                          bgcolor: driver.status === "Needs Info" ? "rgba(247,127,0,0.15)" : "transparent",
                          "&:hover": { bgcolor: "rgba(247,127,0,0.2)" },
                        }}
                      >
                        <HelpOutlineOutlinedIcon fontSize="small" />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        {filteredDrivers.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="body1" sx={{ color: EVZONE_GREY }}>
              No drivers found matching your criteria.
            </Typography>
          </Box>
        )}
      </Card>
    </Box>
  );
}
