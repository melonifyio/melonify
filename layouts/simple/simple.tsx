// @mui
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import AccountPopover from "../../components/account-popover/account-popover";
// components
import Logo from "../../components/logo";
import RequireAuth from "../require-auth";

type SimpleLayoutProps = {
  children: React.ReactNode;
};

export default function SimpleLayout({ children }: SimpleLayoutProps) {
  return (
    <RequireAuth>
      <Box py={4} px={10} width="100%">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box>
            <Logo />
          </Box>
          <Box>
            <AccountPopover />
          </Box>
        </Stack>

        <Container fixed>
          <Box mt={10}>{children}</Box>
        </Container>
      </Box>
    </RequireAuth>
  );
}
