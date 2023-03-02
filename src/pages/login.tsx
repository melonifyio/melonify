import * as React from "react";
import Head from "next/head";

import { styled } from "@mui/material/styles";
import { Container, Stack } from "@mui/material";

import { AuthLayout } from "features/layouts";
import { LoginForm } from "features/auth";

const StyledContent = styled("div")(({ theme }) => ({
  maxWidth: 480,
  margin: "auto",
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  padding: theme.spacing(12, 0),
}));

export default function LoginPage() {
  return (
    <Container maxWidth="xs">
      <StyledContent>
        <Stack gap={2} p={4}>
          <LoginForm />
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
