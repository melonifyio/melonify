import * as React from "react";

import TextField from "@mui/material/TextField";

export type FormTextareaConfig = {};

export type FormTextareaProps = {
  label: string;
  config: FormTextareaConfig;
  errors: any;
  field: {
    onChange: (value: unknown) => void;
    value: string;
    name: string;
  };
};

export function FormTextarea(props: FormTextareaProps) {
  const { label, field, config, errors } = props;

  return (
    <TextField
      error={!!errors[field.name]}
      helperText={errors[field.name]?.message}
      size="small"
      multiline
      id={field.name}
      label={label}
      // disabled={config?.readonly}
      minRows={4}
      maxRows={20}
      {...field}
    />
  );
}
