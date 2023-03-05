import { Screen } from "features/screen";
import Grid2 from "@mui/material/Unstable_Grid2";
import { CircularProgress, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import { useSignInByLink } from "./api/signup-by-link";

export function SignUpByLinkScreen() {
  const router = useRouter();

  const { email } = router.query;

  const [signIn, isLoading] = useSignInByLink({
    onSuccess: () => {
      router.push("/");
    },
    onError: () => {
      router.push("/login");
    },
  });

  React.useEffect(() => {
    signIn({
      email: email as string,
    });
  }, [email]);

  return (
    <Screen>
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: "100vh" }}
        gap={4}
      >
        {/* <Typography>Signing in...</Typography> */}
        {isLoading && <CircularProgress size={24} />}
      </Stack>
    </Screen>
  );
}
