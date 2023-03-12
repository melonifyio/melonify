import Grid2 from "@mui/material/Unstable_Grid2";
import { MembersListWidget } from "./members-list";

export function MembersScreen() {
  return (
    // <Screen title="Members" rolesAllowed={["OWNER", "ADMIN", "MEMBER"]}>
    <MembersListWidget />
    // </Screen>
  );
}
