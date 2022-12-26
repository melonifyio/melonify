import * as React from "react";
import { useRouter } from "next/router";
import { useForm, Controller } from "react-hook-form";

import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import AddIcon from "@mui/icons-material/Add";
import DialogTitle from "@mui/material/DialogTitle";

import { useApp } from "../../hooks/useApp";

type StartCollectionFormData = {
  id: string;
};

export default function StartCollectionModal() {
  const [open, setOpen] = React.useState(false);

  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<StartCollectionFormData>({
    defaultValues: {
      id: "",
    },
  });

  const { appData } = useApp();

  const onSubmit = (data: StartCollectionFormData) => {
    setOpen(false);
    router.push(`/app/${appData?.id}/c/create/${data.id}`);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button startIcon={<AddIcon />} onClick={handleClickOpen} size="small">
        Start collection
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Start a collection</DialogTitle>
          <DialogContent sx={{ minWidth: 400 }}>
            {/* <DialogContentText>
              Note: you need a Firebase project to get started.
            </DialogContentText> */}

            <Controller
              name="id"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <TextField
                  label="Collection ID"
                  error={errors.id?.type === "required"}
                  {...field}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton type="submit" variant="contained" color="primary">
              Start
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
