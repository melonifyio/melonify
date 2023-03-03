import { Typography, TypographyProps } from "@mui/material";

type FieldTextProps = {
  children: string;
};

const FieldText = (props: FieldTextProps & TypographyProps) => {
  const { children } = props;

  const image = <Typography>{children}</Typography>;

  return image;
};

export default FieldText;
