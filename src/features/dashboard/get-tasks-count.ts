import { useDataProvider } from "core/data";

type UseTasksCountProps = {};

export function useTasksCount(props?: UseTasksCountProps) {
  const { useCount } = useDataProvider();

  const res = useCount({
    collectionId: "tasks",
  });

  return res;
}
