import { query, collection, where } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

import firestore from "../firebase/firestore";
import useMe from "./useAuth";

const useApps = () => {
  const me = useMe();
  // Define a query reference using the Firebase SDK
  const q = query(
    collection(firestore, "apps"),
    where("owner.uid", "==", me.data?.uid)
  );

  // Provide the query to the hook
  const res = useFirestoreQueryData(
    ["_apps_", me.data?.uid],
    q,
    {
      idField: "_id",
    },
    {
      cacheTime: 0,
    }
  );

  return res;
};

export default useApps;
