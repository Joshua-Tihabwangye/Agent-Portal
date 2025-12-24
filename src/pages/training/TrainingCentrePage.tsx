import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Stack, Chip, LinearProgress, Button, Tabs, Tab } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import ChecklistOutlinedIcon from "@mui/icons-material/ChecklistOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const myModules = [
  {
    id: "mod-ev-intro",
    title: "EVzone 101: Platform overview",
    tag: "Core",
    progress: 100,
    status: "Completed",
    duration: "20 min",
  },
  {
    id: "mod-privacy",
    title: "Data privacy & confidentiality",
    tag: "Core",
    progress: 60,
    status: "In progress",
    duration: "30 min",
  },
  {
    id: "mod-dispatch",
    title: "Manual dispatch essentials",
    tag: "Role · Dispatch",
    progress: 10,
    status: "Not started",
    duration: "35 min",
  },
];

const availableCourses = [
  {
    id: "mod-ev-battery",
    title: "EV basics & battery safety",
    tag: "EV operations",
    duration: "25 min",
    level: "Beginner",
  },
  {
    id: "mod-disputes",
    title: "Handling trip disputes with empathy",
    tag: "Support",
    duration: "40 min",
    level: "Intermediate",
  },
  {
    id: "mod-sos-protocols",
    title: "Safety & SOS protocols",
    tag: "Safety",
    duration: "45 min",
    level: "Advanced",
  },
];

const assessments = [
  {
    id: "assess-privacy",
    title: "Privacy & data handling quiz",
    due: "Today",
    status: "Due",
    questions: 10,
  },
  {
    id: "assess-dispatch",
    title: "Manual dispatch scenario assessment",
    due: "In 3 days",
    status: "Upcoming",
    questions: 8,
  },
  {
    id: "assess-onboarding",
    title: "Driver onboarding quality review",
    due: "Completed",
    status: "Completed",
    questions: 6,
  },
];

// Route target: /agent/training
export default function AgentTrainingCentrePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [tab, setTab] = useState<"my" | "courses" | "assessments">("my");

  const handleTabChange = (_event: React.SyntheticEvent, value: string) => {
    if (value) setTab(value as typeof tab);
  };

  const averageCompletion =
    myModules.reduce((acc, m) => acc + m.progress, 0) / myModules.length;

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
              Training centre
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Track your mandatory modules, explore new courses and complete
              assessments. Your progress helps keep our service safe and
              consistent.
            </Typography>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label="Agent training"
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
            <Stack direction="row" spacing={0.5} alignItems="center">
              <EmojiEventsOutlinedIcon
                sx={{ fontSize: 16, color: EVZONE_ORANGE }}
              />
              <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                Overall completion {Math.round(averageCompletion)}%
              </Typography>
            </Stack>
          </Stack>
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
          <CardContent sx={{ p: 0 }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom:
                  "1px solid " +
                  (isDark
                    ? "rgba(30,64,175,0.7)"
                    : "rgba(226,232,240,1)"),
                px: 1.5,
              }}
            >
              <Tab
                value="my"
                icon={<SchoolOutlinedIcon sx={{ fontSize: 18 }} />}
                iconPosition="start"
                label="My training"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="courses"
                icon={<ChecklistOutlinedIcon sx={{ fontSize: 18 }} />}
                iconPosition="start"
                label="Available courses"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="assessments"
                icon={
                  <AssignmentTurnedInOutlinedIcon sx={{ fontSize: 18 }} />
                }
                iconPosition="start"
                label="Assessments"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
            </Tabs>

            <Box sx={{ p: 2.4 }}>
              {/* My Training Tab */}
              {tab === "my" && (
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Your required modules
                    </Typography>
                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                      Complete all core modules to unlock full access to
                      live operations and sensitive tools.
                    </Typography>
                  </Box>

                  <Stack spacing={1.2}>
                    {myModules.map((mod) => (
                      <Box
                        key={mod.id}
                        className="rounded-2xl px-3 py-2.5"
                        sx={{
                          backgroundColor: isDark
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(248,250,252,0.95)",
                          border: "1px solid rgba(203,213,225,0.9)",
                          display: "flex",
                          flexDirection: "column",
                          gap: 0.6,
                        }}
                      >
                        <Stack
                          direction="row"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Box>
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: isDark ? "#e5e7eb" : "#111827",
                              }}
                            >
                              {mod.title}
                            </Typography>
                            <Stack
                              direction="row"
                              spacing={0.6}
                              alignItems="center"
                              sx={{ mt: 0.2 }}
                            >
                              <Chip
                                size="small"
                                label={mod.tag}
                                sx={{
                                  borderRadius: 999,
                                  fontSize: 10,
                                  textTransform: "none",
                                  backgroundColor: "rgba(248,250,252,0.9)",
                                  color: EVZONE_GREY,
                                }}
                              />
                              <Chip
                                size="small"
                                label={mod.duration}
                                sx={{
                                  borderRadius: 999,
                                  fontSize: 10,
                                  textTransform: "none",
                                  backgroundColor: "rgba(15,23,42,0.06)",
                                  color: isDark ? "#e5e7eb" : "#111827",
                                }}
                              />
                            </Stack>
                          </Box>
                          <Chip
                            size="small"
                            label={mod.status}
                            sx={{
                              borderRadius: 999,
                              fontSize: 11,
                              textTransform: "none",
                              backgroundColor:
                                mod.status === "Completed"
                                  ? "rgba(22,163,74,0.16)"
                                  : mod.status === "In progress"
                                  ? "rgba(56,189,248,0.18)"
                                  : "rgba(148,163,184,0.18)",
                              color:
                                mod.status === "Completed"
                                  ? "#166534"
                                  : mod.status === "In progress"
                                  ? "#0369a1"
                                  : EVZONE_GREY,
                            }}
                          />
                        </Stack>
                        <Box sx={{ mt: 0.5 }}>
                          <LinearProgress
                            variant="determinate"
                            value={mod.progress}
                            sx={{
                              height: 6,
                              borderRadius: 999,
                              backgroundColor: isDark
                                ? "rgba(30,64,175,0.5)"
                                : "rgba(226,232,240,0.9)",
                              "& .MuiLinearProgress-bar": {
                                backgroundImage: `linear-gradient(90deg, ${EVZONE_GREEN}, ${EVZONE_ORANGE})`,
                              },
                            }}
                          />
                        </Box>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              )}

              {/* Available Courses Tab */}
              {tab === "courses" && (
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Browse available courses
                    </Typography>
                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                      Optional modules to deepen your expertise and learn
                      new skills.
                    </Typography>
                  </Box>
                  <Stack spacing={1.2}>
                    {availableCourses.map((course) => (
                      <Box
                        key={course.id}
                        className="rounded-2xl px-3 py-2.5"
                        sx={{
                          backgroundColor: isDark
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(248,250,252,0.95)",
                          border: "1px solid rgba(203,213,225,0.9)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            {course.title}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={0.6}
                            alignItems="center"
                            sx={{ mt: 0.3 }}
                          >
                            <Chip
                              size="small"
                              label={course.tag}
                              sx={{
                                borderRadius: 999,
                                fontSize: 10,
                                textTransform: "none",
                                backgroundColor: "rgba(248,250,252,0.9)",
                                color: EVZONE_GREY,
                              }}
                            />
                            <Chip
                              size="small"
                              label={course.level}
                              sx={{
                                borderRadius: 999,
                                fontSize: 10,
                                textTransform: "none",
                                backgroundColor: "rgba(15,23,42,0.06)",
                                color: isDark ? "#e5e7eb" : "#111827",
                              }}
                            />
                            <Chip
                              size="small"
                              label={course.duration}
                              sx={{
                                borderRadius: 999,
                                fontSize: 10,
                                textTransform: "none",
                                backgroundColor: "rgba(15,23,42,0.06)",
                                color: isDark ? "#e5e7eb" : "#111827",
                              }}
                            />
                          </Stack>
                        </Box>
                        <Button
                          size="small"
                          variant="contained"
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
                          onClick={() => navigate(`/agent/training/modules/${encodeURIComponent(course.id)}`)}
                        >
                          Start
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              )}

              {/* Assessments Tab */}
              {tab === "assessments" && (
                <Stack spacing={2}>
                  <Box>
                    <Typography
                      variant="substring" // you may want this to be "subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Assessments
                    </Typography>
                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                      Complete your quizzes to validate your understanding
                      of key topics.
                    </Typography>
                  </Box>
                  <Stack spacing={1.2}>
                    {assessments.map((assess) => (
                      <Box
                        key={assess.id}
                        className="rounded-2xl px-3 py-2.5"
                        sx={{
                          backgroundColor: isDark
                            ? "rgba(15,23,42,0.9)"
                            : "rgba(248,250,252,0.95)",
                          border: "1px solid rgba(203,213,225,0.9)",
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            {assess.title}
                          </Typography>
                          <Stack
                            direction="row"
                            spacing={0.6}
                            alignItems="center"
                            sx={{ mt: 0.3 }}
                          >
                            <Chip
                              size="small"
                              label={assess.status}
                              sx={{
                                borderRadius: 999,
                                fontSize: 10,
                                textTransform: "none",
                                backgroundColor:
                                  assess.status === "Due"
                                    ? "rgba(248,113,113,0.18)"
                                    : assess.status === "Upcoming"
                                    ? "rgba(191,219,254,0.2)"
                                    : "rgba(22,163,74,0.16)",
                                color:
                                  assess.status === "Due"
                                    ? "#b91c1c"
                                    : assess.status === "Upcoming"
                                    ? "#1d4ed8"
                                    : "#166534",
                              }}
                            />
                            <Chip
                              size="small"
                              label={"Due " + assess.due}
                              sx={{
                                borderRadius: 999,
                                fontSize: 10,
                                textTransform: "none",
                                backgroundColor: "rgba(15,23,42,0.06)",
                                color: isDark ? "#e5e7eb" : "#111827",
                              }}
                            />
                            <Chip
                              size="small"
                              label={assess.questions + " questions"}
                              sx={{
                                borderRadius: 999,
                                fontSize: 10,
                                textTransform: "none",
                                backgroundColor: "rgba(15,23,42,0.06)",
                                color: isDark ? "#e5e7eb" : "#111827",
                              }}
                            />
                          </Stack>
                        </Box>

                        <Button
                          size="small"
                          variant="contained"
                          sx={{
                            borderRadius: 999,
                            textTransform: "none",
                            fontSize: 13,
                            fontWeight: 600,
                            backgroundColor: EVZONE_ORANGE,
                            "&:hover": {
                              backgroundColor: "#ea580c",
                            },
                          }}
                          onClick={() => navigate(`/agent/training/assessments/${encodeURIComponent(assess.id)}`)}
                        >
                          Open
                        </Button>
                      </Box>
                    ))}
                  </Stack>
                </Stack>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

// Suggested tests (pseudo-code for a separate test file):
// - Render <AgentTrainingCentrePage /> and assert that all three tabs exist.
// - Simulate clicking the "Available courses" tab and ensure course titles render.
// - Simulate clicking the "Assessments" tab and confirm that assessment chips and Open buttons appear.
