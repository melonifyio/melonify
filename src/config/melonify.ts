import { CollectionProps } from "components/collection/types";
import { MenuItemProps } from "components/elements/menu/menu";
import { WidgetProps } from "components/screen/types";
import Table from "components/table/table";

interface IMelonify {
  menu: MenuItemProps[];
  collections: Record<string, CollectionProps>;
  screen: Record<string, Record<string, WidgetProps>>;
}

const menu: IMelonify["menu"] = [
  { path: "restaurants", title: "Restaurants", icon: "Restaurant" },
  { path: "categories", title: "Categories", icon: "Category" },
  { path: "orders", title: "Orders", icon: "ShoppingCart" },
];

const collections: IMelonify["collections"] = {
  restaurants: {
    id: "Restaurants",
    schema: {
      image: { label: "Logo", type: "IMAGE" },
      cover: { label: "Cover", type: "IMAGE" },
      title: { label: "Title", type: "TEXT" },
      rating: { label: "Rating", type: "NUMBER" },
      address: { label: "Address", type: "TEXT" },
      category: { label: "Category", type: "REFERENCE" },
      Menu: { label: "Menu", type: "SUBCOLLECTION" },
    },
  },
  categories: { id: "Categories", schema: {} },
  orders: { id: "Orders", schema: {} },
  users: { id: "users", schema: {} },
};

const screen: IMelonify["screen"] = {
  // screen id
  restaurants: {
    // widget id
    restaurantsList: {
      component: Table,
      props: {
        collection: collections["restaurants"],
      },
    },
  },
};

const melonify: IMelonify = {
  menu,
  collections,
  screen,
};

export default melonify;
