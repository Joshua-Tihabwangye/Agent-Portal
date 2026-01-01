import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  TextField,
  Button,
  Chip,
  Grid,
  ToggleButton,
  ToggleButtonGroup,
  InputAdornment,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs from "dayjs";
import { useTheme } from "@mui/material/styles";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Route target: /agent/dispatch/new/ride
export default function AgentDispatchNewRidePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [riderName, setRiderName] = useState("");
  const [riderPhone, setRiderPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [timeMode, setTimeMode] = useState("now");
  const [scheduledTime, setScheduledTime] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [notes, setNotes] = useState("");

  const isValid =
    riderName.trim().length > 0 &&
    riderPhone.trim().length > 0 &&
    pickup.trim().length > 0 &&
    dropoff.trim().length > 0 &&
    (timeMode === "now" || scheduledTime.trim().length > 0);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    const raw = window.sessionStorage.getItem("evzone_dispatch_draft");
    const base = raw ? JSON.parse(raw) : {};
    window.sessionStorage.setItem(
      "evzone_dispatch_draft",
      JSON.stringify({
        ...base,
        serviceType: "ride",
        riderName,
        riderPhone,
        pickup,
        dropoff,
        timeMode,
        scheduledTime,
        passengers,
        notes,
      })
    );
    navigate("/agent/dispatch/new/assign");
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="w-full">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[
            { label: "Dispatch", href: "/agent/dispatch" },
            { label: "New Booking", href: "/agent/dispatch/new" }
          ]}
          current="Ride"
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
              New ride booking
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Capture a passenger ride with pickup, drop-off and basic
              preferences. Agents should confirm phone number and locations
              clearly while on the call.
            </Typography>
          </Box>

          <Chip
            label="Step 2 of 3 · Ride details"
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
            <Box
              component="form"
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
            >
              <Grid container spacing={2.4}>
                {/* Caller / rider block */}
                <Grid size={{ xs: 12, md: 5 }}>
                  <Stack spacing={1.6}>
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
                        Caller / Rider
                      </Typography>
                    </Stack>

                    <TextField
                      label="Name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={riderName}
                      onChange={(e) => setRiderName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{
                        sx: {
                          borderRadius: 3,
                        },
                      }}
                    />

                    <TextField
                      label="Phone number"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={riderPhone}
                      onChange={(e) => setRiderPhone(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{
                        startAdornment: (
                          <PhoneEnabledOutlinedIcon
                            sx={{
                              fontSize: 18,
                              color: EVZONE_GREY,
                              mr: 1,
                            }}
                          />
                        ),
                        sx: {
                          borderRadius: 3,
                        },
                      }}
                      helperText="Include country code, e.g. +256 700 ..."
                      FormHelperTextProps={{ sx: { color: EVZONE_GREY } }}
                    />

                    <Stack spacing={0.6}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Number of passengers
                      </Typography>
                      <ToggleButtonGroup
                        value={passengers}
                        exclusive
                        onChange={(_, value) =>
                          value && setPassengers(value)
                        }
                        size="small"
                        sx={{
                          backgroundColor: isDark
                            ? "rgba(15,23,42,0.8)"
                            : "rgba(248,250,252,1)",
                          borderRadius: 999,
                          p: 0.3,
                        }}
                      >
                        {["1", "2", "3+"].map((val) => (
                          <ToggleButton
                            key={val}
                            value={val}
                            sx={{
                              borderRadius: 999,
                              px: 1.8,
                              textTransform: "none",
                              fontSize: 12,
                            }}
                          >
                            {val}
                          </ToggleButton>
                        ))}
                      </ToggleButtonGroup>
                    </Stack>

                    <Stack spacing={0.6}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Special notes
                      </Typography>
                      <TextField
                        placeholder="Wheelchair access, VIP, language preference, etc."
                        multiline
                        minRows={3}
                        fullWidth
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        InputProps={{
                          sx: {
                            borderRadius: 3,
                          },
                        }}
                      />
                    </Stack>
                  </Stack>
                </Grid>

                {/* Locations & time */}
                <Grid size={{ xs: 12, md: 7 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <PlaceOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Pickup & drop-off
                      </Typography>
                    </Stack>

                    <TextField
                      label="Pickup location"
                      placeholder="Search or paste address / landmark"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{
                        sx: { borderRadius: 3 },
                        startAdornment: (
                          <InputAdornment position="start">
                            <PlaceOutlinedIcon sx={{ fontSize: 18, color: EVZONE_GREEN }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <TextField
                      label="Drop-off location"
                      placeholder="Search or paste address / landmark"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{
                        sx: { borderRadius: 3 },
                        startAdornment: (
                          <InputAdornment position="start">
                            <PlaceOutlinedIcon sx={{ fontSize: 18, color: "error.main" }} />
                          </InputAdornment>
                        ),
                      }}
                    />

                    <Stack spacing={1.2}>
                      <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                      >
                        <AccessTimeOutlinedIcon
                          sx={{ fontSize: 18, color: EVZONE_GREEN }}
                        />
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 700,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          When is this ride?
                        </Typography>
                      </Stack>

                      <ToggleButtonGroup
                        value={timeMode}
                        exclusive
                        onChange={(_, value) =>
                          value && setTimeMode(value)
                        }
                        size="small"
                        sx={{
                          backgroundColor: isDark
                            ? "rgba(15,23,42,0.8)"
                            : "rgba(248,250,252,1)",
                          borderRadius: 999,
                          p: 0.3,
                          mb: 0.5,
                        }}
                      >
                        <ToggleButton
                          value="now"
                          sx={{
                            borderRadius: 999,
                            px: 2,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Now
                        </ToggleButton>
                        <ToggleButton
                          value="later"
                          sx={{
                            borderRadius: 999,
                            px: 2,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Schedule for later
                        </ToggleButton>
                      </ToggleButtonGroup>

                      {timeMode === "later" && (
                        <Stack direction="row" spacing={1.5}>
                          <DateTimePicker
                            label="Date & time"
                            value={scheduledTime ? dayjs(scheduledTime) : null}
                            onChange={(newValue) => setScheduledTime(newValue ? newValue.toISOString() : "")}
                            slotProps={{
                              textField: {
                                size: 'small',
                                fullWidth: true,
                                InputProps: { sx: { borderRadius: 3 } }
                              }
                            }}
                          />
                        </Stack>
                      )}

                      <Stack direction="row" spacing={1} alignItems="center">
                        <GroupOutlinedIcon
                          sx={{ fontSize: 16, color: EVZONE_GREY }}
                        />
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          The dispatch system will suggest the best EV driver
                          based on distance, vehicle type and battery level.
                        </Typography>
                      </Stack>
                    </Stack>
                  </Stack>
                </Grid>
              </Grid>

              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{ mt: 3 }}
              >
                <Button
                  variant="text"
                  size="small"
                  sx={{
                    textTransform: "none",
                    fontSize: 13,
                    color: EVZONE_GREY,
                  }}
                >
                  Back to service selection
                </Button>

                <Stack direction="row" spacing={1.5}>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontSize: 13,
                    }}
                  >
                    Save as draft
                  </Button>
                  <Button
                    type="submit"
                    disabled={!isValid}
                    variant="contained"
                    size="small"
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontSize: 13,
                      fontWeight: 600,
                      backgroundColor: isValid
                        ? EVZONE_GREEN
                        : "rgba(148,163,184,0.7)",
                      "&:hover": {
                        backgroundColor: isValid ? "#059669" : undefined,
                      },
                    }}
                  >
                    Continue to driver selection
                  </Button>
                </Stack>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
