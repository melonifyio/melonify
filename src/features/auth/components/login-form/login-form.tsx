import * as React from "react";
import { useRouter } from "next/router";

import { Stack, Button } from "@mui/material";

import { useLogin } from "features/auth/api/login";
import { Google } from "@mui/icons-material";

export function LoginForm() {
  const router = useRouter();

  const [handleLogin] = useLogin({
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <Button size="large" variant="contained" fullWidth onClick={handleLogin}>
      <Stack direction="row" gap={1} alignItems="center">
        <Google fontSize="small" />
        <div>Continue with Google</div>
      </Stack>
    </Button>
  );
}
