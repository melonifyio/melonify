import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useFirestoreDocumentMutation } from "@react-query-firebase/firestore";
import { doc } from "firebase/firestore";

import Snackbar from "@mui/material/Snackbar";

import Dashboard from "layouts/dashboard";
import Form from "components/form";
import Container from "components/container";
import { collectionModel } from "constants/collection-model";
import removeEmpty from "utils/remove-empty";
import firestore from "config/firestore";
import PageHeader from "sections/page-header/page-header";

type CreateCollectionFormData = {
  title: string;
};

export default function CreateCollection() {
  const [openToast, setOpenToast] = React.useState(false);
  const router = useRouter();
  const { cId } = router.query;

  const ref = doc(firestore, `_melonify_/config/collections/${cId}`);
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
      <PageHeader title="Create collection" />

      <Form
        onSubmit={onSubmit}
        model={collectionModel}
        isSubmitting={mutation.isLoading}
      />

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
  return <Dashboard>{page}</Dashboard>;
};
