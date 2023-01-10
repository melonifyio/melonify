import { query, collection, getFirestore } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

import { useApp } from "./useApp";

type UseDocumentsProps = {
  collectionName: string;
};

const useDocuments = (props: UseDocumentsProps) => {
  const { collectionName } = props;

  const { firebase, appData } = useApp();
  const firestore = getFirestore(firebase);

  const ref = query(collection(firestore, collectionName));

  const q = useFirestoreQueryData([collectionName, appData?.id], ref, {
    idField: "_id",
  });

  return q;
};

export default useDocuments;
