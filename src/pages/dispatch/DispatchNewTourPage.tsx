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
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import { useNavigate } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Route target: /agent/dispatch/new/tour
export default function AgentDispatchNewTourPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [contactName, setContactName] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [groupSize, setGroupSize] = useState("1-4");
  const [tourPackage, setTourPackage] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [pickupLocation, setPickupLocation] = useState("");
  const [tourType, setTourType] = useState("private");
  const [notes, setNotes] = useState("");

  const isValid =
    contactName.trim().length > 0 &&
    contactPhone.trim().length > 0 &&
    tourPackage.trim().length > 0 &&
    startDate.trim().length > 0 &&
    endDate.trim().length > 0 &&
    pickupLocation.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    const raw = window.sessionStorage.getItem("evzone_dispatch_draft");
    const base = raw ? JSON.parse(raw) : {};
    window.sessionStorage.setItem(
      "evzone_dispatch_draft",
      JSON.stringify({
        ...base,
        serviceType: "tour",
        contactName,
        contactPhone,
        groupSize,
        tourPackage,
        startDate,
        endDate,
        pickupLocation,
        tourType,
        notes,
      })
    );
    navigate("/agent/dispatch/new/assign");
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-3xl mx-auto">
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
              Tour booking
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Capture details for a tour package: contact person, dates,
              pickup and group size. Agents can flag whether this is a private
              or corporate group.
            </Typography>
          </Box>

          <Chip
            label="Step 2 of 3 · Tour details"
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
                {/* Contact & group */}
                <Grid size={{ xs: 12, md: 5 }}>
                  <Stack spacing={1.8}>
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
                        Contact & group
                      </Typography>
                    </Stack>

                    <TextField
                      label="Contact name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Contact phone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={contactPhone}
                      onChange={(e) => setContactPhone(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{
                        startAdornment: (
                          <PhoneEnabledOutlinedIcon
                            sx={{ fontSize: 18, color: EVZONE_GREY, mr: 1 }}
                          />
                        ),
                        sx: { borderRadius: 3 },
                      }}
                      helperText="Include country code, e.g. +256 700 ..."
                      FormHelperTextProps={{ sx: { color: EVZONE_GREY } }}
                    />

                    <FormControl size="small" fullWidth>
                      <InputLabel sx={{ color: EVZONE_GREY }}>
                        Group size
                      </InputLabel>
                      <Select
                        label="Group size"
                        value={groupSize}
                        onChange={(e) => setGroupSize(e.target.value)}
                        sx={{ borderRadius: 3 }}
                      >
                        <MenuItem value="1-4">1 – 4 people</MenuItem>
                        <MenuItem value="5-8">5 – 8 people</MenuItem>
                        <MenuItem value="9-15">9 – 15 people</MenuItem>
                        <MenuItem value="16+">16+ people</MenuItem>
                      </Select>
                    </FormControl>

                    <Stack spacing={0.6}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Tour type
                      </Typography>
                      <ToggleButtonGroup
                        value={tourType}
                        exclusive
                        onChange={(_, value) => value && setTourType(value)}
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
                          value="private"
                          sx={{
                            borderRadius: 999,
                            px: 1.8,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Private
                        </ToggleButton>
                        <ToggleButton
                          value="corporate"
                          sx={{
                            borderRadius: 999,
                            px: 1.8,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Corporate / group
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>

                    <Stack spacing={0.6}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Additional notes
                      </Typography>
                      <TextField
                        placeholder="Language preferences, accessibility needs, hotel info, etc."
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

                {/* Package, dates & pickup */}
                <Grid size={{ xs: 12, md: 7 }}>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <TourOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Tour package & dates
                      </Typography>
                    </Stack>

                    <TextField
                      label="Tour package"
                      placeholder="e.g. Kampala city tour, Jinja Nile day trip"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={tourPackage}
                      onChange={(e) => setTourPackage(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <Grid container spacing={1.5}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="Start date"
                          placeholder="e.g. 12 Aug 2025"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={startDate}
                          onChange={(e) => setStartDate(e.target.value)}
                          InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                          InputProps={{ sx: { borderRadius: 3 } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                          label="End date"
                          placeholder="e.g. 14 Aug 2025"
                          variant="outlined"
                          size="small"
                          fullWidth
                          value={endDate}
                          onChange={(e) => setEndDate(e.target.value)}
                          InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                          InputProps={{ sx: { borderRadius: 3 } }}
                        />
                      </Grid>
                    </Grid>

                    <Stack direction="row" spacing={1} alignItems="center">
                      <PlaceOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Pickup location
                      </Typography>
                    </Stack>

                    <TextField
                      label="Pickup location"
                      placeholder="Hotel, airport, office..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <Stack direction="row" spacing={1} alignItems="center">
                      <AccessTimeOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Exact times, vehicle assignment and guide details can
                        be confirmed in the next step.
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
                    Continue to itinerary
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
