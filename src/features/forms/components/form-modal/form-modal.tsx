import * as React from "react";
import { Control, UseFormSetValue, UseFormHandleSubmit } from "react-hook-form";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Box, Breakpoint, DialogActions, Portal } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { Form } from "features/forms";
import { ZodType } from "zod";

type FormProps = {
  title: string;
  contentComponent: ({
    control,
    setValue,
    handleSubmit,
  }: {
    control: Control;
    setValue: UseFormSetValue<any>;
    handleSubmit: UseFormHandleSubmit<any>;
  }) => JSX.Element;
  open: boolean;
  onClose: () => void;
  initialValues: any;
  onSubmit: (values: any) => void;
  maxWidth?: Breakpoint;
  submitButtonLabel?: string;
  isSubmitting?: boolean;
  schema?: ZodType;
};

export function FormModal(props: FormProps) {
  const {
    title,
    initialValues,
    open,
    onClose,
    onSubmit,
    contentComponent,
    maxWidth = "sm",
    submitButtonLabel = "Submit",
    isSubmitting,
    schema,
  } = props;

  return (
    <Portal>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth={maxWidth}>
        <Form
          initialValues={initialValues}
          onSubmit={onSubmit}
          schema={schema}
          contentComponent={(formContentProps) => (
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                maxHeight: "calc(100vh - 64px)",
              }}
            >
              <DialogTitle>{title}</DialogTitle>
              <DialogContent dividers sx={{ overflowY: "auto", p: 1 }}>
                {contentComponent(formContentProps)}
              </DialogContent>
              <DialogActions>
                <Button onClick={onClose}>Cancel</Button>
                <LoadingButton
                  type="submit"
                  loading={isSubmitting}
                  variant="contained"
                >
                  {submitButtonLabel}
                </LoadingButton>
              </DialogActions>
            </Box>
          )}
        />
      </Dialog>
    </Portal>
  );
}
