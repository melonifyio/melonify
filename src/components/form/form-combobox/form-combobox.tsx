import * as React from "react";

import { Autocomplete, TextField } from "@mui/material";
import useFirestoreQuery from "hooks/useFirestoreQuery";
import { collection, query } from "firebase/firestore";
import firestore from "services/firebase/firestore";
import { SchemaConfig } from "components/collection/types";

export type FormComboboxProps = {
  label: string;
  config: SchemaConfig;
  field: {
    onChange: (value: unknown) => void;
    value: string;
    name: string;
  };
};

export default function FormCombobox(props: FormComboboxProps) {
  const { label, field, config } = props;

  const [data] = useFirestoreQuery(
    [config.collectionId],
    query(collection(firestore, config.collectionId || "unknown"))
  );

  return (
    <Autocomplete
      options={data}
      getOptionLabel={(option: any) =>
        config.optionLabel ? option[config.optionLabel] : option["title"]
      }
      renderInput={(props) => (
        <TextField variant="standard" {...props} label={label} />
      )}
      {...field}
      onChange={(e, value) => {
        field.onChange(value);
      }}
    />
  );
}
