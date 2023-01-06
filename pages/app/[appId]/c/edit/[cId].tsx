import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useFirestoreDocumentMutation,
  useFirestoreDocumentData,
} from "@react-query-firebase/firestore";
import { getFirestore, doc as fsdoc } from "firebase/firestore";

import {
  Container,
  Typography,
  Snackbar,
  Alert,
  Stack,
  CircularProgress,
} from "@mui/material";

import { useApp } from "../../../../../hooks/useApp";
import Dashboard from "../../../../../layouts/dashboard";
import Form from "../../../../../components/form";
import { collectionModel } from "../../../../../models/collection-model";
import removeEmpty from "../../../../../utils/remove-empty";

export default function EditCollection() {
  const [openToast, setOpenToast] = React.useState(false);
  const { firebase, appData } = useApp();
  const router = useRouter();
  const { cId } = router.query;

  const firestore = getFirestore(firebase);
  const ref = fsdoc(firestore, `_melonify_/config/collections/${cId}`);
  const document = useFirestoreDocumentData<any>(
    ["collectionDocument", cId],
    ref
  );
  const mutation = useFirestoreDocumentMutation(ref);

  const onSubmit = (data: any) => {
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

  if (document.isLoading) {
    return (
      <Stack direction="row" p={10} alignItems="center" justifyContent="center">
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (!document) return <>No document found</>;

  return (
    <Container>
      <Stack gap={4}>
        <Typography variant="h4">Edit collection</Typography>

        <Form
          onSuccess={onSubmit}
          model={collectionModel}
          initialValues={document.data}
          isSubmitting={mutation.isLoading}
        />
      </Stack>

      <Snackbar
        open={openToast}
        autoHideDuration={3000}
        onClose={handleCloseToast}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          //   onClose={handleCloseToast}
          severity="success"
          sx={{ width: "100%", minWidth: 300 }}
        >
          Saved
        </Alert>
      </Snackbar>
    </Container>
  );
}

EditCollection.getLayout = function getLayout(page: React.ReactElement) {
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
