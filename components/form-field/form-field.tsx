import * as React from "react";
import {
  Controller,
  Control,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";

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
    const { errors } = formState;

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
        const options = config?.options || {};

        return (
          <FormControl variant="standard" error={!!errors[fieldKey]}>
            <InputLabel id={fieldKey}>{name}</InputLabel>
            <Select labelId={fieldKey} id={fieldKey} {...field}>
              {Object.keys(options).map((fieldKey) => (
                <MenuItem key={fieldKey} value={options[fieldKey]?.name}>
                  {options[fieldKey]?.name}
                </MenuItem>
              ))}
            </Select>

            {/* {!!errors[fieldKey] && (
              <FormHelperText>
                {errors[fieldKey]?.message || "Required."}
              </FormHelperText>
            )} */}
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

      case "BOOLEAN":
        return (
          <FormControlLabel
            control={<Switch checked={field.value} {...field} />}
            label={name}
          />
        );

      // TEXT
      default:
        return (
          <TextField
            error={!!errors[fieldKey]}
            // helperText={errors[fieldKey]?.message}
            variant="standard"
            id={fieldKey}
            label={name}
            {...field}
          />
        );
    }
  };

  return (
    <Controller
      name={fieldKey}
      control={control}
      rules={{ required: config?.required }}
      render={renderField}
    />
  );
}
