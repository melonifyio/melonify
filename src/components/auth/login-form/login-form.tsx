import * as React from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useRouter } from "next/router";

import { Typography, Stack, Button } from "@mui/material";

import auth from "services/firebase/auth";

const provider = new GoogleAuthProvider();

export default function LoginForm() {
  const router = useRouter();

  const handleLogin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        router.push("/");
      })
      .catch((error) => {});
  };

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
