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
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import NoteAltOutlinedIcon from "@mui/icons-material/NoteAltOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Placeholder company profile; in a real app load via companyId.
const companyProfile = {
  id: "CMP-301",
  name: "Kampala Tech Park",
  city: "Kampala",
  country: "Uganda",
  contactName: "Isaac Z.",
  contactPhone: "+256 704 200 555",
  contactEmail: "ops@ktp.example.com",
  billingPlan: "Corporate · Monthly invoice",
  status: "Active",
  activeRiders: 48,
  activeDrivers: 22,
  tripsLast30: 612,
  spendLast30: "UGX 43,200,000",
};

export default function AgentCompanyProfilePage() {
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
              <BusinessCenterOutlinedIcon />
            </Box>
            <Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: isDark ? "#e5e7eb" : "#111827",
                }}
              >
                {companyProfile.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: EVZONE_GREY }}
              >
                Company profile · {companyProfile.id}
              </Typography>
            </Box>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={companyProfile.status}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor:
                  companyProfile.status === "Active"
                    ? "rgba(22,163,74,0.12)"
                    : "rgba(148,163,184,0.18)",
                color:
                  companyProfile.status === "Active"
                    ? "#166534"
                    : EVZONE_GREY,
                border:
                  companyProfile.status === "Active"
                    ? "1px solid rgba(34,197,94,0.6)"
                    : "1px solid rgba(148,163,184,0.7)",
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              Corporate account
            </Typography>
          </Stack>
        </Box>

        <Grid container spacing={2.4}>
          {/* Left column: contact & billing */}
          <Grid size={{ xs: 12, md: 6 }}>
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
                  Primary contact
                </Typography>

                <Stack spacing={0.8}>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Contact person
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {companyProfile.contactName}
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
                        {companyProfile.contactPhone}
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
                        {companyProfile.contactEmail}
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
                  Billing & location
                </Typography>
                <Stack spacing={0.8}>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Billing plan
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {companyProfile.billingPlan}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Location
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <PlaceOutlinedIcon
                        sx={{ fontSize: 16, color: EVZONE_GREY }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        {companyProfile.city}, {companyProfile.country}
                      </Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column: usage & notes/tags */}
          <Grid size={{ xs: 12, md: 6 }}>
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
                  Usage overview
                </Typography>
                <Stack spacing={0.8}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Active riders
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: EVZONE_GREY }}
                    >
                      {companyProfile.activeRiders}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Active drivers
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: EVZONE_GREY }}
                    >
                      {companyProfile.activeDrivers}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Trips (last 30 days)
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: EVZONE_GREY }}
                    >
                      {companyProfile.tripsLast30}
                    </Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Spend (last 30 days)
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: EVZONE_GREY }}
                    >
                      {companyProfile.spendLast30}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>

            <NotesTagsPanel
              isDark={isDark}
              entityType="company"
              entityId={companyProfile.id}
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
    { key: "priority", label: "High-priority", active: true },
    { key: "volume", label: "High volume", active: true },
    { key: "pay", label: "Slow payer", active: false },
    { key: "support", label: "Needs VIP support", active: false },
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
            placeholder="Example: Renewal due in June, negotiate new rates, requires monthly usage report, etc."
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
              These notes are for internal coordination across sales,
              support and finance teams.
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
