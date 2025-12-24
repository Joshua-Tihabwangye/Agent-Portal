import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Stack,
  Typography,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Chip,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";

const EVZONE_GREEN = "#03cd8c";
const EVZONE_ORANGE = "#f77f00";
const EVZONE_GREY = "#6b7280";

// Standard dialog components for ticketing flows.
// In a real app these would be imported and controlled from Ticket Detail or queue pages.

export function ReplyDialog({ open, onClose, onSubmit }) {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";
  const [message, setMessage] = useState("");

  const handleSubmit = () => {
    if (!message.trim()) return;
    onSubmit?.(message);
    setMessage("");
  };

  const handleClose = () => {
    setMessage("");
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <SupportAgentOutlinedIcon sx={{ color: EVZONE_GREEN }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Reply to user
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="caption"
          sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
        >
          Keep your reply short, calm and clear. Do not promise anything you
          cannot guarantee.
        </Typography>
        <TextField
          autoFocus
          multiline
          minRows={4}
          fullWidth
          size="small"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your reply here..."
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size="small">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          size="small"
          disabled={!message.trim()}
          variant="contained"
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: message.trim()
              ? EVZONE_GREEN
              : "rgba(148,163,184,0.7)",
            "&:hover": {
              backgroundColor: message.trim() ? "#059669" : undefined,
            },
          }}
        >
          Send reply
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function MacroDialog({ open, onClose, onInsert }) {
  const [macroId, setMacroId] = useState("late-driver");

  const handleInsert = () => {
    onInsert?.(macroId);
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <LocalOfferOutlinedIcon sx={{ color: EVZONE_ORANGE }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Insert macro
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="caption"
          sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
        >
          Choose a template that matches the issue. You can still edit the
          message before sending.
        </Typography>
        <FormControl fullWidth size="small">
          <InputLabel>Macro</InputLabel>
          <Select
            value={macroId}
            label="Macro"
            onChange={(e) => setMacroId(e.target.value)}
          >
            <MenuItem value="late-driver">Driver arrived late</MenuItem>
            <MenuItem value="fare-adjustment">
              Fare adjustment with apology
            </MenuItem>
            <MenuItem value="payment-pending">Payment still pending</MenuItem>
            <MenuItem value="technical-issue">App technical issue</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size="small">
          Close
        </Button>
        <Button
          onClick={handleInsert}
          size="small"
          variant="contained"
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: EVZONE_GREEN,
            "&:hover": {
              backgroundColor: "#059669",
            },
          }}
        >
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function AdjustFareDialog({ open, onClose, onSubmit }) {
  const [amount, setAmount] = useState("");
  const [reason, setReason] = useState("");

  const handleSubmit = () => {
    if (!amount.trim() || !reason.trim()) return;
    onSubmit?.({ amount, reason });
    setAmount("");
    setReason("");
  };

  const handleClose = () => {
    setAmount("");
    setReason("");
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <PaymentsOutlinedIcon sx={{ color: EVZONE_ORANGE }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Adjust fare
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="caption"
          sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
        >
          Use small adjustments and explain why. Large adjustments may require
          supervisor approval.
        </Typography>
        <Stack spacing={1.2}>
          <TextField
            label="Adjustment amount"
            placeholder="Example: -UGX 3,000"
            size="small"
            fullWidth
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
          <TextField
            label="Reason"
            multiline
            minRows={3}
            fullWidth
            size="small"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size="small">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          size="small"
          disabled={!amount.trim() || !reason.trim()}
          variant="contained"
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            backgroundColor:
              amount.trim() && reason.trim()
                ? EVZONE_GREEN
                : "rgba(148,163,184,0.7)",
            "&:hover": {
              backgroundColor:
                amount.trim() && reason.trim() ? "#059669" : undefined,
            },
          }}
        >
          Save adjustment
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function EscalateDialog({ open, onClose, onSubmit }) {
  const [targetQueue, setTargetQueue] = useState("tier2");
  const [note, setNote] = useState("");

  const handleSubmit = () => {
    if (!note.trim()) return;
    onSubmit?.({ targetQueue, note });
    setNote("");
  };

  const handleClose = () => {
    setNote("");
    onClose?.();
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>
        <Stack direction="row" spacing={1} alignItems="center">
          <ReportProblemOutlinedIcon sx={{ color: "#b91c1c" }} />
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
            Escalate ticket
          </Typography>
        </Stack>
      </DialogTitle>
      <DialogContent dividers>
        <Typography
          variant="caption"
          sx={{ color: EVZONE_GREY, display: "block", mb: 1 }}
        >
          Provide enough context so the next team can act without calling the
          user again.
        </Typography>
        <Stack spacing={1.2}>
          <FormControl fullWidth size="small">
            <InputLabel>Escalate to</InputLabel>
            <Select
              value={targetQueue}
              label="Escalate to"
              onChange={(e) => setTargetQueue(e.target.value)}
            >
              <MenuItem value="tier2">Support Tier 2</MenuItem>
              <MenuItem value="safety">Safety team</MenuItem>
              <MenuItem value="finance">Finance</MenuItem>
              <MenuItem value="tech">Technical team</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Internal note"
            multiline
            minRows={4}
            fullWidth
            size="small"
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <Stack direction="row" spacing={1} alignItems="center">
            <Chip
              size="small"
              label="Internal only"
              sx={{
                borderRadius: 999,
                fontSize: 11,
                textTransform: "none",
                backgroundColor: "rgba(248,250,252,1)",
                color: EVZONE_GREY,
              }}
            />
            <Typography
              variant="caption"
              sx={{ color: EVZONE_GREY }}
            >
              The user will not see this escalation note.
            </Typography>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} size="small">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          size="small"
          disabled={!note.trim()}
          variant="contained"
          sx={{
            borderRadius: 999,
            textTransform: "none",
            fontSize: 13,
            fontWeight: 600,
            backgroundColor: note.trim()
              ? EVZONE_GREEN
              : "rgba(148,163,184,0.7)",
            "&:hover": {
              backgroundColor: note.trim() ? "#059669" : undefined,
            },
          }}
        >
          Escalate ticket
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Example wrapper just for canvas preview; in production you would
// import the individual dialogs and control them from the ticket detail page.
export default function AgentTicketActionDialogsPreview() {
  const [openReply, setOpenReply] = useState(false);
  const [openMacro, setOpenMacro] = useState(false);
  const [openAdjust, setOpenAdjust] = useState(false);
  const [openEscalate, setOpenEscalate] = useState(false);

  return (
    <Box className="min-h-screen bg-slate-50 dark:bg-slate-950 px-3 sm:px-6 py-4 flex items-center justify-center">
      <Stack spacing={1.5} direction="row" flexWrap="wrap" justifyContent="center">
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpenReply(true)}
          sx={{ borderRadius: 999, textTransform: "none", fontSize: 13 }}
        >
          Open Reply dialog
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpenMacro(true)}
          sx={{ borderRadius: 999, textTransform: "none", fontSize: 13 }}
        >
          Open Macro dialog
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpenAdjust(true)}
          sx={{ borderRadius: 999, textTransform: "none", fontSize: 13 }}
        >
          Open Adjust Fare dialog
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={() => setOpenEscalate(true)}
          sx={{ borderRadius: 999, textTransform: "none", fontSize: 13 }}
        >
          Open Escalate dialog
        </Button>
      </Stack>

      <ReplyDialog
        open={openReply}
        onClose={() => setOpenReply(false)}
        onSubmit={(message) => {
          console.log("Reply submitted", message);
          setOpenReply(false);
        }}
      />
      <MacroDialog
        open={openMacro}
        onClose={() => setOpenMacro(false)}
        onInsert={(macroId) => {
          console.log("Macro selected", macroId);
          setOpenMacro(false);
        }}
      />
      <AdjustFareDialog
        open={openAdjust}
        onClose={() => setOpenAdjust(false)}
        onSubmit={(payload) => {
          console.log("Adjust fare", payload);
          setOpenAdjust(false);
        }}
      />
      <EscalateDialog
        open={openEscalate}
        onClose={() => setOpenEscalate(false)}
        onSubmit={(payload) => {
          console.log("Escalate ticket", payload);
          setOpenEscalate(false);
        }}
      />
    </Box>
  );
}
