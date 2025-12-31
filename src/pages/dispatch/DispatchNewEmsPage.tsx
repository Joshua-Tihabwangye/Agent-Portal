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
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Route target: /agent/dispatch/new/ems
export default function AgentDispatchNewEMSPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [callerName, setCallerName] = useState("");
  const [callerPhone, setCallerPhone] = useState("");
  const [patientName, setPatientName] = useState("");
  const [incidentType, setIncidentType] = useState("accident");
  const [priority, setPriority] = useState("high");
  const [pickupLocation, setPickupLocation] = useState("");
  const [destinationFacility, setDestinationFacility] = useState("");
  const [notes, setNotes] = useState("");

  const isValid =
    callerName.trim().length > 0 &&
    callerPhone.trim().length > 0 &&
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
        serviceType: "ems",
        callerName,
        callerPhone,
        patientName,
        incidentType,
        priority,
        pickupLocation,
        destinationFacility,
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
          current="Ambulance / EMS"
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
              EMS / Ambulance request
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Capture time-critical details for an emergency request. Keep the
              caller on the line if possible while you confirm the location
              and nearest suitable ambulance.
            </Typography>
          </Box>

          <Chip
            label="Step 2 of 3 · EMS details"
            size="small"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: isDark
                ? "rgba(15,23,42,0.9)"
                : "rgba(254,242,242,0.9)",
              border: "1px solid rgba(248,113,113,0.6)",
              color: isDark ? "#fecaca" : "#b91c1c",
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
                {/* Caller & patient */}
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
                        Caller & patient
                      </Typography>
                    </Stack>

                    <TextField
                      label="Caller name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={callerName}
                      onChange={(e) => setCallerName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Caller phone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={callerPhone}
                      onChange={(e) => setCallerPhone(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{
                        startAdornment: (
                          <PhoneEnabledOutlinedIcon
                            sx={{ fontSize: 18, color: EVZONE_GREY, mr: 1 }}
                          />
                        ),
                        sx: { borderRadius: 3 },
                      }}
                      helperText="If call is on a landline, capture an alternate mobile if possible."
                      FormHelperTextProps={{ sx: { color: EVZONE_GREY } }}
                    />

                    <TextField
                      label="Patient name (optional)"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <Stack spacing={0.8}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Incident type
                      </Typography>
                      <ToggleButtonGroup
                        value={incidentType}
                        exclusive
                        onChange={(_, value) => value && setIncidentType(value)}
                        size="small"
                        sx={{
                          backgroundColor: isDark
                            ? "rgba(15,23,42,0.8)"
                            : "rgba(248,250,252,1)",
                          borderRadius: 999,
                          p: 0.3,
                          flexWrap: "wrap",
                        }}
                      >
                        <ToggleButton
                          value="accident"
                          sx={{
                            borderRadius: 999,
                            px: 1.4,
                            textTransform: "none",
                            fontSize: 11,
                          }}
                        >
                          Accident
                        </ToggleButton>
                        <ToggleButton
                          value="medical"
                          sx={{
                            borderRadius: 999,
                            px: 1.4,
                            textTransform: "none",
                            fontSize: 11,
                          }}
                        >
                          Medical emergency
                        </ToggleButton>
                        <ToggleButton
                          value="maternity"
                          sx={{
                            borderRadius: 999,
                            px: 1.4,
                            textTransform: "none",
                            fontSize: 11,
                          }}
                        >
                          Maternity
                        </ToggleButton>
                        <ToggleButton
                          value="transfer"
                          sx={{
                            borderRadius: 999,
                            px: 1.4,
                            textTransform: "none",
                            fontSize: 11,
                          }}
                        >
                          Hospital transfer
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>

                    <Stack spacing={0.8}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Priority
                      </Typography>
                      <ToggleButtonGroup
                        value={priority}
                        exclusive
                        onChange={(_, value) => value && setPriority(value)}
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
                          value="high"
                          sx={{
                            borderRadius: 999,
                            px: 1.6,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          High
                        </ToggleButton>
                        <ToggleButton
                          value="medium"
                          sx={{
                            borderRadius: 999,
                            px: 1.6,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Medium
                        </ToggleButton>
                        <ToggleButton
                          value="low"
                          sx={{
                            borderRadius: 999,
                            px: 1.6,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Low
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>
                  </Stack>
                </Grid>

                {/* Location & hospital */}
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
                        Location & destination
                      </Typography>
                    </Stack>

                    <TextField
                      label="Pickup location"
                      placeholder="Exact address, landmark or map description"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Preferred destination facility (optional)"
                      placeholder="Nearest hospital / clinic if caller knows it"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={destinationFacility}
                      onChange={(e) => setDestinationFacility(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <Stack spacing={0.6}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Brief description
                      </Typography>
                      <TextField
                        placeholder="Conscious / unconscious, breathing, visible bleeding, known conditions, etc."
                        multiline
                        minRows={4}
                        fullWidth
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        InputProps={{ sx: { borderRadius: 3 } }}
                      />
                    </Stack>

                    <Stack direction="row" spacing={1} alignItems="flex-start">
                      <LocalHospitalOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN, mt: 0.2 }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        For severe cases, follow your emergency protocol and
                        local regulations. This form helps dispatch the
                        nearest available ambulance and keep a record of the
                        call.
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
                    Continue to ambulance assignment
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
