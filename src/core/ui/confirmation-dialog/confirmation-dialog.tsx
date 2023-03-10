import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LoadingButton from "@mui/lab/LoadingButton";

import { ConfirmationDialogProps } from "./types";

export function ConfirmationDialog(props: ConfirmationDialogProps) {
  const { open, onConfirm, title, description, onClose, isSubmitting } = props;

  const handleAgree = () => {
    onConfirm();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent sx={{ minWidth: 400 }}>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={onClose}>
          Cancel
        </Button>
        <LoadingButton
          loading={isSubmitting}
          variant="contained"
          color="error"
          onClick={handleAgree}
          autoFocus
        >
          Confirm
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
