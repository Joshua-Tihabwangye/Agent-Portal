import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  FormControlLabel,
  Checkbox,
  Stack,
  Divider,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../providers/AuthProvider";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#a6a6a6";

export default function AgentLoginPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, trainingGateComplete } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(true);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const isValid = email.trim().length > 0 && password.trim().length > 0;

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!isValid) return;
    await login(email, password);

    const from = (location.state as any)?.from?.pathname as string | undefined;
    if (!trainingGateComplete) {
      navigate("/agent/welcome", { replace: true });
      return;
    }
    navigate(from || "/agent/dashboard", { replace: true });
  };

  return (
    <Box className="min-h-screen w-full flex items-center justify-center px-4 py-6 bg-slate-50 dark:bg-slate-950">
      <Box className="w-full max-w-md">
        <Card
          elevation={8}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: isDark
              ? "linear-gradient(145deg, #0f172a 0%, #020617 40%, #020617 100%)"
              : "#ffffff",
            color: isDark ? "white" : "#0f172a",
          }}
        >
          <CardContent className="p-6 sm:p-8">
            {/* EVzone Agent brand strip */}
            <Box className="flex items-center justify-between mb-6">
              <Box className="flex items-center gap-2">
                <Box
                  className="flex items-center justify-center rounded-xl"
                  sx={{
                    width: 40,
                    height: 40,
                    background: EVZONE_GREEN,
                    color: "#020617",
                    fontWeight: 800,
                    letterSpacing: 1,
                  }}
                >
                  EV
                </Box>
                <Box>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: EVZONE_GREY,
                      lineHeight: 1.1,
                    }}
                  >
                    EVzone
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                      lineHeight: 1.1,
                    }}
                  >
                    Agent Portal
                  </Typography>
                </Box>
              </Box>

              <Box
                className="hidden sm:flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] tracking-wide"
                sx={{
                  backgroundColor: isDark
                    ? "rgba(15,118,110,0.15)"
                    : "rgba(56,189,248,0.12)",
                  border: "1px solid " + EVZONE_GREEN + "33",
                  color: EVZONE_GREEN,
                  fontWeight: 600,
                  textTransform: "uppercase",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Secure Access
              </Box>
            </Box>

            <Stack direction="row" spacing={1.5} alignItems="center" mb={2}>
              <Box
                className="flex items-center justify-center rounded-2xl"
                sx={{
                  width: 44,
                  height: 44,
                  background: isDark
                    ? "rgba(15,23,42,0.9)"
                    : "rgba(226,232,240,0.75)",
                  border: "1px solid " + EVZONE_GREEN + "55",
                }}
              >
                <LockOutlinedIcon sx={{ color: EVZONE_GREEN }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, letterSpacing: 0.2 }}
                >
                  Sign in as Agent
                </Typography>
                <Typography
                  variant="body2"
                  sx={{
                    color: EVZONE_GREY,
                    mt: 0.5,
                  }}
                >
                  Use your EVzone internal credentials to access the Agent tools.
                </Typography>
              </Box>
            </Stack>

            <Box
              component="form"
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
            >
              <Stack spacing={2.2} mt={2}>
                <TextField
                  label="Work Email or Username"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={{
                    sx: { color: EVZONE_GREY },
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: 3,
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(248,250,252,0.9)",
                      color: isDark ? "#e5e7eb" : "#0f172a",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(148,163,184,0.5)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: EVZONE_GREEN,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: EVZONE_GREEN,
                      },
                    },
                  }}
                />

                <TextField
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputLabelProps={{
                    sx: { color: EVZONE_GREY },
                  }}
                  InputProps={{
                    sx: {
                      borderRadius: 3,
                      backgroundColor: isDark
                        ? "rgba(15,23,42,0.9)"
                        : "rgba(248,250,252,0.9)",
                      color: isDark ? "#e5e7eb" : "#0f172a",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(148,163,184,0.5)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: EVZONE_GREEN,
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: EVZONE_GREEN,
                      },
                    },
                  }}
                />

                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  spacing={1}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        size="small"
                        checked={rememberMe}
                        onChange={(e) => setRememberMe(e.target.checked)}
                        sx={{
                          color: EVZONE_GREY,
                          "&.Mui-checked": { color: EVZONE_GREEN },
                        }}
                      />
                    }
                    label={
                      <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                        Keep me signed in on this device
                      </Typography>
                    }
                  />

                  <Link
                    href="/agent/forgot-password"
                    underline="hover"
                    sx={{
                      color: EVZONE_ORANGE,
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    Forgot password?
                  </Link>
                </Stack>

                <Button
                  type="submit"
                  disabled={!isValid}
                  fullWidth
                  sx={{
                    mt: 1,
                    py: 1.4,
                    borderRadius: 999,
                    textTransform: "none",
                    fontWeight: 700,
                    letterSpacing: 0.4,
                    fontSize: 15,
                    backgroundImage: isValid
                      ? "linear-gradient(135deg, " +
                        EVZONE_GREEN +
                        ", " +
                        EVZONE_ORANGE +
                        ")"
                      : "linear-gradient(135deg, #e5e7eb, #cbd5f5)",
                    color: "#020617",
                    boxShadow: isValid
                      ? "0 10px 25px rgba(3,205,140,0.45)"
                      : "0 0 0 rgba(0,0,0,0)",
                    "&:hover": {
                      backgroundImage: isValid
                        ? "linear-gradient(135deg, " +
                          EVZONE_ORANGE +
                          ", " +
                          EVZONE_GREEN +
                          ")"
                        : "linear-gradient(135deg, #e5e7eb, #cbd5f5)",
                      boxShadow: isValid
                        ? "0 18px 35px rgba(3,205,140,0.55)"
                        : "none",
                    },
                  }}
                >
                  Sign in
                </Button>
              </Stack>
            </Box>

            <Divider
              sx={{
                my: 3,
                borderColor: isDark
                  ? "rgba(148,163,184,0.35)"
                  : "rgba(148,163,184,0.2)",
              }}
            >
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREY, textTransform: "uppercase" }}
              >
                Internal access only
              </Typography>
            </Divider>

            <Box className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-between items-start sm:items-center">
              <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                New to the Agent team? 
                <span className="text-emerald-500 font-semibold">
                  Contact your supervisor to create an account.
                </span>
              </Typography>

              <Box className="flex flex-row gap-2 items-center">
                <Box className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                  EV-first dispatch, support &amp; safety
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
