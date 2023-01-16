import * as React from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { Stack, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import { ModelProps } from "../form-field/types";
import FormField from "../form-field";

export type FormProps = {
  onSubmit: SubmitHandler<any>;
  isSubmitting?: boolean;
  initialValues?: any;
  model: ModelProps;
};

export default function SmartForm(props: FormProps) {
  const { onSubmit, isSubmitting, initialValues, model } = props;

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
    onSubmit(data);
  };

  const handleSubmitWithoutPropagation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(forwardSave)(e);
  };

  return (
    <form onSubmit={handleSubmitWithoutPropagation}>
      <Stack gap={3}>
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
