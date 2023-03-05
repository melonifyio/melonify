import { DashboardLayout } from "layouts";

import { RestaurantsScreen } from "screens/restaurants";

export default function GenericPage() {
  return <RestaurantsScreen />;
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
