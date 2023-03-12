import { Avatar } from "@mui/material";
import stringToColour from "utils/string-to-color";

type FieldAvatarProps = {
  title: string;
  src?: string;
};

export const FieldAvatar = (props: FieldAvatarProps) => {
  const { title, src } = props;

  return (
    <Avatar
      src={src}
      title={title}
      sx={{
        backgroundColor: stringToColour(title),
      }}
    />
  );
};
