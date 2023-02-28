import * as React from "react";
import { Controller, Control } from "react-hook-form";

import { SchemaProps } from "components/collection/types";
import FormInput from "../form-input/form-input";
import { FormUpload } from "../form-upload";
import FormCombobox from "../form-combobox/form-combobox";
import FormBoolean from "../form-boolean/form-boolean";
import FormEnum from "../form-enum/form-enum";

export type FormFieldProps = SchemaProps & {
  fieldKey: string;
  control: Control;
};

export default function FormField(props: FormFieldProps) {
  const { fieldKey, type, label, control, config } = props;

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
      rules={{ required: config?.required }}
      render={renderField}
    />
  );
}
