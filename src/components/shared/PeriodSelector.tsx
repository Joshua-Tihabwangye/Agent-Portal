import React from "react";
import { FormControl, Select, MenuItem, Box, Typography } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

const EVZONE_GREEN = "#03cd8c";

export type PeriodValue = "today" | "week" | "month" | "year";

interface PeriodSelectorProps {
    value: PeriodValue;
    onChange: (period: PeriodValue) => void;
    compact?: boolean;
}

const periodOptions: { value: PeriodValue; label: string }[] = [
    { value: "today", label: "Today" },
    { value: "week", label: "This Week" },
    { value: "month", label: "This Month" },
    { value: "year", label: "This Year" },
];

export function PeriodSelector({ value, onChange, compact = false }: PeriodSelectorProps) {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";

    const handleChange = (event: SelectChangeEvent<string>) => {
        onChange(event.target.value as PeriodValue);
    };

    return (
        <Box className="flex items-center gap-2">
            {!compact && (
                <Box className="flex items-center gap-1">
                    <CalendarTodayOutlinedIcon sx={{ fontSize: 16, color: EVZONE_GREEN }} />
                    <Typography variant="caption" sx={{ color: isDark ? "#94a3b8" : "#64748b", fontWeight: 600 }}>
                        Period:
                    </Typography>
                </Box>
            )}
            <FormControl size="small">
                <Select
                    value={value}
                    onChange={handleChange}
                    sx={{
                        minWidth: compact ? 100 : 130,
                        borderRadius: 2,
                        fontSize: 13,
                        fontWeight: 600,
                        backgroundColor: isDark ? "rgba(15,23,42,0.8)" : "rgba(255,255,255,0.9)",
                        border: `1px solid ${isDark ? "rgba(59,130,246,0.3)" : "rgba(226,232,240,1)"}`,
                        "& .MuiSelect-select": {
                            py: 0.75,
                            px: 1.5,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                            border: "none",
                        },
                        "&:hover": {
                            backgroundColor: isDark ? "rgba(15,23,42,0.95)" : "rgba(248,250,252,1)",
                            borderColor: EVZONE_GREEN,
                        },
                        "& .MuiSelect-icon": {
                            color: EVZONE_GREEN,
                        },
                    }}
                >
                    {periodOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value} sx={{ fontSize: 13, fontWeight: 500 }}>
                            {option.label}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}

export default PeriodSelector;
