import * as React from "react";
import { Control, UseFormSetValue, UseFormHandleSubmit } from "react-hook-form";

import { Stack } from "@mui/material";

import { CollectionProps } from "components/collection/types";

import FormField from "./form-field";

export type FormProps = {
  schema: CollectionProps["schema"];
  control: Control;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
};

export default function FormFields(props: FormProps) {
  const { schema, ...fieldProps } = props;

  return (
    <Stack gap={3}>
      {Object.keys(schema).map((fieldKey, index) => (
        <FormField
          key={index}
          fieldKey={fieldKey}
          {...schema[fieldKey]}
          {...fieldProps}
        />
      ))}
    </Stack>
  );
}
