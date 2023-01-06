import * as React from "react";
import { Avatar, Typography } from "@mui/material";

import { FieldProps } from "../form-field/types";
import { Date } from "../date";

type TableFieldProps = {
  type: FieldProps["type"];
  value: any;
};

export function TableField(props: TableFieldProps) {
  const { value, type } = props;

  const renderField = () => {
    switch (type) {
      case "IMAGE":
        return <Avatar src={value} sx={{ borderRadius: 1 }} />;

      // case "DATE":
      //   return <Date>{value}</Date>;

      // TEXT
      default:
        return <Typography>{value}</Typography>;
    }
  };

  return renderField();
}
