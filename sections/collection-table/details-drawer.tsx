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
import useDocuments from "../../hooks/useDocuments";
import CollectionTable from "./collection-table";

type DetailsProps = {
  open: boolean;
  onClose: () => void;
  model: ModelProps;
  collectionName: string;
  documentId: string;
  refetch: () => void;
};

export const DetailsDrawer = (props: DetailsProps) => {
  const { open, onClose, model, collectionName, documentId, refetch } = props;

  const [openToast, setOpenToast] = React.useState(false);

  const { document, mutation } = useDocument({
    collectionName,
    id: documentId,
  });

  const subcollections = useDocuments({
    collectionName: `_melonify_/config/collections/${collectionName}/subcollections`,
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
      <Box minWidth={600} maxWidth={800} p={4}>
        <Stack gap={2}>
          <Form
            model={model}
            initialValues={document.data}
            onSubmit={(data) => {
              mutation.mutate(data, {
                onSuccess: () => {
                  setOpenToast(true);
                  refetch();
                },
              });
            }}
            isSubmitting={mutation.isLoading}
          />

          {subcollections.data &&
            subcollections.data?.map((item) => (
              <CollectionTable
                key={item._id}
                title={item.title}
                collectionName={`${collectionName}/${documentId}/${item.title}`}
                model={{ fields: item.schema }}
              />
            ))}
        </Stack>
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
