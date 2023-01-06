import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import Form from "../../components/form";
import { ModelProps } from "../../components/form-field/types";
import useDocument from "../../hooks/useDocument";

type DetailsProps = {
  open: boolean;
  onClose: () => void;
  model: ModelProps;
  collectionName: string;
  documentId: string;
};

export const DetailsDrawer = (props: DetailsProps) => {
  const { open, onClose, model, collectionName, documentId } = props;

  const [openToast, setOpenToast] = React.useState(false);

  const { document, mutation } = useDocument({
    collectionName,
    id: documentId,
  });

  const handleCloseToast = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  if (document.isLoading) {
    return (
      <Stack
        direction="row"
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={24} />
      </Stack>
    );
  }

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box minWidth={400} maxWidth={600} p={4}>
        <Form
          model={model}
          initialValues={document.data}
          onSuccess={(data) => {
            mutation.mutate(data, {
              onSuccess: () => {
                setOpenToast(true);
              },
            });
          }}
          isSubmitting={mutation.isLoading}
        />
      </Box>

      <Snackbar
        open={openToast}
        autoHideDuration={6000}
        onClose={handleCloseToast}
      >
        <Alert
          onClose={handleCloseToast}
          severity="success"
          sx={{ width: "100%" }}
        >
          Saved.
        </Alert>
      </Snackbar>
    </Drawer>
  );
};

DetailsDrawer.displayName = "DetailsDrawer";
