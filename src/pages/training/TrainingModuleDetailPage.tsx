import React, { useState } from "react";
import { Box, Card, CardContent, Typography, Stack, Chip, Button, LinearProgress, Divider, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import PlayCircleOutlineOutlinedIcon from "@mui/icons-material/PlayCircleOutlineOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const moduleData = {
  id: "mod-ev-battery",
  title: "EV basics & battery safety",
  category: "EV operations",
  level: "Beginner",
  duration: "25 min",
  description:
    "Learn the fundamentals of electric vehicles, how battery systems work, and how to support safe operations during rides and charging.",
  progress: 40,
  lessons: [
    { order: 1, title: "Welcome and objectives", duration: "3 min" },
    { order: 2, title: "EV vs ICE: key differences", duration: "7 min" },
    { order: 3, title: "Battery health & range", duration: "8 min" },
    { order: 4, title: "Charging etiquette & safety", duration: "7 min" },
  ],
};

const quizQuestions = [
  {
    id: "q1",
    text: "What is one key advantage of EVs over petrol vehicles?",
    options: [
      "They never need maintenance",
      "Lower running costs and zero tailpipe emissions",
      "They can drive forever without charging",
      "They are always faster",
    ],
    correctIndex: 1,
  },
  {
    id: "q2",
    text: "What should a driver do if a battery reaches a low percentage during a trip?",
    options: [
      "Ignore it if the rider is in a hurry",
      "End the trip immediately without explanation",
      "Inform the rider and navigate to the nearest charger",
      "Turn off the app to save power",
    ],
    correctIndex: 2,
  },
  {
    id: "q3",
    text: "Why is it important to park correctly at an EV charger?",
    options: [
      "To avoid blocking other vehicles and keep cables safe",
      "So the app can calculate the fare correctly",
      "It is not important",
      "To reduce battery temperature",
    ],
    correctIndex: 0,
  },
];

// Reusable quiz / assessment section used inside this module detail page.
function TrainingQuiz({ questions, passMark = 70, onComplete }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (id, index) => {
    setAnswers((prev) => ({ ...prev, [id]: index }));
  };

  const handleSubmit = () => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctIndex) {
        correct += 1;
      }
    });
    const total = questions.length || 1;
    const pct = Math.round((correct / total) * 100);
    setScore(pct);
    setSubmitted(true);
    if (onComplete) {
      onComplete({ score: pct, passed: pct >= passMark });
    }
  };

  const allAnswered =
    questions.length > 0 &&
    questions.every((q) => typeof answers[q.id] === "number");

  const passed = submitted && score >= passMark;

  return (
    <Box>
      <Stack direction="row" spacing={1} alignItems="center" mb={1.5}>
        <QuizOutlinedIcon sx={{ fontSize: 18, color: EVZONE_ORANGE }} />
        <Typography
          variant="subtitle2"
          sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}
        >
          Quick quiz
        </Typography>
        <Chip
          size="small"
          label={questions.length + " questions"}
          sx={{
            borderRadius: 999,
            fontSize: 11,
            textTransform: "none",
            backgroundColor: "rgba(248,250,252,1)",
            color: EVZONE_GREY,
          }}
        />
      </Stack>

      <Stack spacing={1.6}>
        {questions.map((q) => (
          <Box
            key={q.id}
            className="rounded-2xl px-3 py-2.5"
            sx={{
              backgroundColor: isDark
                ? "rgba(15,23,42,0.9)"
                : "rgba(248,250,252,0.95)",
              border: "1px solid rgba(203,213,225,0.9)",
            }}
          >
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: isDark ? "#e5e7eb" : "#111827",
                mb: 0.6,
              }}
            >
              {q.text}
            </Typography>
            <Stack spacing={0.4}>
              {q.options.map((opt, index) => {
                const selected = answers[q.id] === index;
                return (
                  <Button
                    key={opt}
                    variant={selected ? "contained" : "outlined"}
                    onClick={() => handleSelect(q.id, index)}
                    size="small"
                    sx={{
                      justifyContent: "flex-start",
                      borderRadius: 999,
                      textTransform: "none",
                      fontSize: 13,
                      backgroundColor: selected
                        ? EVZONE_GREEN
                        : "transparent",
                      color: selected
                        ? "#020617"
                        : isDark
                        ? "#e5e7eb"
                        : "#111827",
                      borderColor: selected
                        ? EVZONE_GREEN
                        : "rgba(203,213,225,0.9)",
                    }}
                  >
                    {String.fromCharCode(65 + index)}. {opt}
                  </Button>
                );
              })}
            </Stack>
          </Box>
        ))}
      </Stack>

      <Box sx={{ mt: 2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
            You need {passMark}% or higher to pass this module.
          </Typography>
          {submitted && (
            <Chip
              size="small"
              label={score + "% scored"}
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor: passed
                  ? "rgba(22,163,74,0.16)"
                  : "rgba(248,113,113,0.18)",
                color: passed ? "#166534" : "#b91c1c",
              }}
            />
          )}
        </Stack>
        <Button
          disabled={!allAnswered}
          onClick={handleSubmit}
          variant="contained"
          size="small"
          sx={{
            mt: 1.5,
            borderRadius: 999,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: allAnswered
              ? EVZONE_ORANGE
              : "rgba(148,163,184,0.7)",
            "&:hover": {
              backgroundColor: allAnswered ? "#ea580c" : undefined,
            },
          }}
        >
          Submit answers
        </Button>

        {submitted && (
          <Box sx={{ mt: 1.5 }}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: passed ? "#16a34a" : "#b91c1c",
                display: "flex",
                alignItems: "center",
                gap: 0.6,
              }}
            >
              <CheckCircleOutlineOutlinedIcon sx={{ fontSize: 18 }} />
              {passed
                ? "Great work, you passed this quiz."
                : "You did not reach the pass mark. Review the module and try again."}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}

// Route target: /agent/training/modules/:moduleId
export default function AgentTrainingModuleDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();
  const [lastQuizResult, setLastQuizResult] = useState(null);

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
              {moduleData.title}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              {moduleData.description}
            </Typography>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={moduleData.category}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor: "rgba(248,250,252,1)",
                color: EVZONE_GREY,
              }}
            />
            <Stack direction="row" spacing={0.5} alignItems="center">
              <SchoolOutlinedIcon sx={{ fontSize: 16, color: EVZONE_GREEN }} />
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY }}
              >
                Level {moduleData.level} · {moduleData.duration}
              </Typography>
            </Stack>
          </Stack>
        </Box>

        <Grid container spacing={2.4}>
          {/* Video & quiz */}
          <Grid item xs={12} md={7}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
                mb: 2,
              }}
            >
              <CardContent sx={{ p: 2.4 }}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1.5}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <PlayCircleOutlineOutlinedIcon
                      sx={{ fontSize: 22, color: EVZONE_ORANGE }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Module video
                    </Typography>
                  </Stack>
                  <Chip
                    size="small"
                    label={moduleData.duration + " video"}
                    sx={{
                      borderRadius: 999,
                      fontSize: 11,
                      textTransform: "none",
                      backgroundColor: "rgba(248,250,252,1)",
                      color: EVZONE_GREY,
                    }}
                  />
                </Stack>

                <Box
                  sx={{
                    position: "relative",
                    borderRadius: 14,
                    overflow: "hidden",
                    background:
                      "linear-gradient(135deg, #0f172a, #020617)",
                    height: 220,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                  }}
                >
                  <PlayCircleOutlineOutlinedIcon
                    sx={{
                      fontSize: 64,
                      color: "#e5e7eb",
                      opacity: 0.9,
                    }}
                  />
                  <Typography
                    variant="caption"
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      left: 12,
                      color: "#e5e7eb",
                      backgroundColor: "rgba(15,23,42,0.8)",
                      borderRadius: 12,
                      px: 1,
                      py: 0.3,
                    }}
                  >
                    Video placeholder – integrate with your LMS or video
                    player
                  </Typography>
                </Box>

                <TrainingQuiz
                  questions={quizQuestions}
                  passMark={70}
                  onComplete={setLastQuizResult}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Module info */}
          <Grid item xs={12} md={5}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
                mb: 2,
              }}
            >
              <CardContent sx={{ p: 2.4 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                    mb: 1,
                  }}
                >
                  Module progress
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block", mb: 0.5 }}
                >
                  Complete the video and quiz to finish this module.
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={moduleData.progress}
                  sx={{
                    height: 8,
                    borderRadius: 999,
                    backgroundColor: isDark
                      ? "rgba(30,64,175,0.5)"
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
                {lastQuizResult && (
                  <Box sx={{ mt: 1.5 }}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY, display: "block" }}
                    >
                      Last quiz score {lastQuizResult.score}% –
                      {lastQuizResult.passed ? " Passed" : " Not passed"}
                    </Typography>
                  </Box>
                )}

                <Divider sx={{ my: 2 }} />

                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                    mb: 1,
                  }}
                >
                  Lessons
                </Typography>

                <Stack spacing={1}>
                  {moduleData.lessons.map((lesson) => (
                    <Stack
                      key={lesson.order}
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {lesson.order}. {lesson.title}
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        {lesson.duration}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>

                <Divider sx={{ my: 2 }} />

                <Stack spacing={1}>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    After you pass the quiz, this module will be marked as
                    completed and counted towards your training progress.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={
                      <EmojiEventsOutlinedIcon sx={{ fontSize: 18 }} />
                    }
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontSize: 13,
                    }}
                    onClick={() => navigate(`/agent/training/certificates/${encodeURIComponent(moduleData.id)}`)}
                  >
                    View certificate (if completed)
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

// Suggested tests (pseudo-code for separate test file):
// - Render AgentTrainingModuleDetailPage and assert module title and lessons appear.
// - Simulate answering all quiz questions and clicking "Submit answers"; verify pass/fail banner.
// - Confirm that onComplete is called with a score and pass flag when quiz is submitted.
