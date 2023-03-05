import { Typography } from "@mui/material";

export type FieldReferenceConfig = {
  optionLabel?: string;
};

type FieldReferenceProps = {
  value: any;
  config?: FieldReferenceConfig;
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
