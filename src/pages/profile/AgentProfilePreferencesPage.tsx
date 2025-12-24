import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Avatar,
  Divider,
  Switch,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormGroup,
  FormControlLabel,
  IconButton,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PaletteOutlinedIcon from "@mui/icons-material/PaletteOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { useThemeMode, type ThemePreference } from "../../providers/ThemeModeProvider";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// 48. Notification preferences dialog (ticket assignments, SOS alerts, training reminders)
export function NotificationPreferencesDialog({ open, onClose, value, onChange }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleToggle = (key, channel) => {
    const next = {
      ...value,
      [key]: {
        ...value[key],
        [channel]: !value[key][channel],
      },
    };
    if (onChange) onChange(next);
  };

  const handleSave = () => {
    console.log("Save notification preferences", value);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <NotificationsNoneOutlinedIcon sx={{ fontSize: 22, color: EVZONE_GREEN }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              Notification preferences
            </Typography>
          </Stack>
          <IconButton size="small" onClick={onClose}>
            <CloseOutlinedIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent dividers sx={{ pt: 1.5 }}>
        <Typography
          variant="caption"
          sx={{ color: EVZONE_GREY, display: "block", mb: 1.5 }}
        >
          Choose how you want to be notified about key events. In-app
          notifications are always on; here you can control extra channels.
        </Typography>

        <Stack spacing={2.2}>
          {/* Ticket assignments */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: isDark ? "#e5e7eb" : "#111827" }}
            >
              Ticket assignments
            </Typography>
            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
              When a new ticket is assigned to you.
            </Typography>
            <FormGroup row sx={{ mt: 0.5 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={value.ticketAssignments.email}
                    onChange={() => handleToggle("ticketAssignments", "email")}
                    size="small"
                  />
                }
                label="Email"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={value.ticketAssignments.mobilePush}
                    onChange={() => handleToggle("ticketAssignments", "mobilePush")}
                    size="small"
                  />
                }
                label="Mobile push"
              />
            </FormGroup>
          </Box>

          {/* SOS alerts */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: isDark ? "#e5e7eb" : "#111827" }}
            >
              SOS alerts
            </Typography>
            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
              For safety incidents related to your queue.
            </Typography>
            <FormGroup row sx={{ mt: 0.5 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={value.sosAlerts.sms}
                    onChange={() => handleToggle("sosAlerts", "sms")}
                    size="small"
                  />
                }
                label="SMS"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={value.sosAlerts.mobilePush}
                    onChange={() => handleToggle("sosAlerts", "mobilePush")}
                    size="small"
                  />
                }
                label="Mobile push"
              />
            </FormGroup>
          </Box>

          {/* Training reminders */}
          <Box>
            <Typography
              variant="body2"
              sx={{ fontWeight: 600, color: isDark ? "#e5e7eb" : "#111827" }}
            >
              Training reminders
            </Typography>
            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
              When new modules or assessments are due.
            </Typography>
            <FormGroup row sx={{ mt: 0.5 }}>
              <FormControlLabel
                control={
                  <Switch
                    checked={value.trainingReminders.email}
                    onChange={() => handleToggle("trainingReminders", "email")}
                    size="small"
                  />
                }
                label="Email"
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={value.trainingReminders.mobilePush}
                    onChange={() => handleToggle("trainingReminders", "mobilePush")}
                    size="small"
                  />
                }
                label="Mobile push"
              />
            </FormGroup>
          </Box>
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 2.5, py: 1.5 }}>
        <Button
          size="small"
          onClick={onClose}
          sx={{ textTransform: "none", fontSize: 13 }}
        >
          Cancel
        </Button>
        <Button
          size="small"
          variant="contained"
          onClick={handleSave}
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: EVZONE_GREEN,
            "&:hover": { backgroundColor: "#059669" },
          }}
        >
          Save changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// 46 + 47. /agent/profile – Agent profile & preferences
export function AgentProfilePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { preference: themeMode, setPreference } = useThemeMode();
  const [language, setLanguage] = useState("en");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [notificationPrefs, setNotificationPrefs] = useState({
    ticketAssignments: { email: true, mobilePush: true },
    sosAlerts: { sms: true, mobilePush: true },
    trainingReminders: { email: true, mobilePush: false },
  });

  const handleThemeModeChange = (mode: ThemePreference) => {
    setPreference(mode);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const handleNotificationClick = () => {
    setDialogOpen(true);
  };

  const handleNotificationPrefsChange = (next) => {
    setNotificationPrefs(next);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleSaveProfile = () => {
    console.log("Save profile preferences", {
      themeMode,
      language,
      notificationPrefs,
    });
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-3xl mx-auto">
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box className="flex items-center gap-2">
            <Avatar
              sx={{
                width: 40,
                height: 40,
                backgroundColor: "rgba(3,205,140,0.16)",
                color: "#047857",
              }}
            >
              <AccountCircleOutlinedIcon />
            </Avatar>
            <Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}
              >
                My profile
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: EVZONE_GREY }}
              >
                Manage your theme, notifications and language preferences.
              </Typography>
            </Box>
          </Box>

          <Chip
            label={themeMode === "dark" ? "Dark mode" : themeMode === "light" ? "Light mode" : "System theme"}
            size="small"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: isDark ? "rgba(15,23,42,0.9)" : "rgba(219,234,254,0.9)",
              border: "1px solid rgba(148,163,184,0.4)",
              color: isDark ? "#e5e7eb" : "#1e3a8a",
              fontWeight: 600,
            }}
          />
        </Box>

        <Stack spacing={2.4}>
          {/* Theme & EVzone colors */}
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
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="flex-start"
                spacing={2}
              >
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                    <PaletteOutlinedIcon
                      sx={{ fontSize: 20, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Theme &amp; colors
                    </Typography>
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
                  >
                    Switch between light and dark mode. EVzone green and
                    orange remain consistent across MUI and Tailwind.
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <Button
                      size="small"
                      variant={themeMode === "light" ? "contained" : "outlined"}
                      onClick={() => handleThemeModeChange("light")}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 600,
                        backgroundColor:
                          themeMode === "light" ? EVZONE_GREEN : "transparent",
                        color:
                          themeMode === "light"
                            ? "#020617"
                            : isDark
                            ? "#e5e7eb"
                            : "#111827",
                        borderColor:
                          themeMode === "light"
                            ? EVZONE_GREEN
                            : "rgba(148,163,184,0.7)",
                      }}
                    >
                      Light
                    </Button>
                    <Button
                      size="small"
                      variant={themeMode === "dark" ? "contained" : "outlined"}
                      onClick={() => handleThemeModeChange("dark")}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 600,
                        backgroundColor:
                          themeMode === "dark" ? "#0f172a" : "transparent",
                        color:
                          themeMode === "dark"
                            ? "#e5e7eb"
                            : isDark
                            ? "#e5e7eb"
                            : "#111827",
                        borderColor:
                          themeMode === "dark"
                            ? "rgba(30,64,175,0.8)"
                            : "rgba(148,163,184,0.7)",
                      }}
                    >
                      Dark
                    </Button>
                    <Button
                      size="small"
                      variant={themeMode === "system" ? "contained" : "outlined"}
                      onClick={() => handleThemeModeChange("system")}
                      sx={{
                        borderRadius: 999,
                        textTransform: "none",
                        fontSize: 13,
                        fontWeight: 600,
                        backgroundColor:
                          themeMode === "system"
                            ? "rgba(15,23,42,0.06)"
                            : "transparent",
                        color:
                          themeMode === "system"
                            ? isDark
                              ? "#e5e7eb"
                              : "#111827"
                            : isDark
                            ? "#e5e7eb"
                            : "#111827",
                        borderColor:
                          themeMode === "system"
                            ? "rgba(148,163,184,0.9)"
                            : "rgba(148,163,184,0.7)",
                      }}
                    >
                      System
                    </Button>
                  </Stack>
                </Box>

                {/* EVzone color swatches */}
                <Box className="flex flex-col gap-2">
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, mb: 0.5 }}
                  >
                    EVzone colors
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Box
                      className="rounded-xl flex-1 h-10"
                      sx={{ backgroundColor: EVZONE_GREEN }}
                    />
                    <Box
                      className="rounded-xl flex-1 h-10"
                      sx={{ backgroundColor: EVZONE_ORANGE }}
                    />
                    <Box
                      className="rounded-xl flex-1 h-10 bg-slate-900 dark:bg-slate-100"
                    />
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY }}
                  >
                    Tailwind classes (bg-slate-50/950) and MUI sx use the
                    same theme context.
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Language & notifications */}
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
              <Stack spacing={2}>
                {/* Language */}
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                    <LanguageOutlinedIcon
                      sx={{ fontSize: 20, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Language
                    </Typography>
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
                  >
                    Choose the language used in your Agent workspace.
                  </Typography>
                  <FormControl size="small" sx={{ minWidth: 180 }}>
                    <InputLabel id="agent-language-label">Language</InputLabel>
                    <Select
                      labelId="agent-language-label"
                      value={language}
                      label="Language"
                      onChange={handleLanguageChange}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="fr">French</MenuItem>
                      <MenuItem value="pt">Portuguese</MenuItem>
                      <MenuItem value="sw">Swahili</MenuItem>
                    </Select>
                  </FormControl>
                </Box>

                <Divider />

                {/* Notifications summary */}
                <Box>
                  <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
                    <NotificationsNoneOutlinedIcon
                      sx={{ fontSize: 20, color: EVZONE_GREEN }}
                    />
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                      }}
                    >
                      Notifications
                    </Typography>
                  </Stack>
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
                  >
                    In-app alerts are always on. Use preferences to control
                    SMS, email and mobile push.
                  </Typography>

                  <Stack direction="row" spacing={1} alignItems="center">
                    <Chip
                      size="small"
                      label="Ticket assignments"
                      sx={{
                        borderRadius: 999,
                        fontSize: 10,
                        textTransform: "none",
                        backgroundColor: "rgba(248,250,252,1)",
                        color: EVZONE_GREY,
                      }}
                    />
                    <Chip
                      size="small"
                      label="SOS alerts"
                      sx={{
                        borderRadius: 999,
                        fontSize: 10,
                        textTransform: "none",
                        backgroundColor: "rgba(248,250,252,1)",
                        color: EVZONE_GREY,
                      }}
                    />
                    <Chip
                      size="small"
                      label="Training reminders"
                      sx={{
                        borderRadius: 999,
                        fontSize: 10,
                        textTransform: "none",
                        backgroundColor: "rgba(248,250,252,1)",
                        color: EVZONE_GREY,
                      }}
                    />
                  </Stack>

                  <Button
                    size="small"
                    variant="outlined"
                    onClick={handleNotificationClick}
                    sx={{
                      mt: 1.5,
                      borderRadius: 999,
                      textTransform: "none",
                      fontSize: 13,
                    }}
                  >
                    Open notification preferences
                  </Button>
                </Box>

                <Divider />

                {/* Save all */}
                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                  <Button
                    size="small"
                    onClick={() => {
                      setPreference("system");
                      setLanguage("en");
                      setNotificationPrefs({
                        ticketAssignments: { email: true, mobilePush: true },
                        sosAlerts: { sms: true, mobilePush: true },
                        trainingReminders: { email: true, mobilePush: false },
                      });
                    }}
                    sx={{ textTransform: "none", fontSize: 13 }}
                  >
                    Reset to defaults
                  </Button>
                  <Button
                    size="small"
                    variant="contained"
                    onClick={handleSaveProfile}
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      fontSize: 13,
                      fontWeight: 600,
                      backgroundColor: EVZONE_GREEN,
                      "&:hover": { backgroundColor: "#059669" },
                    }}
                  >
                    Save preferences
                  </Button>
                </Stack>
              </Stack>
            </CardContent>
          </Card>
        </Stack>
      </Box>

      <NotificationPreferencesDialog
        open={dialogOpen}
        onClose={handleDialogClose}
        value={notificationPrefs}
        onChange={handleNotificationPrefsChange}
      />
    </Box>
  );
}

export default AgentProfilePage;

// Preview wrapper (kept for reference)
export function AgentProfilePreview() {

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="max-w-4xl mx-auto">
        <AgentProfilePage />
      </Box>
    </Box>
  );
}

// Suggested tests (pseudo-code for a separate test file):
// - Render AgentProfilePage and assert that theme buttons toggle themeMode state.
// - Open NotificationPreferencesDialog via the "Open notification preferences" button and toggle switches; assert onChange receives updated structure.
// - Click "Save preferences" and verify that the correct payload (themeMode, language, notificationPrefs) is logged or passed to a handler.
// - Ensure that "Reset to defaults" resets themeMode, language and notificationPrefs to their initial values.
