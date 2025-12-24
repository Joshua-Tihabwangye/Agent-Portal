import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Avatar,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Reusable header for entity detail pages (Trip, Rider, Driver, etc.)

export function EntityHeader({
  icon,
  title,
  subtitle,
  badge,
  meta,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="flex items-center justify-between gap-3 mb-4">
      <Box className="flex items-center gap-3">
        <Avatar
          sx={{
            width: 40,
            height: 40,
            backgroundColor: "rgba(3,205,140,0.16)",
            color: "#047857",
          }}
        >
          {icon}
        </Avatar>
        <Box>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              color: isDark ? "#e5e7eb" : "#111827",
            }}
          >
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>

      <Stack spacing={0.5} alignItems="flex-end">
        {badge && (
          <Chip
            label={badge}
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
        )}
        {meta && (
          <Typography
            variant="caption"
            sx={{ color: EVZONE_GREY }}
          >
            {meta}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

// Preview page showing how EntityHeader can be used for different entity types.
export default function AgentEntityHeaderPreview() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-3xl mx-auto">
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            color: isDark ? "#e5e7eb" : "#111827",
            mb: 2,
          }}
        >
          Entity header (preview)
        </Typography>

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
            <EntityHeader
              icon={<PersonOutlineOutlinedIcon />}
              title="Rider · Sarah K."
              subtitle="Kampala · 7 trips · Rating 4.8"
              badge="Rider"
              meta="Created by Agent · Today 09:12"
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              Use this pattern at the top of Rider detail pages to provide a
              quick overview of who the entity is.
            </Typography>
          </CardContent>
        </Card>

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
            <EntityHeader
              icon={<DirectionsCarOutlinedIcon />}
              title="Driver · Kato Robert"
              subtitle="Nissan Leaf · UBF 341X · Online · 72% battery"
              badge="Driver"
              meta="Joined Oct 2024 · 340 trips"
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              Use this pattern at the top of Driver detail pages to show
              name, vehicle, status and quick stats consistently.
            </Typography>
          </CardContent>
        </Card>

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
            <EntityHeader
              icon={<LocalHospitalOutlinedIcon />}
              title="Incident · INC-7001"
              subtitle="High severity · Ntinda Junction"
              badge="Under review"
              meta="SOS triggered · 09:05"
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              Use this pattern for Trips, Incidents and Tickets to give
              supervisors an at-a-glance summary.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
