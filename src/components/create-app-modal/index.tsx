import * as React from "react";
import { useForm, Controller } from "react-hook-form";
import Button from "@mui/material/Button";
import LoadingButton from "@mui/lab/LoadingButton";
import Input from "@mui/material/Input";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import { collection } from "firebase/firestore";
import firestore from "../../config/firestore";

type CreateAppFormData = {
  title: string;
};

export default function CreateAppModal() {
  const [open, setOpen] = React.useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateAppFormData>({
    defaultValues: {
      title: "",
    },
  });

  const ref = collection(firestore, "apps");
  const mutation = useFirestoreCollectionMutation(ref);

  const onSubmit = (data: CreateAppFormData) => {
    mutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Create new app
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth="lg">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>Create new app</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Note: you need a Firebase project to get started.
            </DialogContentText>
            {/* <TextField
              autoFocus
              margin="dense"
              id="name"
              label="App name"
              type="email"
              fullWidth
              variant="standard"
            /> */}

            <Controller
              name="title"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <Input
                  placeholder="App name"
                  error={errors.title?.type === "required"}
                  {...field}
                />
              )}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <LoadingButton
              type="submit"
              variant="contained"
              loading={mutation.isLoading}
              color="primary"
            >
              Create
            </LoadingButton>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
