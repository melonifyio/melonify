import { CollectionsList } from "./components/list";

import { Widget } from "features/screen";
import { useCollectionsStore } from "store/collections";

export function CollectionsWidget() {
  const { data } = useCollectionsStore();

  return (
    <Widget>
      <CollectionsList data={data} />
    </Widget>
  );
}
