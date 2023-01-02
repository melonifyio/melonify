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
import Stack from "@mui/material/Stack";
import { Avatar } from "@mui/material";

import { FieldProps } from "../form-field/types";
import { SmartList } from "../list/list";
import { ImageUpload } from "../image-upload";

type FormFieldProps = FieldProps & {
  control: Control;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
};

export default function FormField(props: FormFieldProps) {
  const { fieldKey, type, name, config, control, setValue, handleSubmit } =
    props;

  const renderField = ({ field, formState }: any) => {
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
            CreateComponent={<Button>Add item</Button>}
          />
        );

      case "IMAGE":
        return (
          <ImageUpload
            formState={formState}
            fieldKey={fieldKey}
            setValue={setValue}
            {...field}
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
