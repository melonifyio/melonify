import * as React from "react";
import { Controller, Control } from "react-hook-form";

import { FormInput, FormInputConfig } from "../form-input/form-input";
import { FormUpload } from "../form-upload";
import {
  FormCombobox,
  FormComboboxConfig,
} from "../form-combobox/form-combobox";
import { FormBoolean, FormBooleanConfig } from "../form-boolean/form-boolean";
import { FormEnum, FormEnumConfig } from "../form-enum/form-enum";
import { FormFieldType } from "features/forms/types";
import { FormTextarea } from "../form-textarea";
import { FormDate, FormDateConfig } from "../form-date";

export type FormFieldProps = {
  fieldKey?: string;
  type: keyof typeof FormFieldType;
  label?: string;
  config?:
    | FormComboboxConfig
    | FormBooleanConfig
    | FormInputConfig
    | FormBooleanConfig
    | FormEnumConfig
    | FormDateConfig;
  control?: Control;
};

export function FormField(props: FormFieldProps) {
  const { fieldKey = "unknown", type, label = "", control, config } = props;

  const renderField = ({ field, formState }: any) => {
    const { errors } = formState;

    switch (type) {
      case "TEXT":
        return (
          <FormInput
            field={field}
            label={label}
            config={config || {}}
            errors={errors}
          />
        );
      case "TEXTAREA":
        return (
          <FormTextarea
            field={field}
            label={label}
            config={config || {}}
            errors={errors}
          />
        );
      case "DATE":
        return (
          <FormDate
            field={field}
            label={label}
            config={config || {}}
            errors={errors}
          />
        );

      case "NUMBER":
        return (
          <FormInput
            field={field}
            label={label}
            config={config || {}}
            errors={errors}
          />
        );

      case "MAP":
        return <></>;

      case "ENUM":
        return (
          <FormEnum
            field={field}
            label={label}
            config={config || {}}
            errors={errors}
          />
        );

      case "IMAGE":
        return <FormUpload field={field} label={label} errors={errors} />;

      case "BOOLEAN":
        return (
          <FormBoolean field={field} label={label} config={config || {}} />
        );

      case "REFERENCE":
        return (
          <FormCombobox
            field={field}
            label={label}
            config={config || {}}
            errors={errors}
          />
        );

      case "SUBCOLLECTION":
        return <></>; // should be empty. we dont need to show it as a regular field

      default:
        return <></>;
    }
  };

  return (
    <Controller
      name={fieldKey}
      control={control}
      // rules={{ required: config?.required }}
      render={renderField}
    />
  );
}
