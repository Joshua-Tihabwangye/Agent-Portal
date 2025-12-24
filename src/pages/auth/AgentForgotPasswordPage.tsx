import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Link,
  Stack,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#a6a6a6";

export default function AgentForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const isValid = email.trim().length > 0;

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!isValid) return;
    // TODO: wire to real password reset endpoint
    console.log("Password reset requested", { email });
    setSubmitted(true);
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
              ? "linear-gradient(150deg, #020617 0%, #020617 40%, #0f172a 100%)"
              : "#ffffff",
            color: isDark ? "white" : "#0f172a",
          }}
        >
          <CardContent className="p-6 sm:p-8">
            <Box className="flex items-center justify-between mb-6">
              <Box className="flex items-center gap-2">
                <Box
                  className="flex items-center justify-center rounded-xl"
                  sx={{
                    width: 38,
                    height: 38,
                    background: EVZONE_GREEN,
                    color: "#020617",
                    fontWeight: 800,
                    letterSpacing: 1,
                    fontSize: 14,
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
                    EVzone Agent Portal
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{
                      color: isDark ? "#e5e7eb" : "#4b5563",
                      lineHeight: 1.1,
                    }}
                  >
                    Password recovery
                  </Typography>
                </Box>
              </Box>

              <Link
                href="/agent/login"
                underline="hover"
                sx={{ color: EVZONE_ORANGE, fontSize: 12, fontWeight: 600 }}
              >
                Back to login
              </Link>
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
                <MailOutlineIcon sx={{ color: EVZONE_GREEN }} />
              </Box>
              <Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, letterSpacing: 0.2 }}
                >
                  Forgot your password?
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: EVZONE_GREY, mt: 0.5 }}
                >
                  Enter the work email you use for the Agent Portal. We&apos;ll
                  send a secure reset link.
                </Typography>
              </Box>
            </Stack>

            <Box
              component="form"
              onSubmit={handleSubmit}
              autoComplete="off"
              noValidate
            >
              <Stack spacing={2.4} mt={2}>
                <TextField
                  label="Work Email"
                  type="email"
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputLabelProps={{ sx: { color: EVZONE_GREY } }}
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
                  helperText={
                    submitted
                      ? "If this email is registered, a reset link has been sent."
                      : "Make sure this matches the email your supervisor used for your account."
                  }
                  FormHelperTextProps={{
                    sx: {
                      color: submitted ? EVZONE_GREEN : EVZONE_GREY,
                    },
                  }}
                />

                <Button
                  type="submit"
                  disabled={!isValid}
                  fullWidth
                  sx={{
                    mt: 0.5,
                    py: 1.3,
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
                  Send reset link
                </Button>

                <Box className="mt-2">
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, display: "block", mb: 0.5 }}
                  >
                    Can&apos;t access your email?
                  </Typography>
                  <Typography
                    variant="caption"
                    sx={{ color: isDark ? "#e5e7eb" : "#4b5563" }}
                  >
                    Contact your&nbsp;
                    <span className="text-emerald-500 font-semibold">
                      supervisor or platform admin
                    </span>
                    &nbsp;to update your contact details.
                  </Typography>
                </Box>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
