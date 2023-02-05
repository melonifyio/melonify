import * as React from "react";

import FormModal from "components/form-modal";
import { useSchemSettingsModalStore } from "store/modals";
import FormFields from "components/form-fields/form-fields";
import useDocument from "hooks/use-document";
import { SCHEMA_MODEL } from "constants/collection";
import { CircularProgress } from "@mui/material";

type SchemaSettingsData = {
  id: string;
};

type SchemaSettingsModalProps = {
  id: string;
};

export default function SchemaSettingsModal(props: SchemaSettingsModalProps) {
  const { id } = props;

  const document = useDocument({
    collectionName: "_melonify_/config/collections",
    id,
  });

  const open = useSchemSettingsModalStore((state) => state.open);

  const handleClose = useSchemSettingsModalStore((state) => state.handleClose);

  const onSubmit = (data: SchemaSettingsData) => {
    document.update.mutate(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  if (document.query.isLoading) return <CircularProgress />;

  return (
    <FormModal
      title="Configure schema"
      onSubmit={onSubmit}
      isSubmitting={document.update.isLoading}
      submitButtonLabel="Save"
      open={open}
      onClose={handleClose}
      initialValues={document.query?.data || {}}
      contentComponent={(fieldProps) => (
        <FormFields
          fields={{
            schema: {
              fieldKey: "schema",
              name: "Schema",
              type: "MAP",
              config: {
                model: SCHEMA_MODEL,
              },
            },
          }}
          {...fieldProps}
        />
      )}
    ></FormModal>
  );
}
