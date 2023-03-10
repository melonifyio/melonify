import * as React from "react";
import { ZodType } from "zod";

import Box from "@mui/material/Box";
import { Button, Divider } from "@mui/material";

import { ConfirmationDialog } from "components/confirmation-dialog";

import { Form, FormFieldProps } from "features/forms";
import { FormFields } from "features/forms";

import { useDataProvider } from "features/data";
import { TableRolesAllowedProps } from "features/table";

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

  const { useDeleteDocument } = useDataProvider();

  const [openDeleteAlert, setOpenDeleteAlert] = React.useState(false);

  const [deleteDoc, isDeleting] = useDeleteDocument({
    collectionId,
    documentId,
    onSuccess: () => {
      setOpenDeleteAlert(false);
      onClose();
    },
  });

  return (
    <Box key={2}>
      <Form
        height="100%"
        initialValues={{}}
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
