import * as React from "react";
import { Control } from "react-hook-form";

import { Stack } from "@mui/material";

import { FormField, FormFieldProps } from "./form-field";
import { Denied } from "features/auth";
import { TableRolesAllowedProps } from "features/table";

export type FormProps = {
  fields: Record<string, FormFieldProps>;
  rolesAllowed?: TableRolesAllowedProps;
  control?: Control;
};

export function FormFields(props: FormProps) {
  const { fields, rolesAllowed, ...fieldProps } = props;

  return (
    <Stack gap={3}>
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
