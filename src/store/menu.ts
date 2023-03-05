import { create } from "zustand";
import * as icons from "@mui/icons-material";

interface IMenuItem {
  path: string;
  title: string;
  icon: keyof typeof icons;
  rolesAllowed?: ["ADMIN"];
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
        path: "/restaurants",
        title: "Restaurants",
        icon: "Restaurant",
        rolesAllowed: ["ADMIN"],
      },
      { path: "/categories", title: "Categories", icon: "Category" },
      { path: "/orders", title: "Orders", icon: "ShoppingCart" },
    ],
    footer: [
      { path: "/settings/members", title: "Members", icon: "People" },
      { path: "/settings", title: "Settings", icon: "Settings" },
    ],
  },
}));
