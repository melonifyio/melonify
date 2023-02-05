import * as React from "react";
import { useRouter } from "next/router";

import FormModal from "components/form-modal";
import { useStartCollectionModalStore } from "store/modals";
import FormFields from "components/form-fields/form-fields";
import useCreateDocument from "hooks/use-create-document";

type ColectionSettingsData = {
  id: string;
};

export default function ColectionSettingsModal() {
  const router = useRouter();

  const createCollection = useCreateDocument({
    collectionName: "_melonify_/config/collections",
  });

  const open = useStartCollectionModalStore((state) => state.open);
  const handleClose = useStartCollectionModalStore(
    (state) => state.handleClose
  );

  const onSubmit = (data: ColectionSettingsData) => {
    createCollection.mutate(data, {
      onSuccess: () => {
        handleClose();
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
      onClose={handleClose}
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
