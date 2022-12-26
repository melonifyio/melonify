import { query, collection, getFirestore } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

import { useApp } from "./useApp";

const useCollections = () => {
  const { firebase, appData } = useApp();
  const firestore = getFirestore(firebase);

  const ref = query(collection(firestore, "_melonify_/config/collections"));

  const q = useFirestoreQueryData(["collections", appData?.id], ref, {
    idField: "_id",
  });

  return q;
};

export default useCollections;
