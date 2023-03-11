import * as React from "react";

import Typography from "@mui/material/Typography";
import { convertTimestampToDate } from "utils/date";
import { Timestamp } from "firebase/firestore";
import dayjs from "dayjs";

export interface DateProps {
  children: Timestamp;
}

export const Date = ({ children }: DateProps) => {
  return (
    <Typography>{dayjs(convertTimestampToDate(children)).format()}</Typography>
  );
};
