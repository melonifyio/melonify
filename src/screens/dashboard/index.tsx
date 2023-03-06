import { Screen } from "features/screen";
import { TasksSummary } from "./tasks-summary";

export function DashboardScreen() {
  return (
    <Screen title="Dashboard">
      <TasksSummary />
    </Screen>
  );
}
