import * as React from "react";
import {
  Controller,
  Control,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

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
        return <></>;

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
