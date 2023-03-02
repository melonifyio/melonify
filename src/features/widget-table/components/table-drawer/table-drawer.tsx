import * as React from "react";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import { Button, Divider } from "@mui/material";

import { ConfirmationDialog } from "components/confirmation-dialog";

import { CollectionProps } from "features/collections";
import { Form } from "features/forms";
import { FormFields } from "features/forms";
import { Denied } from "features/auth";
import {
  useDeleteDocument,
  useDocumentRef,
  useDocument,
  useUpdateDocument,
} from "features/widget-table";

import { TableDrawerTabs } from "./table-drawer-tabs";
import { TableDrawerSubcollections } from "./table-drawer-subcollections";
import { RolesAllowedProps } from "../table/table";

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
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const docRef = useDocumentRef(`${collectionId}/${documentId}`);

  const [data, isLoading] = useDocument([documentId], docRef);

  const [updateDoc, isUpdating] = useUpdateDocument(docRef);

  const [deleteDoc, isDeleting] = useDeleteDocument(docRef, {
    onSuccess: () => {
      setOpenDeleteAlert(false);
      onClose();
    },
  });

  const handleSubmit = (values: any) => {
    updateDoc(values);
  };

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
                        rolesAllowed={rolesAllowed}
                        schema={{
                          ...schema,
                        }}
                        {...fieldProps}
                      />
                    </Box>,
                    <Box p={3} key={1}>
                      <TableDrawerSubcollections
                        collectionId={collectionId}
                        documentId={documentId}
                        schema={schema}
                        rolesAllowed={rolesAllowed}
                      />
                    </Box>,
                    <Box p={3} key={2}>
                      <FormFields
                        rolesAllowed={rolesAllowed}
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

                      <Divider sx={{ my: 2 }} />

                      <Button
                        color="error"
                        variant="outlined"
                        onClick={() => setOpenDeleteAlert(true)}
                      >
                        Delete document
                      </Button>
                    </Box>,
                  ]}
                />
              </Box>

              <Denied rolesAllowed={rolesAllowed && rolesAllowed["update"]}>
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
              </Denied>
            </Stack>
          </Box>
        )}
      />

      <ConfirmationDialog
        open={openDeleteAlert}
        title="Delete document"
        description="Are you sure?"
        onClose={() => setOpenDeleteAlert(false)}
        onConfirm={deleteDoc}
        isSubmitting={isDeleting}
      />
    </Drawer>
  );
};

TableDrawer.displayName = "TableDrawer";
