import * as React from "react";

import FormModal from "features/forms/form-modal";
import FormFields from "features/forms/form-fields/form-fields";
import { Breakpoint } from "@mui/material";
import useDocument from "hooks/use-document";

type ColectionSettingsData = {
  id: string;
};

type CollectionSettingsModalProps = {
  collectionName: string;
  id: string;
  open: boolean;
  onClose: () => void;
  maxWidth?: Breakpoint;
  initialValues: any;
};

export default function CollectionSettingsModal(
  props: CollectionSettingsModalProps
) {
  const { collectionName, id, open, onClose, maxWidth, initialValues } = props;

  const { update } = useDocument({
    collectionName,
    id,
  });

  const onSubmit = (data: ColectionSettingsData) => {
    update.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <FormModal
      title="Update collection"
      onSubmit={onSubmit}
      isSubmitting={update.isLoading}
      submitButtonLabel="Update"
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      initialValues={initialValues}
      contentComponent={(fieldProps) => (
        <FormFields
          fields={{
            collectionId: {
              fieldKey: "collectionId",
              name: "Collection ID",
              helperText: "Note: this is Firebase Collection ID. Be careful.",
              type: "TEXT",
              config: {
                required: "Collection ID required.",
              },
            },
          }}
          {...fieldProps}
        />
      )}
    ></FormModal>
  );
}
