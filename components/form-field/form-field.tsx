import * as React from "react";
import {
  Controller,
  Control,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";

import { FieldProps } from "../form-field/types";
import { Map } from "../map";
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
          <Map
            value={field.value}
            fieldKey={fieldKey}
            name={name}
            type={type}
            config={config}
            setValue={setValue}
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
