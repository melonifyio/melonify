import * as React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";

import Form from "../../components/form";
import { FormProps } from "../../components/form/form";

export default function FormModal(props: FormProps & { Trigger: JSX.Element }) {
  const { onSuccess, Trigger, ...rest } = props;

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSuccess = (data: any) => {
    onSuccess(data);
    handleClose();
  };

  return (
    <div>
      <div onClick={handleClickOpen}>{Trigger && Trigger}</div>

      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <Form onSuccess={handleSuccess} {...rest} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
