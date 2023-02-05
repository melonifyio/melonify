import * as React from "react";
import { Control, UseFormSetValue, UseFormHandleSubmit } from "react-hook-form";

import { Stack, Box } from "@mui/material";
import { FieldProps } from "components/form-fields/types";
import FormField from "components/form-fields/form-field";

export type FormProps = {
  fields: Record<string, FieldProps>;
  control: Control;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
};

export default function FormFields(props: FormProps) {
  const { fields, ...fieldProps } = props;

  const fieldKeys = Object.keys(fields || {});
  const fieldKeysSorted = fieldKeys.sort(function (a, b) {
    return (fields[a].index || 0) - (fields[b].index || 0);
  });

  return (
    <Stack gap={3}>
      {fieldKeysSorted.map((fieldKey, index) => (
        <FormField key={index} {...fields[fieldKey]} {...fieldProps} />
      ))}
    </Stack>
  );
}
