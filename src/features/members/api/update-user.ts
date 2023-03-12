import { useDataProvider } from "core/data";

type UseUpdateUserProps = {
  documentId: string;
};

export function useUpdateUser({ documentId }: UseUpdateUserProps) {
  const { useUpdateDocument } = useDataProvider();

  const res = useUpdateDocument({
    collectionId: "users",
    documentId,
  });

  return res;
}
