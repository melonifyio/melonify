import * as React from "react";
import {
  Control,
  useForm,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z, ZodType } from "zod";

type FormProps = {
  initialValues: any;
  onSubmit: (values: any) => void;
  titleComponent?: React.ReactNode;
  contentComponent: ({
    control,
    setValue,
    handleSubmit,
    initialValues,
  }: {
    control: Control;
    setValue: UseFormSetValue<any>;
    handleSubmit: UseFormHandleSubmit<any>;
    initialValues: any;
  }) => JSX.Element;
  actionsComponent?: React.ReactNode;
  height?: number | string;
  schema?: ZodType;
};

export function Form(props: FormProps) {
  const {
    initialValues,
    onSubmit,
    titleComponent,
    contentComponent,
    actionsComponent,
    height,
    schema = z.object({}),
  } = props;

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<z.infer<typeof schema>>({
    mode: "onChange",
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    shouldUnregister: true,
  });

  return (
    <form
      onSubmit={handleSubmit((data) => {
        onSubmit(data);
      })}
      style={{ height }}
    >
      {titleComponent && titleComponent}
      {contentComponent({ control, setValue, handleSubmit, initialValues })}
      {actionsComponent && actionsComponent}
    </form>
  );
}
