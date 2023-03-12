import { useDataProvider } from "core/data";

export interface IUser {
  _id: string;
  email: string;
  photoUrl: string;
  role: string;
}

type UseUserProps = {
  documentId: string;
};

export function useUser({ documentId }: UseUserProps) {
  const { useDocument } = useDataProvider();

  const res = useDocument<IUser>({
    collectionId: "users",
    documentId,
  });

  return res;
}
