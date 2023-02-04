import * as React from "react";
import { useRouter } from "next/router";

import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";

import AddIcon from "@mui/icons-material/Add";

import FormModal from "components/form-modal";

const fabStyle = {
  position: "absolute",
  bottom: 44,
  right: 44,
};

type StartCollectionFormData = {
  id: string;
};

export default function StartCollectionFab() {
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
        <Tooltip title="Start collection" placement="top">
          <Fab sx={fabStyle}>
            <AddIcon />
          </Fab>
        </Tooltip>
      }
    />
  );
}
