import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

type LogoProps = {
  onClick?: () => void;
};

export const Logo = (props: LogoProps) => {
  const { onClick } = props;

  return (
    <Stack direction="row" gap={1} alignItems="center">
      <Button onClick={onClick}>Melonify</Button>
    </Stack>
  );
};
