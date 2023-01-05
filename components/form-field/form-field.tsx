import * as React from "react";
import {
  Controller,
  Control,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

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

      case "ENUM":
        return (
          <FormControl variant="standard">
            <InputLabel id={fieldKey}>{name}</InputLabel>
            <Select labelId={fieldKey} id={fieldKey} {...field}>
              {(config?.options || []).map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
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
          <TextField variant="standard" id={fieldKey} label={name} {...field} />
        );
    }
  };

  return <Controller name={fieldKey} control={control} render={renderField} />;
}
