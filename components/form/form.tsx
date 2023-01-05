import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FirebaseStorage } from "firebase/storage";

import { Stack, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { FieldProps } from "../form-field/types";
import FormField from "../form-field";

export type FormProps = {
  onSuccess: SubmitHandler<any>;
  isSubmitting?: boolean;
  initialValues?: any;
  model: {
    fields: Record<string, FieldProps>;
  };
};

export default function SmartForm(props: FormProps) {
  const { onSuccess, isSubmitting, initialValues, model } = props;

  const fieldKeys = Object.keys(model.fields || {});
  const fieldKeysSorted = fieldKeys.sort(function (a, b) {
    return (model.fields[a].index || 0) - (model.fields[b].index || 0);
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>({
    defaultValues: initialValues,
  });

  const forwardSave = (data: any) => {
    onSuccess(data);
  };

  const handleSubmitWithoutPropagation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(forwardSave)(e);
  };

  return (
    <form onSubmit={handleSubmitWithoutPropagation}>
      <Stack gap={4}>
        {fieldKeysSorted.map((fieldKey, index) => (
          <FormField
            key={index}
            control={control}
            setValue={setValue}
            handleSubmit={handleSubmit}
            {...model.fields[fieldKey]}
          />
        ))}

        <Box minWidth={400}>
          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={isSubmitting}
          >
            Submit
          </LoadingButton>
        </Box>
      </Stack>
    </form>
  );
}
