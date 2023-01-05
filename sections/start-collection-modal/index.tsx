import * as React from "react";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../form-modal";

import { useApp } from "../../hooks/useApp";

type StartCollectionFormData = {
  id: string;
};

export default function StartCollectionModal() {
  const router = useRouter();

  const { appData } = useApp();

  const onSubmit = (data: StartCollectionFormData) => {
    router.push(`/app/${appData?.id}/c/create/${data.id}`);
  };

  return (
    <FormModal
      onSuccess={onSubmit}
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
      TriggerComponent={
        <Button size="small" startIcon={<AddIcon />}>
          Start Collection
        </Button>
      }
    />
  );
}
