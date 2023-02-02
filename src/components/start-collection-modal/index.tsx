import * as React from "react";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AddIcon from "@mui/icons-material/Add";
import FormModal from "../form-modal";

type StartCollectionFormData = {
  id: string;
};

export default function StartCollectionModal() {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);

  const onSubmit = (data: StartCollectionFormData) => {
    router.push(`/c/create/${data.id}`);
  };

  return (
    <FormModal
      onSubmit={onSubmit}
      open={open}
      onTriggerClick={() => setOpen(true)}
      onClose={() => setOpen(false)}
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
