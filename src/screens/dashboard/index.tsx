import { Screen } from "features/screen";
import Grid2 from "@mui/material/Unstable_Grid2";

import { CollectionsWidget } from "screens/dashboard/collections";
import { SalesSummary } from "./summary/sales";
import { RestaurantsList } from "screens/restaurants/restaurants-list";

export function DashboardScreen() {
  return (
    <Screen title="Dashboard" rolesAllowed={["ADMIN"]}>
      <Grid2 container spacing={2}>
        <Grid2 xs={3}>
          <SalesSummary color="info" />
        </Grid2>
        <Grid2 xs={3}>
          <SalesSummary color="secondary" />
        </Grid2>
        <Grid2 xs={3}>
          <SalesSummary color="warning" />
        </Grid2>
        <Grid2 xs={3}>
          <SalesSummary color="error" />
        </Grid2>
      </Grid2>

      <Grid2 container spacing={2}>
        <Grid2 xs={4}>
          <CollectionsWidget />
        </Grid2>
        <Grid2 xs={8}>
          <RestaurantsList />
        </Grid2>
      </Grid2>
    </Screen>
  );
}
