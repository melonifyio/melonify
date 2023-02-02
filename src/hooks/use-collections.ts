import { query, collection, getFirestore } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import firestore from "config/firestore";

const useCollections = () => {
  const ref = query(collection(firestore, "_melonify_/config/collections"));

  const q = useFirestoreQueryData(["collections"], ref, {
    idField: "_id",
  });

  return q;
};

export default useCollections;
