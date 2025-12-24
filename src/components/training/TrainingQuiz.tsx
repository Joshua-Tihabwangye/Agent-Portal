import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Reusable quiz / assessment component with pass/fail logic.
export function TrainingQuiz({ questions, passMark = 70, onComplete }) {
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
          Quiz
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
            You need {passMark}% or higher to pass.
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
      </Box>

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
              : "You did not reach the pass mark. Review the material and try again."}
          </Typography>
        </Box>
      )}
    </Box>
  );
}

// Preview wrapper for the TrainingQuiz component.
export default function AgentTrainingQuizPreview() {
  const questions = [
    {
      id: "q1",
      text: "What should you do if a rider reports a safety concern?",
      options: [
        "Ignore it if the trip is complete",
        "Immediately end the call",
        "Follow the safety playbook and document the incident",
        "Offer a discount only",
      ],
      correctIndex: 2,
    },
    {
      id: "q2",
      text: "Why is data privacy important?",
      options: [
        "To avoid boredom",
        "To comply with regulations and protect users",
        "It is not important",
        "Only managers need to care",
      ],
      correctIndex: 1,
    },
  ];

  const handleComplete = (result) => {
    console.log("Quiz completed", result);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4 flex justify-center">
      <Box className="max-w-xl w-full">
        <Card
          elevation={1}
          sx={{
            borderRadius: 3,
            backgroundColor: "#ffffff",
            border: "1px solid rgba(226,232,240,1)",
          }}
        >
          <CardContent sx={{ p: 2.4 }}>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              Quiz component preview
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY, display: "block", mb: 1.5 }}
            >
              This preview shows how the TrainingQuiz component behaves with
              a small set of questions. Answer all questions and submit to
              see pass/fail feedback.
            </Typography>
            <TrainingQuiz
              questions={questions}
              passMark={70}
              onComplete={handleComplete}
            />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

// Suggested tests (pseudo-code for separate test file):
// - Render TrainingQuiz with a set of questions and verify that selecting answers and submitting computes correct score.
// - Ensure that the submit button is disabled until all questions have an answer.
// - Check that onComplete is called with the expected score and passed flag.
// - Verify that the pass/fail message updates correctly when the score crosses the passMark threshold.
