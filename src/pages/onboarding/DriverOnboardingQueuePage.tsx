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

const sampleDrivers = [
  {
    id: "DRV-102",
    name: "Kato Robert",
    city: "Kampala",
    company: "EVzone Fleet",
    stage: "Docs pending review",
    createdAt: "Today · 08:42",
  },
  {
    id: "DRV-214",
    name: "Amina Nanyonga",
    city: "Kampala",
    company: "City Cabs",
    stage: "Extra info required",
    createdAt: "Yesterday · 16:20",
  },
  {
    id: "DRV-305",
    name: "John Doe",
    city: "Entebbe",
    company: "Independent",
    stage: "Face match check",
    createdAt: "2 days ago",
  },
];

// Route target: /agent/onboarding/drivers
export default function AgentDriverOnboardingQueuePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [stageFilter, setStageFilter] = useState("all");

  const filtered = sampleDrivers.filter((d) => {
    const matchesQuery =
      !query ||
      d.name.toLowerCase().includes(query.toLowerCase()) ||
      d.id.toLowerCase().includes(query.toLowerCase());
    const matchesStage =
      stageFilter === "all" ||
      (stageFilter === "docs" && d.stage === "Docs pending review") ||
      (stageFilter === "extra" && d.stage === "Extra info required") ||
      (stageFilter === "face" && d.stage === "Face match check");
    return matchesQuery && matchesStage;
  });

  const handleStageClick = (key) => {
    setStageFilter(key);
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
              Driver onboarding queue
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Review driver sign-ups that need your attention: document
              checks, extra information, and face verification.
            </Typography>
          </Box>

          <Chip
            label="Onboarding agents"
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
                  <AssignmentIndOutlinedIcon
                    sx={{ fontSize: 20, color: EVZONE_GREEN }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Drivers needing review
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    size="small"
                    placeholder="Search by name or ID"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    variant="outlined"
                    sx={{
                      minWidth: 220,
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 999,
                      },
                    }}
                  />
                  <IconButton size="small">
                    <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small">
                    <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Chip
                  label="All"
                  size="small"
                  onClick={() => handleStageClick("all")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      stageFilter === "all"
                        ? "rgba(3,205,140,0.16)"
                        : "rgba(248,250,252,1)",
                    color:
                      stageFilter === "all" ? "#047857" : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="Docs pending review"
                  size="small"
                  onClick={() => handleStageClick("docs")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      stageFilter === "docs"
                        ? "rgba(56,189,248,0.18)"
                        : "rgba(248,250,252,1)",
                    color:
                      stageFilter === "docs" ? "#0369a1" : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="Extra info required"
                  size="small"
                  onClick={() => handleStageClick("extra")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      stageFilter === "extra"
                        ? "rgba(250,204,21,0.18)"
                        : "rgba(248,250,252,1)",
                    color:
                      stageFilter === "extra" ? "#92400e" : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="Face match check"
                  size="small"
                  onClick={() => handleStageClick("face")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      stageFilter === "face"
                        ? "rgba(129,140,248,0.2)"
                        : "rgba(248,250,252,1)",
                    color:
                      stageFilter === "face" ? "#4f46e5" : EVZONE_GREY,
                  }}
                />
              </Stack>

              <List disablePadding>
                {filtered.length === 0 && (
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, fontStyle: "italic" }}
                  >
                    No drivers match the current filters.
                  </Typography>
                )}

                {filtered.map((driver) => (
                  <ListItemButton
                    key={driver.id}
                    onClick={() => navigate(`/agent/onboarding/drivers/${encodeURIComponent(driver.id)}`)}
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
                      <Avatar
                        sx={{
                          width: 28,
                          height: 28,
                          backgroundColor: "rgba(3,205,140,0.18)",
                          color: "#047857",
                          fontSize: 13,
                          fontWeight: 700,
                        }}
                      >
                        {driver.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </Avatar>
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
                            {driver.name}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {driver.id}
                          </Typography>
                        </Stack>
                      }
                      secondary={
                        <Stack spacing={0.2}>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {driver.city} · {driver.company}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={0.5}
                            alignItems="center"
                          >
                            {driver.stage === "Docs pending review" && (
                              <AssignmentIndOutlinedIcon
                                sx={{ fontSize: 14, color: EVZONE_ORANGE }}
                              />
                            )}
                            {driver.stage === "Extra info required" && (
                              <WarningAmberOutlinedIcon
                                sx={{ fontSize: 14, color: "#f97316" }}
                              />
                            )}
                            {driver.stage === "Face match check" && (
                              <VerifiedUserOutlinedIcon
                                sx={{ fontSize: 14, color: "#4f46e5" }}
                              />
                            )}
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY }}
                            >
                              {driver.stage}
                            </Typography>
                          </Stack>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {driver.createdAt}
                          </Typography>
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
