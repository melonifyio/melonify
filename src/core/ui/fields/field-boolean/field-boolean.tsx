import { Check } from "@mui/icons-material";
import { Typography } from "@mui/material";

type FieldBooleanProps = {
  checked: boolean;
};

const FieldBoolean = (props: FieldBooleanProps) => {
  const { checked } = props;

  return <Typography>{checked ? <Check /> : ""}</Typography>;
};

export default FieldBoolean;
