import MuiAvatar, { AvatarProps as MuiAvatarProps } from "@mui/material/Avatar";
import stringToColour from "utils/string-to-color";

type AvatarProps = MuiAvatarProps & {
  title: string;
  src?: string;
};

export const Avatar = (props: AvatarProps) => {
  const { title, src, sx, ...rest } = props;

  const logo = (
    <MuiAvatar
      src={src}
      sx={{
        borderRadius: 1,
        width: 34,
        height: 34,
        backgroundColor: stringToColour(title),
        fontFamily: "Tahoma",
        fontSize: "medium",
        fontWeight: "bold",
        ...sx,
      }}
      {...rest}
    >
      {title ? title.charAt(0) : ""}
    </MuiAvatar>
  );

  return logo;
};
