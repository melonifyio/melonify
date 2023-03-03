import MuiAvatar from "@mui/material/Avatar";
import stringToColour from "utils/string-to-color";

type AvatarProps = {
  title: string;
  src?: string;
};

export const Avatar = (props: AvatarProps) => {
  const { title, src } = props;

  const logo = (
    <MuiAvatar
      src={src}
      sx={{
        borderRadius: 1,
        width: 44,
        height: 44,
        backgroundColor: stringToColour(title),
        fontFamily: "Tahoma",
        fontSize: "medium",
        fontWeight: "bold",
      }}
    >
      {title ? title.charAt(0) : ""}
    </MuiAvatar>
  );

  return logo;
};
