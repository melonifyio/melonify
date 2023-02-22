import { doc } from "firebase/firestore";
import {
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
  useFirestoreDocumentDeletion,
} from "@react-query-firebase/firestore";
import firestore from "config/firebase/firestore";

type UseDocumentProps = {
  collectionName: string;
  id: string;
  merge?: boolean;
};

const useDocument = ({
  collectionName,
  id,
  merge = true,
}: UseDocumentProps) => {
  const ref = doc(firestore, collectionName, id);
  const query = useFirestoreDocumentData([collectionName, id], ref, {
    idField: "_id",
    subscribe: true,
  });

  const update = useFirestoreDocumentMutation(ref, {
    merge,
  });

  const remove = useFirestoreDocumentDeletion(ref);

  return { query, update, remove };
};

export default useDocument;
