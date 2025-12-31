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
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import { useNavigate } from "react-router-dom";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Route target: /agent/dispatch/new/rental
export default function AgentDispatchNewRentalPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [pickupBranch, setPickupBranch] = useState("");
  const [dropoffBranch, setDropoffBranch] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const [rentalType, setRentalType] = useState("daily");
  const [vehicleClass, setVehicleClass] = useState("ev-sedan");
  const [driverOption, setDriverOption] = useState("with-driver");
  const [notes, setNotes] = useState("");
  const [numberOfDays, setNumberOfDays] = useState("");

  const isValid =
    customerName.trim().length > 0 &&
    customerPhone.trim().length > 0 &&
    pickupBranch.trim().length > 0 &&
    dropoffBranch.trim().length > 0 &&
    startDateTime.trim().length > 0 &&
    endDateTime.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    const raw = window.sessionStorage.getItem("evzone_dispatch_draft");
    const base = raw ? JSON.parse(raw) : {};
    window.sessionStorage.setItem(
      "evzone_dispatch_draft",
      JSON.stringify({
        ...base,
        serviceType: "rental",
        customerName,
        customerPhone,
        pickupBranch,
        dropoffBranch,
        startDateTime,
        endDateTime,
        rentalType,
        vehicleClass,
        driverOption,
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
          current="Car Rental"
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
              New car rental booking
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Create an hourly or daily EV rental. Confirm the rental window,
              pickup / drop-off branches and whether a driver is required.
            </Typography>
          </Box>

          <Chip
            label="Step 2 of 3 · Rental details"
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
                {/* Customer */}
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
                        Customer details
                      </Typography>
                    </Stack>

                    <TextField
                      label="Customer name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Customer phone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                      helperText="Include country code, e.g. +256 700 ..."
                      FormHelperTextProps={{ sx: { color: EVZONE_GREY } }}
                    />

                    <FormControl size="small" fullWidth sx={{ mt: 0.5 }}>
                      <InputLabel sx={{ color: EVZONE_GREY }}>
                        Rental type
                      </InputLabel>
                      <Select
                        label="Rental type"
                        value={rentalType}
                        onChange={(e) => setRentalType(e.target.value)}
                        sx={{ borderRadius: 3 }}
                      >
                        <MenuItem value="hourly">Hourly</MenuItem>
                        <MenuItem value="daily">Daily</MenuItem>
                        <MenuItem value="multi-day">Multi-day</MenuItem>
                      </Select>
                    </FormControl>

                    {rentalType === "multi-day" && (
                      <TextField
                        label="Number of days"
                        placeholder="e.g. 3"
                        variant="outlined"
                        size="small"
                        fullWidth
                        type="number"
                        value={numberOfDays}
                        onChange={(e) => setNumberOfDays(e.target.value)}
                        InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                        InputProps={{ sx: { borderRadius: 3 }, inputProps: { min: 1 } }}
                        helperText="How many days is this rental for?"
                        FormHelperTextProps={{ sx: { color: EVZONE_GREY } }}
                      />
                    )}

                    <FormControl size="small" fullWidth>
                      <InputLabel sx={{ color: EVZONE_GREY }}>
                        Vehicle class
                      </InputLabel>
                      <Select
                        label="Vehicle class"
                        value={vehicleClass}
                        onChange={(e) => setVehicleClass(e.target.value)}
                        sx={{ borderRadius: 3 }}
                      >
                        <MenuItem value="ev-sedan">EV sedan</MenuItem>
                        <MenuItem value="ev-suv">EV SUV</MenuItem>
                        <MenuItem value="ev-van">EV van</MenuItem>
                      </Select>
                    </FormControl>

                    <Stack spacing={0.6}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Driver option
                      </Typography>
                      <ToggleButtonGroup
                        value={driverOption}
                        exclusive
                        onChange={(_, value) => value && setDriverOption(value)}
                        size="small"
                        sx={{
                          backgroundColor: isDark
                            ? "rgba(15,23,42,0.8)"
                            : "rgba(248,250,252,1)",
                          borderRadius: 999,
                          p: 0.3,
                        }}
                      >
                        <ToggleButton
                          value="with-driver"
                          sx={{
                            borderRadius: 999,
                            px: 1.8,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          With driver
                        </ToggleButton>
                        <ToggleButton
                          value="self-drive"
                          sx={{
                            borderRadius: 999,
                            px: 1.8,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Self-drive
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>

                    <Stack spacing={0.6}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Notes for this rental
                      </Typography>
                      <TextField
                        placeholder="Flight details, hotel name, special requirements, etc."
                        multiline
                        minRows={3}
                        fullWidth
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        InputProps={{ sx: { borderRadius: 3 } }}
                      />
                    </Stack>
                  </Stack>
                </Grid>

                {/* Branches & schedule */}
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
                        Pickup & drop-off branches
                      </Typography>
                    </Stack>

                    <TextField
                      label="Pickup branch or location"
                      placeholder="e.g. Entebbe Airport, CBD Hub"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={pickupBranch}
                      onChange={(e) => setPickupBranch(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Drop-off branch or location"
                      placeholder="Same as pickup or a different branch"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={dropoffBranch}
                      onChange={(e) => setDropoffBranch(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <Stack spacing={1.2}>
                      <Stack direction="row" spacing={1} alignItems="center">
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
                          Rental period
                        </Typography>
                      </Stack>

                      <Grid container spacing={1.5}>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            label="Start date & time"
                            placeholder="e.g. Today 10:00"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={startDateTime}
                            onChange={(e) => setStartDateTime(e.target.value)}
                            InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                            InputProps={{ sx: { borderRadius: 3 } }}
                          />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6 }}>
                          <TextField
                            label="End date & time"
                            placeholder="e.g. Tomorrow 18:00"
                            variant="outlined"
                            size="small"
                            fullWidth
                            value={endDateTime}
                            onChange={(e) => setEndDateTime(e.target.value)}
                            InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                            InputProps={{ sx: { borderRadius: 3 } }}
                          />
                        </Grid>
                      </Grid>

                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        The dispatch system will later suggest suitable EVs and
                        drivers based on this window and location.
                      </Typography>
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
