import Grid2 from "@mui/material/Unstable_Grid2";
import { CircularProgress, Stack } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useAuthProvider } from "core/auth";

export function SignInByLinkScreen() {
  const router = useRouter();

  const { email } = router.query;

  const { useSignInByLink } = useAuthProvider();

  const [_, isLoading] = useSignInByLink({
    email: email as string,
    onSuccess: () => {},
  });

  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh" }}
      gap={4}
    >
      {isLoading && <CircularProgress size={24} />}
    </Stack>
  );
}
