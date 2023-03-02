import React from "react";
import Head from "next/head";

import { Container } from "components/container";
import { PageHeader } from "components/page-header";

import { Screen } from "features/screen";
import { DashboardLayout } from "features/layouts";
import { CollectionList } from "features/collections";

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
      <DashboardLayout>{page}</DashboardLayout>
    </>
  );
};
