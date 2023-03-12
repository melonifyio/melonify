import * as React from "react";

import { Stack } from "@mui/material";

import { Google } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useAuthProvider } from "core/auth";
import { useRouter } from "next/router";

export function LoginForm() {
  const router = useRouter();

  const { useLoginViaGoogle } = useAuthProvider();

  const [login, isLoading] = useLoginViaGoogle({
    onSuccess: () => {
      router.push("/");
    },
  });

  return (
    <LoadingButton
      size="large"
      variant="contained"
      fullWidth
      onClick={login}
      loading={isLoading}
    >
      <Stack direction="row" gap={1} alignItems="center">
        <Google fontSize="small" />
        <div>Continue with Google</div>
      </Stack>
    </LoadingButton>
  );
}
