import { Typography, TypographyProps } from "@mui/material";

type FieldTextProps = {
  children: string;
};

const FieldText = (props: FieldTextProps & TypographyProps) => {
  const { children } = props;

  const text = <Typography>{children.toString()}</Typography>;

  return text;
};

export default FieldText;
