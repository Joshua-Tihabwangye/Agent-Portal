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
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import { useNavigate } from "react-router-dom";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Route target: /agent/dispatch/new/delivery
export default function AgentDispatchNewDeliveryPage() {
  const navigate = useNavigate();
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [senderName, setSenderName] = useState("");
  const [senderPhone, setSenderPhone] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientPhone, setRecipientPhone] = useState("");
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [parcelSize, setParcelSize] = useState("S");
  const [parcelDescription, setParcelDescription] = useState("");
  const [instructions, setInstructions] = useState("");

  const isValid =
    senderName.trim().length > 0 &&
    senderPhone.trim().length > 0 &&
    recipientName.trim().length > 0 &&
    recipientPhone.trim().length > 0 &&
    pickup.trim().length > 0 &&
    dropoff.trim().length > 0 &&
    parcelDescription.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    const raw = window.sessionStorage.getItem("evzone_dispatch_draft");
    const base = raw ? JSON.parse(raw) : {};
    window.sessionStorage.setItem(
      "evzone_dispatch_draft",
      JSON.stringify({
        ...base,
        serviceType: "delivery",
        senderName,
        senderPhone,
        recipientName,
        recipientPhone,
        pickup,
        dropoff,
        parcelSize,
        parcelDescription,
        instructions,
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
              New delivery booking
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Create a parcel delivery between two points. Capture clear
              sender and recipient details so SMS and WhatsApp updates work
              correctly.
            </Typography>
          </Box>

          <Chip
            label="Step 2 of 3 · Delivery details"
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
                {/* Sender & recipient */}
                <Grid size={{ xs: 12, md: 6 }}>
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
                        Sender details
                      </Typography>
                    </Stack>

                    <TextField
                      label="Sender name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Sender phone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={senderPhone}
                      onChange={(e) => setSenderPhone(e.target.value)}
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

                    <Divider sx={{ my: 1 }} />

                    <Stack direction="row" spacing={1} alignItems="center">
                      <PersonOutlineOutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_ORANGE }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Recipient details
                      </Typography>
                    </Stack>

                    <TextField
                      label="Recipient name"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Recipient phone"
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={recipientPhone}
                      onChange={(e) => setRecipientPhone(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{
                        startAdornment: (
                          <PhoneEnabledOutlinedIcon
                            sx={{ fontSize: 18, color: EVZONE_GREY, mr: 1 }}
                          />
                        ),
                        sx: { borderRadius: 3 },
                      }}
                      helperText="Used for delivery updates and contact."
                      FormHelperTextProps={{ sx: { color: EVZONE_GREY } }}
                    />
                  </Stack>
                </Grid>

                {/* Locations & parcel */}
                <Grid size={{ xs: 12, md: 6 }}>
                  <Stack spacing={1.8}>
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
                      placeholder="Shop, office, landmark..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={pickup}
                      onChange={(e) => setPickup(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Drop-off location"
                      placeholder="Home, hostel, office..."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={dropoff}
                      onChange={(e) => setDropoff(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <Stack direction="row" spacing={1} alignItems="center">
                      <Inventory2OutlinedIcon
                        sx={{ fontSize: 18, color: EVZONE_GREEN }}
                      />
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Parcel details
                      </Typography>
                    </Stack>

                    <Stack spacing={0.8}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Size / category
                      </Typography>
                      <ToggleButtonGroup
                        value={parcelSize}
                        exclusive
                        onChange={(_, value) =>
                          value && setParcelSize(value)
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
                        <ToggleButton
                          value="S"
                          sx={{
                            borderRadius: 999,
                            px: 1.8,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Small
                        </ToggleButton>
                        <ToggleButton
                          value="M"
                          sx={{
                            borderRadius: 999,
                            px: 1.8,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Medium
                        </ToggleButton>
                        <ToggleButton
                          value="L"
                          sx={{
                            borderRadius: 999,
                            px: 1.8,
                            textTransform: "none",
                            fontSize: 12,
                          }}
                        >
                          Large
                        </ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>

                    <TextField
                      label="What is being delivered?"
                      placeholder="Food, documents, electronics, etc."
                      variant="outlined"
                      size="small"
                      fullWidth
                      value={parcelDescription}
                      onChange={(e) =>
                        setParcelDescription(e.target.value)
                      }
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />

                    <TextField
                      label="Delivery instructions"
                      placeholder="Gate codes, floor numbers, leave at reception, etc."
                      variant="outlined"
                      size="small"
                      fullWidth
                      multiline
                      minRows={3}
                      value={instructions}
                      onChange={(e) => setInstructions(e.target.value)}
                      InputLabelProps={{ sx: { color: EVZONE_GREY } }}
                      InputProps={{ sx: { borderRadius: 3 } }}
                    />
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
