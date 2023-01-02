import { query, collection } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

import firestore from "../firebase/firestore";

const useApps = () => {
  // Define a query reference using the Firebase SDK
  const ref = query(collection(firestore, "apps"));

  // Provide the query to the hook
  const q = useFirestoreQueryData(
    ["_apps_"],
    ref,
    {
      idField: "_id",
    },
    {
      cacheTime: 0,
    }
  );

  return q;
};

export default useApps;
