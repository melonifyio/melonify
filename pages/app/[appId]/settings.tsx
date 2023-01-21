import * as React from "react";
import Head from "next/head";
import { useQuery } from "react-query";
import { doc as fsdoc } from "firebase/firestore";
import { httpsCallable } from "firebase/functions";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";

import { useApp } from "../../../hooks/useApp";
import Dashboard from "../../../layouts/dashboard";
import Form from "../../../components/form";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import firestore from "../../../firebase/firestore";
import { appModel } from "../../../models/app-model";
import removeEmpty from "../../../utils/remove-empty";
import functions from "../../../firebase/functions";

export default function Home() {
  const { appData } = useApp();
  const [openSuccessToast, setOpenSuccessToast] = React.useState(false);

  const getProjectList = httpsCallable(functions, "getProjectList");

  const projects = useQuery(["firebase-projects"], getProjectList);

  console.log(projects);

  const ref = fsdoc(firestore, `apps/${appData?.id}`);
  const { mutate, isLoading } = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

  const handleSave = (data: any) => {
    mutate(removeEmpty(data), {
      onSuccess: () => {
        setOpenSuccessToast(true);
      },
    });
  };

  const handleCloseSuccessToast = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenSuccessToast(false);
  };

  return (
    <Container>
      <Stack gap={4}>
        <Stack direction="row" gap={4} alignItems="center">
          <Typography variant="h4">App Settings</Typography>
        </Stack>

        <Container maxWidth="sm">
          <Form
            model={appModel}
            initialValues={appData}
            onSubmit={handleSave}
            isSubmitting={isLoading}
          />
        </Container>
      </Stack>

      <Snackbar
        open={openSuccessToast}
        autoHideDuration={6000}
        onClose={handleCloseSuccessToast}
      >
        <Alert
          onClose={handleCloseSuccessToast}
          severity="success"
          sx={{ width: "100%" }}
        >
          Saved.
        </Alert>
      </Snackbar>
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
