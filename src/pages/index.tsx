import { DashboardLayout } from "layouts";

import { PageHeader } from "components/page-header";
import { Container } from "components/container";

import { DashboardScreen } from "screens/dashboard";

export default function DashboardPage() {
  return (
    <Container>
      <PageHeader title="Dashboard" />
      <DashboardScreen />
    </Container>
  );
}

DashboardPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
