import React, { useEffect, useMemo, useState } from "react";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  InputAdornment,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SearchIcon from "@mui/icons-material/ManageSearch";

import { useAuth } from "../providers/AuthProvider";
import { useThemeMode } from "../providers/ThemeModeProvider";
import { AgentGlobalStatusBanner } from "../components/system/GlobalStatusBanner";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";

const drawerWidth = 280;

type NavItem = {
  key: string;
  label: string;
  href: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
};

const navItems: NavItem[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlinedIcon fontSize="small" />,
    href: "/agent/dashboard",
  },
  {
    key: "live-ops",
    label: "Live Ops & Map",
    icon: <MapOutlinedIcon fontSize="small" />,
    href: "/agent/live-ops",
  },
  {
    key: "dispatch",
    label: "Manual Dispatch",
    icon: <LocalShippingOutlinedIcon fontSize="small" />,
    href: "/agent/dispatch/board",
  },
  {
    key: "onboarding",
    label: "Driver Onboarding",
    icon: <AssignmentIndOutlinedIcon fontSize="small" />,
    href: "/agent/onboarding/drivers",
  },
  {
    key: "support",
    label: "Support & Tickets",
    icon: <SupportAgentOutlinedIcon fontSize="small" />,
    href: "/agent/support/tickets",
  },
  {
    key: "safety",
    label: "Safety & Incidents",
    icon: <ReportProblemOutlinedIcon fontSize="small" />,
    href: "/agent/safety/sos",
  },
  {
    key: "training",
    label: "Training & QA",
    icon: <SchoolOutlinedIcon fontSize="small" />,
    href: "/agent/training",
  },
  {
    key: "search",
    label: "Search & Tools",
    icon: <SearchIcon fontSize="small" />,
    href: "/agent/search",
  },
  {
    key: "settings",
    label: "Settings",
    icon: <SettingsOutlinedIcon fontSize="small" />,
    href: "/agent/settings/teams",
  },
];

function pickActiveKey(pathname: string): string {
  if (pathname.startsWith("/agent/live-ops")) return "live-ops";
  if (pathname.startsWith("/agent/dispatch")) return "dispatch";
  if (pathname.startsWith("/agent/onboarding")) return "onboarding";
  if (pathname.startsWith("/agent/support")) return "support";
  if (pathname.startsWith("/agent/safety")) return "safety";
  if (pathname.startsWith("/agent/training") || pathname.startsWith("/agent/qa")) return "training";
  if (pathname.startsWith("/agent/search")) return "search";
  if (pathname.startsWith("/agent/settings") || pathname.startsWith("/agent/profile")) return "settings";
  return "dashboard";
}

export default function AgentAppShell() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { toggle } = useThemeMode();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [query, setQuery] = useState("");

  const activeKey = useMemo(() => pickActiveKey(location.pathname), [location.pathname]);

  // Offline / basic network status
  const [online, setOnline] = useState<boolean>(() => (typeof navigator !== "undefined" ? navigator.onLine : true));
  useEffect(() => {
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);
    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  const handleDrawerToggle = () => setMobileOpen((v) => !v);

  const handleNavClick = (item: NavItem) => {
    navigate(item.href);
    setMobileOpen(false);
  };

  const initials = (user?.name || "Agent")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join("");

  const drawerContent = (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", px: 2, py: 2.5 }}>
      {/* Brand */}
      <Box className="flex items-center justify-between mb-4">
        <Box className="flex items-center gap-2">
          <Box
            className="flex items-center justify-center rounded-2xl"
            sx={{
              width: 40,
              height: 40,
              backgroundColor: EVZONE_GREEN,
              color: "#020617",
              fontWeight: 800,
              letterSpacing: 0.5,
              fontSize: 18,
            }}
          >
            EV
          </Box>
          <Box>
            <Typography
              variant="subtitle2"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
                lineHeight: 1.1,
              }}
            >
              EVzone
            </Typography>
            <Typography variant="caption" sx={{ color: EVZONE_GREY, lineHeight: 1.1 }}>
              Agent Portal
            </Typography>
          </Box>
        </Box>
      </Box>

      <Divider sx={{ mb: 2.5, borderColor: isDark ? "rgba(148,163,184,0.25)" : "rgba(226,232,240,1)" }} />

      {/* Nav */}
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const active = activeKey === item.key;
          return (
            <ListItemButton
              key={item.key}
              onClick={() => handleNavClick(item)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                backgroundColor: active
                  ? isDark
                    ? "rgba(3,205,140,0.16)"
                    : "rgba(3,205,140,0.10)"
                  : "transparent",
                "&:hover": {
                  backgroundColor: active
                    ? isDark
                      ? "rgba(3,205,140,0.20)"
                      : "rgba(3,205,140,0.14)"
                    : isDark
                      ? "rgba(148,163,184,0.10)"
                      : "rgba(226,232,240,0.70)",
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 34, color: active ? EVZONE_GREEN : EVZONE_GREY }}>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontSize: 13,
                  fontWeight: active ? 700 : 600,
                  color: isDark ? "#e5e7eb" : "#111827",
                }}
              />
            </ListItemButton>
          );
        })}
      </List>

      <Divider sx={{ my: 2, borderColor: isDark ? "rgba(148,163,184,0.25)" : "rgba(226,232,240,1)" }} />

      {/* Footer quick actions */}
      <Box className="flex items-center justify-between">
        <Box className="flex items-center gap-2">
          <Avatar sx={{ width: 28, height: 28, fontSize: 12, fontWeight: 800, bgcolor: "rgba(3,205,140,0.25)", color: EVZONE_GREEN }}>
            {initials || "A"}
          </Avatar>
          <Box>
            <Typography variant="caption" sx={{ color: isDark ? "#e5e7eb" : "#111827", fontWeight: 700, lineHeight: 1.1 }}>
              {user?.email || "agent@evzone"}
            </Typography>
            <Typography variant="caption" sx={{ color: EVZONE_GREY, lineHeight: 1.1, display: "block" }}>
              {user?.role || "support_t1"}
            </Typography>
          </Box>
        </Box>
        <ButtonLogout onLogout={() => { logout(); navigate("/agent/login"); }} />
      </Box>
    </Box>
  );

  return (
    <Box className="min-h-screen w-full bg-slate-50 dark:bg-slate-950" sx={{ display: "flex" }}>
      {/* Mobile drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: isDark ? "#020617" : "#ffffff",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Desktop drawer */}
      <Drawer
        variant="permanent"
        open
        sx={{
          display: { xs: "none", md: "block" },
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            bgcolor: isDark ? "#020617" : "#ffffff",
            borderRight: isDark ? "1px solid rgba(148,163,184,0.25)" : "1px solid rgba(226,232,240,1)",
          },
        }}
      >
        {drawerContent}
      </Drawer>

      {/* Main */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {!online && <AgentGlobalStatusBanner mode="offline" onRetry={() => window.location.reload()} />}

        {/* Header */}
        <Box
          className="ev-gradient text-white shadow-sm"
          sx={{
            px: { xs: 1.5, sm: 3 },
            py: { xs: 1.25, md: 1.5 },
            borderBottom: isDark ? "1px solid rgba(148,163,184,0.18)" : "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(14px)",
          }}
        >
          <Box className="flex items-center gap-2 w-full flex-wrap">
            <IconButton
              onClick={handleDrawerToggle}
              sx={{ display: { xs: "inline-flex", md: "none" } }}
              size="small"
            >
              <MenuRoundedIcon fontSize="small" />
            </IconButton>

            <TextField
              size="small"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search riders, drivers, trips…"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  navigate(`/agent/search?q=${encodeURIComponent(query)}`);
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon sx={{ fontSize: 18, color: isDark ? "#e2e8f0" : "#0f172a" }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 999 },
              }}
              sx={{
                flex: 1,
                minWidth: { xs: "100%", md: 360 },
                maxWidth: 620,
                "& .MuiOutlinedInput-root": {
                  bgcolor: isDark ? "rgba(15,23,42,0.25)" : "rgba(255,255,255,0.25)",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                  "& fieldset": {
                    borderColor: "rgba(255,255,255,0.38)",
                  },
                  "&:hover fieldset": {
                    borderColor: "rgba(255,255,255,0.7)",
                  },
                },
              }}
            />

            <Tooltip title="Notifications">
              <IconButton
                size="small"
                onClick={() => navigate("/agent/safety/sos")}
                sx={{ ml: 0.5, color: "#fff" }}
              >
                <Badge color="secondary" variant="dot" overlap="circular">
                  <NotificationsNoneOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title={isDark ? "Switch to light" : "Switch to dark"}>
              <IconButton size="small" onClick={toggle} sx={{ color: "#fff" }}>
                {isDark ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
              </IconButton>
            </Tooltip>

            <Tooltip title="My profile">
              <IconButton
                size="small"
                onClick={() => navigate("/agent/profile")}
                sx={{ ml: 0.25, color: "#fff" }}
              >
                <Avatar sx={{ width: 28, height: 28, bgcolor: "rgba(3,205,140,0.22)", color: isDark ? "#e5e7eb" : "#0f172a", fontWeight: 800 }}>
                  {initials || <AccountCircleOutlinedIcon fontSize="small" />}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

function ButtonLogout({ onLogout }: { onLogout: () => void }) {
  return (
    <Tooltip title="Log out">
      <IconButton size="small" onClick={onLogout}>
        <AccountCircleOutlinedIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
}
