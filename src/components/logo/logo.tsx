import { useTheme } from "@mui/material/styles";
import { Avatar, Box } from "@mui/material";
import stringToColour from "utils/string-to-color";

// ----------------------------------------------------------------------

type LogoProps = {
  title: string;
  src?: string;
};

const Logo = (props: LogoProps) => {
  const { title, src } = props;
  const theme = useTheme();

  const logo = (
    <Avatar
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
    </Avatar>
  );

  return logo;
};

export default Logo;
