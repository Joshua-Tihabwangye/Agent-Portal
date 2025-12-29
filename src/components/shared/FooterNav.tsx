import React from "react";
import { Box, Typography, Stack, IconButton, Divider, Badge } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";
import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";

interface FooterNavItem {
    key: string;
    label: string;
    href: string;
    icon: React.ReactNode;
    badge?: number;
}

const footerNavItems: FooterNavItem[] = [
    { key: "dashboard", label: "Dashboard", icon: <DashboardOutlinedIcon fontSize="small" />, href: "/agent/dashboard" },
    { key: "analytics", label: "Analytics", icon: <BarChartOutlinedIcon fontSize="small" />, href: "/agent/dashboard/analytics" },
    { key: "live-ops", label: "Live Ops", icon: <MapOutlinedIcon fontSize="small" />, href: "/agent/live-ops" },
    { key: "dispatch", label: "Dispatch", icon: <LocalShippingOutlinedIcon fontSize="small" />, href: "/agent/dispatch/board", badge: 4 },
    { key: "support", label: "Support", icon: <SupportAgentOutlinedIcon fontSize="small" />, href: "/agent/support/tickets", badge: 8 },
    { key: "safety", label: "Safety", icon: <ReportProblemOutlinedIcon fontSize="small" />, href: "/agent/safety/sos" },
    { key: "training", label: "Training", icon: <SchoolOutlinedIcon fontSize="small" />, href: "/agent/training" },
    { key: "settings", label: "Settings", icon: <SettingsOutlinedIcon fontSize="small" />, href: "/agent/settings/teams" },
];

function getActiveKey(pathname: string): string {
    if (pathname.includes("/dashboard/analytics")) return "analytics";
    if (pathname.startsWith("/agent/live-ops")) return "live-ops";
    if (pathname.startsWith("/agent/dispatch")) return "dispatch";
    if (pathname.startsWith("/agent/support")) return "support";
    if (pathname.startsWith("/agent/safety")) return "safety";
    if (pathname.startsWith("/agent/training")) return "training";
    if (pathname.startsWith("/agent/settings")) return "settings";
    return "dashboard";
}

interface FooterNavProps {
    dispatchBadge?: number;
    supportBadge?: number;
}

export function FooterNav({ dispatchBadge, supportBadge }: FooterNavProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const navigate = useNavigate();
    const location = useLocation();
    const activeKey = getActiveKey(location.pathname);

    return (
        <Box
            component="footer"
            sx={{
                mt: "auto",
                borderTop: `1px solid ${isDark ? "rgba(148,163,184,0.2)" : "rgba(226,232,240,1)"}`,
                backgroundColor: isDark ? "rgba(2,6,23,0.95)" : "rgba(255,255,255,0.98)",
                backdropFilter: "blur(12px)",
                px: { xs: 2, sm: 4, md: 6 },
                py: 2,
            }}
        >
            <Stack
                direction={{ xs: "column", md: "row" }}
                justifyContent="space-between"
                alignItems={{ xs: "center", md: "flex-start" }}
                spacing={2}
            >
                {/* Quick Nav Links */}
                <Box>
                    <Typography
                        variant="caption"
                        sx={{
                            color: isDark ? "#94a3b8" : "#64748b",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: 0.5,
                            display: "block",
                            mb: 1.5,
                            textAlign: { xs: "center", md: "left" },
                        }}
                    >
                        Quick Navigation
                    </Typography>
                    <Stack
                        direction="row"
                        spacing={0.5}
                        flexWrap="wrap"
                        justifyContent={{ xs: "center", md: "flex-start" }}
                        sx={{ gap: 0.5 }}
                    >
                        {footerNavItems.map((item) => {
                            const isActive = activeKey === item.key;

                            // Determine badge count based on item key and props
                            let badgeCount = item.badge;
                            if (item.key === "dispatch") badgeCount = dispatchBadge;
                            if (item.key === "support") badgeCount = supportBadge;

                            return (
                                <Box
                                    key={item.key}
                                    onClick={() => navigate(item.href)}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 0.5,
                                        px: 1.5,
                                        py: 0.75,
                                        borderRadius: 2,
                                        cursor: "pointer",
                                        backgroundColor: isActive
                                            ? isDark
                                                ? "rgba(3,205,140,0.15)"
                                                : "rgba(3,205,140,0.1)"
                                            : "transparent",
                                        border: isActive ? `1px solid ${EVZONE_GREEN}40` : "1px solid transparent",
                                        transition: "all 0.2s ease",
                                        "&:hover": {
                                            backgroundColor: isDark
                                                ? "rgba(3,205,140,0.12)"
                                                : "rgba(3,205,140,0.08)",
                                            transform: "translateY(-1px)",
                                        },
                                    }}
                                >
                                    <Box sx={{ color: isActive ? EVZONE_GREEN : isDark ? "#94a3b8" : "#64748b", display: "flex" }}>
                                        <Badge badgeContent={badgeCount} color="error" variant="standard" sx={{ "& .MuiBadge-badge": { fontSize: 9, height: 14, minWidth: 14, px: 0.5 } }}>
                                            {item.icon}
                                        </Badge>
                                    </Box>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            color: isActive ? EVZONE_GREEN : isDark ? "#e5e7eb" : "#374151",
                                            fontWeight: isActive ? 700 : 500,
                                            display: { xs: "none", sm: "block" },
                                        }}
                                    >
                                        {item.label}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Stack>
                </Box>

                {/* Brand Info */}
                <Box sx={{ textAlign: { xs: "center", md: "right" } }}>
                    <Stack direction="row" spacing={1} alignItems="center" justifyContent={{ xs: "center", md: "flex-end" }}>
                        <Box
                            sx={{
                                width: 24,
                                height: 24,
                                borderRadius: 1,
                                background: `linear-gradient(135deg, ${EVZONE_GREEN} 0%, ${EVZONE_ORANGE} 100%)`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: "#fff",
                                fontSize: 10,
                                fontWeight: 800,
                            }}
                        >
                            EV
                        </Box>
                        <Typography variant="caption" sx={{ color: isDark ? "#e5e7eb" : "#374151", fontWeight: 600 }}>
                            EVzone Agent Portal
                        </Typography>
                    </Stack>
                    <Typography variant="caption" sx={{ color: isDark ? "#64748b" : "#94a3b8", mt: 0.5, display: "block" }}>
                        © 2025 EVzone. All rights reserved.
                    </Typography>
                </Box>
            </Stack>
        </Box>
    );
}

export default FooterNav;
