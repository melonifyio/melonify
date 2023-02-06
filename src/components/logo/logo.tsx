import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

type LogoProps = {};

const Logo = (props: LogoProps) => {
  return (
    <Stack direction="row" gap={1} alignItems="center">
      {/* <IconButton>
        <MenuIcon />
      </IconButton> */}

      <Typography variant="h5">Melonify</Typography>
    </Stack>
  );
};

export default Logo;
