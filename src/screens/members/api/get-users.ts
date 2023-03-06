import { useDataProvider } from "features/data";
import { UserModel } from "schema";

type UseUsersProps = {};

export function useUsers(props?: UseUsersProps) {
  const { useDocuments } = useDataProvider();

  const res = useDocuments<UserModel>({
    collectionId: "users",
    rowsPerPage: 100,
    filters: {},
  });

  return res;
}
