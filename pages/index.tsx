import Head from "next/head";
import { useRouter } from "next/router";

import Container from "@mui/material/Container";

import useApps from "../hooks/useApps";
import Simple from "../layouts/simple";

import firestore from "../firebase/firestore";
import CollectionList from "../sections/collection-list/collection-list";

export default function AppsPage() {
  const apps = useApps();
  const router = useRouter();

  return (
    <Container maxWidth="md">
      <CollectionList
        firestore={firestore}
        title="Apps"
        collectionName="apps"
        model={{
          fields: {
            title: {
              fieldKey: "title",
              name: "Title",
              type: "TEXT",
            },
            apiKey: {
              fieldKey: "apiKey",
              name: "API Key",
              type: "TEXT",
            },
            appId: {
              fieldKey: "appId",
              name: "App ID",
              type: "TEXT",
            },
            projectId: {
              fieldKey: "projectId",
              name: "Project ID",
              type: "TEXT",
            },
          },
        }}
      />
    </Container>
  );
}

AppsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Melonify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Simple>{page}</Simple>
    </>
  );
};
