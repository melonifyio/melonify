import * as React from "react";
import { Control } from "react-hook-form";

import { Box, Stack, Typography } from "@mui/material";

import { FormField, FormFieldProps } from "./form-field";
import { FormFieldType } from "../types";
import { Field, FieldType } from "core/ui/fields";
import { TableRolesAllowedProps } from "core/ui/table";
import { Denied } from "core/auth";

const FIELDS_MAP: Record<FormFieldType, keyof typeof FieldType> = {
  TEXT: "TEXT",
  TEXTAREA: "TEXT",
  DATE: "DATE",
  NUMBER: "NUMBER",
  IMAGE: "AVATAR",
  ENUM: "CHIP",
  MAP: "TEXT",
  BOOLEAN: "CHECKBOX",
  REFERENCE: "REFERENCE",
  SUBCOLLECTION: "TEXT",
};

export type FormProps = {
  fields: Record<string, FormFieldProps>;
  rolesAllowed?: TableRolesAllowedProps;
  control?: Control;
  initialValues?: any;
};

export function FormFields(props: FormProps) {
  const { fields, rolesAllowed, initialValues, ...fieldProps } = props;

  return (
    <Stack gap={2}>
      <Denied
        rolesAllowed={rolesAllowed && rolesAllowed["update"]}
        fallback={
          <>
            {Object.keys(fields).map((fieldKey, index) => (
              <Box key={index}>
                <Box>
                  <Typography variant="caption" sx={{ opacity: 0.6 }}>
                    {fields[fieldKey].label}
                  </Typography>
                </Box>

                <Field
                  type={FIELDS_MAP[fields[fieldKey].type]}
                  value={initialValues[fieldKey]}
                  config={fields[fieldKey].config}
                />
              </Box>
            ))}
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
