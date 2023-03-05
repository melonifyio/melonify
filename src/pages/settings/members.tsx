import { DashboardLayout } from "layouts";

import { PageHeader } from "components/page-header";
import { Container } from "components/container";

import { MembersScreen } from "screens/members";

export default function MembersPage() {
  return (
    <Container maxWidth="md">
      <PageHeader title="Members" />
      <MembersScreen />
    </Container>
  );
}

MembersPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
