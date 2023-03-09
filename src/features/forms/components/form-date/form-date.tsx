import * as React from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";

export type FormDateConfig = {};

export type FormDateProps = {
  label: string;
  config: FormDateConfig;
  errors: any;
  field: {
    onChange: (value: unknown) => void;
    value: { nanoseconds: number; seconds: number };
    name: string;
  };
};

export function FormDate(props: FormDateProps) {
  const { label, field, config, errors } = props;

  return (
    <DatePicker
      label={label}
      slotProps={{
        textField: {
          id: field.name,
          size: "small",
          error: !!errors[field.name],
          helperText: errors[field.name]?.message,
        },
      }}
      value={
        field.value?.seconds
          ? dayjs(new Date(field?.value?.seconds * 1000))
          : null
      }
      onChange={(val) => {
        const dateString = dayjs(val).format();
        return field.onChange(Timestamp.fromDate(new Date(dateString)));
      }}
    />
  );
}
