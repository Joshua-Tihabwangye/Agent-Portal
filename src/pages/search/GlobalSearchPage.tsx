import React, { useState, useMemo } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  TextField,
  IconButton,
  Tabs,
  Tab,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import { useTheme } from "@mui/material/styles";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import FilterListOutlinedIcon from "@mui/icons-material/FilterListOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
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

const sampleEntities = [
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
  {
    id: "BK-2051",
    type: "delivery",
    title: "Delivery · BK-2051",
    subtitle: "Parcel · EVzone Hub → Makerere Hostel",
    meta: "Today · 08:20",
  },
  {
    id: "BK-3002",
    type: "rental",
    title: "Rental · BK-3002",
    subtitle: "EV sedan · CBD Hub · Daily",
    meta: "Tomorrow · 10:00",
  },
  {
    id: "BK-4001",
    type: "tour",
    title: "Tour · BK-4001",
    subtitle: "Jinja Nile day trip · 6 pax",
    meta: "Next week · 07:30",
  },
  {
    id: "BK-2060",
    type: "ems",
    title: "EMS · BK-2060",
    subtitle: "Ntinda Junction → Mulago Hospital",
    meta: "SOS triggered · 09:05",
  },
  {
    id: "TCK-9012",
    type: "ticket",
    title: "Ticket · TCK-9012",
    subtitle: "Trip issue · Driver late to pickup",
    meta: "New · SLA 15 min",
  },
  {
    id: "INC-7001",
    type: "incident",
    title: "Incident · INC-7001",
    subtitle: "High severity · Driver reports aggressive rider",
    meta: "Under review · Safety",
  },
  {
    id: "CO-5001",
    type: "company",
    title: "EVzone Fleet",
    subtitle: "Corporate account · 25 drivers",
    meta: "Kampala · High volume",
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

function SearchResultRow({ entity, onAttachToTicket, onAttachToIncident }: { entity: any; onAttachToTicket?: (e: any) => void; onAttachToIncident?: (e: any) => void }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const navigate = useNavigate();

  const handleAttachTicket = () => {
    if (onAttachToTicket) {
      onAttachToTicket(entity);
    } else {
      // Navigate to create ticket with this entity context
      const params = new URLSearchParams();
      if (entity.type === 'driver') params.append('driverId', entity.id);
      else if (entity.type === 'rider') params.append('riderId', entity.id);
      else if (entity.title) params.append('subject', `Regarding ${entity.title}`);

      navigate(`/agent/support/tickets/new?${params.toString()}`);
    }
  };

  const handleAttachIncident = () => {
    if (onAttachToIncident) {
      onAttachToIncident(entity);
    } else {
      // Navigate to create incident with this entity context
      const params = new URLSearchParams();
      params.append('relatedEntityId', entity.id);
      params.append('relatedEntityType', entity.type);
      navigate(`/agent/safety/incidents/new?${params.toString()}`);
    }
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
        flexDirection: { xs: "column", sm: "row" },
        alignItems: { xs: "stretch", sm: "flex-start" },
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

      <Stack
        spacing={0.5}
        direction="row"
        alignItems="center"
        justifyContent={{ xs: "flex-end", sm: "flex-end" }}
        mt={{ xs: 1, sm: 0.5 }}
      >
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

export default function AgentGlobalSearchPage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [query, setQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");

  const filtered = useMemo(
    () =>
      sampleEntities.filter((e) => {
        const matchesQuery =
          !query ||
          e.id.toLowerCase().includes(query.toLowerCase()) ||
          e.title.toLowerCase().includes(query.toLowerCase()) ||
          e.subtitle.toLowerCase().includes(query.toLowerCase());
        const matchesType = typeFilter === "all" || e.type === typeFilter;
        return matchesQuery && matchesType;
      }),
    [query, typeFilter]
  );

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="w-full">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[]}
          current="Global Search"
        />
        {/* Header */}
        <Box className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isDark ? "#e5e7eb" : "#111827",
              }}
            >
              Global search
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Search across riders, drivers, trips, deliveries, rentals,
              tours, EMS, tickets and incidents from a single place.
            </Typography>
          </Box>

          <Chip
            label="Across all data"
            size="small"
            sx={{
              borderRadius: 999,
              fontSize: 11,
              textTransform: "none",
              backgroundColor: isDark
                ? "rgba(15,23,42,0.9)"
                : "rgba(219,234,254,0.9)",
              border: "1px solid rgba(148,163,184,0.4)",
              color: isDark ? "#e5e7eb" : "#1e3a8a",
              fontWeight: 600,
            }}
          />
        </Box>

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
          <CardContent sx={{ p: 2.4 }}>
            <Stack spacing={2}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                justifyContent="space-between"
                alignItems={{ xs: "stretch", sm: "center" }}
              >
                <Stack direction="row" spacing={1} alignItems="center">
                  <SearchOutlinedIcon
                    sx={{ fontSize: 20, color: EVZONE_GREEN }}
                  />
                  <Typography
                    variant="subtitle2"
                    sx={{
                      fontWeight: 700,
                      color: isDark ? "#e5e7eb" : "#111827",
                    }}
                  >
                    Search across entities
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1} alignItems="center">
                  <TextField
                    size="small"
                    placeholder="Search id, name, phone or location"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    variant="outlined"
                    InputProps={{
                      startAdornment: (
                        <SearchOutlinedIcon
                          sx={{ fontSize: 18, color: EVZONE_GREY, mr: 1 }}
                        />
                      ),
                      sx: {
                        borderRadius: 999,
                      },
                    }}
                    sx={{ minWidth: 260 }}
                  />
                  <IconButton size="small">
                    <FilterListOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                  <IconButton size="small">
                    <RefreshOutlinedIcon sx={{ fontSize: 18 }} />
                  </IconButton>
                </Stack>
              </Stack>

              <Tabs
                value={tabFromFilter(typeFilter)}
                onChange={(e, value) => setTypeFilter(filterFromTab(value))}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                  borderBottom:
                    "1px solid " +
                    (isDark
                      ? "rgba(30,64,175,0.7)"
                      : "rgba(226,232,240,1)"),
                }}
              >
                <Tab
                  value="all"
                  label="All"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="rider"
                  label="Riders"
                  icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="driver"
                  label="Drivers"
                  icon={<DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="trip"
                  label="Trips"
                  icon={<DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="delivery"
                  label="Deliveries"
                  icon={<LocalShippingOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="rentals"
                  label="Rentals"
                  icon={<DirectionsCarOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="tours"
                  label="Tours"
                  icon={<TourOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="ems"
                  label="EMS"
                  icon={<LocalHospitalOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="ticket"
                  label="Tickets"
                  icon={<ReceiptLongOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="incident"
                  label="Incidents"
                  icon={<WarningAmberOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
                <Tab
                  value="company"
                  label="Companies"
                  icon={<BusinessCenterOutlinedIcon sx={{ fontSize: 16 }} />}
                  iconPosition="start"
                  sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
                />
              </Tabs>

              <Box>
                {filtered.length === 0 ? (
                  <Typography
                    variant="caption"
                    sx={{ color: EVZONE_GREY, fontStyle: "italic" }}
                  >
                    No results match your search.
                  </Typography>
                ) : (
                  filtered.map((entity) => (
                    <SearchResultRow
                      key={entity.id}
                      entity={entity}
                    />
                  ))
                )}
              </Box>
            </Stack>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

function tabFromFilter(filter) {
  return filter;
}

function filterFromTab(tab) {
  return tab || "all";
}
