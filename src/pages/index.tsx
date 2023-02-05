import React from "react";
import Head from "next/head";

import Container from "components/container";
import Dashboard from "layouts/dashboard";
import PageHeader from "sections/page-header";
import FirebaseStatus from "sections/firebase-status";
import StartCollectionFab from "sections/start-collection-fab";
import CollectionList from "sections/collection-list";
import EmptyState from "components/empty-state";
import StartCollectionButton from "sections/start-collection-button";

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
