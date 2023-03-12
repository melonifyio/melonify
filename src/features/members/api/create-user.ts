import { useDataProvider } from "core/data";

type UseCreateUserProps = {};

export function useCreateUser(props?: UseCreateUserProps) {
  const { useCreateDocument } = useDataProvider();

  const res = useCreateDocument({
    collectionId: "users",
  });

  return res;
}
