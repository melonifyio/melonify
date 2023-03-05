import { Screen } from "features/screen";

import { RestaurantsWidget } from "widgets/restaurants";

export function RestaurantsScreen() {
  return (
    <Screen title="Restaurants" rolesAllowed={["ADMIN"]}>
      <RestaurantsWidget />
    </Screen>
  );
}
