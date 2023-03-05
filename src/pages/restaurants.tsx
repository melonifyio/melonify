import { DashboardLayout } from "layouts";

import { PageHeader } from "components/page-header";
import { Container } from "components/container";

import { RestaurantsScreen } from "screens/restaurants";

export default function RestaurantsPage() {
  return (
    <Container>
      <PageHeader title="Restaurants" />
      <RestaurantsScreen />
    </Container>
  );
}

RestaurantsPage.getLayout = function getLayout(page: React.ReactElement) {
  return <DashboardLayout>{page}</DashboardLayout>;
};
