import * as React from "react";
import Head from "next/head";
import { useAuthSignInWithPopup } from "@react-query-firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import { Container, Typography, Stack, Button } from "@mui/material";

import auth from "config/auth";

import Iconify from "components/iconify";

import AuthLayout from "components/layouts/auth";
import useCreateDocument from "hooks/use-create-document";
import useDocument from "hooks/use-document";
import LoginForm from "components/auth/login-form/login-form";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

const UpdateUser = ({ id, data }: { id: string; data: any }) => {
  console.log("rendered");
  const router = useRouter();

  const updateUser = useDocument({ collectionName: "users", id });

  React.useEffect(() => {
    updateUser.update.mutate(data);

    // router.push("/");
  }, [data, router, updateUser.update]);

  return <></>;
};

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = React.useState<string | null>(null);
  const authSignIn = useAuthSignInWithPopup(auth);

  console.log(email);

  const handleLogin = () => {
    authSignIn.mutate(
      {
        provider: new GoogleAuthProvider(),
      },
      {
        onSuccess: (res) => {
          // create user in firestore
          setEmail(res.user.email);
        },
      }
    );
  };

  return (
    <>
      {!!email && <UpdateUser id={email} data={{ email }} />}

      <Container maxWidth="xs">
        <StyledContent>
          <Stack gap={2} p={4}>
            <LoginForm />
          </Stack>
        </StyledContent>
      </Container>
    </>
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
