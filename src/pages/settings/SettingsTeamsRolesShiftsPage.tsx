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
  Button,
  Grid as Grid2,
  Divider,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import SupervisorAccountOutlinedIcon from "@mui/icons-material/SupervisorAccountOutlined";
import ViewQuiltOutlinedIcon from "@mui/icons-material/ViewQuiltOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import ScheduleOutlinedIcon from "@mui/icons-material/ScheduleOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// ----------- Sample data -----------

export const teams = [
  {
    id: "support-tier1",
    name: "Support Tier 1",
    description: "Frontline support for riders and drivers.",
    lead: "Amina K.",
    members: 12,
    queues: ["Tickets: payments", "Tickets: trip issues"],
  },
  {
    id: "dispatch",
    name: "Dispatch",
    description: "Manual dispatch & live operations.",
    lead: "James M.",
    members: 8,
    queues: ["Dispatch: phone bookings", "Dispatch: VIP"],
  },
  {
    id: "onboarding",
    name: "Onboarding",
    description: "Driver onboarding and document review.",
    lead: "Linda N.",
    members: 6,
    queues: ["Onboarding: new drivers", "Onboarding: resubmissions"],
  },
  {
    id: "safety",
    name: "Safety & incidents",
    description: "SOS, incidents and safety follow up.",
    lead: "Mark S.",
    members: 5,
    queues: ["Safety: SOS", "Safety: investigations"],
  },
];

export const shiftPatterns = [
  {
    id: "support-tier1",
    team: "Support Tier 1",
    timezone: "Africa/Kampala",
    coverage: "06:00 – 22:00 (2 shifts)",
    days: [
      { day: "Mon–Fri", label: "06:00–14:00 · 14:00–22:00" },
      { day: "Sat", label: "08:00–18:00" },
      { day: "Sun", label: "On-call" },
    ],
  },
  {
    id: "dispatch",
    team: "Dispatch",
    timezone: "Africa/Kampala",
    coverage: "24/7 (3 shifts)",
    days: [
      { day: "Mon–Sun", label: "06:00–14:00 · 14:00–22:00 · 22:00–06:00" },
    ],
  },
  {
    id: "safety",
    team: "Safety & incidents",
    timezone: "Africa/Kampala",
    coverage: "08:00 – 20:00",
    days: [
      { day: "Mon–Fri", label: "08:00–16:00 · 12:00–20:00 (overlap)" },
      { day: "Weekend", label: "On-call" },
    ],
  },
];

const roles = [
  "Onboarding agent",
  "Support Tier 1",
  "Support Tier 2",
  "Dispatcher",
  "Safety agent",
  "Supervisor",
];

const permissions = [
  { key: "view-trips", label: "View trips & tickets" },
  { key: "edit-trips", label: "Update trip / ticket status" },
  { key: "adjust-fares", label: "Adjust fares & credits" },
  { key: "view-sensitive", label: "View sensitive user data" },
  { key: "suspend", label: "Suspend riders / drivers" },
  { key: "manage-teams", label: "Manage teams & queues" },
];

// simple matrix: full / limited / none
const rolePermissionMatrix = {
  "Onboarding agent": {
    "view-trips": "full",
    "edit-trips": "limited",
    "adjust-fares": "none",
    "view-sensitive": "limited",
    "suspend": "none",
    "manage-teams": "none",
  },
  "Support Tier 1": {
    "view-trips": "full",
    "edit-trips": "full",
    "adjust-fares": "limited",
    "view-sensitive": "limited",
    "suspend": "none",
    "manage-teams": "none",
  },
  "Support Tier 2": {
    "view-trips": "full",
    "edit-trips": "full",
    "adjust-fares": "full",
    "view-sensitive": "full",
    "suspend": "limited",
    "manage-teams": "none",
  },
  Dispatcher: {
    "view-trips": "full",
    "edit-trips": "full",
    "adjust-fares": "none",
    "view-sensitive": "limited",
    "suspend": "none",
    "manage-teams": "none",
  },
  "Safety agent": {
    "view-trips": "full",
    "edit-trips": "full",
    "adjust-fares": "limited",
    "view-sensitive": "full",
    "suspend": "full",
    "manage-teams": "none",
  },
  Supervisor: {
    "view-trips": "full",
    "edit-trips": "full",
    "adjust-fares": "full",
    "view-sensitive": "full",
    "suspend": "full",
    "manage-teams": "full",
  },
};

function permissionChip(level: string) {
  if (level === "full") {
    return (
      <Chip
        size="small"
        label="Full"
        sx={{
          borderRadius: 999,
          fontSize: 10,
          textTransform: "none",
          backgroundColor: "rgba(22,163,74,0.14)",
          color: "#166534",
        }}
      />
    );
  }
  if (level === "limited") {
    return (
      <Chip
        size="small"
        label="Limited"
        sx={{
          borderRadius: 999,
          fontSize: 10,
          textTransform: "none",
          backgroundColor: "rgba(250,204,21,0.16)",
          color: "#92400e",
        }}
      />
    );
  }
  return (
    <Chip
      size="small"
      label="None"
      sx={{
        borderRadius: 999,
        fontSize: 10,
        textTransform: "none",
        backgroundColor: "rgba(148,163,184,0.18)",
        color: EVZONE_GREY,
      }}
    />
  );
}

// 43. /agent/settings/teams – Teams & Queues management
export function AgentTeamsSettingsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const filteredTeams = teams.filter((t) => {
    const q = query.toLowerCase();
    return (
      !q ||
      t.name.toLowerCase().includes(q) ||
      t.lead.toLowerCase().includes(q) ||
      t.queues.some((qName) => qName.toLowerCase().includes(q))
    );
  });

  const handleFilterClick = () => {
    console.log("Open team filters (placeholder)");
  };

  const handleRefreshClick = () => {
    console.log("Reset team search & filters");
    setQuery("");
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4">
      <Box className="max-w-6xl mx-auto">
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}
            >
              Teams &amp; queues
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Organise agents into teams, assign queues and set clear
              ownership across support, dispatch and safety.
            </Typography>
          </Box>

          <Chip
            label="Settings"
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
                  <GroupsOutlinedIcon
                    sx={{ fontSize: 20, color: EVZONE_GREEN }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Teams
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    size="small"
                    placeholder="Search team, lead or queue"
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
                    sx={{ minWidth: 260 }}
                  />
                  <IconButton size="small" onClick={handleFilterClick}>
                    <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small" onClick={handleRefreshClick}>
                    <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Stack>

              <Grid2 container spacing={1.5}>
                {filteredTeams.map((team) => (
                  <Grid2 size={12} key={team.id}>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 3,
                        backgroundColor: isDark
                          ? "rgba(15,23,42,0.9)"
                          : "rgba(248,250,252,0.95)",
                        border: "1px solid rgba(203,213,225,0.9)",
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="flex-start"
                          spacing={2}
                        >
                          <Box>
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              mb={0.5}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: isDark ? "#e5e7eb" : "#111827",
                                }}
                              >
                                {team.name}
                              </Typography>
                              <Chip
                                size="small"
                                label={`Lead: ${team.lead}`}
                                sx={{
                                  borderRadius: 999,
                                  fontSize: 10,
                                  textTransform: "none",
                                  backgroundColor:
                                    "rgba(248,250,252,0.9)",
                                  color: EVZONE_GREY,
                                }}
                              />
                            </Stack>
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY, display: "block" }}
                            >
                              {team.description}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: EVZONE_GREY,
                                display: "block",
                                mt: 0.5,
                              }}
                            >
                              {team.members} agents
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: EVZONE_GREY,
                                display: "block",
                                mt: 0.5,
                              }}
                            >
                              Queues:
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={0.6}
                              flexWrap="wrap"
                              sx={{ mt: 0.3 }}
                            >
                              {team.queues.map((qName) => (
                                <Chip
                                  key={qName}
                                  size="small"
                                  label={qName}
                                  sx={{
                                    borderRadius: 999,
                                    fontSize: 10,
                                    textTransform: "none",
                                    backgroundColor:
                                      "rgba(15,23,42,0.06)",
                                    color: isDark
                                      ? "#e5e7eb"
                                      : "#111827",
                                  }}
                                />
                              ))}
                            </Stack>
                          </Box>

                          <Stack spacing={1} alignItems="flex-end">
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={
                                <SupervisorAccountOutlinedIcon
                                  sx={{ fontSize: 16 }}
                                />
                              }
                              sx={{
                                borderRadius: 999,
                                textTransform: "none",
                                fontSize: 12,
                              }}
                              onClick={() => navigate(`/agent/settings/teams/${encodeURIComponent(team.id)}`)}
                            >
                              View team
                            </Button>
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={
                                <ViewQuiltOutlinedIcon sx={{ fontSize: 16 }} />
                              }
                              sx={{
                                borderRadius: 999,
                                textTransform: "none",
                                fontSize: 12,
                                fontWeight: 600,
                                backgroundColor: EVZONE_GREEN,
                                "&:hover": {
                                  backgroundColor: "#059669",
                                },
                              }}
                              onClick={() => navigate(`/agent/settings/teams/${encodeURIComponent(team.id)}#queues`)}
                            >
                              Configure queues
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid2>
                ))}

                {filteredTeams.length === 0 && (
                  <Grid2 size={12}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY, fontStyle: "italic" }}
                    >
                      No teams match your search.
                    </Typography>
                  </Grid2>
                )}
              </Grid2>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

// 44. /agent/settings/shifts – Working Hours & Shifts
export function AgentShiftsSettingsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleEditPattern = (patternId: string) => {
    console.log("Edit shift pattern", patternId);
  };

  const handleDuplicatePattern = (patternId: string) => {
    console.log("Duplicate pattern", patternId);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4">
      <Box className="max-w-6xl mx-auto">
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}
            >
              Working hours &amp; shifts
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Define shift patterns for each team so you always have
              coverage for live operations and safety.
            </Typography>
          </Box>

          <Chip
            label="Scheduling"
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
              <Stack direction="row" spacing={1} alignItems="center">
                <ScheduleOutlinedIcon
                  sx={{ fontSize: 20, color: EVZONE_GREEN }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                  }}
                >
                  Shift patterns
                </Typography>
              </Stack>

              <Grid2 container spacing={1.5}>
                {shiftPatterns.map((pattern) => (
                  <Grid2 size={12} key={pattern.id}>
                    <Card
                      elevation={0}
                      sx={{
                        borderRadius: 3,
                        backgroundColor: isDark
                          ? "rgba(15,23,42,0.9)"
                          : "rgba(248,250,252,0.95)",
                        border: "1px solid rgba(203,213,225,0.9)",
                      }}
                    >
                      <CardContent sx={{ p: 2 }}>
                        <Stack
                          direction={{ xs: "column", sm: "row" }}
                          justifyContent="space-between"
                          alignItems={{ xs: "flex-start", sm: "center" }}
                          spacing={1.5}
                        >
                          <Box>
                            <Stack
                              direction="row"
                              spacing={1}
                              alignItems="center"
                              mb={0.5}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  fontWeight: 600,
                                  color: isDark ? "#e5e7eb" : "#111827",
                                }}
                              >
                                {pattern.team}
                              </Typography>
                              <Chip
                                size="small"
                                label={pattern.coverage}
                                sx={{
                                  borderRadius: 999,
                                  fontSize: 10,
                                  textTransform: "none",
                                  backgroundColor:
                                    "rgba(248,250,252,0.9)",
                                  color: EVZONE_GREY,
                                }}
                              />
                            </Stack>
                            <Stack
                              direction="row"
                              spacing={0.6}
                              alignItems="center"
                              mb={0.5}
                            >
                              <AccessTimeOutlinedIcon
                                sx={{ fontSize: 16, color: EVZONE_GREY }}
                              />
                              <Typography
                                variant="caption"
                                sx={{ color: EVZONE_GREY }}
                              >
                                Timezone {pattern.timezone}
                              </Typography>
                            </Stack>

                            <Stack spacing={0.2}>
                              {pattern.days.map((d) => (
                                <Typography
                                  key={d.day}
                                  variant="caption"
                                  sx={{ color: EVZONE_GREY, display: "block" }}
                                >
                                  <strong>{d.day}:</strong> {d.label}
                                </Typography>
                              ))}
                            </Stack>
                          </Box>

                          <Stack spacing={1} alignItems="flex-end">
                            <Button
                              size="small"
                              variant="outlined"
                              startIcon={
                                <SettingsOutlinedIcon sx={{ fontSize: 16 }} />
                              }
                              sx={{
                                borderRadius: 999,
                                textTransform: "none",
                                fontSize: 12,
                              }}
                              onClick={() => handleEditPattern(pattern.id)}
                            >
                              Edit pattern
                            </Button>
                            <Button
                              size="small"
                              variant="text"
                              sx={{
                                textTransform: "none",
                                fontSize: 12,
                                color: EVZONE_GREY,
                              }}
                              onClick={() => handleDuplicatePattern(pattern.id)}
                            >
                              Duplicate
                            </Button>
                          </Stack>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid2>
                ))}

                {shiftPatterns.length === 0 && (
                  <Grid2 size={12}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY, fontStyle: "italic" }}
                    >
                      No shift patterns defined yet.
                    </Typography>
                  </Grid2>
                )}
              </Grid2>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

// 45. /agent/settings/roles – Role & Permission matrix
export function AgentRolesSettingsPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [isEditing, setIsEditing] = useState(false);
  const [matrix, setMatrix] = useState(rolePermissionMatrix);

  const handleExportMatrix = () => {
    // ... existing export logic using matrix state
    const header = ["Permission", ...roles];
    const rows = permissions.map((perm) => {
      return [perm.label, ...roles.map((role) => matrix[role][perm.key] || "none")];
    });
    const csvContent = [header, ...rows].map((row) => row.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `role_permissions_matrix_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleTogglePermission = (role: string, permKey: string) => {
    if (!isEditing) return;

    setMatrix((prev) => {
      const current = prev[role][permKey] || "none";
      let next = "none";
      if (current === "none") next = "limited";
      else if (current === "limited") next = "full";
      else next = "none";

      return {
        ...prev,
        [role]: {
          ...prev[role],
          [permKey]: next,
        },
      };
    });
  };

  const handleSave = () => {
    setIsEditing(false);
    // In a real app, you would make an API call here.
    console.log("Saved matrix:", matrix);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4">
      <Box className="max-w-6xl mx-auto">
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}
            >
              Roles &amp; permissions
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Define what each role can see and do. Changes here affect all
              Agent tools (support, dispatch, onboarding and safety).
            </Typography>
          </Box>

          <Chip
            label="RBAC"
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
              <Stack direction="row" spacing={1} alignItems="center" justifyContent="space-between">
                <Stack direction="row" spacing={1} alignItems="center">
                  <ShieldOutlinedIcon sx={{ fontSize: 20, color: EVZONE_GREEN }} />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Role matrix
                  </Typography>
                  {isEditing && (
                    <Chip size="small" label="Editing Mode" color="warning" sx={{ height: 20, fontSize: 10 }} />
                  )}
                </Stack>
                <Button
                  size="small"
                  startIcon={isEditing ? <CheckCircleOutlineIcon /> : <TuneOutlinedIcon />}
                  onClick={isEditing ? handleSave : () => setIsEditing(true)}
                  variant={isEditing ? "contained" : "outlined"}
                  color={isEditing ? "success" : "primary"}
                  sx={{ borderRadius: 999, textTransform: "none" }}
                >
                  {isEditing ? "Save Changes" : "Edit Roles"}
                </Button>
              </Stack>
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY, maxWidth: 520 }}
              >
                {isEditing
                  ? "Click on any permission level to cycle through: None → Limited → Full."
                  : "Use this matrix to keep permissions consistent across regions."}
              </Typography>

              <Box sx={{ overflowX: "auto" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontSize: 12,
                          fontWeight: 600,
                          color: EVZONE_GREY,
                          whiteSpace: "nowrap",
                        }}
                      >
                        Permission
                      </TableCell>
                      {roles.map((role) => (
                        <TableCell
                          key={role}
                          align="center"
                          sx={{
                            fontSize: 12,
                            fontWeight: 600,
                            color: isDark ? "#e5e7eb" : "#111827",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {role}
                        </TableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {permissions.map((perm) => (
                      <TableRow key={perm.key}>
                        <TableCell
                          sx={{
                            fontSize: 12,
                            color: isDark ? "#e5e7eb" : "#111827",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {perm.label}
                        </TableCell>
                        {roles.map((role) => {
                          const level = matrix[role][perm.key] || "none";
                          return (
                            <TableCell
                              key={role + perm.key}
                              align="center"
                              onClick={() => handleTogglePermission(role, perm.key)}
                              sx={{
                                cursor: isEditing ? "pointer" : "default",
                                opacity: isEditing ? 1 : 0.9,
                                "&:hover": {
                                  backgroundColor: isEditing ? (isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.02)") : "transparent"
                                }
                              }}
                            >
                              {permissionChip(level)}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>

              <Divider sx={{ my: 1.5 }} />

              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ xs: "flex-start", sm: "center" }}
              >
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, maxWidth: 360 }}
                >
                  For changes that affect compliance (e.g. who can suspend
                  accounts or view sensitive data), make sure you consult
                  with legal / risk teams.
                </Typography>
                <Stack direction="row" spacing={1}>
                  {isEditing && (
                    <Button
                      size="small"
                      variant="outlined"
                      color="error"
                      onClick={() => {
                        setMatrix(rolePermissionMatrix); // Reset
                        setIsEditing(false);
                      }}
                      sx={{ borderRadius: 999, textTransform: "none" }}
                    >
                      Cancel
                    </Button>
                  )}
                  <Button
                    size="small"
                    variant="contained"
                    startIcon={<TuneOutlinedIcon sx={{ fontSize: 16 }} />}
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontSize: 13,
                      fontWeight: 600,
                      backgroundColor: EVZONE_GREEN,
                      "&:hover": {
                        backgroundColor: "#059669",
                      },
                    }}
                    onClick={handleExportMatrix}
                  >
                    Export matrix
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

// Preview wrapper for this canvas only
export default function AgentSettingsTeamsRolesShiftsPreview() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-6xl mx-auto grid grid-cols-1 gap-4 lg:grid-cols-2">
        <Box>
          <AgentTeamsSettingsPage />
        </Box>
        <Box className="space-y-4">
          <AgentShiftsSettingsPage />
          <AgentRolesSettingsPage />
        </Box>
      </Box>
    </Box>
  );
}

// Suggested tests (pseudo-code for a separate test file):
// - Render AgentTeamsSettingsPage and assert that all teams appear by default.
// - Search for a specific team lead and ensure only matching teams render.
// - Render AgentShiftsSettingsPage and confirm each pattern card displays team, timezone and day rows.
// - Render AgentRolesSettingsPage and verify that each permission row has a chip for each role with the expected level.
