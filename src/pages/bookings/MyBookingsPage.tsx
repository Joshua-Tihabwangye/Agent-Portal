import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Tabs,
  Tab,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const bookingsByType = {
  rides: [
    {
      id: "BK-2048",
      label: "Ride · BK-2048",
      subtitle: "Nakasero Hill → Bugolobi Flats",
      status: "In progress",
      time: "Today · 09:12",
    },
    {
      id: "BK-2055",
      label: "Ride · BK-2055",
      subtitle: "Kira Road → Naguru Estate",
      status: "Assigned",
      time: "Today · 08:47",
    },
  ],
  deliveries: [
    {
      id: "BK-2051",
      label: "Delivery · BK-2051",
      subtitle: "EVzone Hub - CBD → Makerere Hostel",
      status: "Picked up",
      time: "Today · 08:20",
    },
  ],
  rentals: [
    {
      id: "BK-3002",
      label: "Rental · BK-3002",
      subtitle: "Daily · Nissan Leaf · CBD Hub",
      status: "Scheduled",
      time: "Tomorrow · 10:00",
    },
  ],
  tours: [
    {
      id: "BK-4001",
      label: "Tour · BK-4001",
      subtitle: "Jinja Nile day trip · 5–8 people",
      status: "Draft",
      time: "—",
    },
  ],
  ems: [
    {
      id: "BK-2060",
      label: "EMS · BK-2060",
      subtitle: "Ntinda Junction → Mulago Hospital",
      status: "In progress",
      time: "Today · 09:05",
    },
  ],
};

function getIconForType(type) {
  if (type === "rides") return <DirectionsCarOutlinedIcon fontSize="small" />;
  if (type === "deliveries")
    return <LocalShippingOutlinedIcon fontSize="small" />;
  if (type === "rentals") return <DirectionsCarOutlinedIcon fontSize="small" />;
  if (type === "tours") return <TourOutlinedIcon fontSize="small" />;
  if (type === "ems") return <LocalHospitalOutlinedIcon fontSize="small" />;
  return null;
}

// Route target: /agent/bookings
export default function AgentMyBookingsPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [tab, setTab] = useState("rides");
  const [bookings, setBookings] = useState(bookingsByType);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem("evzone_agent_bookings");
      if (!raw) return;
      const stored = JSON.parse(raw) as any[];

      const next = JSON.parse(JSON.stringify(bookingsByType));
      stored.forEach((b) => {
        const st = String(b?.serviceType || b?.summary?.type || "ride").toLowerCase();
        const key = st.includes("delivery")
          ? "deliveries"
          : st.includes("rental")
            ? "rentals"
            : st.includes("tour")
              ? "tours"
              : st.includes("ems")
                ? "ems"
                : "rides";

        const summary = b?.summary || {};
        const subtitle = summary.pickup && summary.dropoff ? `${summary.pickup} → ${summary.dropoff}` : (b?.pickup || b?.dropoff ? `${b?.pickup || ""} → ${b?.dropoff || ""}` : "—");
        next[key] = [
          {
            id: b.id || summary.code,
            label: `${String(summary.type || key).toUpperCase()} · ${b.id || summary.code}`,
            subtitle,
            status: b.status || "New",
            time: b.createdAt ? new Date(b.createdAt).toLocaleString() : "—",
          },
          ...next[key],
        ];
      });
      setBookings(next);
    } catch {
      // ignore
    }
  }, []);

  const currentList = bookings[tab] || [];

  const handleTabChange = (event, value) => {
    if (value) setTab(value);
  };

  const getTabLabel = (key, label) => {
    const count = bookings[key]?.length || 0;
    return (
      <Stack direction="row" spacing={0.5} alignItems="center">
        <span>{label}</span>
        <Chip
          size="small"
          label={count}
          sx={{
            borderRadius: 999,
            fontSize: 10,
            height: 18,
            textTransform: "none",
            backgroundColor: "rgba(248,250,252,1)",
            color: EVZONE_GREY,
          }}
        />
      </Stack>
    );
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="w-full">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[]}
          current="My Bookings"
        />
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
              My bookings
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              See bookings you created across rides, deliveries, rentals,
              tours and EMS. Use this view to follow up and make quick
              changes.
            </Typography>
          </Box>

          <Chip
            label="Agent-created"
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
                px: 1,
              }}
            >
              <Tab
                value="rides"
                label={getTabLabel("rides", "Rides")}
                icon={<DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="deliveries"
                label={getTabLabel("deliveries", "Deliveries")}
                icon={<LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="rentals"
                label={getTabLabel("rentals", "Rentals")}
                icon={<DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="tours"
                label={getTabLabel("tours", "Tours")}
                icon={<TourOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="ems"
                label={getTabLabel("ems", "EMS")}
                icon={<LocalHospitalOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
            </Tabs>

            <Box sx={{ p: 2 }}>
              {currentList.length === 0 ? (
                <Typography
                  variant="caption"
                  sx={{ color: EVZONE_GREY, fontStyle: "italic" }}
                >
                  You haven&apos;t created any bookings in this category yet.
                </Typography>
              ) : (
                <List disablePadding>
                  {currentList.map((b) => (
                    <ListItemButton
                      key={b.id}
                      onClick={() => navigate(`/agent/bookings/${encodeURIComponent(b.id)}`)}
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
                        {tab === "rides" && (
                          <DirectionsCarOutlinedIcon
                            sx={{ fontSize: 18, color: EVZONE_GREEN }}
                          />
                        )}
                        {tab === "deliveries" && (
                          <LocalShippingOutlinedIcon
                            sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                          />
                        )}
                        {tab === "rentals" && (
                          <DirectionsCarOutlinedIcon
                            sx={{ fontSize: 18, color: EVZONE_GREEN }}
                          />
                        )}
                        {tab === "tours" && (
                          <TourOutlinedIcon
                            sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                          />
                        )}
                        {tab === "ems" && (
                          <LocalHospitalOutlinedIcon
                            sx={{ fontSize: 18, color: "#b91c1c" }}
                          />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 600,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            {b.label}
                          </Typography>
                        }
                        secondary={
                          <Stack spacing={0.2}>
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY }}
                            >
                              {b.subtitle}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY }}
                            >
                              {b.time}
                            </Typography>
                          </Stack>
                        }
                      />
                      <Chip
                        size="small"
                        label={b.status}
                        sx={{
                          borderRadius: 999,
                          fontSize: 10,
                          textTransform: "none",
                          ml: 1,
                          backgroundColor:
                            b.status === "In progress"
                              ? "rgba(56,189,248,0.15)"
                              : b.status === "Assigned" ||
                                b.status === "Scheduled"
                                ? "rgba(22,163,74,0.12)"
                                : b.status === "Draft"
                                  ? "rgba(148,163,184,0.18)"
                                  : "rgba(248,250,252,1)",
                          color:
                            b.status === "In progress"
                              ? "#0369a1"
                              : b.status === "Assigned" ||
                                b.status === "Scheduled"
                                ? "#166534"
                                : b.status === "Draft"
                                  ? "#4b5563"
                                  : EVZONE_GREY,
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
