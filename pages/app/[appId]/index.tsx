import React from "react";
import Head from "next/head";

import Stack from "@mui/material/Stack";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { useApp } from "../../../hooks/useApp";
import Dashboard from "../../../layouts/dashboard";
import { useFirestoreStatus } from "../../../hooks/useFirestoreStatus";

export default function Home() {
  const firestoreStatus = useFirestoreStatus();

  const renderStatusLabel = () => {
    if (firestoreStatus.isLoading) return "Checking...";
    if (firestoreStatus.connected) return "Firebase connected";
    if (!firestoreStatus.connected) return "Firebase not connected";
  };

  return (
    <Container>
      <Stack gap={4}>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="h4">Dashboard</Typography>
        </Stack>

        <div>
          <Chip
            label={renderStatusLabel()}
            color={firestoreStatus.connected ? "success" : undefined}
          />
        </div>
      </Stack>
    </Container>
  );
}

Home.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Melonify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard>{page}</Dashboard>
    </>
  );
};
