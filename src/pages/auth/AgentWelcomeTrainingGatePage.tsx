import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  LinearProgress,
  Stack,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import SchoolIcon from "@mui/icons-material/School";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ElectricCarIcon from "@mui/icons-material/ElectricCar";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

export default function AgentWelcomeTrainingGatePage() {
  const navigate = useNavigate();
  const { completeTrainingGate } = useAuth();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const coreProgress = 60; // example overall completion percent

  const coreModules = [
    { label: "EVzone overview", status: "done" },
    { label: "Data privacy & confidentiality", status: "done" },
    { label: "EV basics & battery swapping", status: "pending" },
  ];

  const roleModules = [
    { label: "Driver onboarding workflows", status: "pending" },
    { label: "Ticket handling & tone", status: "locked" },
    { label: "Manual dispatch & live ops", status: "locked" },
    { label: "Safety & SOS playbook", status: "locked" },
  ];

  const getChipColor = (status) => {
    if (status === "done") return "success";
    if (status === "pending") return "warning";
    return "default";
  };

  const getChipLabel = (status) => {
    if (status === "done") return "Completed";
    if (status === "pending") return "In progress";
    return "Locked";
  };

  return (
    <Box className="min-h-screen w-full flex items-center justify-center px-4 py-6 bg-slate-50 dark:bg-slate-950">
      <Box className="w-full max-w-xl">
        <Card
          elevation={10}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: isDark
              ? "radial-gradient(circle at top left, #1e293b 0, #020617 40%, #020617 100%)"
              : "#ffffff",
            color: isDark ? "#f9fafb" : "#0f172a",
          }}
        >
          <CardContent className="p-6 sm:p-8">
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="flex-start"
              spacing={2}
              mb={4}
            >
              <Box className="flex items-center gap-2">
                <Box
                  className="flex items-center justify-center rounded-2xl"
                  sx={{
                    width: 42,
                    height: 42,
                    background: EVZONE_GREEN,
                    color: "#020617",
                    fontWeight: 800,
                    letterSpacing: 0.5,
                    fontSize: 16,
                  }}
                >
                  EV
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: EVZONE_GREY,
                      lineHeight: 1.1,
                    }}
                  >
                    Welcome back, Agent
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                      lineHeight: 1.2,
                    }}
                  >
                    Complete your training to unlock the portal
                  </Typography>
                </Box>
              </Box>

              <Chip
                icon={<EmojiEventsIcon sx={{ fontSize: 16 }} />}
                label="Training required"
                size="small"
                sx={{
                  borderRadius: 999,
                  backgroundColor: isDark
                    ? "rgba(248,113,113,0.1)"
                    : "rgba(254,202,202,0.7)",
                  color: isDark ? "#fecaca" : "#991b1b",
                  border: "1px solid rgba(248,113,113,0.4)",
                  fontSize: 11,
                  textTransform: "uppercase",
                  fontWeight: 600,
                }}
              />
            </Stack>

            {/* Progress overview */}
            <Box className="mb-6">
              <Stack direction="row" justifyContent="space-between" mb={1}>
                <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                  Overall progress
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: isDark ? "#e5e7eb" : "#111827", fontWeight: 600 }}
                >
                  {coreProgress}%
                </Typography>
              </Stack>
              <LinearProgress
                variant="determinate"
                value={coreProgress}
                sx={{
                  height: 8,
                  borderRadius: 999,
                  backgroundColor: isDark
                    ? "rgba(30,64,175,0.6)"
                    : "rgba(226,232,240,0.9)",
                  "& .MuiLinearProgress-bar": {
                    backgroundImage:
                      "linear-gradient(90deg, " +
                      EVZONE_GREEN +
                      ", " +
                      EVZONE_ORANGE +
                      ")",
                  },
                }}
              />
              <Typography
                variant="caption"
                sx={{
                  color: EVZONE_GREY,
                  display: "block",
                  mt: 1.5,
                }}
              >
                Your supervisor will unlock full access to Live Ops, Manual
                Dispatch, Support queues and Safety tools when all required
                modules are complete.
              </Typography>
            </Box>

            {/* Core modules */}
            <Box className="mb-5">
              <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                <ShieldOutlinedIcon
                  sx={{ color: EVZONE_GREEN, fontSize: 20 }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, letterSpacing: 0.4 }}
                >
                  Core modules for all agents
                </Typography>
              </Stack>

              <Stack spacing={1.5}>
                {coreModules.map((mod) => (
                  <Box
                    key={mod.label}
                    className="flex items-center justify-between rounded-2xl px-3 py-2.5"
                    sx={{
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(249,250,251,0.95)",
                      border:
                        "1px solid " +
                        (mod.status === "done"
                          ? "rgba(34,197,94,0.6)"
                          : "rgba(148,163,184,0.4)"),
                    }}
                  >
                    <Box className="flex items-center gap-2">
                      <Box
                        className="rounded-full flex items-center justify-center"
                        sx={{
                          width: 28,
                          height: 28,
                          backgroundColor:
                            mod.status === "done"
                              ? "rgba(22,163,74,0.12)"
                              : "rgba(30,64,175,0.12)",
                          borderColor:
                            mod.status === "done"
                              ? "rgba(22,163,74,0.8)"
                              : "rgba(129,140,248,0.7)",
                          borderWidth: 1,
                          borderStyle: "solid",
                        }}
                      >
                        <SchoolIcon
                          sx={{
                            fontSize: 16,
                            color:
                              mod.status === "done"
                                ? EVZONE_GREEN
                                : "#3b82f6",
                          }}
                        />
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? "#e5e7eb" : "#111827",
                          fontWeight: 500,
                        }}
                      >
                        {mod.label}
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={getChipLabel(mod.status)}
                      color={getChipColor(mod.status)}
                      sx={{
                        height: 22,
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        px: 1.5,
                        backgroundColor:
                          mod.status === "done"
                            ? "rgba(22,163,74,0.12)"
                            : mod.status === "pending"
                            ? "rgba(250,204,21,0.16)"
                            : "rgba(148,163,184,0.16)",
                        color:
                          mod.status === "done"
                            ? "#166534" // dark green text
                            : mod.status === "pending"
                            ? "#92400e" // amber/dark orange text
                            : "#374151", // grey text for locked
                        fontWeight: 600,
                        letterSpacing: 0.2,
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Role modules */}
            <Box className="mb-6">
              <Stack direction="row" alignItems="center" spacing={1} mb={1.5}>
                <ElectricCarIcon
                  sx={{ color: EVZONE_ORANGE, fontSize: 20 }}
                />
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, letterSpacing: 0.4 }}
                >
                  Role-specific path (example: Dispatch &amp; Support)
                </Typography>
              </Stack>

              <Stack spacing={1.5}>
                {roleModules.map((mod) => (
                  <Box
                    key={mod.label}
                    className="flex items-center justify-between rounded-2xl px-3 py-2.5"
                    sx={{
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.85)"
                        : "rgba(248,250,252,0.95)",
                      border:
                        "1px dashed " +
                        (mod.status === "pending"
                          ? "rgba(249,115,22,0.8)"
                          : "rgba(148,163,184,0.7)"),
                    }}
                  >
                    <Box className="flex flex-col">
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? "#e5e7eb" : "#111827",
                          fontWeight: 500,
                        }}
                      >
                        {mod.label}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY, mt: 0.25 }}
                      >
                        Required for your current role before handling live
                        queues.
                      </Typography>
                    </Box>
                    <Chip
                      size="small"
                      label={getChipLabel(mod.status)}
                      color={getChipColor(mod.status)}
                      sx={{
                        height: 22,
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        px: 1.5,
                        backgroundColor:
                          mod.status === "pending"
                            ? "rgba(249,115,22,0.18)"
                            : "rgba(148,163,184,0.18)",
                        color:
                          mod.status === "pending"
                            ? "#9a3412" // strong amber text
                            : "#374151", // dark grey for locked
                        fontWeight: 600,
                        letterSpacing: 0.2,
                      }}
                    />
                  </Box>
                ))}
              </Stack>
            </Box>

            {/* Actions */}
            <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} mt={2}>
              <Button
                fullWidth
                onClick={() => {
                  completeTrainingGate();
                  navigate("/agent/training", { replace: true });
                }}
                sx={{
                  py: 1.2,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 700,
                  letterSpacing: 0.4,
                  fontSize: 15,
                  backgroundImage:
                    "linear-gradient(135deg, " +
                    EVZONE_GREEN +
                    ", " +
                    EVZONE_ORANGE +
                    ")",
                  color: "#020617",
                  boxShadow: "0 14px 35px rgba(3,205,140,0.45)",
                  "&:hover": {
                    backgroundImage:
                      "linear-gradient(135deg, " +
                      EVZONE_ORANGE +
                      ", " +
                      EVZONE_GREEN +
                      ")",
                    boxShadow: "0 18px 45px rgba(3,205,140,0.6)",
                  },
                }}
              >
                Start required training
              </Button>

              <Button
                fullWidth
                variant="outlined"
                onClick={() => {
                  completeTrainingGate();
                  navigate("/agent/training", { replace: true });
                }}
                sx={{
                  py: 1.2,
                  borderRadius: 999,
                  textTransform: "none",
                  fontWeight: 600,
                  letterSpacing: 0.2,
                  fontSize: 14,
                  borderColor: isDark
                    ? "rgba(148,163,184,0.7)"
                    : "rgba(148,163,184,0.8)",
                  color: isDark ? "#e5e7eb" : "#111827",
                  "&:hover": {
                    borderColor: EVZONE_GREEN,
                    backgroundColor: isDark
                      ? "rgba(15,23,42,0.8)"
                      : "rgba(241,245,249,0.9)",
                  },
                }}
              >
                View all modules
              </Button>
            </Stack>

            <Box className="mt-4">
              <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                Once your training is complete, you&apos;ll be able to:
              </Typography>
              <ul className="mt-1 grid grid-cols-1 sm:grid-cols-2 gap-y-1 gap-x-4 text-[11px] text-slate-500 dark:text-slate-400 list-disc list-inside">
                <li>Onboard and verify drivers on behalf of EVzone partners.</li>
                <li>Create manual bookings for rides, deliveries, rentals and EMS.</li>
                <li>Handle tickets and disputes with EVzone&apos;s support playbooks.</li>
                <li>Monitor SOS alerts and follow safety protocols.</li>
              </ul>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
