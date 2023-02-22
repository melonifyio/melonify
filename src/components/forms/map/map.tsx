import * as React from "react";
import { UseFormSetValue } from "react-hook-form";

import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import { AlertDialog } from "components/elements/alert-dialog";
import { FieldProps, ModelProps } from "components/forms/form-fields/types";
import { SmartList } from "components/elements/list/list";
import FormModal from "components/forms/form-modal";
import FormFields from "components/forms/form-fields/form-fields";

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

  const [open, setOpen] = React.useState(false);
  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);

  const handleSubmit = (data: any) => {
    onUpdate(data);
    setOpen(false);
  };

  const handleDeleteSuccess = (data: any) => {
    onDelete(data);
    setOpenAlertDialog(false);
  };

  return (
    <Stack direction="row" gap={1}>
      <IconButton onClick={() => setOpen(true)}>
        <EditIcon fontSize="small" />
      </IconButton>

      <FormModal
        maxWidth="xs"
        title="Edit field"
        submitButtonLabel="Save"
        onSubmit={handleSubmit}
        open={open}
        onClose={() => setOpen(false)}
        initialValues={data}
        contentComponent={(fieldProps) => (
          <FormFields fields={model} {...fieldProps} />
        )}
      />

      <AlertDialog
        open={openAlertDialog}
        onClose={() => {
          setOpenAlertDialog(false);
        }}
        title="Are you sure?"
        description="Are you sure you want to delete this item?"
        onConfirm={() => handleDeleteSuccess(data)}
        TriggerComponent={
          <IconButton
            aria-label="delete"
            onClick={(e) => {
              e.stopPropagation();
              setOpenAlertDialog(true);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        }
      />
    </Stack>
  );
}

export function Map(props: MapProps) {
  const { fieldKey, value, name, config, setValue } = props;

  const [open, setOpen] = React.useState(false);

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
      renderTitle={(item) => item.name || item.title}
      getId={(item) => item.fieldKey}
      CreateComponent={
        <>
          <Button onClick={() => setOpen(true)}>Add item</Button>
          <FormModal
            maxWidth="xs"
            initialValues={{}}
            title="Add Field"
            open={open}
            onClose={() => setOpen(false)}
            onSubmit={(data) => {
              setValue(fieldKey, {
                ...valueObj,
                [data.fieldKey]: { ...data, index: valueKeys.length },
              });

              setOpen(false);
            }}
            contentComponent={(fieldProps) => (
              <FormFields fields={config?.model || {}} {...fieldProps} />
            )}
          />
        </>
      }
      ActionComponent={(item) => (
        <ActionComponent
          model={config?.model || {}}
          data={item}
          onUpdate={(data) => {
            setValue(fieldKey, { ...valueObj, [data.fieldKey]: data });

            setOpen(false);
          }}
          onDelete={(data) => {
            const newData = { ...valueObj };
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
