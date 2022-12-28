import * as React from "react";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import { useForm, Controller, UseFormHandleSubmit } from "react-hook-form";
import { useMutation } from "react-query";

import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

import Form from "../../components/form";
import { FormProps } from "../../components/form/form";

export default function FormModal(props: FormProps) {
  const { onSuccess, ...rest } = props;

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
      <Button variant="outlined" onClick={handleClickOpen}>
        Add
      </Button>

      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <DialogTitle>Add</DialogTitle>
        <DialogContent>
          <Form onSuccess={handleSuccess} {...rest} />
        </DialogContent>
      </Dialog>
    </div>
  );
}
