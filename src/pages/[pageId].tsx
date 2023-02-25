import Head from "next/head";
import { useRouter } from "next/router";

import Dashboard from "layouts/dashboard";
import PageHeader from "components/elements/page-header";
import Container from "components/elements/container";
import EmptyState from "components/elements/empty-state";

import melonify from "config/melonify";
import Screen from "components/screen/screen";

export default function GenericPage() {
  const router = useRouter();
  const pageId = router.query.pageId;

  const pageInfo = melonify.menu.find((x) => x.path === pageId);

  return (
    <Container>
      <PageHeader title={pageInfo?.title || ""} />

      {/* <EmptyState
        title="Define schema"
        description="Organize the collection schema"
      /> */}

      <Screen widgets={melonify.screen[pageId as string] || []} />
    </Container>
  );
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Dashboard>{page}</Dashboard>;
};
