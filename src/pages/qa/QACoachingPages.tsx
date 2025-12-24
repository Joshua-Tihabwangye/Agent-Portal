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
  Button,
  Divider,
  Slider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import RateReviewOutlinedIcon from "@mui/icons-material/RateReviewOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Sample QA review list data
const sampleReviews = [
  {
    id: "QA-1001",
    agentName: "Amina K.",
    channel: "Ticket · TCK-9012",
    module: "Support Tier 1",
    score: 92,
    status: "Completed",
    createdAt: "Today · 09:30",
  },
  {
    id: "QA-1002",
    agentName: "James M.",
    channel: "Trip · BK-2048",
    module: "Dispatch",
    score: 78,
    status: "In review",
    createdAt: "Today · 08:55",
  },
  {
    id: "QA-1003",
    agentName: "Linda N.",
    channel: "Ticket · TCK-8999",
    module: "Onboarding",
    score: 88,
    status: "Completed",
    createdAt: "Yesterday",
  },
  {
    id: "QA-1004",
    agentName: "Amina K.",
    channel: "Trip · BK-2030",
    module: "Support Tier 1",
    score: 65,
    status: "Needs coaching",
    createdAt: "2 days ago",
  },
];

// 40. /agent/qa – QA Reviews List
export function AgentQAReviewsListPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filtered = sampleReviews.filter((r) => {
    const matchesQuery =
      !query ||
      r.id.toLowerCase().includes(query.toLowerCase()) ||
      r.agentName.toLowerCase().includes(query.toLowerCase()) ||
      r.channel.toLowerCase().includes(query.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || r.status.toLowerCase() === statusFilter;
    return matchesQuery && matchesStatus;
  });

  const handleStatusClick = (key) => {
    setStatusFilter(key);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-4xl mx-auto">
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}
            >
              QA reviews
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              See recent quality reviews across your support, dispatch and
              onboarding teams. Use these insights for coaching and
              performance conversations.
            </Typography>
          </Box>

          <Chip
            label="QA & coaching"
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
              {/* Search and filters */}
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <RateReviewOutlinedIcon
                    sx={{ fontSize: 20, color: EVZONE_GREEN }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Reviews in your scope
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    size="small"
                    placeholder="Search id, agent or channel"
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
                    sx={{ minWidth: 240 }}
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
                  label="Completed"
                  size="small"
                  onClick={() => handleStatusClick("completed")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "completed"
                        ? "rgba(22,163,74,0.16)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "completed"
                        ? "#166534"
                        : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="In review"
                  size="small"
                  onClick={() => handleStatusClick("in review")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "in review"
                        ? "rgba(56,189,248,0.18)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "in review"
                        ? "#0369a1"
                        : EVZONE_GREY,
                  }}
                />
                <Chip
                  label="Needs coaching"
                  size="small"
                  onClick={() => handleStatusClick("needs coaching")}
                  sx={{
                    borderRadius: 999,
                    fontSize: 11,
                    textTransform: "none",
                    backgroundColor:
                      statusFilter === "needs coaching"
                        ? "rgba(250,204,21,0.18)"
                        : "rgba(248,250,252,1)",
                    color:
                      statusFilter === "needs coaching"
                        ? "#92400e"
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
                    No QA reviews match the current filters.
                  </Typography>
                )}

                {filtered.map((review) => (
                  <ListItemButton
                    key={review.id}
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
                      <SupportAgentOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN }}
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
                            {review.id} · {review.agentName}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {review.createdAt}
                          </Typography>
                        </Stack>
                      }
                      secondary={
                        <Stack spacing={0.2}>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            {review.channel} · {review.module}
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            Score {review.score}%
                          </Typography>
                        </Stack>
                      }
                    />
                    <Stack spacing={0.5} alignItems="flex-end">
                      <Chip
                        size="small"
                        label={review.status}
                        sx={{
                          borderRadius: 999,
                          fontSize: 10,
                          textTransform: "none",
                          backgroundColor:
                            review.status === "Completed"
                              ? "rgba(22,163,74,0.16)"
                              : review.status === "In review"
                              ? "rgba(56,189,248,0.18)"
                              : "rgba(250,204,21,0.18)",
                          color:
                            review.status === "Completed"
                              ? "#166534"
                              : review.status === "In review"
                              ? "#0369a1"
                              : "#92400e",
                        }}
                      />
                    </Stack>
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

// 41. /agent/qa/reviews/:reviewId – QA Review Detail & scoring form
export function AgentQAReviewDetailPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [scores, setScores] = useState({
    greeting: 4,
    understanding: 4,
    tools: 3,
    resolution: 4,
    tone: 5,
  });
  const [notes, setNotes] = useState("");

  const handleScoreChange = (key, value) => {
    setScores((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    console.log("Save QA review", { scores, notes });
  };

  const overall =
    (scores.greeting +
      scores.understanding +
      scores.tools +
      scores.resolution +
      scores.tone) /
    5;

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-4xl mx-auto">
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}
            >
              QA review QA-1001
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Score this interaction and leave clear coaching notes for the
              agent.
            </Typography>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={`Overall ${Math.round((overall / 5) * 100)}%`}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor: "rgba(240,253,250,1)",
                color: "#047857",
                border: "1px solid rgba(34,197,94,0.6)",
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              Agent: Amina K. · Ticket TCK-9012
            </Typography>
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
          <CardContent sx={{ p: 2.4 }}>
            <Stack spacing={2}>
              {/* Score sliders */}
              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                  }}
                >
                  Scoring
                </Typography>
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY }}
                >
                  Score each dimension from 1 (poor) to 5 (excellent).
                </Typography>
              </Stack>

              {[
                { key: "greeting", label: "Greeting & opening" },
                { key: "understanding", label: "Understanding the issue" },
                { key: "tools", label: "Use of tools & procedures" },
                { key: "resolution", label: "Resolution / next steps" },
                { key: "tone", label: "Tone & empathy" },
              ].map((row) => (
                <Box key={row.key}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography
                      variant="body2"
                      sx={{ color: isDark ? "#e5e7eb" : "#111827" }}
                    >
                      {row.label}
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      {scores[row.key]}/5
                    </Typography>
                  </Stack>
                  <Slider
                    min={1}
                    max={5}
                    step={1}
                    value={scores[row.key]}
                    onChange={(_, val) =>
                      handleScoreChange(row.key, Number(val))
                    }
                    sx={{ mt: 0.5 }}
                  />
                </Box>
              ))}

              <Divider />

              {/* Coaching notes */}
              <Stack spacing={1}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                  }}
                >
                  Coaching notes
                </Typography>
                <TextField
                  multiline
                  minRows={4}
                  fullWidth
                  placeholder="Highlight what went well, what could be improved, and specific coaching actions."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  size="small"
                  InputProps={{ sx: { borderRadius: 2 } }}
                />
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, maxWidth: 260 }}
                  >
                    Notes are visible to supervisors and the agent as part of
                    their feedback.
                  </Typography>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={handleSave}
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
                  >
                    Save review
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

// 42. “My Feedback” mini view (for agents to see aggregated QA notes)
export function AgentMyFeedbackMiniView({ agentName = "You" }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  // Placeholder aggregate data
  const avgScore = 88;
  const reviewsCount = 6;
  const coachingTags = [
    "Great empathy",
    "Clear explanations",
    "Improve tool usage",
    "Watch handle time",
  ];

  return (
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
      <CardContent sx={{ p: 2.2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1.5}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <PersonOutlineOutlinedIcon
              sx={{ fontSize: 18, color: EVZONE_GREEN }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              My feedback
            </Typography>
          </Stack>
          <Chip
            size="small"
            label={agentName}
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: "rgba(248,250,252,1)",
              color: EVZONE_GREY,
            }}
          />
        </Stack>

        <Stack spacing={1.2}>
          <Stack direction="row" spacing={1} alignItems="center">
            <EmojiEventsOutlinedIcon
              sx={{ fontSize: 18, color: EVZONE_ORANGE }}
            />
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Avg QA score {avgScore}%
            </Typography>
          </Stack>
          <Typography
            variant="caption"
            sx={{ color: EVZONE_GREY }}
          >
            Based on {reviewsCount} recent reviews.
          </Typography>

          <Divider sx={{ my: 1 }} />

          <Typography
            variant="caption"
            sx={{ color: EVZONE_GREY, mb: 0.5, display: "block" }}
          >
            Common themes from your reviewers:
          </Typography>
          <Stack direction="row" spacing={0.6} flexWrap="wrap">
            {coachingTags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                size="small"
                sx={{
                  borderRadius: 999,
                  fontSize: 10,
                  textTransform: "none",
                  backgroundColor: "rgba(248,250,252,1)",
                  color: EVZONE_GREY,
                }}
              />
            ))}
          </Stack>

          <Typography
            variant="caption"
            sx={{ color: EVZONE_GREY, mt: 1 }}
          >
            Use this view before 1:1s with your supervisor so you come
            prepared with specific wins and areas you want help with.
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Preview wrapper for this canvas only.
export default function AgentQAPreviewPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Box className="lg:col-span-2">
          <AgentQAReviewsListPage />
        </Box>
        <Box className="space-y-4">
          <AgentMyFeedbackMiniView agentName="Amina K." />
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
            <CardContent sx={{ p: 1.6 }}>
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY }}
              >
                For full scoring, open a specific review from the list.
                Below is a condensed example of the scoring form.
              </Typography>
            </CardContent>
          </Card>
          <Box>
            <AgentQAReviewDetailPage />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

// Suggested tests (pseudo-code for a separate test file):
// - Render AgentQAReviewsListPage and assert that all sampleReviews appear by default.
// - Apply a status filter (e.g. "Completed") and verify only matching reviews render.
// - Render AgentQAReviewDetailPage, adjust sliders and notes, and confirm handleSave logs the correct payload.
// - Render AgentMyFeedbackMiniView and assert that avgScore, reviewsCount and coachingTags are displayed.
