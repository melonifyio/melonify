import { Stack } from "@mui/system";
import * as React from "react";
import {
  Control,
  useForm,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

import removeEmpty from "utils/remove-empty";

type FormProps = {
  initialValues: any;
  onSubmit: (values: any) => void;
  titleComponent: React.ReactNode;
  contentComponent: ({
    control,
    setValue,
    handleSubmit,
  }: {
    control: Control;
    setValue: UseFormSetValue<any>;
    handleSubmit: UseFormHandleSubmit<any>;
  }) => JSX.Element;
  actionsComponent: React.ReactNode;
};

export default function Form(props: FormProps) {
  const {
    initialValues,
    onSubmit,
    titleComponent,
    contentComponent,
    actionsComponent,
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<any>({
    defaultValues: initialValues,
    shouldUnregister: true,
  });

  const forwardSave = (data: any) => {
    onSubmit(removeEmpty(data));
  };

  const handleSubmitWithoutPropagation = (e: any) => {
    e.preventDefault();
    e.stopPropagation();
    handleSubmit(forwardSave)(e);
  };

  return (
    <form onSubmit={handleSubmitWithoutPropagation}>
      <Stack gap={2}>
        {titleComponent}
        {contentComponent({ control, setValue, handleSubmit })}
        {actionsComponent}
      </Stack>
    </form>
  );
}
