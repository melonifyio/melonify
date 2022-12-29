import * as React from "react";
import {
  Controller,
  Control,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";

import { FieldProps } from "../form-field/types";
import { SmartList } from "../list/list";

type FormFieldProps = FieldProps & {
  control: Control;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
};

export default function FormField(props: FormFieldProps) {
  const { fieldKey, type, name, config, control, setValue, handleSubmit } =
    props;

  const renderField = ({ field }: any) => {
    // console.log(field);

    const handleSave = (data: any) => {
      setValue(fieldKey, {
        ...field.value,
        [data.fieldKey]: data,
      });
    };

    switch (type) {
      case "MAP":
        return (
          <SmartList
            title={name}
            items={Object.keys(field.value || {}).map((fieldKey) => ({
              id: fieldKey,
              title: field.value[fieldKey].name,
              ...field.value[fieldKey],
            }))}
            model={config?.model}
            onCreate={handleSave}
            onUpdate={handleSave}
            CreateTrigger={<Button>Add item</Button>}
          />
        );

      // TEXT
      default:
        return (
          <>
            <FormLabel htmlFor={fieldKey}>{name}</FormLabel>
            <Input id={fieldKey} {...field} />
          </>
        );
    }
  };

  return (
    <FormControl>
      <Controller name={fieldKey} control={control} render={renderField} />
      {/* <FormHelperText>Helper text</FormHelperText> */}
    </FormControl>
  );
}
