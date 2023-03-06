import * as React from "react";
import { Control, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { z, ZodType } from "zod";

type FormProps = {
  initialValues: any;
  hiddenValues?: any;
  onSubmit: (values: any) => void;
  titleComponent?: React.ReactNode;
  contentComponent: ({ control }: { control: Control }) => JSX.Element;
  actionsComponent?: React.ReactNode;
  height?: number | string;
  schema?: ZodType;
};

export function Form(props: FormProps) {
  const {
    initialValues = {},
    hiddenValues = {},
    onSubmit,
    titleComponent,
    contentComponent,
    actionsComponent,
    height,
    schema = z.object({}),
  } = props;

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialValues,
    shouldUnregister: true,
  });

  const handleSubitForm = (data: any) => {
    onSubmit({ ...data });
  };

  return (
    <form onSubmit={handleSubmit(handleSubitForm)} style={{ height }}>
      {titleComponent && titleComponent}
      {contentComponent({ control })}
      {actionsComponent && actionsComponent}

      <>
        {Object.keys(hiddenValues).map((fieldKey) => {
          return (
            <input
              key={fieldKey}
              {...register(fieldKey)}
              type="hidden"
              value={hiddenValues[fieldKey]}
            />
          );
        })}
      </>
    </form>
  );
}
