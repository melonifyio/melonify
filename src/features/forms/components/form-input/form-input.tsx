import * as React from "react";

import TextField from "@mui/material/TextField";

export type FormInputConfig = {};

export type FormInputProps = {
  label: string;
  config: FormInputConfig;
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
      error={!!errors[field.name]}
      helperText={errors[field.name]?.message}
      size="small"
      id={field.name}
      label={label}
      // disabled={config?.readonly}
      {...field}
    />
  );
}
