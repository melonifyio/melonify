import React from "react";
import Head from "next/head";

import Container from "components/elements/container";
import Dashboard from "layouts/dashboard";
import PageHeader from "components/elements/page-header";
import StartCollectionFab from "components/collections/start/fab";
import CollectionList from "components/collections/list";
import EmptyState from "components/elements/empty-state";
import StartCollectionButton from "components/collections/start";

export default function Home() {
  return (
    <Container>
      <PageHeader title="Collections" />
      {/* <FirebaseStatus /> */}
      <CollectionList
        collectionName="_melonify_/config/collections"
        emptyState={
          <EmptyState
            title="Get started"
            description="Start your first collection"
            actions={<StartCollectionButton variant="contained" />}
          />
        }
      />
      <StartCollectionFab />
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
