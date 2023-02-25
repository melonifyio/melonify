import React from "react";
import Head from "next/head";

import Container from "components/elements/container";
import Screen from "components/screen/screen";
import Dashboard from "layouts/dashboard";
import PageHeader from "components/elements/page-header";
import EmptyState from "components/elements/empty-state";
import CollectionList from "components/collection/collection-list/collection-list";
import melonify from "config/melonify";

export default function Home() {
  return (
    <Container>
      <PageHeader title="Collections" />

      <Screen
        widgets={{
          collectionList: {
            component: CollectionList,
            props: {
              data: melonify.collections,
            },
          },
        }}
      />
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
