import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Stack,
  Chip,
  Button,
  Grid,
  Divider,
  Tabs,
  Tab,
  Alert,
} from "@mui/material";
import PageBreadcrumb from "../../components/shared/PageBreadcrumb";
import { useTheme } from "@mui/material/styles";
import { useParams } from "react-router-dom";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import GavelOutlinedIcon from "@mui/icons-material/GavelOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Storage key for syncing status between pages
const STORAGE_KEY = "evzone_driver_onboarding_status";

// Route target: /agent/onboarding/drivers/:driverId
// Placeholder data; in real app load via driverId.
const driver = {
  id: "DRV-102",
  name: "Kato Robert",
  city: "Kampala",
  phone: "+256 704 000 111",
  email: "kato.robert@example.com",
  company: "EVzone Fleet",
  services: "Ride & Delivery",
  vehicle: "Nissan Leaf · UBF 341X",
  createdAt: "Today · 08:42",
  stage: "Docs pending review",
};

export default function AgentDriverOnboardingCasePage() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const { driverId } = useParams();

  const [driverState, setDriverState] = useState(driver);
  const [tab, setTab] = useState("summary");
  const [decision, setDecision] = useState("pending");

  const handleTabChange = (event, value) => {
    if (value) setTab(value);
  };

  // Sync status to sessionStorage so queue page can pick it up
  const syncStatusToStorage = (dId: string, status: string) => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      const parsed = stored ? JSON.parse(stored) : {};
      parsed[dId] = status;
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch { /* ignore */ }
  };

  const handleDecision = (value) => {
    setDecision(value);

    // Update local driver state to reflect decision immediately
    let newStatus = "Under Review";
    let newStage = driverState.stage;
    if (value === "approve") {
      newStatus = "Approved";
      newStage = "Onboarding complete";
    } else if (value === "reject") {
      newStatus = "Rejected";
      newStage = "Rejected by safety";
    } else if (value === "more-info") {
      newStatus = "Needs Info";
      newStage = "Extra info required";
    } else if (value === "pending") {
      newStatus = "Awaiting Review";
      newStage = "Docs pending review";
    }

    setDriverState({ ...driverState, stage: newStage });

    // Sync to sessionStorage using the driver ID from URL or fallback
    const effectiveId = driverId || driverState.id;
    syncStatusToStorage(effectiveId, newStatus);
  };

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4">
      <Box className="w-full">
        {/* Breadcrumb Navigation */}
        <PageBreadcrumb
          items={[{ label: "Onboarding", href: "/agent/onboarding" }]}
          current={`Driver Case ${driver.id}`}
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
              Driver onboarding case
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: EVZONE_GREY, maxWidth: 520 }}
            >
              Review this driver&apos;s information, documents, face match and
              training before making a final decision.
            </Typography>
          </Box>

          <Stack spacing={0.5} alignItems="flex-end">
            <Chip
              label={driverState.stage}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor:
                  driverState.stage === "Onboarding complete" ? "rgba(22,163,74,0.12)" :
                    driverState.stage === "Rejected by safety" ? "rgba(239,68,68,0.12)" :
                      "rgba(56,189,248,0.18)",
                color:
                  driverState.stage === "Onboarding complete" ? "#166534" :
                    driverState.stage === "Rejected by safety" ? "#b91c1c" :
                      "#0369a1",
                border:
                  driverState.stage === "Onboarding complete" ? "1px solid rgba(34,197,94,0.6)" :
                    driverState.stage === "Rejected by safety" ? "1px solid rgba(239,68,68,0.6)" :
                      "1px solid rgba(56,189,248,0.6)",
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              {driverState.createdAt}
            </Typography>
          </Stack>
        </Box>

        {/* Decision Status Banner */}
        {decision !== "pending" && (
          <Alert
            severity={decision === "approve" ? "success" : decision === "reject" ? "error" : "info"}
            sx={{
              mb: 2,
              borderRadius: 2,
              fontWeight: 600,
              "& .MuiAlert-icon": { fontSize: 20 },
            }}
          >
            {decision === "approve" && `Driver ${driver.name} has been APPROVED and can now go online.`}
            {decision === "reject" && `Driver ${driver.name} has been REJECTED. They will be notified via email.`}
            {decision === "more-info" && `More information requested from ${driver.name}. Driver will receive a notification.`}
          </Alert>
        )}

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
          <CardContent sx={{ p: 0 }}>
            <Tabs
              value={tab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom:
                  "1px solid " +
                  (isDark
                    ? "rgba(30,64,175,0.7)"
                    : "rgba(226,232,240,1)"),
                px: 1.5,
              }}
            >
              <Tab
                value="summary"
                icon={<PersonOutlineOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                label="Summary"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="documents"
                icon={<DescriptionOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                label="Documents"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="identity"
                icon={<VerifiedUserOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                label="Identity & face"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="training"
                icon={<SchoolOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                label="Training"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
              <Tab
                value="decision"
                icon={<GavelOutlinedIcon sx={{ fontSize: 16 }} />}
                iconPosition="start"
                label="Decision"
                sx={{ textTransform: "none", fontSize: 13, minHeight: 44 }}
              />
            </Tabs>

            <Box sx={{ p: 2.4 }}>
              {tab === "summary" && (
                <Grid container spacing={2.4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1.6}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Basic information
                      </Typography>
                      <Stack spacing={0.6}>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          Name
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 600,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {driver.name} ({driver.id})
                        </Typography>
                      </Stack>
                      <Stack spacing={0.6}>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          City
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {driver.city}
                        </Typography>
                      </Stack>
                      <Stack spacing={0.6}>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          Phone & email
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {driver.phone}
                        </Typography>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          {driver.email}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Stack spacing={1.6}>
                      <Typography
                        variant="subtitle2"
                        sx={{
                          fontWeight: 700,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        Company & services
                      </Typography>
                      <Stack spacing={0.6}>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          Company
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {driver.company}
                        </Typography>
                      </Stack>
                      <Stack spacing={0.6}>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          Services
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {driver.services}
                        </Typography>
                      </Stack>
                      <Stack spacing={0.6}>
                        <Typography
                          variant="caption"
                          sx={{ color: EVZONE_GREY }}
                        >
                          Primary vehicle
                        </Typography>
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          {driver.vehicle}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              )}

              {tab === "documents" && (
                <Grid container spacing={2.4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Identity documents
                    </Typography>
                    <Stack spacing={1}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            National ID
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            Front & back uploaded
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label="Clear"
                          sx={{
                            borderRadius: 999,
                            fontSize: 11,
                            textTransform: "none",
                            backgroundColor: "rgba(22,163,74,0.12)",
                            color: "#166534",
                            border: "1px solid rgba(34,197,94,0.6)",
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            Driver licence
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            Expiry: 2027-03-12
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label="Check expiry"
                          sx={{
                            borderRadius: 999,
                            fontSize: 11,
                            textTransform: "none",
                            backgroundColor: "rgba(250,204,21,0.16)",
                            color: "#92400e",
                            border: "1px solid rgba(250,204,21,0.5)",
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Vehicle documents
                    </Typography>
                    <Stack spacing={1}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            Logbook / registration
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            EV confirmed (no ICE)
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label="EV only"
                          sx={{
                            borderRadius: 999,
                            fontSize: 11,
                            textTransform: "none",
                            backgroundColor: "rgba(240,253,250,1)",
                            color: "#047857",
                            border: "1px solid rgba(34,197,94,0.6)",
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Box>
                          <Typography
                            variant="body2"
                            sx={{
                              fontWeight: 500,
                              color: isDark ? "#e5e7eb" : "#111827",
                            }}
                          >
                            Insurance
                          </Typography>
                          <Typography
                            variant="caption"
                            sx={{ color: EVZONE_GREY }}
                          >
                            Comprehensive · valid
                          </Typography>
                        </Box>
                        <Chip
                          size="small"
                          label="Clear"
                          sx={{
                            borderRadius: 999,
                            fontSize: 11,
                            textTransform: "none",
                            backgroundColor: "rgba(22,163,74,0.12)",
                            color: "#166534",
                            border: "1px solid rgba(34,197,94,0.6)",
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Grid>
                </Grid>
              )}

              {tab === "identity" && (
                <Grid container spacing={2.4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Face match
                    </Typography>
                    <Stack spacing={0.8}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        System face match score
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 600,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        92% (above threshold)
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Check that the selfie and ID photo match visually,
                        and that the driver appears the same in any other
                        documents.
                      </Typography>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Manual flags
                    </Typography>
                    <Stack spacing={0.8}>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        Suspicious signs
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 500,
                          color: isDark ? "#e5e7eb" : "#111827",
                        }}
                      >
                        None noted
                      </Typography>
                      <Typography
                        variant="caption"
                        sx={{ color: EVZONE_GREY }}
                      >
                        If you suspect impersonation, do not approve this
                        driver. Escalate to your safety / fraud process.
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              )}

              {tab === "training" && (
                <Grid container spacing={2.4}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Core modules
                    </Typography>
                    <Stack spacing={0.8}>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          EVzone introduction
                        </Typography>
                        <Chip
                          size="small"
                          label="Completed"
                          sx={{
                            borderRadius: 999,
                            fontSize: 11,
                            textTransform: "none",
                            backgroundColor: "rgba(22,163,74,0.12)",
                            color: "#166534",
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          EV basics & charging
                        </Typography>
                        <Chip
                          size="small"
                          label="Completed"
                          sx={{
                            borderRadius: 999,
                            fontSize: 11,
                            textTransform: "none",
                            backgroundColor: "rgba(22,163,74,0.12)",
                            color: "#166534",
                          }}
                        />
                      </Stack>
                      <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                      >
                        <Typography
                          variant="body2"
                          sx={{
                            fontWeight: 500,
                            color: isDark ? "#e5e7eb" : "#111827",
                          }}
                        >
                          Safety & incident reporting
                        </Typography>
                        <Chip
                          size="small"
                          label="Pending quiz"
                          sx={{
                            borderRadius: 999,
                            fontSize: 11,
                            textTransform: "none",
                            backgroundColor: "rgba(250,204,21,0.16)",
                            color: "#92400e",
                          }}
                        />
                      </Stack>
                    </Stack>
                  </Grid>

                  <Grid size={{ xs: 12, md: 6 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Next steps
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
                    >
                      You can require the driver to complete pending modules
                      before activation.
                    </Typography>
                    <Stack direction="row" spacing={1.5}>
                      <Button
                        variant="outlined"
                        size="small"
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontSize: 13,
                        }}
                      >
                        Require completion
                      </Button>
                      <Button
                        variant="text"
                        size="small"
                        sx={{
                          textTransform: "none",
                          fontSize: 13,
                          color: EVZONE_GREY,
                        }}
                      >
                        View training history
                      </Button>
                    </Stack>
                  </Grid>
                </Grid>
              )}

              {tab === "decision" && (
                <Grid container spacing={2.4}>
                  <Grid size={{ xs: 12, md: 7 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Final decision
                    </Typography>
                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY, display: "block", mb: 1.5 }}
                    >
                      Approve if documents are clear, identity is verified and
                      training requirements are met. Otherwise reject or
                      request more information.
                    </Typography>

                    <Stack direction="row" spacing={1.5}>
                      <Button
                        variant={
                          decision === "approve" ? "contained" : "outlined"
                        }
                        size="small"
                        onClick={() => handleDecision("approve")}
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontSize: 13,
                          fontWeight: 600,
                          backgroundColor:
                            decision === "approve"
                              ? EVZONE_GREEN
                              : "transparent",
                          color:
                            decision === "approve"
                              ? "#020617"
                              : (isDark ? "#e5e7eb" : "#111827"),
                          borderColor: EVZONE_GREEN,
                        }}
                      >
                        Approve driver
                      </Button>
                      <Button
                        variant={
                          decision === "more-info" ? "contained" : "outlined"
                        }
                        size="small"
                        onClick={() => handleDecision("more-info")}
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontSize: 13,
                          fontWeight: 600,
                        }}
                      >
                        Request more info
                      </Button>
                      <Button
                        variant={
                          decision === "pending" ? "contained" : "outlined"
                        }
                        size="small"
                        onClick={() => handleDecision("pending")}
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontSize: 13,
                          fontWeight: 600,
                          color: decision === "pending" ? "#fff" : "inherit", // visual feedback
                          backgroundColor: decision === "pending" ? EVZONE_GREY : "transparent",
                          borderColor: EVZONE_GREY,
                        }}
                      >
                        Mark Pending
                      </Button>
                      <Button
                        variant={
                          decision === "reject" ? "contained" : "outlined"
                        }
                        size="small"
                        onClick={() => handleDecision("reject")}
                        sx={{
                          borderRadius: 999,
                          textTransform: "none",
                          fontSize: 13,
                          fontWeight: 600,
                          borderColor: "rgba(248,113,113,0.7)",
                          color:
                            decision === "reject"
                              ? "#fee2e2"
                              : "#b91c1c",
                          backgroundColor:
                            decision === "reject"
                              ? "#b91c1c"
                              : "transparent",
                        }}
                      >
                        Reject driver
                      </Button>
                    </Stack>

                    <Typography
                      variant="caption"
                      sx={{ color: EVZONE_GREY, display: "block", mt: 1.5 }}
                    >
                      Your decision and any notes will be visible to other
                      internal teams.
                    </Typography>
                  </Grid>

                  <Grid size={{ xs: 12, md: 5 }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        fontWeight: 700,
                        color: isDark ? "#e5e7eb" : "#111827",
                        mb: 1,
                      }}
                    >
                      Quick checklist
                    </Typography>
                    <ul className="text-xs text-slate-500 dark:text-slate-400 list-disc list-inside space-y-1">
                      <li>ID and licence images are clear and valid.</li>
                      <li>Vehicle registration confirms EV (no ICE).</li>
                      <li>Face match score acceptable and no fraud signs.</li>
                      <li>Core training modules are completed or required.</li>
                      <li>No safety or compliance flags on this driver.</li>
                    </ul>
                  </Grid>
                </Grid>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
