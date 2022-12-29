import * as React from "react";

import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import { ModelProps } from "../form-field/types";
import FormModal from "../../sections/shared/form-modal";

type SmartListActionsProps<T> = {
  model: ModelProps;
  item: T;
  onUpdate?: (data: any) => void;
};

export default function SmartListActions<T>(props: SmartListActionsProps<T>) {
  const { model, item, onUpdate } = props;

  const handleSuccess = (data: any) => {
    onUpdate && onUpdate(data);
  };

  return (
    <Stack direction="row" gap={1}>
      <FormModal
        onSuccess={handleSuccess}
        initialValues={item}
        model={model}
        Trigger={
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        }
      />

      <IconButton aria-label="delete">
        <DeleteIcon fontSize="small" />
      </IconButton>
    </Stack>
  );
}
