import { collection, query } from "firebase/firestore";
import useFirestoreQuery from "hooks/useFirestoreQuery";
import firestore from "services/firebase/firestore";

type UseTableProps = {
  collectionId: string;
};

export default function useTable({ collectionId }: UseTableProps) {
  const res = useFirestoreQuery(
    [collectionId],
    query(collection(firestore, collectionId))
  );

  return res;
}
