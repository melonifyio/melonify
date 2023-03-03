import { CollectionProps } from "features/collections";
import { ScreenProps, WIDGETS } from "features/screen";
import { NavItemProps } from "features/layouts";

const ROLES = ["ADMIN", "USER", "DRIVER", "RESTAURANT", "KITCHEN"];

type MelonifyProps = {
  menu: NavItemProps[];
  collections: Record<string, CollectionProps>;
  screen: Record<string, ScreenProps>;
};

const menu: MelonifyProps["menu"] = [
  {
    path: "restaurants",
    title: "Restaurants",
    icon: "Restaurant",
    rolesAllowed: ["ADMIN"],
  },
  { path: "categories", title: "Categories", icon: "Category" },
  { path: "orders", title: "Orders", icon: "ShoppingCart" },
  { path: "users", title: "Users", icon: "People" },
];

const collections: MelonifyProps["collections"] = {
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
          required: true,
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
  categories: { id: "categories", schema: {} },
  orders: {
    id: "Orders",
    schema: {
      customer: {
        label: "Customer",
        type: "REFERENCE",
        config: {
          required: true,
          collectionId: "users",
          optionLabel: "email",
        },
      },
      status: {
        label: "Status",
        type: "ENUM",
        config: {
          options: ["PENDING", "PAID", "DELIVERED", "CANCELLED"],
        },
      },
    },
  },
  users: {
    id: "users",
    schema: {
      email: {
        label: "Email",
        type: "TEXT",
        config: {},
      },
      role: {
        label: "Role",
        type: "ENUM",
        config: {
          options: ROLES,
        },
      },
    },
  },
};

const screen: MelonifyProps["screen"] = {
  restaurants: {
    // rolesAllowed: ["ADMIN"],
    widgets: {
      restaurantsList: {
        component: WIDGETS["table"],
        props: {
          collection: collections["restaurants"],
        },
        rolesAllowed: {
          create: ["ADMIN"],
          read: ["ADMIN"],
          update: ["ADMIN"],
          delete: ["ADMIN"],
        },
      },
    },
  },
  orders: {
    widgets: {
      ordersList: {
        component: WIDGETS["table"],
        props: {
          collection: collections["orders"],
        },
      },
    },
  },
  users: {
    widgets: {
      usersList: {
        component: WIDGETS["table"],
        props: {
          collection: collections["users"],
        },
      },
    },
  },
};

const melonify: MelonifyProps = {
  menu,
  collections,
  screen,
};

export default melonify;
