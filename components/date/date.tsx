import * as React from "react";

import Typography from "@mui/material/Typography";

export interface DateProps {
  children: object;
}

type DateValueProps = any;

const isTimestamp = (value: DateValueProps) => {
  return typeof value === "object" && value?.seconds;
};

const renderDate = (value: DateValueProps): string => {
  if (isTimestamp(value)) {
    return value.toDate().toDateString();
  }

  return "N/A";
};

export const Date = ({ children }: DateProps) => {
  return <Typography>{renderDate(children)}</Typography>;
};
