import { query, collection, getFirestore } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import firestore from "config/firestore";

type UseDocumentsProps = {
  collectionName: string;
  enabled?: boolean;
};

const useDocuments = (props: UseDocumentsProps) => {
  const { collectionName, enabled = true } = props;

  const ref = query(collection(firestore, collectionName));

  const q = useFirestoreQueryData(
    [collectionName],
    ref,
    {
      idField: "_id",
    },
    {
      enabled,
    }
  );

  return q;
};

export default useDocuments;
