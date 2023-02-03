import * as React from "react";
import Head from "next/head";
import { useAuthSignInWithPopup } from "@react-query-firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import { Container, Typography, Stack, Button } from "@mui/material";

import auth from "config/auth";

import Iconify from "components/iconify";

import AuthLayout from "layouts/auth";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

// ----------------------------------------------------------------------

export default function LoginPage() {
  const router = useRouter();
  const authSignIn = useAuthSignInWithPopup(auth);

  const handleLogin = () => {
    authSignIn.mutate(
      {
        provider: new GoogleAuthProvider(),
      },
      {
        onSuccess: (res) => {
          router.push("/");
        },
      }
    );
  };

  return (
    <Container maxWidth="xs">
      <StyledContent>
        <Stack gap={2} p={4}>
          <Typography variant="h4">Sign in to Melonify</Typography>

          <Button
            size="large"
            variant="contained"
            fullWidth
            onClick={handleLogin}
          >
            <Stack direction="row" gap={2} alignItems="center">
              <Iconify
                icon="eva:google-fill"
                color="#DF3E30"
                width={22}
                height={22}
              />
              <div>Continue with Google</div>
            </Stack>
          </Button>
        </Stack>
      </StyledContent>
    </Container>
  );
}

LoginPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Login | Melonify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLayout>{page}</AuthLayout>
    </>
  );
};
