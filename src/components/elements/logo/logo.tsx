import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";

type LogoProps = {};

const Logo = (props: LogoProps) => {
  return (
    <Stack direction="row" gap={1} alignItems="center">
      <Typography variant="h6">Melonify</Typography>
    </Stack>
  );
};

export default Logo;
