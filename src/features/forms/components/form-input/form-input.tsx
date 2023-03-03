import * as React from "react";

import TextField from "@mui/material/TextField";
import { SchemaConfig } from "features/collections";

export type FormInputProps = {
  label: string;
  config: SchemaConfig;
  errors: any;
  field: {
    onChange: (value: unknown) => void;
    value: string;
    name: string;
  };
};

export function FormInput(props: FormInputProps) {
  const { label, field, config, errors } = props;

  return (
    <TextField
      required={config.required}
      error={!!errors[field.name]}
      helperText={errors[field.name]?.message || config?.helperText}
      variant="standard"
      id={field.name}
      label={label}
      disabled={config?.readonly}
      {...field}
    />
  );
}