import { useDataProvider } from "features/data";

type UseTasksCountProps = {};

export function useTasksCount(props?: UseTasksCountProps) {
  const { useCount } = useDataProvider();

  const res = useCount({
    collectionId: "users",
  });

  return res;
}
