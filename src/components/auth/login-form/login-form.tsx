import * as React from "react";
import Head from "next/head";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import { Container, Typography, Stack, Button } from "@mui/material";

import auth from "services/firebase/auth";

export default function LoginForm() {
  const handleLogin = () => {};

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
