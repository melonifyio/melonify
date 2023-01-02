import * as React from "react";
import Head from "next/head";
import { useAuthSignInWithPopup } from "@react-query-firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";
// @mui
import { styled } from "@mui/material/styles";
import { Container, Typography, Stack, Button } from "@mui/material";
// hooks
import auth from "../firebase/auth";
import useResponsive from "../hooks/useResponsive";
// components
import Logo from "../components/logo";
import Iconify from "../components/iconify";
// sections
import { LoginForm } from "../sections/login";
import AuthLayout from "../layouts/auth";

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
        onSuccess: () => {
          router.push("/");
        },
      }
    );
  };

  return (
    <Container maxWidth="xs">
      <StyledContent>
        <Typography variant="h4" gutterBottom>
          Sign in to Melonify
        </Typography>

        {/* <Typography variant="body2" sx={{ mb: 5 }}>
            Don’t have an account? {""}
            <Link variant="subtitle2">Get started</Link>
          </Typography> */}

        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            size="large"
            color="inherit"
            variant="outlined"
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

        {/* <Divider sx={{ my: 3 }}>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              OR
            </Typography>
          </Divider>

          <LoginForm /> */}
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
