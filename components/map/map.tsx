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
  data: any;
  onUpdate: (data: any) => void;
  onDelete: (data: any) => void;
};

function ActionComponent<T>(props: MapActionProps) {
  const { model, data, onUpdate, onDelete } = props;

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
        initialValues={data}
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
        onConfirm={() => handleDeleteSuccess(data)}
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

  const valueObj = value || {};
  const valueKeys = Object.keys(valueObj);
  // sort by .index
  const valueKeysSorted = valueKeys.sort(function (a, b) {
    return valueObj[a].index - valueObj[b].index;
  });

  return (
    <SmartList
      title={name}
      items={valueKeysSorted.map((key) => ({
        ...valueObj[key],
      }))}
      renderTitle={(item) => item.name}
      getId={(item) => item.fieldKey}
      CreateComponent={
        <FormModal
          model={config?.model || { fields: {} }}
          onSuccess={(data) => {
            setValue(fieldKey, {
              ...valueObj,
              [data.fieldKey]: { ...data, index: valueKeys.length },
            });
          }}
          TriggerComponent={<Button>Add item</Button>}
        />
      }
      ActionComponent={(item) => (
        <ActionComponent
          model={config?.model || { fields: {} }}
          data={item}
          onUpdate={(data) => {
            setValue(fieldKey, { ...valueObj, [data.fieldKey]: data });
          }}
          onDelete={(data) => {
            const newData = valueObj;
            delete newData[data.fieldKey];

            setValue(fieldKey, newData);
          }}
        />
      )}
      onReorder={(data) => {
        const reorderedData: any = {};

        data.map((item) => {
          reorderedData[item.fieldKey] = item;
        });

        setValue(fieldKey, reorderedData);
      }}
    />
  );
}
