import * as React from "react";

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import Form from "components/form";
import { FormProps } from "components/form/form";

export default function FormModal(
  props: FormProps & {
    open: boolean;
    onTriggerClick?: () => void;
    TriggerComponent?: JSX.Element;
    onClose: () => void;
  }
) {
  const { open, onTriggerClick, onClose, onSubmit, TriggerComponent, ...rest } =
    props;

  const handleSubmit = (data: any) => {
    onSubmit(data);
  };

  return (
    <div>
      {TriggerComponent && (
        <div onClick={onTriggerClick}>{TriggerComponent}</div>
      )}

      <Dialog open={open} onClose={onClose} maxWidth="lg">
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <Form {...rest} onSubmit={handleSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
