import { create } from "zustand";
import * as icons from "@mui/icons-material";
import { RoleModel } from "schema";

interface IMenuItem {
  path: string;
  title: string;
  icon: keyof typeof icons;
  rolesAllowed?: RoleModel[];
}
interface Menu {
  data: {
    regular: IMenuItem[];
    footer: IMenuItem[];
  };
}

export const useMenuStore = create<Menu>(() => ({
  data: {
    regular: [
      {
        path: "/tasks",
        title: "Tasks",
        icon: "Task",
        rolesAllowed: ["OWNER", "ADMIN", "MEMBER"],
      },
    ],
    footer: [
      { path: "/settings/members", title: "Members", icon: "People" },
      { path: "/settings", title: "Settings", icon: "Settings" },
    ],
  },
}));
