import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  useFirestoreDocumentMutation,
  useFirestoreDocument,
} from "@react-query-firebase/firestore";
import { collection, getFirestore, doc as fsdoc } from "firebase/firestore";

import { Container, Typography, TextField, Snackbar, Box } from "@mui/material";

import { useApp } from "../../../../../hooks/useApp";
import Dashboard from "../../../../../layouts/dashboard";
import Form from "../../../../../components/form";

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

      <Form
        onSuccess={onSubmit}
        model={{
          fields: {
            title: {
              fieldKey: "title",
              name: "Collection Name",
              type: "TEXT",
            },
            schema: {
              fieldKey: "schema",
              name: "Schema",
              type: "MAP",
              config: {
                model: {
                  fields: {
                    fieldKey: {
                      fieldKey: "fieldKey",
                      name: "Field Key",
                      type: "TEXT",
                    },
                    name: {
                      fieldKey: "name",
                      name: "Name",
                      type: "TEXT",
                    },
                    type: {
                      fieldKey: "type",
                      name: "Type",
                      type: "ENUM",
                      config: {
                        options: ["TEXT", "NUMBER", "ENUM", "MAP"],
                      },
                    },
                  },
                },
              },
            },
          },
        }}
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
