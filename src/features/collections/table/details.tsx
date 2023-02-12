import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

import { ModelProps } from "features/forms/form-fields/types";
import useDocument from "hooks/use-document";
import Form from "features/forms/form";
import FormFields from "features/forms/form-fields/form-fields";
import { LoadingButton } from "@mui/lab";
import { Typography } from "@mui/material";
import deleteByValue from "utils/delete-by-value";
import { SubcollectionTabs } from "./subcollections";

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

  const subcollections = Object.keys(model)
    .filter((fieldKey) => model[fieldKey].type === "SUBCOLLECTION")
    .map((fieldKey) => {
      return model[fieldKey];
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
            titleComponent={<Typography variant="h4">Edit document</Typography>}
            contentComponent={(fieldProps) => (
              <FormFields
                fields={{
                  _id: {
                    fieldKey: "_id",
                    name: "ID",
                    type: "TEXT",
                    config: {
                      readOnly: true,
                    },
                  },
                  ...deleteByValue(model, "type", "SUBCOLLECTION"),
                }}
                {...fieldProps}
              />
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

          {subcollections && subcollections.length > 0 && (
            <SubcollectionTabs
              subcollections={subcollections}
              collectionName={collectionName}
              documentId={documentId}
            />
          )}
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
