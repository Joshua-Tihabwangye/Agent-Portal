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
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import Drawer from "@mui/material/Drawer";
import { useTheme } from "@mui/material/styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import CloseIcon from "@mui/icons-material/Close";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

import { useAuth } from "../providers/AuthProvider";
import { useThemeMode } from "../providers/ThemeModeProvider";
import { AgentGlobalStatusBanner } from "../components/system/GlobalStatusBanner";
import { FooterNav } from "../components/shared/FooterNav";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_GREY = "#6b7280";

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 72;

type NavItem = {
  key: string;
  label: string;
  href: string;
  icon: React.ReactNode;
};

const navItems: NavItem[] = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardOutlinedIcon fontSize="small" />, href: "/agent/dashboard" },
  { key: "analytics", label: "Analytics", icon: <BarChartOutlinedIcon fontSize="small" />, href: "/agent/dashboard/analytics" },
  { key: "live-ops", label: "Live Ops & Map", icon: <MapOutlinedIcon fontSize="small" />, href: "/agent/live-ops" },
  { key: "dispatch", label: "Manual Dispatch", icon: <LocalShippingOutlinedIcon fontSize="small" />, href: "/agent/dispatch" },
  { key: "onboarding", label: "Driver Onboarding", icon: <AssignmentIndOutlinedIcon fontSize="small" />, href: "/agent/onboarding/drivers" },
  { key: "support", label: "Support & Tickets", icon: <SupportAgentOutlinedIcon fontSize="small" />, href: "/agent/support/tickets" },
  { key: "safety", label: "Safety & Incidents", icon: <ReportProblemOutlinedIcon fontSize="small" />, href: "/agent/safety/sos" },
  { key: "training", label: "Training & QA", icon: <SchoolOutlinedIcon fontSize="small" />, href: "/agent/training" },
  { key: "search", label: "Search & Tools", icon: <SearchIcon fontSize="small" />, href: "/agent/search" },
  { key: "settings", label: "Settings", icon: <SettingsOutlinedIcon fontSize="small" />, href: "/agent/settings/teams" },
];

// Sample notifications data
const sampleNotifications = [
  { id: 1, title: "New ticket assigned", message: "Ticket #TCK-9015 has been assigned to you", time: "2 min ago", read: false },
  { id: 2, title: "SOS Alert", message: "High priority incident INC-7004 needs attention", time: "15 min ago", read: false },
  { id: 3, title: "Training reminder", message: "Complete EV Safety module by end of shift", time: "1 hour ago", read: true },
  { id: 4, title: "Driver onboarding", message: "New driver documents ready for review", time: "2 hours ago", read: true },
];

function pickActiveKey(pathname: string): string {
  if (pathname.includes("/dashboard/analytics")) return "analytics";
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
  const [desktopOpen, setDesktopOpen] = useState(true);
  const [query, setQuery] = useState("");
  const [profileAnchor, setProfileAnchor] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const [notifications, setNotifications] = useState(sampleNotifications);

  // Badge state management
  const [dispatchBadge, setDispatchBadge] = useState(4);
  const [supportBadge, setSupportBadge] = useState(8);

  // Auto-clear badges on navigation
  useEffect(() => {
    if (location.pathname.startsWith("/agent/dispatch")) {
      setDispatchBadge(0);
    }
    if (location.pathname.startsWith("/agent/support")) {
      setSupportBadge(0);
    }
  }, [location.pathname]);

  const activeKey = useMemo(() => pickActiveKey(location.pathname), [location.pathname]);
  const unreadCount = notifications.filter(n => !n.read).length;

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

  const handleMobileDrawerToggle = () => setMobileOpen((v) => !v);
  const handleDesktopDrawerToggle = () => setDesktopOpen((v) => !v);

  const handleNavClick = (item: NavItem) => {
    navigate(item.href);
    setMobileOpen(false);
  };

  const handleProfileClick = (event: React.MouseEvent<HTMLElement>) => {
    setProfileAnchor(event.currentTarget);
  };

  const handleProfileClose = () => {
    setProfileAnchor(null);
  };

  const handleNotificationClick = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleLogout = () => {
    handleProfileClose();
    logout();
    navigate("/agent/login");
  };

  const initials = (user?.name || "Agent")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((x) => x[0]?.toUpperCase())
    .join("");

  const currentDrawerWidth = desktopOpen ? drawerWidthExpanded : drawerWidthCollapsed;

  const drawerContent = (collapsed: boolean) => (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100%", px: collapsed ? 1 : 2, py: 2 }}>
      {/* Brand and Toggle */}
      <Box className="mb-3">
        <Box className="flex items-center justify-between" sx={{ minHeight: 48 }}>
          <Box className="flex items-center gap-2">
            <Box
              className="flex items-center justify-center rounded-xl"
              sx={{
                width: 36,
                height: 36,
                backgroundColor: EVZONE_GREEN,
                color: "#020617",
                fontWeight: 800,
                letterSpacing: 0.5,
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              EV
            </Box>
            {!collapsed && (
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827", lineHeight: 1.1 }}>
                  EVzone
                </Typography>
                <Typography variant="caption" sx={{ color: EVZONE_GREY, lineHeight: 1.1 }}>
                  Agent Portal
                </Typography>
              </Box>
            )}
          </Box>

          {/* Toggle button - Now at top */}
          <Tooltip title={collapsed ? "Expand sidebar" : "Collapse sidebar"} placement="right">
            <Box
              onClick={handleDesktopDrawerToggle}
              sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                justifyContent: "center",
                p: 0.75,
                cursor: "pointer",
                borderRadius: 1.5,
                backgroundColor: isDark ? "rgba(148,163,184,0.08)" : "rgba(226,232,240,0.5)",
                "&:hover": {
                  backgroundColor: isDark ? "rgba(148,163,184,0.15)" : "rgba(226,232,240,0.9)",
                },
                transition: "all 0.2s",
              }}
            >
              {collapsed ? (
                <ChevronRightIcon sx={{ fontSize: 18, color: EVZONE_GREY }} />
              ) : (
                <ChevronLeftIcon sx={{ fontSize: 18, color: EVZONE_GREY }} />
              )}
            </Box>
          </Tooltip>
        </Box>
      </Box>

      <Divider sx={{ mb: 2, borderColor: isDark ? "rgba(148,163,184,0.25)" : "rgba(226,232,240,1)" }} />

      {/* Nav */}
      <List sx={{ flex: 1 }}>
        {navItems.map((item) => {
          const active = activeKey === item.key;
          return (
            <Tooltip key={item.key} title={collapsed ? item.label : ""} placement="right" arrow>
              <ListItemButton
                onClick={() => handleNavClick(item)}
                sx={{
                  borderRadius: 2,
                  mb: 0.5,
                  justifyContent: collapsed ? "center" : "flex-start",
                  px: collapsed ? 1.5 : 2,
                  backgroundColor: active
                    ? isDark ? "rgba(3,205,140,0.16)" : "rgba(3,205,140,0.10)"
                    : "transparent",
                  "&:hover": {
                    backgroundColor: active
                      ? isDark ? "rgba(3,205,140,0.20)" : "rgba(3,205,140,0.14)"
                      : isDark ? "rgba(148,163,184,0.10)" : "rgba(226,232,240,0.70)",
                  },
                }}
              >
                <ListItemIcon sx={{ minWidth: collapsed ? 0 : 34, color: active ? EVZONE_GREEN : EVZONE_GREY, justifyContent: "center" }}>
                  {item.icon}
                </ListItemIcon>
                {!collapsed && (
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontSize: 13,
                      fontWeight: active ? 700 : 600,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          );
        })}
      </List>

      <Divider sx={{ my: 2, borderColor: isDark ? "rgba(148,163,184,0.25)" : "rgba(226,232,240,1)" }} />

      {/* User info at bottom */}
      <Box className="flex items-center" sx={{ justifyContent: collapsed ? "center" : "flex-start", px: collapsed ? 0 : 0.5 }}>
        <Avatar sx={{ width: 32, height: 32, fontSize: 13, fontWeight: 800, bgcolor: "rgba(3,205,140,0.25)", color: EVZONE_GREEN }}>
          {initials || "A"}
        </Avatar>
        {!collapsed && (
          <Box sx={{ ml: 1.5, overflow: "hidden" }}>
            <Typography variant="caption" sx={{ color: isDark ? "#e5e7eb" : "#111827", fontWeight: 700, lineHeight: 1.1, display: "block", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden" }}>
              {user?.name || "Agent"}
            </Typography>
            <Typography variant="caption" sx={{ color: EVZONE_GREY, lineHeight: 1.1, display: "block", whiteSpace: "nowrap", textOverflow: "ellipsis", overflow: "hidden", fontSize: 10 }}>
              {user?.email || "agent@evzone.app"}
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );

  return (
    <Box className="min-h-screen w-full bg-slate-50 dark:bg-slate-950" sx={{ display: "flex" }}>
      {/* Mobile drawer (overlay) */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleMobileDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: drawerWidthExpanded,
            boxSizing: "border-box",
            bgcolor: isDark ? "#020617" : "#ffffff",
          },
        }}
      >
        {drawerContent(false)}
      </Drawer>

      {/* Desktop drawer (permanent, collapsible) */}
      <Box
        component="nav"
        sx={{
          width: { md: currentDrawerWidth },
          flexShrink: { md: 0 },
          transition: "width 0.2s ease-in-out",
          display: { xs: "none", md: "block" },
        }}
      >
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              width: currentDrawerWidth,
              boxSizing: "border-box",
              bgcolor: isDark ? "#020617" : "#ffffff",
              borderRight: isDark ? "1px solid rgba(148,163,184,0.25)" : "1px solid rgba(226,232,240,1)",
              transition: "width 0.2s ease-in-out",
              overflowX: "hidden",
            },
          }}
        >
          {drawerContent(!desktopOpen)}
        </Drawer>
      </Box>

      {/* Main */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, width: { md: `calc(100% - ${currentDrawerWidth}px)` } }}>
        {!online && <AgentGlobalStatusBanner mode="offline" onRetry={() => window.location.reload()} message={undefined} />}

        {/* Header */}
        <Box
          className="ev-gradient text-white shadow-sm"
          sx={{
            position: "sticky",
            top: 0,
            zIndex: 1100,
            px: { xs: 1.5, sm: 3 },
            py: { xs: 1.25, md: 1.5 },
            borderBottom: isDark ? "1px solid rgba(148,163,184,0.18)" : "1px solid rgba(255,255,255,0.25)",
            backdropFilter: "blur(14px)",
          }}
        >
          <Box className="flex items-center gap-2 w-full">
            {/* Mobile menu button */}
            <IconButton
              onClick={handleMobileDrawerToggle}
              sx={{ display: { xs: "inline-flex", md: "none" }, color: "#fff" }}
              size="small"
            >
              <MenuRoundedIcon fontSize="small" />
            </IconButton>

            {/* Search */}
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
                minWidth: { xs: 120, md: 320 },
                maxWidth: 480,
                "& .MuiOutlinedInput-root": {
                  bgcolor: isDark ? "rgba(15,23,42,0.25)" : "rgba(255,255,255,0.25)",
                  color: isDark ? "#e2e8f0" : "#0f172a",
                  "& fieldset": { borderColor: "rgba(255,255,255,0.38)" },
                  "&:hover fieldset": { borderColor: "rgba(255,255,255,0.7)" },
                },
              }}
            />

            {/* Spacer */}
            <Box sx={{ flex: 1 }} />

            {/* Notifications */}
            <Tooltip title="Notifications">
              <IconButton size="small" onClick={handleNotificationClick} sx={{ color: "#fff" }}>
                <Badge badgeContent={unreadCount} color="error" max={99}>
                  <NotificationsNoneOutlinedIcon fontSize="small" />
                </Badge>
              </IconButton>
            </Tooltip>

            {/* Theme toggle */}
            <Tooltip title={isDark ? "Switch to light" : "Switch to dark"}>
              <IconButton size="small" onClick={toggle} sx={{ color: "#fff" }}>
                {isDark ? <LightModeOutlinedIcon fontSize="small" /> : <DarkModeOutlinedIcon fontSize="small" />}
              </IconButton>
            </Tooltip>

            {/* Profile Avatar - Extreme Right */}
            <Tooltip title="My account">
              <IconButton size="small" onClick={handleProfileClick} sx={{ ml: 0.5 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: "rgba(255,255,255,0.2)", color: "#fff", fontWeight: 700, fontSize: 13 }}>
                  {initials || <AccountCircleOutlinedIcon fontSize="small" />}
                </Avatar>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={profileAnchor}
          open={Boolean(profileAnchor)}
          onClose={handleProfileClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1,
              minWidth: 200,
              borderRadius: 2,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5, borderBottom: "1px solid", borderColor: isDark ? "rgba(148,163,184,0.2)" : "rgba(226,232,240,1)" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{user?.name || "Agent"}</Typography>
            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>{user?.email}</Typography>
          </Box>
          <MenuItem onClick={() => { handleProfileClose(); navigate("/agent/profile"); }}>
            <ListItemIcon><PersonOutlineOutlinedIcon fontSize="small" /></ListItemIcon>
            View Profile
          </MenuItem>
          <MenuItem onClick={() => { handleProfileClose(); navigate("/agent/settings/teams"); }}>
            <ListItemIcon><SettingsOutlinedIcon fontSize="small" /></ListItemIcon>
            Settings
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout} sx={{ color: "#dc2626" }}>
            <ListItemIcon><LogoutOutlinedIcon fontSize="small" sx={{ color: "#dc2626" }} /></ListItemIcon>
            Logout
          </MenuItem>
        </Menu>

        {/* Notifications Panel */}
        <Menu
          anchorEl={notificationAnchor}
          open={Boolean(notificationAnchor)}
          onClose={handleNotificationClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 1,
              width: 360,
              maxHeight: 400,
              borderRadius: 2,
              boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            },
          }}
        >
          <Box sx={{ px: 2, py: 1.5, display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid", borderColor: isDark ? "rgba(148,163,184,0.2)" : "rgba(226,232,240,1)" }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Notifications</Typography>
            <Box>
              <Typography
                variant="caption"
                sx={{ color: EVZONE_GREEN, cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
                onClick={markAllRead}
              >
                Mark all read
              </Typography>
              <IconButton size="small" onClick={handleNotificationClose} sx={{ ml: 1 }}>
                <CloseIcon sx={{ fontSize: 16 }} />
              </IconButton>
            </Box>
          </Box>
          {notifications.length === 0 ? (
            <Box sx={{ p: 3, textAlign: "center" }}>
              <Typography variant="body2" sx={{ color: EVZONE_GREY }}>No notifications</Typography>
            </Box>
          ) : (
            notifications.map((notif) => (
              <MenuItem
                key={notif.id}
                onClick={handleNotificationClose}
                sx={{
                  py: 1.5,
                  px: 2,
                  alignItems: "flex-start",
                  bgcolor: notif.read ? "transparent" : isDark ? "rgba(3,205,140,0.05)" : "rgba(3,205,140,0.03)",
                }}
              >
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: notif.read ? 500 : 700, mb: 0.25 }}>
                    {notif.title}
                  </Typography>
                  <Typography variant="caption" sx={{ color: EVZONE_GREY, display: "block" }}>
                    {notif.message}
                  </Typography>
                  <Typography variant="caption" sx={{ color: EVZONE_GREY, fontSize: 10 }}>
                    {notif.time}
                  </Typography>
                </Box>
                {!notif.read && (
                  <Box sx={{ width: 8, height: 8, borderRadius: "50%", bgcolor: EVZONE_GREEN, mt: 0.5, ml: 1, flexShrink: 0 }} />
                )}
              </MenuItem>
            ))
          )}
        </Menu>

        {/* Content */}
        <Box sx={{ flex: 1, minWidth: 0, overflowX: "hidden", display: "flex", flexDirection: "column", width: "100%" }}>
          <Box sx={{ flex: 1, width: "100%" }}>
            <Outlet />
          </Box>
          <FooterNav dispatchBadge={dispatchBadge} supportBadge={supportBadge} />
        </Box>
      </Box>
    </Box>
  );
}
