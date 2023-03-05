import * as React from "react";

import { Autocomplete, TextField } from "@mui/material";
import { useDataProvider } from "features/data";

export type FormComboboxConfig = {
  collectionId?: string;
  optionLabel?: string;
};

export type FormComboboxProps = {
  label: string;
  config: FormComboboxConfig;
  field: {
    onChange: (value: unknown) => void;
    value: string;
    name: string;
  };
  errors: any;
};

export function FormCombobox(props: FormComboboxProps) {
  const { label, field, config, errors } = props;

  const { useDocuments } = useDataProvider();

  const [data] = useDocuments({
    collectionId: config.collectionId || "unknown",
    rowsPerPage: 100,
    filters: {},
  });

  return (
    <Autocomplete
      options={data || []}
      getOptionLabel={(option: any) =>
        config.optionLabel ? option[config.optionLabel] : option["title"]
      }
      renderInput={(props) => (
        <TextField
          // required={config.required}
          variant="standard"
          error={!!errors[field.name]}
          // helperText={errors[field.name]?.message || config?.helperText}
          {...props}
          label={label}
        />
      )}
      {...field}
      onChange={(e, value) => {
        field.onChange(value);
      }}
    />
  );
}
