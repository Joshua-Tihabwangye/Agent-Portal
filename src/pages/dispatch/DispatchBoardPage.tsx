import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Grid,
  IconButton,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import ViewKanbanOutlinedIcon from "@mui/icons-material/ViewKanbanOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Sample bookings grouped by status
const initialColumns = [
  {
    key: "new",
    label: "New",
    accent: "#38bdf8",
    bookings: [
      {
        id: "BK-2048",
        type: "Ride",
        rider: "Sarah K.",
        from: "Nakasero Hill",
        to: "Bugolobi Flats",
        eta: "—",
      },
      {
        id: "BK-2051",
        type: "Delivery",
        rider: "Parcel for Brian",
        from: "EVzone Hub - CBD",
        to: "Makerere Hostel",
        eta: "—",
      },
    ],
  },
  {
    key: "scheduled",
    label: "Scheduled",
    accent: "#6366f1",
    bookings: [
      {
        id: "BK-2053",
        type: "School shuttle",
        rider: "14 students",
        from: "Green Valley Estate",
        to: "Little Stars School",
        eta: "07:30",
      },
    ],
  },
  {
    key: "assigned",
    label: "Assigned",
    accent: "#22c55e",
    bookings: [
      {
        id: "BK-2055",
        type: "Ride",
        rider: "John M.",
        from: "Kira Road",
        to: "Naguru Estate",
        eta: "5 min",
      },
    ],
  },
  {
    key: "in-progress",
    label: "In progress",
    accent: "#f97316",
    bookings: [
      {
        id: "BK-2042",
        type: "Delivery",
        rider: "Food order",
        from: "City Mall",
        to: "Kololo Hill",
        eta: "11 min",
      },
      {
        id: "BK-2060",
        type: "EMS",
        rider: "Emergency",
        from: "Ntinda Junction",
        to: "Mulago Hospital",
        eta: "4 min",
      },
    ],
  },
  {
    key: "problem",
    label: "Problem",
    accent: "#b91c1c",
    bookings: [
      {
        id: "BK-2039",
        type: "Ride",
        rider: "Alex T.",
        from: "Wandegeya",
        to: "Makerere Hill",
        eta: "—",
      },
    ],
  },
];

export default function AgentDispatchBoardPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  // Initialize read bookings from session storage
  const [readBookings, setReadBookings] = useState<Set<string>>(() => {
    try {
      const saved = sessionStorage.getItem("dispatchReadBookings");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  // Initialize columns with read state based on history
  // Note: we want "New" items to be unread unless they are in our history.
  // For demo: if it's "New" and NOT in readBookings, it's unread.
  const [columns, setColumns] = useState(() => {
    // Helper to check if read
    const isRead = (id: string, colKey: string, idx: number) => {
      // If explicitly marked read in session
      if (readBookings.has(id)) return true;
      // Default logic: only first item in 'new' is unread if not clicked yet
      if (colKey === "new" && idx === 0) return false;
      return true;
    };

    return initialColumns.map(col => ({
      ...col,
      bookings: col.bookings.map((b, i) => ({
        ...b,
        read: isRead(b.id, col.key, i) // Use local variable, not state yet
      }))
    }));
  });

  // Effect to sync readBookings to session storage
  React.useEffect(() => {
    sessionStorage.setItem("dispatchReadBookings", JSON.stringify(Array.from(readBookings)));
  }, [readBookings]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setColumns(prev => {
        // Re-apply read state to initial columns (simulating refresh)
        return initialColumns.map(col => ({
          ...col,
          bookings: col.bookings.map((b, i) => ({
            ...b,
            read: col.key === "new" && i === 0 ? readBookings.has(b.id) : true // Simplistic refresh logic
          }))
        }));
      });
      setRefreshing(false);
    }, 800);
  };

  const handleBookingClick = (bookingId: string) => {
    // Update local set
    setReadBookings(prev => {
      const next = new Set(prev);
      next.add(bookingId);
      return next;
    });

    // Mark as read in UI
    setColumns(prev => prev.map(col => ({
      ...col,
      bookings: col.bookings.map(b => b.id === bookingId ? { ...b, read: true } : b)
    })));
    navigate(`/agent/bookings/${bookingId}`);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4 overflow-x-auto">
      {/* Breadcrumb Navigation */}
      <PageBreadcrumb
        items={[{ label: "Dispatch", href: "/agent/dispatch" }]}
        current="Dispatch Board"
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
            Dispatch board
          </Typography>
          <Typography
            variant="body2"
            sx={{ color: EVZONE_GREY, maxWidth: 520 }}
          >
            Kanban-style overview of bookings by status. Quickly see which
            rides, deliveries, rentals, tours and EMS jobs need attention.
          </Typography>
        </Box>

        <Stack direction="row" spacing={1} alignItems="center">
          <Chip
            label="Today"
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
          <IconButton size="small">
            <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            size="small"
            onClick={handleRefresh}
            disabled={refreshing}
            sx={{
              animation: refreshing ? "spin 1s linear infinite" : "none",
              "@keyframes spin": {
                "0%": { transform: "rotate(0deg)" },
                "100%": { transform: "rotate(360deg)" },
              },
            }}
          >
            <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
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
          minHeight: 260,
        }}
      >
        <CardContent sx={{ p: 2.2 }}>
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            mb={2}
          >
            <ViewKanbanOutlinedIcon
              sx={{ fontSize: 20, color: EVZONE_GREEN }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Bookings by status
            </Typography>
          </Stack>

          <Box className="overflow-x-auto">
            <Grid
              container
              spacing={1.5}
              wrap="nowrap"
              sx={{ minWidth: 720 }}
            >
              {columns.map((column) => (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={column.key}>
                  <Box
                    sx={{
                      borderRadius: 3,
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(248,250,252,0.95)",
                      border: "1px solid rgba(203,213,225,0.9)",
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: 480,
                    }}
                  >
                    <Box
                      className="flex items-center justify-between px-3 py-2 border-b"
                      sx={{
                        borderBottomColor: isDark
                          ? "rgba(30,64,175,0.7)"
                          : "rgba(226,232,240,1)",
                      }}
                    >
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Box
                          className="w-2 h-2 rounded-full"
                          sx={{ backgroundColor: column.accent }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            fontSize: 13,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {column.label}
                        </Typography>
                      </Stack>
                      <Chip
                        size="small"
                        label={column.bookings.length}
                        sx={{
                          borderRadius: 999,
                          fontSize: 11,
                          textTransform: "none",
                          backgroundColor: "rgba(248,250,252,1)",
                          color: EVZONE_GREY,
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        flex: 1,
                        overflowY: "auto",
                        p: 1.2,
                        display: "flex",
                        flexDirection: "column",
                        gap: 1,
                      }}
                    >
                      {column.bookings.map((booking: any) => (
                        <Box
                          key={booking.id}
                          onClick={() => handleBookingClick(booking.id)}
                          className="rounded-2xl px-3 py-2.5 cursor-pointer"
                          sx={{
                            backgroundColor: !booking.read
                              ? (isDark ? "rgba(3,205,140,0.15)" : "#f0fdf9")
                              : (isDark ? "rgba(15,23,42,0.9)" : "#ffffff"),
                            border: !booking.read
                              ? `1px solid ${EVZONE_GREEN}40`
                              : "1px solid rgba(203,213,225,0.9)",
                            transition:
                              "border-color 0.15s ease, box-shadow 0.15s ease",
                            "&:hover": {
                              borderColor: EVZONE_GREEN,
                              boxShadow:
                                "0 10px 20px rgba(15,23,42,0.08)",
                            },
                          }}
                        >
                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mb: 0.4 }}
                          >
                            <Stack direction="row" spacing={1} alignItems="center">
                              <Typography
                                variant="body2"
                                sx={{
                                  fontWeight: !booking.read ? 700 : 600,
                                  color: isDark ? "#e5e7eb" : "#111827",
                                }}
                              >
                                {booking.id}
                              </Typography>
                              {!booking.read && (
                                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: EVZONE_GREEN }} />
                              )}
                            </Stack>
                            <Stack
                              direction="row"
                              spacing={0.5}
                              alignItems="center"
                            >
                              {booking.type === "Ride" && (
                                <DirectionsCarOutlinedIcon
                                  sx={{ fontSize: 14, color: EVZONE_GREEN }}
                                />
                              )}
                              {booking.type === "Delivery" && (
                                <LocalShippingOutlinedIcon
                                  sx={{ fontSize: 14, color: EVZONE_ORANGE }}
                                />
                              )}
                              {booking.type === "EMS" && (
                                <LocalHospitalOutlinedIcon
                                  sx={{ fontSize: 14, color: "#b91c1c" }}
                                />
                              )}
                              <Typography
                                variant="caption"
                                sx={{ color: EVZONE_GREY }}
                              >
                                {booking.type}
                              </Typography>
                            </Stack>
                          </Stack>

                          <Typography
                            variant="caption"
                            sx={{
                              color: EVZONE_GREY,
                              display: "block",
                            }}
                          >
                            {booking.from} → {booking.to}
                          </Typography>

                          <Stack
                            direction="row"
                            justifyContent="space-between"
                            alignItems="center"
                            sx={{ mt: 0.4 }}
                          >
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY }}
                            >
                              {booking.rider}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: EVZONE_GREY }}
                            >
                              ETA {booking.eta}
                            </Typography>
                          </Stack>
                        </Box>
                      ))}

                      {column.bookings.length === 0 && (
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY, fontStyle: "italic" }}
                        >
                          No bookings in this column.
                        </Typography>
                      )}
                    </Box>
                  </Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}
