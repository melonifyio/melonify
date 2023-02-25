import { Typography } from "@mui/material";
import FieldImage from "../field-image/field-image";
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
  value: string;
};

const Field = (props: FieldProps) => {
  const { type, value } = props;

  switch (type) {
    case "TEXT":
      return <FieldText>{value}</FieldText>;
    case "NUMBER":
      return <FieldText>{value}</FieldText>;
    case "IMAGE":
      return <FieldImage src={value} title={value} />;

    default:
      return <Typography></Typography>;
  }
};

export default Field;
