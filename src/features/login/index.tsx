import { Stack } from "@mui/material";
import { LoginForm } from "core/ui/login-form";

export function LoginScreen() {
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
    >
      <Stack>
        <LoginForm />
      </Stack>
    </Stack>
  );
}
