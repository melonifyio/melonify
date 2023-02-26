import { Typography } from "@mui/material";
import { SchemaConfig } from "components/collection/types";
import FieldBoolean from "../field-boolean/field-boolean";
import FieldEnum from "../field-enum/field-enum";
import FieldImage from "../field-image/field-image";
import FieldReference from "../field-reference/field-reference";
import FieldText from "../field-text/field-text";

export enum FieldType {
  TEXT = "TEXT",
  NUMBER = "NUMBER",
  IMAGE = "IMAGE",
  ENUM = "ENUM",
  MAP = "MAP",
  // DATE = "DATE",
  BOOLEAN = "BOOLEAN",
  REFERENCE = "REFERENCE",
  SUBCOLLECTION = "SUBCOLLECTION",
}

type FieldProps = {
  type: keyof typeof FieldType;
  value: any;
  config?: SchemaConfig;
};

const Field = (props: FieldProps) => {
  const { type, value, config } = props;

  switch (type) {
    case "TEXT":
      return <FieldText>{value}</FieldText>;
    case "NUMBER":
      return <FieldText>{value}</FieldText>;
    case "IMAGE":
      return <FieldImage src={value} title={value} />;
    case "REFERENCE":
      return <FieldReference value={value} config={config} />;
    case "BOOLEAN":
      return <FieldBoolean checked={value} />;
    case "ENUM":
      return <FieldEnum label={value} />;

    default:
      return <Typography></Typography>;
  }
};

export default Field;
