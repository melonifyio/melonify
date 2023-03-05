import { useDataProvider } from "features/data";

type UseCollectionsCountProps = {
  collectionId: string;
};

export function useCollectionsCount({
  collectionId,
}: UseCollectionsCountProps) {
  const { useCount } = useDataProvider();

  const res = useCount({ collectionId });

  return res;
}
