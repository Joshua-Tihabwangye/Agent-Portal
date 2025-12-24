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
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DirectionsCarOutlinedIcon from "@mui/icons-material/DirectionsCarOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import DirectionsBusOutlinedIcon from "@mui/icons-material/DirectionsBusOutlined";
import TourOutlinedIcon from "@mui/icons-material/TourOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import BusinessCenterOutlinedIcon from "@mui/icons-material/BusinessCenterOutlined";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

const previewEntities = [
  {
    id: "R-1001",
    type: "rider",
    title: "Sarah K.",
    subtitle: "Rider · Kampala",
    meta: "7 trips · Rating 4.8",
  },
  {
    id: "D-220",
    type: "driver",
    title: "Kato Robert",
    subtitle: "Driver · Nissan Leaf · UBF 341X",
    meta: "Online · 72% battery",
  },
  {
    id: "BK-2048",
    type: "trip",
    title: "Trip BK-2048",
    subtitle: "Ride · Nakasero Hill → Bugolobi",
    meta: "Today · 09:12",
  },
];

function getTypeIcon(type) {
  switch (type) {
    case "rider":
      return <PersonOutlineOutlinedIcon sx={{ fontSize: 18 }} />;
    case "driver":
      return <DirectionsCarOutlinedIcon sx={{ fontSize: 18 }} />;
    case "trip":
      return <DirectionsCarOutlinedIcon sx={{ fontSize: 18 }} />;
    case "delivery":
      return <LocalShippingOutlinedIcon sx={{ fontSize: 18 }} />;
    case "rental":
      return <DirectionsCarOutlinedIcon sx={{ fontSize: 18 }} />;
    case "tour":
      return <TourOutlinedIcon sx={{ fontSize: 18 }} />;
    case "ems":
      return <LocalHospitalOutlinedIcon sx={{ fontSize: 18 }} />;
    case "ticket":
      return <ReceiptLongOutlinedIcon sx={{ fontSize: 18 }} />;
    case "incident":
      return <WarningAmberOutlinedIcon sx={{ fontSize: 18 }} />;
    case "company":
      return <BusinessCenterOutlinedIcon sx={{ fontSize: 18 }} />;
    default:
      return null;
  }
}

export function SearchResultRow({ entity, onAttachToTicket, onAttachToIncident }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const handleAttachTicket = () => {
    if (onAttachToTicket) onAttachToTicket(entity);
    else console.log("Attach to current ticket", entity);
  };

  const handleAttachIncident = () => {
    if (onAttachToIncident) onAttachToIncident(entity);
    else console.log("Attach to current incident", entity);
  };

  return (
    <Box
      className="rounded-2xl px-3 py-2.5 mb-1 cursor-pointer"
      sx={{
        backgroundColor: isDark
          ? "rgba(15,23,42,0.9)"
          : "rgba(248,250,252,0.95)",
        border: "1px solid rgba(203,213,225,0.9)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 1.5,
        "&:hover": {
          borderColor: EVZONE_GREEN,
          boxShadow: "0 10px 20px rgba(15,23,42,0.08)",
        },
      }}
    >
      <Box className="flex items-start gap-2.5">
        <Box
          className="flex items-center justify-center rounded-full mt-0.5"
          sx={{
            width: 28,
            height: 28,
            backgroundColor: "rgba(15,23,42,0.06)",
            color: isDark ? "#e5e7eb" : "#0f172a",
          }}
        >
          {getTypeIcon(entity.type)}
        </Box>
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.2}>
            <Typography
              variant="body2"
              sx={{
                fontWeight: 600,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              {entity.title}
            </Typography>
            <Chip
              size="small"
              label={entity.type.toUpperCase()}
              sx={{
                borderRadius: 999,
                fontSize: 10,
                textTransform: "none",
                backgroundColor: "rgba(248,250,252,1)",
                color: EVZONE_GREY,
              }}
            />
          </Stack>
          <Typography
            variant="caption"
            sx={{ color: EVZONE_GREY, display: "block" }}
          >
            {entity.subtitle}
          </Typography>
          {entity.meta && (
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY, display: "block", mt: 0.25 }}
            >
              {entity.meta}
            </Typography>
          )}
        </Box>
      </Box>

      <Stack spacing={0.5} alignItems="flex-end" mt={0.5}>
        <Button
          size="small"
          variant="outlined"
          startIcon={<LinkOutlinedIcon sx={{ fontSize: 16 }} />}
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontSize: 11,
            py: 0.3,
            px: 1.5,
          }}
          onClick={handleAttachTicket}
        >
          Attach to ticket
        </Button>
        <Button
          size="small"
          variant="text"
          sx={{
            textTransform: "none",
            fontSize: 11,
            color: EVZONE_GREY,
            minWidth: 0,
          }}
          onClick={handleAttachIncident}
        >
          Attach to incident
        </Button>
      </Stack>
    </Box>
  );
}

// Preview wrapper for the SearchResultRow component in isolation.
export default function AgentSearchResultRowPreview() {
  const [lastAttach, setLastAttach] = useState<string | null>(null);

  const handleAttachTicket = (entity) => {
    console.log("Attach to ticket from preview", entity.id);
    setLastAttach(`Attached ${entity.id} to ticket`);
  };

  const handleAttachIncident = (entity) => {
    console.log("Attach to incident from preview", entity.id);
    setLastAttach(`Attached ${entity.id} to incident`);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4 flex flex-col items-center">
      <Box className="w-full max-width-md">
        <Card
          elevation={1}
          sx={{
            borderRadius: 3,
            backgroundColor: "#ffffff",
            border: "1px solid rgba(226,232,240,1)",
            maxWidth: 640,
            mb: 2,
          }}
        >
          <CardContent sx={{ p: 2.4 }}>
            <Typography
              variant="subtitle2"
              sx={{ fontWeight: 700, mb: 1 }}
            >
              Search result row (preview)
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY, display: "block", mb: 1.5 }}
            >
              Click on the attach actions to see how this row behaves when
              linking entities to the current ticket or incident.
            </Typography>
            <Stack spacing={1}>
              {previewEntities.map((e) => (
                <SearchResultRow
                  key={e.id}
                  entity={e}
                  onAttachToTicket={handleAttachTicket}
                  onAttachToIncident={handleAttachIncident}
                />
              ))}
            </Stack>
          </CardContent>
        </Card>

        {lastAttach && (
          <Typography
            variant="caption"
            sx={{ color: EVZONE_GREY }}
          >
            Last action: {lastAttach}
          </Typography>
        )}
      </Box>
    </Box>
  );
}
