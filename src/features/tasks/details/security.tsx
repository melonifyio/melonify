import * as React from "react";
import { ZodType } from "zod";

import Box from "@mui/material/Box";
import { Button, CircularProgress, Divider, Stack } from "@mui/material";
import { Form, FormFieldProps, FormFields } from "core/ui/form";
import { TableRolesAllowedProps } from "core/ui/table";
import { useDataProvider } from "core/data";
import { ConfirmationDialog } from "core/ui/confirmation-dialog";

type TasksDetailsSecurityProps = {
  onClose: () => void;
  fields?: Record<string, FormFieldProps>;
  collectionId: string;
  documentId: string;
  schema?: ZodType;
  rolesAllowed?: TableRolesAllowedProps;
};

export const TasksDetailsSecurity = (props: TasksDetailsSecurityProps) => {
  const { onClose, collectionId, documentId, rolesAllowed } = props;

  const { useDeleteDocument, useDocument } = useDataProvider();

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const [deleteDoc, isDeleting] = useDeleteDocument({
    collectionId,
    documentId,
    onSuccess: () => {
      setOpenDeleteAlert(false);
      onClose();
    },
  });

  const [data, isLoading] = useDocument({ collectionId, documentId });

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
    <Box key={2}>
      <Form
        height="100%"
        initialValues={data}
        onSubmit={() => {}}
        contentComponent={(fieldProps) => (
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
              createdAt: {
                label: "Created at",
                type: "DATE",
                config: {
                  readonly: true,
                },
              },
              createdBy: {
                label: "Created by",
                type: "REFERENCE",
                config: {
                  optionLabel: "email",
                  readonly: true,
                },
              },
            }}
            {...fieldProps}
          />
        )}
      />

      <Divider sx={{ my: 2 }} />

      <Box>
        <Button
          color="error"
          variant="outlined"
          onClick={() => setOpenDeleteAlert(true)}
        >
          Delete document
        </Button>

        <ConfirmationDialog
          open={openDeleteAlert}
          title="Delete document"
          description="Are you sure?"
          onClose={() => setOpenDeleteAlert(false)}
          onConfirm={deleteDoc}
          isSubmitting={isDeleting}
        />
      </Box>
    </Box>
  );
};

TasksDetailsSecurity.displayName = "TasksDetailsSecurity";
