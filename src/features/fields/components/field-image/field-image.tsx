import MuiAvatar from "@mui/material/Avatar";
import { Avatar } from "components/avatar";

import stringToColour from "utils/string-to-color";

type FieldImageProps = {
  title: string;
  src?: string;
};

export const FieldImage = (props: FieldImageProps) => {
  const { title, src } = props;

  return <Avatar src={src} title={title} />;
};
