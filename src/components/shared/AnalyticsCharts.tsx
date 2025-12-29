import React from "react";
import { Box, Typography, Stack } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import {
    PieChart,
    Pie,
    Cell,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    LineChart,
    Line,
    ResponsiveContainer,
} from "recharts";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";

// Eye-catching color palette based on company colors
const CHART_COLORS = [
    EVZONE_GREEN,      // Primary green
    EVZONE_ORANGE,     // Primary orange
    "#3b82f6",         // Blue
    "#8b5cf6",         // Purple
    "#ef4444",         // Red
    "#14b8a6",         // Teal
    "#f59e0b",         // Amber
    "#ec4899",         // Pink
];

interface ChartDataItem {
    name: string;
    value: number;
    [key: string]: string | number;
}

interface PieChartComponentProps {
    data: ChartDataItem[];
    title?: string;
    height?: number;
    showLegend?: boolean;
}

interface BarChartComponentProps {
    data: ChartDataItem[];
    title?: string;
    height?: number;
    dataKey?: string;
    xAxisKey?: string;
    showGrid?: boolean;
}

interface LineChartComponentProps {
    data: ChartDataItem[];
    title?: string;
    height?: number;
    dataKeys: string[];
    xAxisKey?: string;
    showGrid?: boolean;
}

// Custom tooltip for better styling
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: { name: string; value: number; color: string }[]; label?: string }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    if (active && payload && payload.length) {
        return (
            <Box
                sx={{
                    backgroundColor: isDark ? "#1e293b" : "#ffffff",
                    border: `1px solid ${isDark ? "rgba(148,163,184,0.3)" : "rgba(226,232,240,1)"}`,
                    borderRadius: 2,
                    px: 1.5,
                    py: 1,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                }}
            >
                <Typography variant="caption" sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827", display: "block", mb: 0.5 }}>
                    {label}
                </Typography>
                {payload.map((entry, index) => (
                    <Typography key={index} variant="caption" sx={{ color: entry.color, fontWeight: 600, display: "block" }}>
                        {entry.name}: {typeof entry.value === "number" ? entry.value.toLocaleString() : entry.value}
                    </Typography>
                ))}
            </Box>
        );
    }
    return null;
};

export function RevenuePieChart({ data, title, height = 280, showLegend = true }: PieChartComponentProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const total = data.reduce((sum, item) => sum + item.value, 0);

    // Custom legend renderer with percentages
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const renderLegend = (props: any) => {
        const { payload } = props;
        if (!payload) return null;

        return (
            <Stack spacing={1} sx={{ pl: 2 }}>
                {payload.map((entry: { value?: string; color?: string; payload?: { value?: number } }, index: number) => {
                    const entryValue = entry.payload?.value ?? 0;
                    const percent = ((entryValue / total) * 100).toFixed(0);
                    return (
                        <Stack key={index} direction="row" spacing={1} alignItems="center">
                            <Box sx={{ width: 10, height: 10, borderRadius: '50%', bgcolor: entry.color || "#ccc", flexShrink: 0 }} />
                            <Typography variant="caption" sx={{ color: isDark ? "#e5e7eb" : "#374151", fontWeight: 500, minWidth: 60 }}>
                                {entry.value || ""}
                            </Typography>
                            <Typography variant="caption" sx={{ color: entry.color || "#6b7280", fontWeight: 700 }}>
                                {percent}%
                            </Typography>
                        </Stack>
                    );
                })}
            </Stack>
        );
    };

    return (
        <Box>
            {title && (
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827", mb: 2 }}>
                    {title}
                </Typography>
            )}
            <ResponsiveContainer width="100%" height={height}>
                <PieChart>
                    <Pie
                        data={data}
                        cx="35%"
                        cy="50%"
                        innerRadius={45}
                        outerRadius={65}
                        paddingAngle={3}
                        dataKey="value"
                        label={({ cx, cy, midAngle, outerRadius, name, percent }) => {
                            const RADIAN = Math.PI / 180;
                            const radius = outerRadius + 25;
                            const x = cx + radius * Math.cos(-midAngle * RADIAN);
                            const y = cy + radius * Math.sin(-midAngle * RADIAN);
                            return (
                                <text
                                    x={x}
                                    y={y}
                                    fill={isDark ? "#e5e7eb" : "#374151"}
                                    textAnchor={x > cx ? "start" : "end"}
                                    dominantBaseline="central"
                                    fontSize={11}
                                    fontWeight={600}
                                >
                                    {`${name} ${(percent * 100).toFixed(0)}%`}
                                </text>
                            );
                        }}
                        labelLine={{ stroke: isDark ? "#94a3b8" : "#64748b", strokeWidth: 1 }}
                    >
                        {data.map((_, index) => (
                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    {showLegend && (
                        <Legend
                            layout="vertical"
                            align="right"
                            verticalAlign="middle"
                            content={renderLegend}
                        />
                    )}
                </PieChart>
            </ResponsiveContainer>
            <Box className="text-center mt-2">
                <Typography variant="body2" sx={{ color: isDark ? "#94a3b8" : "#64748b" }}>
                    Total: <strong style={{ color: EVZONE_GREEN }}>{total.toLocaleString()}</strong>
                </Typography>
            </Box>
        </Box>
    );
}

export function TrendBarChart({ data, title, height = 280, dataKey = "value", xAxisKey = "name", showGrid = true }: BarChartComponentProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Box>
            {title && (
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827", mb: 2 }}>
                    {title}
                </Typography>
            )}
            <ResponsiveContainer width="100%" height={height}>
                <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(148,163,184,0.2)" : "rgba(226,232,240,0.8)"} />}
                    <XAxis
                        dataKey={xAxisKey}
                        tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }}
                        axisLine={{ stroke: isDark ? "rgba(148,163,184,0.3)" : "rgba(226,232,240,1)" }}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }}
                        axisLine={{ stroke: isDark ? "rgba(148,163,184,0.3)" : "rgba(226,232,240,1)" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey={dataKey} fill={EVZONE_GREEN} radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
}

export function TrendLineChart({ data, title, height = 280, dataKeys, xAxisKey = "name", showGrid = true }: LineChartComponentProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    return (
        <Box>
            {title && (
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827", mb: 2 }}>
                    {title}
                </Typography>
            )}
            <ResponsiveContainer width="100%" height={height}>
                <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                    {showGrid && <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "rgba(148,163,184,0.2)" : "rgba(226,232,240,0.8)"} />}
                    <XAxis
                        dataKey={xAxisKey}
                        tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }}
                        axisLine={{ stroke: isDark ? "rgba(148,163,184,0.3)" : "rgba(226,232,240,1)" }}
                    />
                    <YAxis
                        tick={{ fontSize: 11, fill: isDark ? "#94a3b8" : "#64748b" }}
                        axisLine={{ stroke: isDark ? "rgba(148,163,184,0.3)" : "rgba(226,232,240,1)" }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend wrapperStyle={{ fontSize: 12 }} iconType="line" />
                    {dataKeys.map((key, index) => (
                        <Line
                            key={key}
                            type="monotone"
                            dataKey={key}
                            stroke={CHART_COLORS[index % CHART_COLORS.length]}
                            strokeWidth={2}
                            dot={{ fill: CHART_COLORS[index % CHART_COLORS.length], strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, strokeWidth: 0 }}
                        />
                    ))}
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
}

// Metric cards with eye-catching colors
interface MetricCardProps {
    label: string;
    value: string | number;
    change?: string;
    changeType?: "positive" | "negative" | "neutral";
    icon?: React.ReactNode;
    color?: string;
}

export function MetricCard({ label, value, change, changeType = "neutral", icon, color = EVZONE_GREEN }: MetricCardProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const changeColors = {
        positive: "#16a34a",
        negative: "#dc2626",
        neutral: "#6b7280",
    };

    return (
        <Box
            sx={{
                p: 2.5,
                borderRadius: 3,
                background: isDark
                    ? `linear-gradient(135deg, ${color}15 0%, ${color}08 100%)`
                    : `linear-gradient(135deg, ${color}12 0%, ${color}05 100%)`,
                border: `1px solid ${isDark ? `${color}30` : `${color}20`}`,
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 24px ${color}20`,
                },
            }}
        >
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={1}>
                <Typography
                    variant="caption"
                    sx={{
                        color: isDark ? "#94a3b8" : "#64748b",
                        fontWeight: 600,
                        textTransform: "uppercase",
                        letterSpacing: 0.5,
                    }}
                >
                    {label}
                </Typography>
                {icon && (
                    <Box sx={{ color: color, opacity: 0.8 }}>
                        {icon}
                    </Box>
                )}
            </Stack>
            <Typography variant="h4" sx={{ fontWeight: 800, color: isDark ? "#e5e7eb" : "#111827", lineHeight: 1.2 }}>
                {typeof value === "number" ? value.toLocaleString() : value}
            </Typography>
            {change && (
                <Typography
                    variant="caption"
                    sx={{
                        color: changeColors[changeType],
                        fontWeight: 600,
                        display: "block",
                        mt: 0.5,
                    }}
                >
                    {change}
                </Typography>
            )}
        </Box>
    );
}

export { CHART_COLORS };
