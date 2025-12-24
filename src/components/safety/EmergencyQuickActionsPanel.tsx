import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import PhoneEnabledOutlinedIcon from "@mui/icons-material/PhoneEnabledOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import FlagOutlinedIcon from "@mui/icons-material/FlagOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Shared emergency actions panel. In production import and use inside Incident Detail
// or other safety-related pages.

export function EmergencyQuickActionsPanel({
  userName,
  userPhone,
  onCall,
  onNotifySupervisor,
  onFlagAccount,
}) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleCall = () => {
    if (onCall) onCall({ userName, userPhone });
    else console.log("Call user", { userName, userPhone });
  };

  const handleNotifySupervisor = () => {
    if (onNotifySupervisor) onNotifySupervisor();
    else console.log("Notify supervisor about incident");
  };

  const handleFlagAccount = () => {
    if (onFlagAccount) onFlagAccount({ userName });
    else console.log("Flag account for review", { userName });
  };

  return (
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
      <CardContent sx={{ p: 2.2 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          mb={1.5}
        >
          <Stack direction="row" spacing={1} alignItems="center">
            <WarningAmberOutlinedIcon
              sx={{ fontSize: 18, color: "#f97316" }}
            />
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Emergency quick actions
            </Typography>
          </Stack>
          <Chip
            size="small"
            label="Follow protocol"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: "rgba(248,250,252,1)",
              color: EVZONE_GREY,
            }}
          />
        </Stack>

        <Typography
          variant="caption"
          sx={{ color: EVZONE_GREY, display: "block", mb: 1.5 }}
        >
          Use these actions only when appropriate according to your internal
          safety and legal guidelines.
        </Typography>

        <Stack spacing={1.2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={<PhoneEnabledOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={handleCall}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              fontSize: 14,
              fontWeight: 600,
              backgroundColor: EVZONE_GREEN,
              "&:hover": {
                backgroundColor: "#059669",
              },
            }}
          >
            Call {userName}
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <NotificationsActiveOutlinedIcon sx={{ fontSize: 18 }} />
            }
            onClick={handleNotifySupervisor}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              fontSize: 14,
            }}
          >
            Notify supervisor
          </Button>

          <Button
            fullWidth
            variant="outlined"
            startIcon={<FlagOutlinedIcon sx={{ fontSize: 18 }} />}
            onClick={handleFlagAccount}
            sx={{
              borderRadius: 999,
              textTransform: "none",
              fontSize: 14,
              color: "#b91c1c",
              borderColor: "rgba(248,113,113,0.7)",
              "&:hover": {
                borderColor: "#b91c1c",
                backgroundColor: "rgba(254,226,226,0.6)",
              },
            }}
          >
            Flag account for review
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}

// Simple preview wrapper for this canvas only. In production, use
// <EmergencyQuickActionsPanel /> directly inside incident pages.
export default function AgentEmergencyQuickActionsPanelPreview() {
  const [clicks, setClicks] = useState(0);

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-6 flex flex-col items-center justify-center">
      <Box className="w-full max-w-md mb-3">
        <EmergencyQuickActionsPanel
          userName="Kato R."
          userPhone="+256 704 000 111"
          onCall={() => {
            console.log("Calling from preview");
            setClicks((c) => c + 1);
          }}
        />
      </Box>
      <Typography
        variant="caption"
        sx={{ color: EVZONE_GREY }}
      >
        Calls triggered in preview: {clicks}
      </Typography>
    </Box>
  );
}
