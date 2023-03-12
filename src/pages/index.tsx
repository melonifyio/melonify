import {
  DashboardLayout,
  Container,
  PageHeader,
} from "core/ui/dashboard-layout";

import { DashboardScreen } from "features/dashboard";

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
