import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Grid,
  Divider,
} from "@mui/material";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import { useTheme } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Route target: /agent/drivers/:driverId
// Placeholder, to be replaced by real driver data from API/route.
const driverProfile = {
  id: "DRV-102",
  name: "Kato Robert",
  city: "Kampala",
  phone: "+256 704 000 111",
  email: "kato.robert@example.com",
  company: "EVzone Fleet",
  services: ["Ride", "Delivery"],
  status: "Active",
  rating: 4.8,
  trips: 324,
  vehicle: {
    makeModel: "Nissan Leaf",
    plate: "UBF 341X",
    year: 2022,
    color: "White",
    isEV: true,
  },
  documents: {
    nationalId: "Verified",
    licence: "Valid to 2027-03-12",
    insurance: "Comprehensive",
  },
  training: {
    coreModules: "100%",
    evBasics: "100%",
    safety: "Completed",
  },
};

export default function AgentDriverProfilePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="w-full">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[{ label: "Drivers", href: "/agent/drivers" }]}
          current={driverProfile.name}
        />
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
                {driverProfile.name}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: EVZONE_GREY }}
              >
                Driver profile · {driverProfile.id}
              </Typography>
            </Box>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={driverProfile.status}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor:
                  driverProfile.status === "Active"
                    ? "rgba(22,163,74,0.12)"
                    : "rgba(148,163,184,0.18)",
                color:
                  driverProfile.status === "Active" ? "#166534" : EVZONE_GREY,
                border:
                  driverProfile.status === "Active"
                    ? "1px solid rgba(34,197,94,0.6)"
                    : "1px solid rgba(148,163,184,0.7)",
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              Read-only view
            </Typography>
          </Stack>
        </Box>

        <Grid container spacing={2.4}>
          {/* Left column: personal & company */}
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
                      {driverProfile.city}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Phone
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {driverProfile.phone}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Email
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {driverProfile.email}
                    </Typography>
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
                  Company & services
                </Typography>
                <Stack spacing={0.8}>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Company
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {driverProfile.company}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Services
                    </Typography>
                    <Stack direction="row" spacing={0.5} flexWrap="wrap">
                      {driverProfile.services.map((s) => (
                        <Chip
                          key={s}
                          label={s}
                          size="small"
                          sx={{
                            borderRadius: 999,
                            fontSize: 11,
                            textTransform: "none",
                            backgroundColor: "rgba(248,250,252,1)",
                            color: EVZONE_GREY,
                          }}
                        />
                      ))}
                    </Stack>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right column: vehicle, docs, training */}
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Stack direction="row" spacing={1} alignItems="center">
                    <DirectionsCarOutlinedIcon
                      sx={{ fontSize: 18, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Vehicle
                    </Typography>
                  </Stack>
                  {driverProfile.vehicle.isEV && (
                    <Chip
                      size="small"
                      label="EV only"
                      sx={{
                        borderRadius: 999,
                        fontSize: 11,
                        textTransform: "none",
                        backgroundColor: "rgba(240,253,250,1)",
                        color: "#047857",
                        border: "1px solid rgba(34,197,94,0.6)",
                      }}
                    />
                  )}
                </Stack>

                <Stack spacing={0.8}>
                  <Typography
                    variant="body2"
                    sx={{
                      fontWeight: 500,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    {driverProfile.vehicle.makeModel} · {driverProfile.vehicle.plate}
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    {driverProfile.vehicle.year} · {driverProfile.vehicle.color}
                  </Typography>
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
                mb: 2,
              }}
            >
              <CardContent sx={{ p: 2.2 }}>
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mb={1}
                >
                  <AssignmentIndOutlinedIcon
                    sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Documents
                  </Typography>
                </Stack>

                <Stack spacing={0.8}>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      National ID
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {driverProfile.documents.nationalId}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Driver licence
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {driverProfile.documents.licence}
                    </Typography>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Insurance
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {driverProfile.documents.insurance}
                    </Typography>
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
                <Stack
                  direction="row"
                  spacing={1}
                  alignItems="center"
                  mb={1}
                >
                  <SchoolOutlinedIcon
                    sx={{ fontSize: 18, color: EVZONE_GREEN }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Training & performance
                  </Typography>
                </Stack>

                <Stack spacing={0.8}>
                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      label={"Rating " + driverProfile.rating.toFixed(1)}
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
                      {driverProfile.trips} trips completed
                    </Typography>
                  </Stack>
                  <Divider sx={{ my: 1 }} />
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Core modules
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {driverProfile.training.coreModules} completed
                    </Typography>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      EV basics & charging
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {driverProfile.training.evBasics} completed
                    </Typography>
                  </Stack>
                  <Stack spacing={0.3}>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY }}
                    >
                      Safety & incident reporting
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontWeight: 500,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      {driverProfile.training.safety}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
