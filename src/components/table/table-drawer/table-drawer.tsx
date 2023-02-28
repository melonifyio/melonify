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
import TableDrawerTabs from "./table-drawer-tabs";
import { TableDrawerSubcollections } from "./table-drawer-subcollections";
import { RolesAllowedProps } from "../table";

type TableDrawerProps = {
  open: boolean;
  onClose: () => void;
  schema: CollectionProps["schema"];
  collectionId: string;
  documentId: string;
  rolesAllowed?: RolesAllowedProps;
};

export const TableDrawer = (props: TableDrawerProps) => {
  const { open, onClose, schema, collectionId, documentId, rolesAllowed } =
    props;
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
          <Box width={680} maxWidth={800} sx={{ height: "100%" }}>
            <Stack sx={{ height: "100%" }}>
              <Box
                sx={{
                  py: 1,
                  px: 2,
                }}
              >
                <Typography variant="subtitle2">Edit</Typography>
              </Box>

              <Box sx={{ flex: 1, overflowY: "auto" }}>
                <TableDrawerTabs
                  tabs={[
                    { label: "General" },
                    { label: "Subcollections" },
                    { label: "System" },
                  ]}
                  panes={[
                    <Box p={3} key={0}>
                      <FormFields
                        schema={{
                          ...schema,
                        }}
                        {...fieldProps}
                      />
                    </Box>,
                    <Box p={3} key={0}>
                      <TableDrawerSubcollections
                        collectionId={collectionId}
                        documentId={documentId}
                        key={1}
                        schema={schema}
                        rolesAllowed={rolesAllowed}
                      />
                    </Box>,
                    <Box p={3} key={0}>
                      <FormFields
                        key={2}
                        schema={{
                          _id: {
                            label: "ID",
                            type: "TEXT",
                            config: {
                              readonly: true,
                            },
                          },
                        }}
                        {...fieldProps}
                      />
                    </Box>,
                  ]}
                />
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
