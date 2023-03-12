import * as React from "react";
import { Control } from "react-hook-form";

import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { Box, Breakpoint, DialogActions, Portal } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { ZodType } from "zod";
import { Form } from "../form/form";

type FormProps = {
  title: string;
  contentComponent: ({ control }: { control: Control }) => JSX.Element;
  open: boolean;
  onClose: () => void;
  initialValues?: any;
  hiddenValues?: any;
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
    hiddenValues,
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
          hiddenValues={hiddenValues}
          onSubmit={onSubmit}
          schema={schema}
          contentComponent={(formContentProps) => {
            return (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  maxHeight: "calc(100vh - 64px)",
                }}
              >
                <DialogTitle>{title}</DialogTitle>
                <DialogContent dividers sx={{ overflowY: "auto", p: 2 }}>
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
            );
          }}
        />
      </Dialog>
    </Portal>
  );
}
