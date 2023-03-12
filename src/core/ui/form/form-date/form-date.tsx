import * as React from "react";

import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { Timestamp } from "firebase/firestore";
import { convertTimestampToDate } from "utils/date";

export type FormDateConfig = {
  readonly?: boolean;
};

export type FormDateProps = {
  label: string;
  config: FormDateConfig;
  errors: any;
  field: {
    onChange: (value: any) => void;
    value: any;
    name: string;
  };
};

export function FormDate(props: FormDateProps) {
  const { label, field, config, errors } = props;

  const dateValue = field.value
    ? dayjs(convertTimestampToDate(field.value))
    : null;

  return (
    <DatePicker
      label={label}
      disabled={config?.readonly}
      slotProps={{
        textField: {
          id: field.name,
          size: "small",
          error: !!errors[field.name],
          helperText: errors[field.name]?.message,
        },
      }}
      value={dateValue}
      onChange={(val) => {
        val && field.onChange(Timestamp.fromDate(val.toDate()));
      }}
    />
  );
}
