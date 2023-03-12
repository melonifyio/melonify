import {
  DashboardLayout,
  Container,
  PageHeader,
} from "core/ui/dashboard-layout";
import { TasksScreen } from "features/tasks";

export default function TasksPage() {
  return (
    <Container>
      <PageHeader title="Tasks" />

      <TasksScreen />
    </Container>
  );
}

TasksPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
