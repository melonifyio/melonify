import * as React from "react";

import TextField from "@mui/material/TextField";
import { FormControlLabel, Switch } from "@mui/material";

export type FormBooleanProps = {
  label: string;
  field: {
    onChange: (value: unknown) => void;
    value: boolean;
    name: string;
  };
};

export default function FormBoolean(props: FormBooleanProps) {
  const { label, field } = props;

  return (
    <FormControlLabel
      control={<Switch checked={field.value} {...field} />}
      label={label}
    />
  );
}
