import * as React from "react";
import {
  Control,
  UseFormSetValue,
  UseFormHandleSubmit,
  useWatch,
} from "react-hook-form";

import { Stack, Box } from "@mui/material";
import { FieldProps } from "features/forms/form-fields/types";
import FormField, { FormFieldProps } from "features/forms/form-fields/form-field";

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
      {fieldKeysSorted.map((fieldKey, index) =>
        fields[fieldKey].conditional ? (
          <ConditionalField
            key={index}
            field={fields[fieldKey]}
            {...fields[fieldKey]}
            {...fieldProps}
          />
        ) : (
          <FormField key={index} {...fields[fieldKey]} {...fieldProps} />
        )
      )}
    </Stack>
  );
}

const ConditionalField = (props: FormFieldProps & { field: FieldProps }) => {
  const { control, field } = props;

  const watchValue = useWatch({
    control,
    name: field.conditional?.fieldKey || "",
  });

  if (field.conditional && field.conditional.values.includes(watchValue)) {
    return <FormField {...props} />;
  }

  return null;
};
