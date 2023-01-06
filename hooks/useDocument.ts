import { getFirestore, doc as fsdoc } from "firebase/firestore";
import {
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";

import { useApp } from "./useApp";

type UseDocumentProps = {
  collectionName: string;
  id: string;
};

const useDocument = ({ collectionName, id }: UseDocumentProps) => {
  const { firebase } = useApp();
  const firestore = getFirestore(firebase);

  const ref = fsdoc(firestore, collectionName, id);
  const document = useFirestoreDocumentData<any>([collectionName, id], ref, {
    idField: "_id",
  });

  const mutation = useFirestoreDocumentMutation(ref);

  return { document, mutation };
};

export default useDocument;
