import React from "react";
import Head from "next/head";

import Container from "components/container";
import Dashboard from "layouts/dashboard";
import PageHeader from "sections/page-header";
import FirebaseStatus from "sections/firebase-status";
import Collections from "sections/collections/collections";
import CreateFab from "sections/start-collection-fab/start-collection-fab";

export default function Home() {
  return (
    <Container>
      <PageHeader title="Home" />
      {/* <FirebaseStatus /> */}
      <Collections />
      <CreateFab />
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
