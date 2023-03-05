import { CollectionsList } from "./components/list";

import { Widget } from "features/screen";

export function CollectionsWidget() {
  return (
    <Widget>
      <CollectionsList
        data={{
          list: {
            id: "Restaurants",
          },
        }}
      />
    </Widget>
  );
}
