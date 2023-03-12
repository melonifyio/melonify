import { Avatar } from "@mui/material";

type FieldImageProps = {
  title: string;
  src?: string;
};

export const FieldImage = (props: FieldImageProps) => {
  const { title, src } = props;

  return <Avatar src={src} title={title} variant="square" />;
};
