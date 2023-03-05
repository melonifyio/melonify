import * as React from "react";
import { Control, UseFormSetValue, UseFormHandleSubmit } from "react-hook-form";

import { Stack } from "@mui/material";

import { FormField, FormFieldProps } from "./form-field";
import { Denied } from "features/auth";
import { RolesAllowedProps } from "features/table";
import { Field } from "features/fields";

export type FormProps = {
  fields: Record<string, FormFieldProps>;
  control: Control;
  rolesAllowed?: RolesAllowedProps;
};

export function FormFields(props: FormProps) {
  const { fields, rolesAllowed, ...fieldProps } = props;

  return (
    <Stack gap={3} p={2}>
      <Denied
        rolesAllowed={rolesAllowed && rolesAllowed["update"]}
        fallback={
          <>
            {/* {Object.keys(fields).map((fieldKey, index) => (
              <Field
                key={index}
                type={fields[fieldKey].type}
                label={fields[fieldKey].label}
                value={initialValues[fieldKey]}
                config={fields[fieldKey].config}
              />
            ))} */}
          </>
        }
      >
        {Object.keys(fields).map((fieldKey, index) => (
          <FormField
            key={index}
            fieldKey={fieldKey}
            {...fields[fieldKey]}
            {...fieldProps}
          />
        ))}
      </Denied>
    </Stack>
  );
}
