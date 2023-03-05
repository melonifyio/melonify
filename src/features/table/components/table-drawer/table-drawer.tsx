import * as React from "react";
import { ZodType } from "zod";

import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import { Button, Divider } from "@mui/material";

import { ConfirmationDialog } from "components/confirmation-dialog";

import { Form, FormFieldProps } from "features/forms";
import { FormFields } from "features/forms";
import { Denied } from "features/auth";

import { TableDrawerTabs } from "./table-drawer-tabs";
import { TableDrawerSubcollections } from "./table-drawer-subcollections";
import { RolesAllowedProps } from "../table/table";
import { useDataProvider } from "features/data-provider";

type TableDrawerProps = {
  open: boolean;
  onClose: () => void;
  fields?: Record<string, FormFieldProps>;
  collectionId: string;
  documentId: string;
  rolesAllowed?: RolesAllowedProps;
  subcollections?: { id: string; label: string; schema: ZodType }[];
};

export const TableDrawer = (props: TableDrawerProps) => {
  const {
    open,
    onClose,
    fields,
    collectionId,
    documentId,
    subcollections,
    rolesAllowed,
  } = props;

  const { useDocument, useDeleteDocument, useUpdateDocument } =
    useDataProvider();

  const [localIsOpen, setLocalIsOpen] = React.useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const [data, isLoading] = useDocument({ collectionId, documentId });

  const [updateDoc, isUpdating] = useUpdateDocument({
    collectionId,
    documentId,
  });

  const [deleteDoc, isDeleting] = useDeleteDocument({
    collectionId,
    documentId,
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
            <TableDrawerTabs
              tabs={[
                { label: "General" },
                { label: "Subcollections" },
                { label: "System" },
              ]}
              panes={[
                <>
                  <Box
                    sx={{ height: "calc(100vh - 122px)", overflowY: "auto" }}
                  >
                    <FormFields
                      rolesAllowed={rolesAllowed}
                      fields={{
                        ...fields,
                      }}
                      {...fieldProps}
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
                </>,
                <Box key={1}>
                  <TableDrawerSubcollections
                    collectionId={collectionId}
                    documentId={documentId}
                    subcollections={subcollections}
                    rolesAllowed={rolesAllowed}
                  />
                </Box>,
                <Box key={2}>
                  <FormFields
                    rolesAllowed={rolesAllowed}
                    fields={{
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

                  <Divider />

                  <Box sx={{ p: 2 }}>
                    <Button
                      color="error"
                      variant="outlined"
                      onClick={() => setOpenDeleteAlert(true)}
                    >
                      Delete document
                    </Button>
                  </Box>
                </Box>,
              ]}
            />
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
