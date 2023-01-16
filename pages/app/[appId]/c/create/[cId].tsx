import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { getFirestore, doc as fsdoc } from "firebase/firestore";

import { Container, Typography, Stack, Snackbar } from "@mui/material";

import { useApp } from "../../../../../hooks/useApp";
import Dashboard from "../../../../../layouts/dashboard";
import Form from "../../../../../components/form";
import { collectionModel } from "../../../../../models/collection-model";
import removeEmpty from "../../../../../utils/remove-empty";

type CreateCollectionFormData = {
  title: string;
};

export default function CreateCollection() {
  const [openToast, setOpenToast] = React.useState(false);
  const { firebase, appData } = useApp();
  const router = useRouter();
  const { cId } = router.query;

  const firestore = getFirestore(firebase);

  const ref = fsdoc(firestore, `_melonify_/config/collections/${cId}`);
  const mutation = useFirestoreDocumentMutation(ref);

  const onSubmit = (data: CreateCollectionFormData) => {
    mutation.mutate(removeEmpty(data), {
      onSuccess: () => {
        setOpenToast(true);
      },
    });

    // router.push(`/app/${appData?.id}/c/create/${data.id}`);
  };

  const handleCloseToast = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenToast(false);
  };

  return (
    <Container>
      <Stack gap={4}>
        <Typography variant="h4">Create collection</Typography>

        <Form
          onSubmit={onSubmit}
          model={collectionModel}
          isSubmitting={mutation.isLoading}
        />
      </Stack>

      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        message="Saved"
      />
    </Container>
  );
}

CreateCollection.getLayout = function getLayout(page: React.ReactElement) {
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
