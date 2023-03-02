import { Typography } from "@mui/material";
import { SchemaConfig } from "features/collections";

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
