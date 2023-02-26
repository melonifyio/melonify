import * as React from "react";

import { Autocomplete, TextField } from "@mui/material";
import { SchemaConfig } from "components/collection/types";

export type FormEnumProps = {
  label: string;
  config: SchemaConfig;
  field: {
    onChange: (value: unknown) => void;
    value: string;
    name: string;
  };
};

export default function FormEnum(props: FormEnumProps) {
  const { label, field, config } = props;

  return (
    <Autocomplete
      options={config?.options || []}
      renderInput={(props) => (
        <TextField variant="standard" {...props} label={label} />
      )}
      {...field}
      onChange={(e, value) => {
        field.onChange(value || "");
      }}
    />
  );
}
