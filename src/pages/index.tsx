import { DashboardLayout } from "layouts";

import DashboardScreen from "screens/dashboard";

export default function GenericPage() {
  return <DashboardScreen />;
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
