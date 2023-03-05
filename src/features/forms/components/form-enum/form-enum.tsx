import * as React from "react";

import { Autocomplete, TextField } from "@mui/material";

export type FormEnumConfig = {
  options?: string[];
};

export type FormEnumProps = {
  label: string;
  config: FormEnumConfig;
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
      size="small"
      renderInput={(props) => (
        <TextField
          error={!!errors[field.name]}
          helperText={errors[field.name]?.message}
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
