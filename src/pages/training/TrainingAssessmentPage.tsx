import React from "react";
import { Box, Card, CardContent, Typography, Stack, Chip, Button, LinearProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const assessments = [
  {
    id: "assess-privacy",
    title: "Privacy & data handling quiz",
    due: "Today",
    status: "Due",
    questions: 10,
    description: "Validate your knowledge of data handling, PII and how to keep customer information safe across tickets and calls.",
  },
  {
    id: "assess-dispatch",
    title: "Manual dispatch scenario assessment",
    due: "In 3 days",
    status: "Upcoming",
    questions: 8,
    description: "Timed scenarios that cover routing, EV suitability and how to handoff trips to live ops with the right context.",
  },
  {
    id: "assess-onboarding",
    title: "Driver onboarding quality review",
    due: "Completed",
    status: "Completed",
    questions: 6,
    description: "Light-weight spot check on how you verify driver documents, background checks and phone screening.",
  },
];

export default function TrainingAssessmentPage() {
  const { assessmentId } = useParams();
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const assessment =
    assessments.find((a) => a.id === assessmentId) ||
    assessments[0];

  const statusColor =
    assessment.status === "Due"
      ? "#b91c1c"
      : assessment.status === "Upcoming"
        ? "#1d4ed8"
        : "#166534";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="w-full">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[{ label: "Training", href: "/agent/training" }]}
          current="Assessment"
        />
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 800, color: isDark ? "#e5e7eb" : "#0f172a" }}
            >
              {assessment.title}
            </Typography>
            <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
              Assessment · {assessment.questions} questions · Due {assessment.due}
            </Typography>
          </Box>
          <Chip
            label={assessment.status}
            sx={{
              borderRadius: 999,
              fontSize: 12,
              fontWeight: 700,
              backgroundColor: "rgba(255,255,255,0.25)",
              color: statusColor,
              border: `1px solid ${statusColor}`,
            }}
          />
        </Box>

        <Card
          elevation={1}
          className="ev-gradient-soft"
          sx={{
            borderRadius: 3,
            border: "1px solid " + (isDark ? "rgba(59,130,246,0.25)" : "rgba(255,255,255,0.65)"),
            boxShadow: "0 10px 30px rgba(2,6,23,0.12)",
            overflow: "hidden",
          }}
        >
          <CardContent sx={{ p: { xs: 2, sm: 2.6 } }}>
            <Stack spacing={2}>
              <Stack direction="row" spacing={1} alignItems="center">
                <QuizOutlinedIcon sx={{ color: statusColor }} />
                <Typography
                  variant="subtitle2"
                  sx={{ fontWeight: 700, color: isDark ? "#e2e8f0" : "#0f172a" }}
                >
                  What to expect
                </Typography>
              </Stack>
              <Typography variant="body2" sx={{ color: isDark ? "#e2e8f0" : "#111827" }}>
                {assessment.description}
              </Typography>
              <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                Passing score: 80%. You can retake once if you do not meet the bar on the first try.
              </Typography>

              <Box>
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, display: "block", mb: 0.5 }}
                >
                  Readiness
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={assessment.status === "Completed" ? 100 : assessment.status === "Due" ? 35 : 10}
                  sx={{
                    height: 10,
                    borderRadius: 999,
                    backgroundColor: isDark ? "rgba(15,23,42,0.65)" : "rgba(255,255,255,0.6)",
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
              </Box>

              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }}>
                <Stack direction="row" spacing={1} alignItems="center">
                  <EmojiEventsOutlinedIcon sx={{ color: EVZONE_ORANGE }} />
                  <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                    Earn a completion badge on your profile.
                  </Typography>
                </Stack>
                <Stack direction="row" spacing={1}>
                  <Button
                    startIcon={<ArrowBackOutlinedIcon />}
                    variant="text"
                    onClick={() => navigate(-1)}
                    sx={{ color: isDark ? "#e2e8f0" : "#0f172a" }}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate("/agent/training/modules/mod-ev-battery")}
                    sx={{ fontWeight: 700 }}
                  >
                    Start assessment
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

