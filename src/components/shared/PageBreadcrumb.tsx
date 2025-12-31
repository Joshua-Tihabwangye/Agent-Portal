import React from "react";
import { Box, Typography, Breadcrumbs, Link } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface PageBreadcrumbProps {
    items: BreadcrumbItem[];
    current: string;
}

const EVZONE_GREY = "#6b7280";

export default function PageBreadcrumb({ items, current }: PageBreadcrumbProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const navigate = useNavigate();

    return (
        <Box sx={{ mb: 2 }}>
            <Breadcrumbs
                separator={<NavigateNextIcon fontSize="small" sx={{ color: EVZONE_GREY }} />}
                sx={{ fontSize: 13 }}
            >
                <Link
                    component="button"
                    underline="hover"
                    onClick={() => navigate("/agent/dashboard")}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 0.5,
                        color: isDark ? "#94a3b8" : "#64748b",
                        fontSize: 13,
                        fontWeight: 500,
                        "&:hover": { color: isDark ? "#e5e7eb" : "#1e293b" },
                    }}
                >
                    <HomeOutlinedIcon sx={{ fontSize: 16 }} />
                    Dashboard
                </Link>
                {items.map((item, index) => (
                    item.href ? (
                        <Link
                            key={index}
                            component="button"
                            underline="hover"
                            onClick={() => navigate(item.href!)}
                            sx={{
                                color: isDark ? "#94a3b8" : "#64748b",
                                fontSize: 13,
                                fontWeight: 500,
                                "&:hover": { color: isDark ? "#e5e7eb" : "#1e293b" },
                            }}
                        >
                            {item.label}
                        </Link>
                    ) : null
                ))}
                <Typography
                    sx={{
                        color: isDark ? "#e5e7eb" : "#1e293b",
                        fontSize: 13,
                        fontWeight: 600,
                    }}
                >
                    {current}
                </Typography>
            </Breadcrumbs>
        </Box>
    );
}
