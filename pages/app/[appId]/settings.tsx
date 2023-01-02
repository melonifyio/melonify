import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { collection, getFirestore, doc as fsdoc } from "firebase/firestore";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { useApp } from "../../../hooks/useApp";
import Dashboard from "../../../layouts/dashboard";
import Form from "../../../components/form";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import firestore from "../../../firebase/firestore";

export default function Home() {
  const router = useRouter();
  const { appData } = useApp();

  const ref = fsdoc(firestore, `apps/${appData?.id}`);
  const { mutate, isLoading } = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

  const handleSave = (data: any) => {
    console.log(data);
    mutate(data);
  };

  return (
    <Container>
      <Stack direction="row" gap={4} alignItems="center" mb={6}>
        <Typography variant="h4">App Settings</Typography>
      </Stack>

      <Container maxWidth="sm">
        <Form
          model={{
            fields: {
              logo: { fieldKey: "logo", name: "Logo", type: "IMAGE" },
              title: { fieldKey: "title", name: "Title", type: "TEXT" },
            },
          }}
          initialValues={appData}
          onSuccess={handleSave}
          isSubmitting={isLoading}
        />
      </Container>
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
