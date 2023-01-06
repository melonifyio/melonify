import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
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

  const { document, mutation } = useDocument({
    collectionName,
    id: documentId,
  });

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
            mutation.mutate(data);
          }}
          isSubmitting={mutation.isLoading}
        />
      </Box>
    </Drawer>
  );
};
