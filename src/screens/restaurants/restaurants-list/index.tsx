import { Table } from "features/table";
import { Widget } from "features/screen";

import { useCollectionsStore } from "store/collections";

export function RestaurantsList() {
  const { data } = useCollectionsStore();
  const { id, schema, subcollections } = data["restaurants"];

  return (
    <Widget>
      <Table
        collectionId={id}
        schema={schema}
        subcollections={subcollections}
        columns={{
          available: {
            headerName: "Available",
            type: "BOOLEAN",
          },
          image: {
            headerName: "Logo",
            type: "IMAGE",
          },
          title: {
            headerName: "Title",
            type: "TEXT",
          },
          address: {
            headerName: "Address",
            type: "TEXT",
          },
          label: {
            headerName: "Label",
            type: "ENUM",
          },
        }}
        fields={{
          image: {
            label: "Logo",
            type: "IMAGE",
          },
          cover: {
            label: "Cover",
            type: "IMAGE",
          },
          title: {
            label: "Title",
            type: "TEXT",
          },
          address: {
            label: "Address",
            type: "TEXT",
          },
          rating: {
            label: "Rating",
            type: "TEXT",
          },
          available: {
            label: "Available",
            type: "BOOLEAN",
          },
          label: {
            label: "Label",
            type: "ENUM",
            config: {
              options: ["TOP", "NEW", "OFFERING_DISCOUNT"],
            },
          },
          test: {
            label: "Label",
            type: "ENUM",
            config: {
              options: ["TOP", "NEW", "OFFERING_DISCOUNT"],
            },
          },
        }}
        filterTokens={{
          title: {},
        }}
      />
    </Widget>
  );
}
