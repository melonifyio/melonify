import Head from "next/head";
import { useRouter } from "next/router";

import Dashboard from "layouts/dashboard";
import PageHeader from "components/elements/page-header";
import Container from "components/elements/container";
import EmptyState from "components/elements/empty-state";

import melonify from "config/melonify";
import Screen from "components/screen/screen";
import Restricted from "components/auth/restricted";

export default function GenericPage() {
  const router = useRouter();
  const pageId = router.query.pageId;

  const pageInfo = melonify.menu.find((x) => x.path === pageId);

  const screen = melonify.screen[pageId as string] || {};

  return (
    <Container>
      <PageHeader title={pageInfo?.title || ""} />

      <Restricted
        rolesAllowed={screen.rolesAllowed}
        fallback={<EmptyState title="Permissions needed 😔" />}
      >
        <Screen widgets={screen?.widgets || {}} />
      </Restricted>
    </Container>
  );
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Dashboard>{page}</Dashboard>;
};
