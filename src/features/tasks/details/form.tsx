import * as React from "react";
import { ZodType } from "zod";

import Stack from "@mui/material/Stack";
import CircularProgress from "@mui/material/CircularProgress";
import { LoadingButton } from "@mui/lab";
import { Form, FormFieldProps, FormFields } from "core/ui/form";
import { TableRolesAllowedProps } from "core/ui/table";
import { useDataProvider } from "core/data";
import { Denied } from "core/auth";

type TasksDetailsFormProps = {
  fields?: Record<string, FormFieldProps>;
  collectionId: string;
  documentId: string;
  schema?: ZodType;
  rolesAllowed?: TableRolesAllowedProps;
};

export const TasksDetailsForm = (props: TasksDetailsFormProps) => {
  const { fields, collectionId, documentId, rolesAllowed, schema } = props;

  const { useDocument, useUpdateDocument } = useDataProvider();

  const [data, isLoading] = useDocument({ collectionId, documentId });

  const [updateDoc, isUpdating] = useUpdateDocument({
    collectionId,
    documentId,
    merge: true,
  });

  const handleSubmit = (values: any) => {
    updateDoc(values);
  };

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
    <Form
      height="100%"
      schema={schema}
      initialValues={data}
      onSubmit={handleSubmit}
      contentComponent={(fieldProps) => (
        <>
          <FormFields
            rolesAllowed={rolesAllowed}
            fields={{
              ...fields,
            }}
            {...fieldProps}
          />

          <Denied rolesAllowed={rolesAllowed && rolesAllowed["update"]}>
            <Stack direction="row" justifyContent="flex-end" gap={1} my={2}>
              <LoadingButton
                type="submit"
                variant="contained"
                loading={isUpdating as boolean}
              >
                Update
              </LoadingButton>
            </Stack>
          </Denied>
        </>
      )}
    />
  );
};

TasksDetailsForm.displayName = "TasksDetailsForm";
