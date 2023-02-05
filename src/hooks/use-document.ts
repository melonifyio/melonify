import { doc } from "firebase/firestore";
import {
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
  useFirestoreDocumentDeletion,
} from "@react-query-firebase/firestore";
import firestore from "config/firestore";

type UseDocumentProps = {
  collectionName: string;
  id: string;
  useQueryOptions?: {
    enabled?: boolean;
  };
};

const useDocument = ({
  collectionName,
  id,
  useQueryOptions,
}: UseDocumentProps) => {
  const ref = doc(firestore, collectionName, id);
  const query = useFirestoreDocumentData(
    [collectionName, id],
    ref,
    {
      idField: "_id",
      subscribe: true,
    },
    { ...useQueryOptions }
  );

  const update = useFirestoreDocumentMutation(ref, {
    merge: true,
  });

  const remove = useFirestoreDocumentDeletion(ref);

  return { query, update, remove };
};

export default useDocument;
