import { Typography, TypographyProps } from "@mui/material";
import { SchemaConfig } from "components/collection/types";

type FieldReferenceProps = {
  value: any;
  config?: SchemaConfig;
};

const FieldReference = (props: FieldReferenceProps) => {
  const { value, config } = props;

  const image = (
    <Typography>
      {value ? value[config?.optionLabel || "title"] : ""}
    </Typography>
  );

  return image;
};

export default FieldReference;
