import * as React from "react";
import { FieldProps } from "../form-field/types";
import { Avatar, Typography } from "@mui/material";

type TableFieldProps = {
  type: FieldProps["type"];
  value: any;
};

export function TableField(props: TableFieldProps) {
  const { value, type } = props;

  const renderField = () => {
    switch (type) {
      case "IMAGE":
        return <Avatar src={value} />;

      // TEXT
      default:
        return <Typography>{value}</Typography>;
    }
  };

  return renderField();
}
