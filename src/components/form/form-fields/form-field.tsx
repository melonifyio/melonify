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

export type FormFieldProps = SchemaProps & {
  fieldKey: string;
  control: Control;
  setValue: UseFormSetValue<any>;
  handleSubmit: UseFormHandleSubmit<any>;
};

export default function FormField(props: FormFieldProps) {
  const { fieldKey, type, label, control, setValue, config } = props;

  const renderField = ({ field, formState }: any) => {
    const { errors } = formState;

    switch (type) {
      case "NUMBER":
        return <FormInput field={field} label={label} />;

      case "MAP":
        return <></>;

      case "ENUM":
        return <></>;

      case "IMAGE":
        return <FormUpload field={field} setValue={setValue} />;

      case "BOOLEAN":
        return <></>;

      case "REFERENCE":
        return (
          <FormCombobox field={field} label={label} config={config || {}} />
        );

      case "SUBCOLLECTION":
        return <></>;

      // TEXT
      default:
        return <FormInput field={field} label={label} />;
    }
  };

  return (
    <Controller
      name={fieldKey}
      control={control}
      //   rules={{ required: config?.required }}
      render={renderField}
    />
  );
}
