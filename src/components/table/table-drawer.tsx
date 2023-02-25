import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";

import { LoadingButton } from "@mui/lab";
import { Button, Typography } from "@mui/material";
import { CollectionProps } from "components/collection/types";
import useFirestoreDoc from "hooks/useFirestoreDoc";
import { doc } from "firebase/firestore";
import firestore from "services/firebase/firestore";
import Form from "components/form/form/form";
import FormFields from "components/form/form-fields/form-fields";
import useFirestoreSetDoc from "hooks/useFirestoreSetDoc";

type TableDrawerProps = {
  open: boolean;
  onClose: () => void;
  schema: CollectionProps["schema"];
  collectionId: string;
  documentId: string;
};

export const TableDrawer = (props: TableDrawerProps) => {
  const { open, onClose, schema, collectionId, documentId } = props;
  const [localIsOpen, setLocalIsOpen] = React.useState(false);

  const docPath = `${collectionId}/${documentId}`;
  const docRef = doc(firestore, docPath);

  const [data, isLoading] = useFirestoreDoc([documentId], docRef);

  const [updateDoc, isUpdating] = useFirestoreSetDoc(docRef);

  const handleSubmit = (values: any) => {
    updateDoc(values);
  };

  //   const subcollections = Object.keys(model)
  //     .filter((fieldKey) => model[fieldKey].type === "SUBCOLLECTION")
  //     .map((fieldKey) => {
  //       return model[fieldKey];
  //     });

  //   const handleCloseToast = (
  //     event: React.SyntheticEvent | Event,
  //     reason?: string
  //   ) => {
  //     if (reason === "clickaway") {
  //       return;
  //     }

  //     setOpenToast(false);
  //   };

  React.useEffect(() => {
    setInterval(() => {
      setLocalIsOpen(open);
    }, 10);
  }, [open]);

  if (isLoading) {
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
    <Drawer anchor="right" open={localIsOpen} onClose={onClose}>
      <Form
        height="100%"
        initialValues={data}
        onSubmit={handleSubmit}
        contentComponent={(fieldProps: any) => (
          <Box minWidth={600} maxWidth={800} sx={{ height: "100%" }}>
            <Stack sx={{ height: "100%" }}>
              <Box
                sx={{
                  py: 2,
                  px: 3,
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                }}
              >
                <Typography variant="h6">Edit document</Typography>
              </Box>

              <Box sx={{ flex: 1, overflowY: "auto" }}>
                <Box sx={{ py: 2, px: 3 }}>
                  <FormFields
                    schema={{
                      _id: {
                        label: "ID",
                        type: "TEXT",
                        config: {
                          readOnly: true,
                        },
                      },
                      ...schema,
                    }}
                    {...fieldProps}
                  />
                </Box>
              </Box>

              <Box
                sx={{
                  p: 2,
                  borderTop: 1,
                  borderColor: "divider",
                  display: "flex",
                }}
              >
                <Box sx={{ flex: 1 }}></Box>
                <Stack direction="row" gap={1}>
                  <Button onClick={onClose}>Close</Button>

                  <LoadingButton
                    type="submit"
                    variant="contained"
                    loading={isUpdating as boolean}
                  >
                    Update
                  </LoadingButton>
                </Stack>
              </Box>
            </Stack>
          </Box>
        )}
      />
      {/* {subcollections && subcollections.length > 0 && (
            <SubcollectionTabs
              subcollections={subcollections}
              collectionId={collectionId}
              documentId={documentId}
            />
          )} */}

      {/* <Snackbar
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
      </Snackbar> */}
    </Drawer>
  );
};

TableDrawer.displayName = "TableDrawer";
