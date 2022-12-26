import { query, collection } from "firebase/firestore";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";

import firestore from "../firebase/firestore";

const usePages = () => {
  const ref = query(collection(firestore, "_melonify_/config/pages"));

  const q = useFirestoreQueryData(["pages"], ref);

  return q;
};

export default usePages;
