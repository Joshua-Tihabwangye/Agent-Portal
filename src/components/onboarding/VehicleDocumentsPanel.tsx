import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import {
  deleteVehicleDocument,
  getVehicleDocumentLabel,
  getVehicleDocuments,
  REQUIRED_VEHICLE_DOCUMENT_TYPES,
  uploadVehicleDocument,
  type VehicleDocumentRecord,
  type VehicleDocumentType,
} from "../../features/vehicleDocuments/vehicleDocumentStore";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

type VehicleDocumentsPanelProps = {
  vehicleId: string;
  driverId?: string;
  title?: string;
  description?: string;
  editable?: boolean;
};

function getStatusChip(document: VehicleDocumentRecord): {
  label: string;
  backgroundColor: string;
  color: string;
  border: string;
} {
  switch (document.status) {
    case "expired":
      return {
        label: "Expired",
        backgroundColor: "rgba(239,68,68,0.12)",
        color: "#b91c1c",
        border: "1px solid rgba(239,68,68,0.45)",
      };
    case "verified":
      return {
        label: "Verified",
        backgroundColor: "rgba(22,163,74,0.12)",
        color: "#166534",
        border: "1px solid rgba(34,197,94,0.55)",
      };
    default:
      return {
        label: "Uploaded",
        backgroundColor: "rgba(59,130,246,0.12)",
        color: "#1d4ed8",
        border: "1px solid rgba(59,130,246,0.45)",
      };
  }
}

export default function VehicleDocumentsPanel({
  vehicleId,
  driverId,
  title = "Vehicle documents",
  description = "Upload and persist vehicle ownership documents for this driver.",
  editable = true,
}: VehicleDocumentsPanelProps) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [records, setRecords] = useState<VehicleDocumentRecord[]>([]);
  const [documentType, setDocumentType] = useState<VehicleDocumentType>("logbook");
  const [expiryDate, setExpiryDate] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const missingTypes = useMemo(
    () =>
      REQUIRED_VEHICLE_DOCUMENT_TYPES.filter(
        (type) => !records.some((record) => record.documentType === type && record.status !== "expired")
      ),
    [records]
  );

  const isComplete = missingTypes.length === 0;

  const loadDocuments = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const stored = await getVehicleDocuments(vehicleId);
      setRecords(stored);
    } catch (loadError) {
      console.error("[vehicle-documents] failed to load documents", {
        vehicleId,
        loadError,
      });
      setError("Unable to load vehicle documents. Try again or refresh the page.");
    } finally {
      setLoading(false);
    }
  }, [vehicleId]);

  useEffect(() => {
    void loadDocuments();
    // Vehicle document changes can happen from another tab/page.
    const handleStorage = (event: StorageEvent) => {
      if (event.key?.includes("vehicle_documents")) {
        void loadDocuments();
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, [loadDocuments]);

  const handleChooseFile = () => {
    fileInputRef.current?.click();
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Choose a file before uploading.");
      return;
    }

    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const record = await uploadVehicleDocument({
        vehicleId,
        driverId,
        documentType,
        file: selectedFile,
        expiryDate: expiryDate || null,
      });

      setRecords((current) => {
        const withoutCurrent = current.filter((item) => item.documentType !== record.documentType);
        return [record, ...withoutCurrent].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      });
      setSelectedFile(null);
      setExpiryDate("");
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      setSuccess(`${getVehicleDocumentLabel(record.documentType)} saved for vehicle ${vehicleId}.`);
    } catch (uploadError) {
      console.error("[vehicle-documents] upload failed", {
        vehicleId,
        driverId,
        documentType,
        uploadError,
      });
      setError(uploadError instanceof Error ? uploadError.message : "Document upload failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleRemove = async (record: VehicleDocumentRecord) => {
    setSaving(true);
    setError(null);
    setSuccess(null);

    try {
      await deleteVehicleDocument(vehicleId, record.documentType);
      setRecords((current) => current.filter((item) => item.documentType !== record.documentType));
      setSuccess(`${getVehicleDocumentLabel(record.documentType)} removed.`);
    } catch (removeError) {
      console.error("[vehicle-documents] delete failed", {
        vehicleId,
        driverId,
        documentType: record.documentType,
        removeError,
      });
      setError(removeError instanceof Error ? removeError.message : "Failed to remove document.");
    } finally {
      setSaving(false);
    }
  };

  const handlePreview = (record: VehicleDocumentRecord) => {
    const previewUrl = URL.createObjectURL(record.blob);
    const previewWindow = window.open(previewUrl, "_blank", "noopener,noreferrer");
    if (!previewWindow) {
      setError("Popup blocked while trying to preview the document.");
    }
    window.setTimeout(() => URL.revokeObjectURL(previewUrl), 60_000);
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: 3,
        backgroundColor: isDark ? "#020617" : "#ffffff",
        border: "1px solid " + (isDark ? "rgba(30,64,175,0.7)" : "rgba(226,232,240,1)"),
      }}
    >
      <CardContent sx={{ p: 2.2 }}>
        <Stack spacing={1.5}>
          <Stack direction="row" spacing={1.25} alignItems="center" justifyContent="space-between">
            <Stack direction="row" spacing={1.25} alignItems="center">
              <Box
                sx={{
                  width: 36,
                  height: 36,
                  borderRadius: 2,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(3,205,140,0.12)",
                  color: "#047857",
                }}
              >
                <DescriptionOutlinedIcon fontSize="small" />
              </Box>
              <Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}>
                  {title}
                </Typography>
                <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                  {description}
                </Typography>
              </Box>
            </Stack>

            <Chip
              label={isComplete ? "Vehicle setup complete" : `${missingTypes.length} document(s) missing`}
              size="small"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor: isComplete ? "rgba(22,163,74,0.12)" : "rgba(247,127,0,0.12)",
                color: isComplete ? "#166534" : "#9a3412",
                border: isComplete
                  ? "1px solid rgba(34,197,94,0.55)"
                  : "1px solid rgba(247,127,0,0.45)",
              }}
            />
          </Stack>

          <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
            Vehicle ID: {vehicleId}
            {driverId ? ` · Driver ID: ${driverId}` : ""}
          </Typography>

          {loading && <LinearProgress sx={{ borderRadius: 999 }} />}

          {error && (
            <Alert severity="error" sx={{ borderRadius: 2, fontSize: 13 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ borderRadius: 2, fontSize: 13 }}>
              {success}
            </Alert>
          )}

          {editable && (
            <>
              <Stack spacing={1.5}>
                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5}>
                  <FormControl fullWidth size="small">
                    <InputLabel id="vehicle-document-type-label">Document type</InputLabel>
                    <Select
                      labelId="vehicle-document-type-label"
                      value={documentType}
                      label="Document type"
                      onChange={(event) => setDocumentType(event.target.value as VehicleDocumentType)}
                    >
                      {REQUIRED_VEHICLE_DOCUMENT_TYPES.map((type) => (
                        <MenuItem key={type} value={type}>
                          {getVehicleDocumentLabel(type)}
                        </MenuItem>
                      ))}
                      <MenuItem value="other">{getVehicleDocumentLabel("other")}</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Expiry date"
                    value={expiryDate}
                    onChange={(event) => setExpiryDate(event.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Stack>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems={{ sm: "center" }}>
                  <Button
                    variant="outlined"
                    startIcon={<UploadFileOutlinedIcon />}
                    onClick={handleChooseFile}
                    sx={{ borderRadius: 999, textTransform: "none" }}
                  >
                    {selectedFile ? selectedFile.name : "Choose file"}
                  </Button>

                  <Button
                    variant="contained"
                    disabled={!selectedFile || saving}
                    onClick={handleUpload}
                    sx={{
                      borderRadius: 999,
                      textTransform: "none",
                      backgroundColor: EVZONE_GREEN,
                      color: "#020617",
                      fontWeight: 700,
                      "&:hover": { backgroundColor: "#10b981" },
                    }}
                  >
                    {saving ? "Saving..." : "Save document"}
                  </Button>

                  <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                    Accepts PDF, image, or scanned document files.
                  </Typography>
                </Stack>

                <input
                  ref={fileInputRef}
                  type="file"
                  hidden
                  accept="application/pdf,image/*"
                  onChange={(event) => {
                    const file = event.target.files?.[0] ?? null;
                    setSelectedFile(file);
                    if (file) setError(null);
                  }}
                />
              </Stack>

              <Divider />
            </>
          )}

          <Stack spacing={1}>
            {records.length === 0 ? (
              <Typography variant="body2" sx={{ color: EVZONE_GREY }}>
                No vehicle documents have been uploaded for this vehicle.
              </Typography>
            ) : (
              records.map((record) => {
                const chip = getStatusChip(record);
                return (
                  <Card
                    key={record.id}
                    variant="outlined"
                    sx={{
                      borderRadius: 2,
                      borderColor: isDark ? "rgba(51,65,85,0.9)" : "rgba(226,232,240,1)",
                      backgroundColor: isDark ? "rgba(15,23,42,0.85)" : "#f8fafc",
                    }}
                  >
                    <CardContent sx={{ p: 1.75, "&:last-child": { pb: 1.75 } }}>
                      <Stack spacing={1}>
                        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#e5e7eb" : "#111827" }}>
                              {getVehicleDocumentLabel(record.documentType)}
                            </Typography>
                            <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                              {record.documentName}
                            </Typography>
                          </Box>
                          <Chip
                            size="small"
                            label={chip.label}
                            sx={{
                              borderRadius: 999,
                              fontSize: 11,
                              textTransform: "none",
                              backgroundColor: chip.backgroundColor,
                              color: chip.color,
                              border: chip.border,
                            }}
                          />
                        </Stack>

                        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" spacing={1}>
                          <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                            Expiry: {record.expiryDate || "Not set"}
                          </Typography>
                          <Typography variant="caption" sx={{ color: EVZONE_GREY }}>
                            Uploaded: {new Date(record.uploadedAt).toLocaleString()}
                          </Typography>
                        </Stack>

                        <Stack direction="row" spacing={1}>
                          <Button
                            size="small"
                            startIcon={<VisibilityOutlinedIcon />}
                            onClick={() => handlePreview(record)}
                            sx={{ textTransform: "none", borderRadius: 999 }}
                          >
                            View
                          </Button>
                          {editable && (
                            <Button
                              size="small"
                              startIcon={<DeleteOutlineOutlinedIcon />}
                              onClick={() => handleRemove(record)}
                              sx={{ textTransform: "none", borderRadius: 999, color: EVZONE_ORANGE }}
                            >
                              Remove
                            </Button>
                          )}
                        </Stack>
                      </Stack>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
