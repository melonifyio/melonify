import React from "react";

import { LoadingButton } from "@mui/lab";
import { Stack, Button } from "@mui/material";
import { CommentModel, commentSchema } from "schema";
import { useDataProvider } from "core/data";
import { Form, FormFields } from "core/ui/form";

type CommentFormProps = {
  item: CommentModel;
  collectionId: string;
  onCancel: () => void;
  onSuccess: () => void;
};

export function CommentForm(props: CommentFormProps) {
  const { item, collectionId, onCancel, onSuccess } = props;

  const { useUpdateDocument } = useDataProvider();

  const [updateDoc, isUpdating] = useUpdateDocument({
    collectionId,
    documentId: item._id || "unknown",
    merge: true,
    onSuccess,
  });

  return (
    <Form
      schema={commentSchema}
      initialValues={{ content: item.content }}
      onSubmit={updateDoc}
      contentComponent={(props) => (
        <Stack gap={1}>
          <FormFields
            fields={{
              content: {
                label: "Message",
                type: "TEXTAREA",
                config: { autofocus: true },
              },
            }}
            {...props}
          />

          <Stack direction="row" gap={1}>
            <LoadingButton
              type="submit"
              size="small"
              variant="contained"
              loading={isUpdating}
            >
              Save
            </LoadingButton>
            <Button size="small" variant="text" onClick={onCancel}>
              Cancel
            </Button>
          </Stack>
        </Stack>
      )}
    />
  );
}
