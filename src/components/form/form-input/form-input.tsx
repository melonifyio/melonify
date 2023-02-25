import * as React from "react";

import TextField from "@mui/material/TextField";
import { SchemaProps } from "components/collection/types";

export type FormInputProps = {
  label: string;
  field: {
    onChange: (value: unknown) => void;
    value: string;
    name: string;
  };
};

export default function FormInput(props: FormInputProps) {
  const { label, field } = props;

  return (
    <TextField
      //   error={!!errors[fieldKey]}
      //   helperText={errors[fieldKey]?.message || helperText}
      variant="standard"
      id={field.name}
      label={label}
      //   disabled={config?.readOnly}
      {...field}
    />
  );
}
