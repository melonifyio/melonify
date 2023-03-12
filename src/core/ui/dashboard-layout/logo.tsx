import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { Avatar, Box, IconButton } from "@mui/material";

type LogoProps = {
  onClick?: () => void;
  open: boolean;
};

export const Logo = (props: LogoProps) => {
  const { onClick, open } = props;

  return (
    <Stack direction="row" gap={0} p={0}>
      <Box p={0}>
        <IconButton onClick={onClick}>
          <Avatar
            src=""
            title={""}
            variant="rounded"
            sx={{ width: 34, height: 34 }}
          />
        </IconButton>
      </Box>
      {open && (
        <Stack direction="row" gap={1} alignItems="center">
          <Button onClick={onClick}>Melonify</Button>
        </Stack>
      )}
    </Stack>
  );
};
