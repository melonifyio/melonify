import * as React from "react";
import { Avatar, Typography, Chip } from "@mui/material";

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

      case "ENUM":
        return <Chip label={value} color="primary" />;

      case "REFERENCE":
        return <Typography>{value.title}</Typography>;

      // case "DATE":
      //   return <Date>{value}</Date>;

      // TEXT
      default:
        return <Typography>{value}</Typography>;
    }
  };

  return renderField();
}
