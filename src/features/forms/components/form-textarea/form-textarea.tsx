import * as React from "react";

import TextField from "@mui/material/TextField";

export type FormTextareaConfig = {
  readonly?: boolean;
  autofocus?: boolean;
};

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

  const inputRef = React.useRef<HTMLInputElement | null>(null);

  return (
    <TextField
      inputRef={inputRef}
      error={!!errors[field.name]}
      helperText={errors[field.name]?.message}
      size="small"
      multiline
      id={field.name}
      label={label}
      minRows={3}
      maxRows={20}
      {...field}
      disabled={config?.readonly}
      autoFocus={config?.autofocus}
    />
  );
}
