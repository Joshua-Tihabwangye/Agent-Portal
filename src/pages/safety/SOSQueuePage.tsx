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
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

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

// Route target: /agent/safety/sos
export default function AgentSafetySOSQueuePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = sampleSOS.filter((s) => {
    const matchesQuery =
      !query ||
      s.id.toLowerCase().includes(query.toLowerCase()) ||
      s.userName.toLowerCase().includes(query.toLowerCase()) ||
      s.location.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || s.status.toLowerCase() === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleStatusClick = (key) => {
    setStatusFilter(key);
  };

  const getSeverityChip = (severity) => {
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

          <Chip
            label="Safety agents"
            size="small"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: isDark
                ? "rgba(15,23,42,0.9)"
                : "rgba(254,242,242,0.9)",
              border: "1px solid rgba(248,113,113,0.6)",
              color: isDark ? "#fecaca" : "#b91c1c",
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
                        ? "rgba(248,113,113,0.2)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "new" ? "#b91c1c" : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="Under review"
                  size="small"
                  onClick={() => handleStatusClick("under review")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "under review"
                        ? "rgba(56,189,248,0.18)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "under review"
                        ? "#0369a1"
                        : EVZONE_GREY,
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
                        ? "rgba(129,140,248,0.2)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "escalated"
                        ? "#4f46e5"
                        : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="Resolved"
                  size="small"
                  onClick={() => handleStatusClick("resolved")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "resolved"
                        ? "rgba(22,163,74,0.12)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "resolved"
                        ? "#166534"
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
                    No incidents match the current filters.
                  </Typography>
                )}

                {filtered.map((inc) => (
                  <ListItemButton
                    key={inc.id}
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
    </Box>
  );
}
