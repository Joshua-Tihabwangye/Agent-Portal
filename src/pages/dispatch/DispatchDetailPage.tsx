import React, { useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Stack,
    Chip,
    Button,
    Divider,
    Avatar,
    IconButton,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CarRentalOutlinedIcon from "@mui/icons-material/CarRentalOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import ExploreOutlinedIcon from "@mui/icons-material/ExploreOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import ChatOutlinedIcon from "@mui/icons-material/ChatOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import SwapHorizOutlinedIcon from "@mui/icons-material/SwapHorizOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Mock dispatch data
const getMockDispatch = (id: string) => ({
    id,
    type: "Ride",
    status: "in_progress",
    statusLabel: "In Progress",
    createdAt: "2024-12-31 10:45:00",
    updatedAt: "2024-12-31 10:52:00",
    customer: {
        name: "Sarah K.",
        phone: "+256 700 123 456",
        email: "sarah.k@email.com",
        avatar: null,
    },
    pickup: {
        address: "Nakasero Hill, Plot 12",
        coordinates: { lat: 0.3176, lng: 32.5825 },
        time: "10:50 AM",
    },
    dropoff: {
        address: "Bugolobi Flats, Block C",
        coordinates: { lat: 0.3055, lng: 32.6041 },
        time: "Est. 11:15 AM",
    },
    driver: {
        name: "James M.",
        phone: "+256 770 987 654",
        vehicle: "Toyota Prius · UAX 123A",
        rating: 4.8,
        avatar: null,
    },
    fare: {
        base: 5000,
        distance: 8000,
        total: 13000,
        currency: "UGX",
    },
    timeline: [
        { step: "Requested", time: "10:45 AM", completed: true },
        { step: "Driver Assigned", time: "10:47 AM", completed: true },
        { step: "En Route to Pickup", time: "10:48 AM", completed: true },
        { step: "At Pickup", time: "10:52 AM", completed: true },
        { step: "Trip Started", time: "10:55 AM", completed: false },
        { step: "Completed", time: "—", completed: false },
    ],
});

const getServiceIcon = (type: string) => {
    switch (type) {
        case "Ride":
            return <DirectionsCarOutlinedIcon />;
        case "Delivery":
            return <LocalShippingOutlinedIcon />;
        case "Rental":
            return <CarRentalOutlinedIcon />;
        case "School Shuttle":
            return <DirectionsBusOutlinedIcon />;
        case "Tour":
            return <ExploreOutlinedIcon />;
        case "EMS":
            return <LocalHospitalOutlinedIcon />;
        default:
            return <DirectionsCarOutlinedIcon />;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "in_progress":
            return { bg: "rgba(22,163,74,0.14)", color: "#166534" };
        case "urgent":
            return { bg: "rgba(239,68,68,0.14)", color: "#dc2626" };
        case "pending":
            return { bg: "rgba(250,204,21,0.14)", color: "#92400e" };
        case "completed":
            return { bg: "rgba(148,163,184,0.14)", color: EVZONE_GREY };
        case "cancelled":
            return { bg: "rgba(239,68,68,0.08)", color: "#b91c1c" };
        default:
            return { bg: "rgba(148,163,184,0.14)", color: EVZONE_GREY };
    }
};

export default function DispatchDetailPage() {
    const theme = useTheme();
    const isDark = theme.palette.mode === "dark";
    const navigate = useNavigate();
    const { dispatchId } = useParams<{ dispatchId: string }>();

    const dispatch = getMockDispatch(dispatchId || "BK-2048");
    const statusStyle = getStatusColor(dispatch.status);

    const handleReassign = () => {
        navigate(`/agent/dispatch/new/assign?reassign=${dispatchId}`);
    };

    const handleCancel = () => {
        console.log("Cancel dispatch", dispatchId);
    };

    const handleCall = (phone: string) => {
        window.open(`tel:${phone}`, "_self");
    };

    const handleChat = () => {
        console.log("Open chat");
    };

    const activeStep = dispatch.timeline.filter(t => t.completed).length;

    return (
        <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 md:px-8 py-4 w-full">
            <Box className="w-full">
                {/* Breadcrumb Navigation */}
                <PageBreadcrumb
                    items={[{ label: "Dispatch", href: "/agent/dispatch" }]}
                    current={`Dispatch ${dispatch.id}`}
                />
                {/* Header */}
                <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <IconButton
                            size="small"
                            onClick={() => navigate(-1)}
                            sx={{
                                bgcolor: isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,0.5)",
                                "&:hover": { bgcolor: isDark ? "rgba(148,163,184,0.2)" : "rgba(226,232,240,0.8)" },
                            }}
                        >
                            <ArrowBackOutlinedIcon sx={{ fontSize: 18 }} />
                        </IconButton>
                        <Box>
                            <Stack direction="row" spacing={1} alignItems="center">
                                <Typography
                                    variant="h6"
                                    sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}
                                >
                                    Dispatch {dispatch.id}
                                </Typography>
                                <Chip
                                    size="small"
                                    label={dispatch.statusLabel}
                                    sx={{
                                        height: 22,
                                        fontSize: 11,
                                        borderRadius: 999,
                                        bgcolor: statusStyle.bg,
                                        color: statusStyle.color,
                                        fontWeight: 600,
                                    }}
                                />
                            </Stack>
                            <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                                {dispatch.type} · Created {dispatch.createdAt}
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack direction="row" spacing={1}>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<SwapHorizOutlinedIcon sx={{ fontSize: 16 }} />}
                            onClick={handleReassign}
                            sx={{
                                borderRadius: 999,
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Reassign
                        </Button>
                        <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            startIcon={<CancelOutlinedIcon sx={{ fontSize: 16 }} />}
                            onClick={handleCancel}
                            sx={{
                                borderRadius: 999,
                                textTransform: "none",
                                fontWeight: 600,
                            }}
                        >
                            Cancel
                        </Button>
                    </Stack>
                </Box>

                {/* Main Content Grid */}
                <Box className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    {/* Left Column - Details */}
                    <Box className="lg:col-span-2 space-y-4">
                        {/* Trip Details Card */}
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            }}
                        >
                            <CardContent sx={{ p: 2.5 }}>
                                <Stack direction="row" spacing={1} alignItems="center" mb={2}>
                                    <Box sx={{ p: 0.75, borderRadius: 1.5, bgcolor: `${EVZONE_GREEN}12`, color: EVZONE_GREEN }}>
                                        {getServiceIcon(dispatch.type)}
                                    </Box>
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                        Trip Details
                                    </Typography>
                                </Stack>

                                <Stack spacing={2}>
                                    {/* Pickup */}
                                    <Box>
                                        <Stack direction="row" spacing={1} alignItems="flex-start">
                                            <LocationOnOutlinedIcon sx={{ fontSize: 18, color: EVZONE_GREEN, mt: 0.25 }} />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="caption" sx={{ color: EVZONE_GREY, fontWeight: 600 }}>
                                                    PICKUP
                                                </Typography>
                                                <Typography variant="body2" fontWeight={600} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                                    {dispatch.pickup.address}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                    <AccessTimeOutlinedIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: "middle" }} />
                                                    {dispatch.pickup.time}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>

                                    <Divider />

                                    {/* Dropoff */}
                                    <Box>
                                        <Stack direction="row" spacing={1} alignItems="flex-start">
                                            <LocationOnOutlinedIcon sx={{ fontSize: 18, color: EVZONE_ORANGE, mt: 0.25 }} />
                                            <Box sx={{ flex: 1 }}>
                                                <Typography variant="caption" sx={{ color: EVZONE_GREY, fontWeight: 600 }}>
                                                    DROPOFF
                                                </Typography>
                                                <Typography variant="body2" fontWeight={600} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                                    {dispatch.dropoff.address}
                                                </Typography>
                                                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                    <AccessTimeOutlinedIcon sx={{ fontSize: 12, mr: 0.5, verticalAlign: "middle" }} />
                                                    {dispatch.dropoff.time}
                                                </Typography>
                                            </Box>
                                        </Stack>
                                    </Box>

                                    <Divider />

                                    {/* Fare */}
                                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                                        <Typography variant="body2" sx={{ color: EVZONE_GREY }}>Estimated Fare</Typography>
                                        <Typography variant="h6" fontWeight={800} sx={{ color: EVZONE_GREEN }}>
                                            {dispatch.fare.currency} {dispatch.fare.total.toLocaleString()}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Status Timeline */}
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            }}
                        >
                            <CardContent sx={{ p: 2.5 }}>
                                <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
                                    <Typography variant="subtitle1" fontWeight={700} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                        Status Timeline
                                    </Typography>
                                    <IconButton size="small">
                                        <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
                                    </IconButton>
                                </Stack>

                                <Stepper activeStep={activeStep} orientation="vertical" sx={{ ml: -1 }}>
                                    {dispatch.timeline.map((step, index) => (
                                        <Step key={step.step} completed={step.completed}>
                                            <StepLabel
                                                optional={
                                                    <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                                        {step.time}
                                                    </Typography>
                                                }
                                                sx={{
                                                    "& .MuiStepLabel-label": {
                                                        fontWeight: step.completed ? 600 : 400,
                                                        color: step.completed ? (isDark ? "#e5e7eb" : "#111827") : EVZONE_GREY,
                                                    },
                                                }}
                                            >
                                                {step.step}
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </CardContent>
                        </Card>
                    </Box>

                    {/* Right Column - People */}
                    <Box className="space-y-4">
                        {/* Customer Card */}
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY, fontWeight: 600, display: "block", mb: 1.5 }}>
                                    CUSTOMER
                                </Typography>
                                <Stack direction="row" spacing={1.5} alignItems="center" mb={1.5}>
                                    <Avatar sx={{ width: 40, height: 40, bgcolor: `${EVZONE_GREEN}20`, color: EVZONE_GREEN }}>
                                        <PersonOutlineOutlinedIcon />
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Typography variant="body2" fontWeight={600} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                            {dispatch.customer.name}
                                        </Typography>
                                        <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                            {dispatch.customer.phone}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<PhoneOutlinedIcon sx={{ fontSize: 14 }} />}
                                        onClick={() => handleCall(dispatch.customer.phone)}
                                        sx={{ flex: 1, borderRadius: 999, textTransform: "none", fontSize: 12 }}
                                    >
                                        Call
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<ChatOutlinedIcon sx={{ fontSize: 14 }} />}
                                        onClick={handleChat}
                                        sx={{ flex: 1, borderRadius: 999, textTransform: "none", fontSize: 12 }}
                                    >
                                        Chat
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>

                        {/* Driver Card */}
                        <Card
                            elevation={0}
                            sx={{
                                borderRadius: 3,
                                backgroundColor: isDark ? "rgba(2,6,23,0.6)" : "rgba(255,255,255,0.8)",
                                border: `1px solid ${isDark ? "rgba(148,163,184,0.1)" : "rgba(226,232,240,1)"}`,
                            }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY, fontWeight: 600, display: "block", mb: 1.5 }}>
                                    DRIVER
                                </Typography>
                                <Stack direction="row" spacing={1.5} alignItems="center" mb={1}>
                                    <Avatar sx={{ width: 40, height: 40, bgcolor: `${EVZONE_ORANGE}20`, color: EVZONE_ORANGE }}>
                                        <PersonOutlineOutlinedIcon />
                                    </Avatar>
                                    <Box sx={{ flex: 1 }}>
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            <Typography variant="body2" fontWeight={600} sx={{ color: isDark ? "#e5e7eb" : "#111827" }}>
                                                {dispatch.driver.name}
                                            </Typography>
                                            <Chip
                                                size="small"
                                                label={`★ ${dispatch.driver.rating}`}
                                                sx={{
                                                    height: 18,
                                                    fontSize: 10,
                                                    borderRadius: 999,
                                                    bgcolor: "rgba(250,204,21,0.15)",
                                                    color: "#92400e",
                                                }}
                                            />
                                        </Stack>
                                        <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                                            {dispatch.driver.vehicle}
                                        </Typography>
                                    </Box>
                                </Stack>
                                <Typography variant="caption" sx={{ color: EVZONE_GREY, display: "block", mb: 1.5 }}>
                                    {dispatch.driver.phone}
                                </Typography>
                                <Stack direction="row" spacing={1}>
                                    <Button
                                        size="small"
                                        variant="outlined"
                                        startIcon={<PhoneOutlinedIcon sx={{ fontSize: 14 }} />}
                                        onClick={() => handleCall(dispatch.driver.phone)}
                                        sx={{ flex: 1, borderRadius: 999, textTransform: "none", fontSize: 12 }}
                                    >
                                        Call
                                    </Button>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        startIcon={<SwapHorizOutlinedIcon sx={{ fontSize: 14 }} />}
                                        onClick={handleReassign}
                                        sx={{
                                            flex: 1,
                                            borderRadius: 999,
                                            textTransform: "none",
                                            fontSize: 12,
                                            bgcolor: EVZONE_GREEN,
                                            "&:hover": { bgcolor: "#02b57a" },
                                        }}
                                    >
                                        Reassign
                                    </Button>
                                </Stack>
                            </CardContent>
                        </Card>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}
