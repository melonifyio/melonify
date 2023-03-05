import { useDataProvider } from "features/data";

import { IUser } from "./get-user";

type UseUsersProps = {};

export function useUsers(props?: UseUsersProps) {
  const { useDocuments } = useDataProvider();

  const res = useDocuments<IUser>({
    collectionId: "users",
    rowsPerPage: 100,
    filters: {},
  });

  return res;
}
