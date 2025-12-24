import React from "react";
import { Box, Card, CardContent, Typography, Stack, Chip, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import QueuePlayNextOutlinedIcon from "@mui/icons-material/QueuePlayNextOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { teams, shiftPatterns } from "./SettingsTeamsRolesShiftsPage";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

export default function TeamDetailPage() {
  const { teamId } = useParams();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const team = teams.find((t) => t.id === teamId) || teams[0];
  const pattern = shiftPatterns.find((p) => p.id === team.id);

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4">
      <Box className="max-w-6xl mx-auto">
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 800, color: isDark ? "#e5e7eb" : "#0f172a" }}>
              {team.name}
            </Typography>
            <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
              Team lead {team.lead} · {team.members} agents · {team.queues.length} queues
            </Typography>
          </Box>
          <Chip
            label="Settings"
            size="small"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: isDark ? "rgba(15,23,42,0.9)" : "rgba(219,234,254,0.9)",
              border: "1px solid rgba(148,163,184,0.4)",
              color: isDark ? "#e5e7eb" : "#1e3a8a",
              fontWeight: 600,
            }}
          />
        </Box>

        <Card
          elevation={1}
          className="ev-gradient-soft"
          sx={{
            borderRadius: 3,
            backgroundColor: "transparent",
            border: "1px solid " + (isDark ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.65)"),
            boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.6 } }}>
            <Stack spacing={2.4}>
              <Stack direction="row" spacing={1} alignItems="center">
                <GroupsOutlinedIcon sx={{ fontSize: 20, color: EVZONE_GREEN }} />
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#e2e8f0" : "#0f172a" }}>
                  Team overview
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: isDark ? "#e2e8f0" : "#111827" }}>
                {team.description}
              </Typography>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1} flexWrap="wrap">
                <Chip label={`Lead: ${team.lead}`} sx={{ borderRadius: 999, backgroundColor: "rgba(255,255,255,0.2)", color: "#0f172a" }} />
                <Chip label={`${team.members} agents`} sx={{ borderRadius: 999, backgroundColor: "rgba(255,255,255,0.2)", color: "#0f172a" }} />
                <Chip label={`${team.queues.length} queues`} sx={{ borderRadius: 999, backgroundColor: "rgba(255,255,255,0.2)", color: "#0f172a" }} />
              </Stack>

              <Divider sx={{ borderColor: isDark ? "rgba(148,163,184,0.35)" : "rgba(255,255,255,0.45)" }} />

              <Stack spacing={1.2}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <QueuePlayNextOutlinedIcon sx={{ fontSize: 18, color: EVZONE_ORANGE }} />
                  <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#e2e8f0" : "#0f172a" }}>
                    Queues owned
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={0.6} flexWrap="wrap">
                  {team.queues.map((q) => (
                    <Chip
                      key={q}
                      label={q}
                      sx={{
                        borderRadius: 999,
                        fontSize: 12,
                        backgroundColor: isDark ? "rgba(15,23,42,0.85)" : "rgba(255,255,255,0.8)",
                        color: isDark ? "#e2e8f0" : "#0f172a",
                        border: "1px solid rgba(148,163,184,0.4)",
                      }}
                    />
                  ))}
                </Stack>
              </Stack>

              {pattern && (
                <Stack spacing={1.2}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <AccessTimeOutlinedIcon sx={{ fontSize: 18, color: EVZONE_GREEN }} />
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#e2e8f0" : "#0f172a" }}>
                      Shift coverage
                    </Typography>
                  </Stack>
                  <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                    {pattern.coverage} · Timezone {pattern.timezone}
                  </Typography>
                  <Stack spacing={0.2}>
                    {pattern.days.map((d) => (
                      <Typography key={d.day} variant="body2" sx={{ color: isDark ? "#e2e8f0" : "#111827" }}>
                        <strong>{d.day}:</strong> {d.label}
                      </Typography>
                    ))}
                  </Stack>
                </Stack>
              )}

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.2} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }}>
                <Button
                  startIcon={<ArrowBackOutlinedIcon />}
                  variant="text"
                  onClick={() => navigate("/agent/settings/teams")}
                  sx={{ color: isDark ? "#e2e8f0" : "#0f172a" }}
                >
                  Back to teams
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate("/agent/settings/roles")}
                  sx={{ fontWeight: 700 }}
                >
                  Update permissions
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

