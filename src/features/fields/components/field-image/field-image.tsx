import MuiAvatar from "@mui/material/Avatar";

import stringToColour from "utils/string-to-color";

type FieldImageProps = {
  title: string;
  src?: string;
};

const FieldImage = (props: FieldImageProps) => {
  const { title, src } = props;

  const image = (
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

  return image;
};

export default FieldImage;
