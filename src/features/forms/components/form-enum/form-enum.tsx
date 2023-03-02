import * as React from "react";

import { Autocomplete, TextField } from "@mui/material";
import { SchemaConfig } from "features/collections";

export type FormEnumProps = {
  label: string;
  config: SchemaConfig;
  field: {
    onChange: (value: unknown) => void;
    value: string;
    name: string;
  };
  errors: any;
};

export function FormEnum(props: FormEnumProps) {
  const { label, field, config, errors } = props;

  return (
    <Autocomplete
      options={config?.options || []}
      renderInput={(props) => (
        <TextField
          required={config.required}
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message || config?.helperText}
          variant="standard"
          {...props}
          label={label}
        />
      )}
      {...field}
      onChange={(e, value) => {
        field.onChange(value || "");
      }}
    />
  );
}
