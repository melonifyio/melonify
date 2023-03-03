import { useRouter } from "next/router";

import { PageHeader } from "components/page-header";
import { Container } from "components/container";

import { DashboardLayout } from "features/layouts";
import { Screen } from "features/screen";

import melonify from "config/melonify";

export default function GenericPage() {
  const router = useRouter();
  const pageId = router.query.pageId;

  const pageInfo = melonify.menu.find((x) => x.path === pageId);

  const screen = melonify.screen[pageId as string] || {};

  return (
    <Container>
      <PageHeader title={pageInfo?.title || ""} />

      <Screen {...screen} />
    </Container>
  );
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
