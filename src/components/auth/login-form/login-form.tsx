import * as React from "react";
import Head from "next/head";
import { useAuthSignInWithPopup } from "@react-query-firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

import { styled } from "@mui/material/styles";
import { Container, Typography, Stack, Button } from "@mui/material";

import auth from "config/firebase/auth";

import Iconify from "components/iconify";

import useDocument from "hooks/use-document";

export const UpdateUser = ({ id, data }: { id: string; data: any }) => {
  const router = useRouter();

  const updateUser = useDocument({ collectionName: "users", id });

  React.useEffect(() => {
    updateUser.update.mutate(data);

    router.push("/");
  }, [data, router, updateUser.update]);

  return <></>;
};

export default function LoginForm() {
  const authSignIn = useAuthSignInWithPopup(auth);

  const handleLogin = () => {
    authSignIn.mutate(
      {
        provider: new GoogleAuthProvider(),
      },
      {
        onSuccess: (res) => {
          // create user in firestore
          // setEmail(res.user.email);
        },
      }
    );
  };

  return (
    <>
      <Typography variant="h4">Sign in to Melonify</Typography>

      <Button size="large" variant="contained" fullWidth onClick={handleLogin}>
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
    </>
  );
}
