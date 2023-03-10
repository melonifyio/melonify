import * as React from "react";

import Typography from "@mui/material/Typography";
import { formatDate } from "utils/format_date";

export interface DateProps {
  children: object;
}

export const Date = ({ children }: DateProps) => {
  return <Typography>{formatDate(children)}</Typography>;
};
