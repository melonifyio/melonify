import * as React from "react";

import TextField from "@mui/material/TextField";
import { FormControlLabel, Switch } from "@mui/material";
import { SchemaConfig } from "components/collection/types";

export type FormBooleanProps = {
  label: string;
  config: SchemaConfig;
  field: {
    onChange: (value: unknown) => void;
    value: boolean;
    name: string;
  };
};

export default function FormBoolean(props: FormBooleanProps) {
  const { label, field, config } = props;

  return (
    <FormControlLabel
      control={
        <Switch required={config.required} checked={field.value} {...field} />
      }
      label={label}
    />
  );
}
