import * as React from "react";
import { Control, UseFormSetValue, UseFormHandleSubmit } from "react-hook-form";

import { Stack } from "@mui/material";

import { CollectionProps } from "components/collection/types";

import FormField from "./form-field";
import Denied from "components/auth/denied";
import { RolesAllowedProps } from "components/table/table";
import Field from "components/field/field/field";

export type FormProps = {
  schema: CollectionProps["schema"];
  control: Control;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  initialValues?: any;
  rolesAllowed?: RolesAllowedProps;
};

export default function FormFields(props: FormProps) {
  const { schema, initialValues, rolesAllowed, ...fieldProps } = props;

  return (
    <Stack gap={3}>
      <Denied
        rolesAllowed={rolesAllowed && rolesAllowed["update"]}
        fallback={
          <>
            {Object.keys(schema).map((fieldKey, index) => (
              <Field
                key={index}
                type={schema[fieldKey].type}
                label={schema[fieldKey].label}
                value={initialValues[fieldKey]}
                config={schema[fieldKey].config}
              />
            ))}
          </>
        }
      >
        {Object.keys(schema).map((fieldKey, index) => (
          <FormField
            key={index}
            fieldKey={fieldKey}
            {...schema[fieldKey]}
            {...fieldProps}
          />
        ))}
      </Denied>
    </Stack>
  );
}
