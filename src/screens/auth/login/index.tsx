import * as React from "react";

import { LoginForm } from "features/auth";
import { Screen } from "features/screen";
import { Stack } from "@mui/material";

export default function LoginScreen() {
  return (
    <Screen>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
      >
        <Stack>
          <LoginForm />
        </Stack>
      </Stack>
    </Screen>
  );
}
