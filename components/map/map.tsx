import * as React from "react";
import { UseFormSetValue } from "react-hook-form";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import { AlertDialog } from "../alert-dialog";
import { FieldProps, ModelProps } from "../form-field/types";
import { SmartList } from "../list/list";
import FormModal from "../../sections/form-modal";

type MapProps = FieldProps & {
  setValue: UseFormSetValue<any>;
  value: any;
};

type MapActionProps = {
  model: ModelProps;
  item: any;
  onUpdate: (data: any) => void;
  onDelete: (data: any) => void;
};

function ActionComponent<T>(props: MapActionProps) {
  const { model, item, onUpdate, onDelete } = props;

  const handleUpdateSuccess = (data: any) => {
    onUpdate(data);
  };

  const handleDeleteSuccess = (data: any) => {
    onDelete(data);
  };

  return (
    <Stack direction="row" gap={1}>
      <FormModal
        onSuccess={handleUpdateSuccess}
        initialValues={item}
        model={model}
        TriggerComponent={
          <IconButton>
            <EditIcon fontSize="small" />
          </IconButton>
        }
      />

      <AlertDialog
        title="Are you sure?"
        description="Are you sure you want to delete this item?"
        onConfirm={() => handleDeleteSuccess(item)}
        TriggerComponent={
          <IconButton aria-label="delete">
            <DeleteIcon fontSize="small" />
          </IconButton>
        }
      />
    </Stack>
  );
}

export function Map(props: MapProps) {
  const { fieldKey, value, name, config, setValue } = props;

  return (
    <SmartList
      title={name}
      items={Object.keys(value || {}).map((key) => ({
        ...value[key],
        id: key,
        title: value[key].name,
      }))}
      CreateComponent={
        <FormModal
          model={config?.model || { fields: {} }}
          onSuccess={(data) => {
            setValue(fieldKey, { ...value, [data.fieldKey]: data });
          }}
          TriggerComponent={<Button>Add item</Button>}
        />
      }
      ActionComponent={(item) => (
        <ActionComponent
          model={config?.model || { fields: {} }}
          item={item}
          onUpdate={(data) => {
            setValue(fieldKey, { ...value, [data.fieldKey]: data });
          }}
          onDelete={(data) => {
            const newData = value;
            delete newData[data.fieldKey];

            setValue(fieldKey, newData);
          }}
        />
      )}
    />
  );
}
