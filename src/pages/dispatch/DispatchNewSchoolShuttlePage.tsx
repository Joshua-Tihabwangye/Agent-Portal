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
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import { useNavigate } from "react-router-dom";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Route target: /agent/dispatch/new/school-shuttle
export default function AgentDispatchNewSchoolShuttlePage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [studentName, setStudentName] = useState("");
  const [schoolName, setSchoolName] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [routeName, setRouteName] = useState("");
  const [pickupStop, setPickupStop] = useState("");
  const [dropoffStop, setDropoffStop] = useState("");
  const [termPeriod, setTermPeriod] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianPhone, setGuardianPhone] = useState("");
  const [billingCycle, setBillingCycle] = useState("term");
  const [notes, setNotes] = useState("");

  const isValid =
    studentName.trim().length > 0 &&
    schoolName.trim().length > 0 &&
    routeName.trim().length > 0 &&
    pickupStop.trim().length > 0 &&
    dropoffStop.trim().length > 0 &&
    guardianName.trim().length > 0 &&
    guardianPhone.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    const raw = window.sessionStorage.getItem("evzone_dispatch_draft");
    const base = raw ? JSON.parse(raw) : {};
    window.sessionStorage.setItem(
      "evzone_dispatch_draft",
      JSON.stringify({
        ...base,
        serviceType: "school-shuttle",
        studentName,
        schoolName,
        classGrade,
        routeName,
        pickupStop,
        dropoffStop,
        termPeriod,
        guardianName,
        guardianPhone,
        billingCycle,
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
          current="School Shuttle"
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
              School shuttle seat booking
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Register a student for a school shuttle route. Confirm the
              student profile, route, pickup / drop-off stops and guardian
              contact.
            </Typography>
          </Box>

          <Chip
            label="Step 2 of 3 · Shuttle details"
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
                {/* Student & school */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={1.8}>
                    <Stack direction="row" spacing={1} alignItems="center">
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
                        Student & school
                      </Typography>
                    </Stack>

                    <TextField
                      label="Student name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={studentName}
                      onChange={(e) => setStudentName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="School name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={schoolName}
                      onChange={(e) => setSchoolName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Class / grade"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={classGrade}
                      onChange={(e) => setClassGrade(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <FormControl size="small" fullWidth>
                      <InputLabel sx={{ color: EVZONE_GREY }}>
                        Billing cycle
                      </InputLabel>
                      <Select
                        label="Billing cycle"
                        value={billingCycle}
                        onChange={(e) => setBillingCycle(e.target.value)}
                        sx={{ borderRadius: 3 }}
                      >
                        <MenuItem value="term">Per term</MenuItem>
                        <MenuItem value="monthly">Monthly</MenuItem>
                        <MenuItem value="weekly">Weekly</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      label="Term / period"
                      placeholder="e.g. Term 2, 2025"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={termPeriod}
                      onChange={(e) => setTermPeriod(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />
                  </Stack>
                </Grid>

                {/* Route & guardian */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={1.8}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <DirectionsBusOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Route & stops
                      </Typography>
                    </Stack>

                    <TextField
                      label="Route name"
                      placeholder="e.g. Ntinda – School morning route"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={routeName}
                      onChange={(e) => setRouteName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Pickup stop"
                      placeholder="Estate gate, junction, etc."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={pickupStop}
                      onChange={(e) => setPickupStop(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Drop-off stop"
                      placeholder="Home, main gate, stage..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={dropoffStop}
                      onChange={(e) => setDropoffStop(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

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
                        Guardian contact
                      </Typography>
                    </Stack>

                    <TextField
                      label="Guardian name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={guardianName}
                      onChange={(e) => setGuardianName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Guardian phone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={guardianPhone}
                      onChange={(e) => setGuardianPhone(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{
                        startAdornment: (
                          <PhoneEnabledOutlinedIcon
                            sx={{ fontSize: 18, color: EVZONE_GREY, mr: 1 }}
                          />
                        ),
                        sx: { borderRadius: 3 },
                      }}
                      helperText="Used for shuttle updates and emergencies."
                      FormHelperTextProps={{ sx: { color: EVZONE_GREY } }}
                    />

                    <Stack spacing={0.6}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Additional notes
                      </Typography>
                      <TextField
                        placeholder="Authorized pickup persons, medical notes, etc."
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
                    Continue to seat assignment
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
