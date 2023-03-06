import { DashboardLayout } from "layouts";

import { PageHeader } from "components/page-header";
import { Container } from "components/container";
import { TasksScreen } from "screens/tasks";

export default function RestaurantsPage() {
  return (
    <Container>
      <PageHeader title="Tasks" />
      <TasksScreen />
    </Container>
  );
}

RestaurantsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
