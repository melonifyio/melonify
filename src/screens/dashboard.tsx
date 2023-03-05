import { Screen, Widget } from "features/screen";

import { CollectionsWidget } from "widgets/collections";

export default function DashboardScreen() {
  return (
    <Screen title="Collections" rolesAllowed={["ADMIN"]}>
      <CollectionsWidget />
    </Screen>
  );
}
