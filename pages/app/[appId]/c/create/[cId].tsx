import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useFirestoreDocumentMutation,
  useFirestoreDocument,
} from "@react-query-firebase/firestore";
import { collection, getFirestore, doc as fsdoc } from "firebase/firestore";
import { useForm, Controller } from "react-hook-form";

import { Container, Typography, TextField, Snackbar, Box } from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";

import { useApp } from "../../../../../hooks/useApp";
import Dashboard from "../../../../../layouts/dashboard";
import { Stack } from "@mui/system";

type CreateCollectionFormData = {
  title: string;
};

export default function CreateCollection() {
  const [openToast, setOpenToast] = React.useState(false);
  const { firebase, appData } = useApp();
  const router = useRouter();
  const { cId } = router.query;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateCollectionFormData>({
    defaultValues: {
      title: "",
    },
  });

  const firestore = getFirestore(firebase);

  const ref = fsdoc(firestore, `_melonify_/config/collections/${cId}`);
  const mutation = useFirestoreDocumentMutation(ref);

  const onSubmit = (data: CreateCollectionFormData) => {
    mutation.mutate(data, {
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
      <Typography variant="h4" gutterBottom>
        Create collection
      </Typography>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap={2} alignItems="flex-start">
          <Controller
            name="title"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                label="Collection Name"
                error={errors.title?.type === "required"}
                {...field}
              />
            )}
          />

          <LoadingButton
            type="submit"
            variant="contained"
            loading={mutation.isLoading}
            color="primary"
          >
            Create
          </LoadingButton>
        </Stack>
      </form>

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
