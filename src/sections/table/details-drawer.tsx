import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { ModelProps } from "components/form-fields/types";
import useDocument from "hooks/use-document";
import useDocuments from "hooks/use-get-documents";
import CollectionTable from "./table";
import Form from "components/form";
import FormFields from "components/form-fields/form-fields";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";

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

  const { query, update } = useDocument({
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

  if (query.isLoading) {
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
            initialValues={query.data}
            onSubmit={(data) => {
              update.mutate(data, {
                onSuccess: () => {
                  setOpenToast(true);
                  refetch();
                },
              });
            }}
            titleComponent={<Typography variant="h5">Edit document</Typography>}
            contentComponent={(fieldProps) => (
              <FormFields fields={model.fields} {...fieldProps} />
            )}
            actionsComponent={
              <LoadingButton
                type="submit"
                variant="contained"
                loading={update.isLoading}
              >
                Update
              </LoadingButton>
            }
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
