import { query, collection, getFirestore } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import firestore from "config/firebase/firestore";

type UseGetDocumentsProps = {
  collectionName: string;
  enabled?: boolean;
};

const useGetDocuments = (props: UseGetDocumentsProps) => {
  const { collectionName, enabled = true } = props;

  const ref = query(collection(firestore, collectionName));

  const q = useFirestoreQueryData(
    [collectionName, enabled],
    ref,
    {
      idField: "_id",
      subscribe: true,
    },
    {
      enabled,
    }
  );

  return q;
};

export default useGetDocuments;
