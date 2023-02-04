import * as React from "react";
import { useRouter } from "next/router";

import FormModal from "components/form-modal";
import { useStartCollectionModalStore } from "store/modals";

type StartCollectionFormData = {
  id: string;
};

export default function StartColectionFormModal() {
  const router = useRouter();

  const open = useStartCollectionModalStore((state) => state.open);
  const handleClose = useStartCollectionModalStore(
    (state) => state.handleClose
  );

  const onSubmit = (data: StartCollectionFormData) => {
    router.push(`/c/create/${data.id}`);
  };

  return (
    <FormModal
      onSubmit={onSubmit}
      open={open}
      onClose={handleClose}
      initialValues={{
        id: "",
      }}
      model={{
        fields: {
          id: {
            fieldKey: "id",
            name: "Collection ID",
            type: "TEXT",
            config: { required: "Collection ID required." },
          },
        },
      }}
    />
  );
}
