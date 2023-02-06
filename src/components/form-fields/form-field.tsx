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

import { FieldProps } from "components/form-fields/types";
import { Map } from "sections/map";
import { ImageUpload } from "sections/image-upload";
import { ComboBox } from "sections/combo-box";

export type FormFieldProps = FieldProps & {
  control: Control;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
};

export default function FormField(props: FormFieldProps) {
  const {
    fieldKey,
    type,
    name,
    config,
    control,
    setValue,
    handleSubmit,
    helperText,
  } = props;

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
            <Select
              labelId={fieldKey}
              id={fieldKey}
              {...field}
              value={field.value || ""}
            >
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
            control={<Switch checked={field.value || false} {...field} />}
            label={name}
          />
        );

      case "REFERENCE":
        return (
          <ComboBox
            collectionName={config?.collectionName || "unknown"}
            label={name}
            setValue={setValue}
            {...field}
          />
        );

      // TEXT
      default:
        return (
          <TextField
            error={!!errors[fieldKey]}
            helperText={errors[fieldKey]?.message || helperText}
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
