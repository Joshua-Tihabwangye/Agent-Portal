import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Grid,
  Divider,
  TextField,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Placeholder rider profile; in a real app load via riderId.
const riderProfile = {
  id: "RID-5021",
  name: "Sarah Kintu",
  city: "Kampala",
  phone: "+256 700 200 168",
  email: "sarah.kintu@example.com",
  joinDate: "2025-01-15",
  status: "Active",
  rating: 4.7,
  trips: 182,
  cancelRate: "3.2%",
  lastTrip: "Today · 09:12",
};

export default function AgentRiderProfilePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-4xl mx-auto">
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box className="flex items-center gap-2">
            <Box
              className="flex items-center justify-center rounded-full"
              sx={{
                width: 36,
                height: 36,
                backgroundColor: "rgba(3,205,140,0.18)",
                color: "#047857",
              }}
            >
              <PersonOutlineOutlinedIcon />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: isDark ? "#e5e7eb" : "#111827",
                }}
              >
                {riderProfile.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: EVZONE_GREY }}
              >
                Rider profile · {riderProfile.id}
              </Typography>
            </Box>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={riderProfile.status}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor:
                  riderProfile.status === "Active"
                    ? "rgba(22,163,74,0.12)"
                    : "rgba(148,163,184,0.18)",
                color:
                  riderProfile.status === "Active" ? "#166534" : EVZONE_GREY,
                border:
                  riderProfile.status === "Active"
                    ? "1px solid rgba(34,197,94,0.6)"
                    : "1px solid rgba(148,163,184,0.7)",
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              Joined {riderProfile.joinDate}
            </Typography>
          </Stack>
        </Box>

        <Grid container spacing={2.4}>
          {/* Left column: personal & usage */}
          <Grid item xs={12} md={6}>
            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark
                    ? "rgba(30,64,175,0.7)"
                    : "rgba(226,232,240,1)"),
                mb: 2,
              }}
            >
              <CardContent sx={{ p: 2.2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                    mb: 1,
                  }}
                >
                  Personal information
                </Typography>

                <Stack spacing={0.8}>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      City
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {riderProfile.city}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Phone
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <PhoneEnabledOutlinedIcon
                        sx={{ fontSize: 16, color: EVZONE_GREY }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {riderProfile.phone}
                      </Typography>
                    </Stack>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Email
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <EmailOutlinedIcon
                        sx={{ fontSize: 16, color: EVZONE_GREY }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {riderProfile.email}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <Card
              elevation={1}
              sx={{
                borderRadius: 3,
                backgroundColor: isDark ? "#020617" : "#ffffff",
                border:
                  "1px solid " +
                  (isDark
                    ? "rgba(30,64,175,0.7)"
                    : "rgba(226,232,240,1)"),
              }}
            >
              <CardContent sx={{ p: 2.2 }}>
                <Typography
                  variant="subtitle2"
                  sx={{
                    fontWeight: 700,
                    color: isDark ? "#e5e7eb" : "#111827",
                    mb: 1,
                  }}
                >
                  Usage & rating
                </Typography>
                <Stack spacing={0.8}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      label={"Rating " + riderProfile.rating.toFixed(1)}
                      sx={{
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        backgroundColor: "rgba(250,250,250,0.95)",
                        color: "#fbbf24",
                      }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      {riderProfile.trips} trips completed
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DirectionsCarOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Cancel rate {riderProfile.cancelRate}
                    </Typography>
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Last trip: {riderProfile.lastTrip}
                  </Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column: notes & tags */}
          <Grid item xs={12} md={6}>
            <NotesTagsPanel
              isDark={isDark}
              entityType="rider"
              entityId={riderProfile.id}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

function NotesTagsPanel({ isDark, entityType, entityId }) {
  const [note, setNote] = useState("");
  const [tags, setTags] = useState([
    { key: "vip", label: "High-value", active: true },
    { key: "frequent", label: "Frequent rider", active: false },
    { key: "late-cancel", label: "Late cancellations", active: false },
    { key: "support", label: "Needs gentle support", active: false },
  ]);

  const toggleTag = (key) => {
    setTags((prev) =>
      prev.map((t) =>
        t.key === key ? { ...t, active: !t.active } : t
      )
    );
  };

  const handleAddNote = () => {
    if (!note.trim()) return;
    console.log("Add internal note", { entityType, entityId, note });
    setNote("");
  };

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
            <LocalOfferOutlinedIcon
              sx={{ fontSize: 18, color: EVZONE_ORANGE }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Notes & tags
            </Typography>
          </Stack>
          <Chip
            size="small"
            label="Internal only"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: "rgba(248,250,252,1)",
              color: EVZONE_GREY,
            }}
          />
        </Stack>

        <Stack spacing={1} mb={1.5} direction="row" flexWrap="wrap">
          {tags.map((tag) => (
            <Chip
              key={tag.key}
              label={tag.label}
              onClick={() => toggleTag(tag.key)}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor: tag.active
                  ? "rgba(3,205,140,0.16)"
                  : "rgba(248,250,252,1)",
                color: tag.active ? "#047857" : EVZONE_GREY,
                border: tag.active
                  ? "1px solid rgba(34,197,94,0.6)"
                  : "1px solid rgba(203,213,225,0.9)",
                cursor: "pointer",
              }}
            />
          ))}
        </Stack>

        <Divider sx={{ my: 1.5 }} />

        <Stack spacing={0.8}>
          <Stack direction="row" spacing={1} alignItems="center">
            <NoteAltOutlinedIcon
              sx={{ fontSize: 18, color: EVZONE_GREEN }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Add internal note
            </Typography>
          </Stack>
          <TextField
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Example: Prefers front seat, avoid calls after 9pm, explain surge pricing calmly, etc."
            multiline
            minRows={3}
            fullWidth
            size="small"
            InputProps={{ sx: { borderRadius: 3 } }}
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
              These notes help other agents provide consistent, high-quality
              support. They are never shown to riders.
            </Typography>
            <Button
              variant="contained"
              size="small"
              onClick={handleAddNote}
              disabled={!note.trim()}
              sx={{
                borderRadius: 999,
                textTransform: "none",
                fontSize: 13,
                fontWeight: 600,
                backgroundColor: note.trim()
                  ? EVZONE_GREEN
                  : "rgba(148,163,184,0.7)",
                "&:hover": {
                  backgroundColor: note.trim() ? "#059669" : undefined,
                },
              }}
            >
              Save note
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
