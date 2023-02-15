import * as React from "react";
import { Avatar, Typography, Chip } from "@mui/material";

import { FieldProps } from "features/forms/form-fields/types";
import stringToColour from "utils/string-to-color";

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
        return (
          <Chip
            label={value}
            variant="outlined"
            size="small"
            sx={{
              color: stringToColour(value),
              borderColor: stringToColour(value),
              fontWeight: "bold",
            }}
          />
        );

      case "REFERENCE":
        return <Typography>{value?.title || value?.email || ""}</Typography>;

      // case "DATE":
      //   return <Date>{value}</Date>;

      // TEXT
      default:
        return <Typography>{value}</Typography>;
    }
  };

  return renderField();
}
