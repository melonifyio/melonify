import * as React from "react";
import { useRouter } from "next/router";

import FormModal from "components/forms/form-modal";
import { useStartCollectionModalStore } from "store/modals";
import FormFields from "components/forms/form-fields/form-fields";
import useCreateDocument from "hooks/use-create-document";
import { Breakpoint } from "@mui/material";

type ColectionSettingsData = {
  id: string;
};

type StartCollectionModalProps = {
  collectionName: string;
  open: boolean;
  onClose: () => void;
  maxWidth?: Breakpoint;
};

export default function StartCollectionModal(props: StartCollectionModalProps) {
  const { collectionName, open, onClose, maxWidth } = props;

  const router = useRouter();

  const createCollection = useCreateDocument({
    collectionName,
  });

  const onSubmit = (data: ColectionSettingsData) => {
    createCollection.mutate(data, {
      onSuccess: () => {
        onClose();
      },
    });
    // router.push(`/c/create/${data.id}`);
  };

  return (
    <FormModal
      title="Start collection"
      onSubmit={onSubmit}
      isSubmitting={createCollection.isLoading}
      submitButtonLabel="Create"
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      initialValues={{
        title: "",
        collectionId: "",
      }}
      contentComponent={(fieldProps) => (
        <FormFields
          fields={{
            collectionId: {
              fieldKey: "collectionId",
              name: "Collection ID",
              helperText: "Provide Firebase Collection ID here",
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
