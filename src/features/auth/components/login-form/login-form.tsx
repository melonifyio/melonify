import * as React from "react";
import { useRouter } from "next/router";

import { Typography, Stack, Button } from "@mui/material";

import { useLogin } from "features/auth/api/login";

export function LoginForm() {
  const router = useRouter();

  const [handleLogin] = useLogin({
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <>
      <Typography variant="h4">Sign in to Melonify</Typography>

      <Button size="large" variant="contained" fullWidth onClick={handleLogin}>
        <Stack direction="row" gap={2} alignItems="center">
          <div>Continue with Google</div>
        </Stack>
      </Button>
    </>
  );
}
