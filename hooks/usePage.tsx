import { getFirestore, doc as fsdoc } from "firebase/firestore";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";

import { useApp } from "./useApp";

type UsePageProps = {
  id: string;
};

const usePage = ({ id }: UsePageProps) => {
  const { firebase } = useApp();
  const firestore = getFirestore(firebase);

  const ref = fsdoc(firestore, `_melonify_/config/collections`, id);
  const page = useFirestoreDocumentData(["apps", id], ref);

  return page;
};

export default usePage;
