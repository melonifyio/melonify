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
      available: { label: "Available", type: "BOOLEAN" },
      image: { label: "Logo", type: "IMAGE" },
      cover: {
        label: "Cover",
        type: "IMAGE",
        config: {
          hideTableColumn: true,
        },
      },
      title: {
        label: "Title",
        type: "TEXT",
        config: {
          filterable: true,
          isDefaultFilter: true,
          defaultOperator: "==",
          availableOperators: ["=="],
        },
      },
      rating: { label: "Rating", type: "NUMBER" },
      address: { label: "Address", type: "TEXT" },
      category: {
        label: "Category",
        type: "REFERENCE",
        config: {
          collectionId: "Categories",
        },
      },
      Menu: {
        label: "Menu",
        type: "SUBCOLLECTION",
        config: {
          schema: {
            image: { label: "Logo", type: "IMAGE" },
            title: { label: "Title", type: "TEXT" },
            description: {
              label: "Description",
              type: "TEXT",
              config: {
                hideTableColumn: true,
              },
            },
            price: { label: "Price", type: "NUMBER" },
            category: { label: "Category", type: "REFERENCE" },
          },
        },
      },
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
