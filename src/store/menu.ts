import { create } from "zustand";
import * as icons from "@mui/icons-material";

interface Menu {
  data: {
    path: string;
    title: string;
    icon: keyof typeof icons;
    rolesAllowed?: ["ADMIN"];
  }[];
}

export const useMenuStore = create<Menu>(() => ({
  data: [
    {
      path: "restaurants",
      title: "Restaurants",
      icon: "Restaurant",
      rolesAllowed: ["ADMIN"],
    },
    { path: "categories", title: "Categories", icon: "Category" },
    { path: "orders", title: "Orders", icon: "ShoppingCart" },
    { path: "users", title: "Users", icon: "People" },
  ],
}));
