import { getFirestore, doc as fsdoc } from "firebase/firestore";
import { UseQueryOptions, QueryKey } from "react-query";
import {
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";

import { useApp } from "./useApp";

type UseDocumentProps = {
  collectionName: string;
  id: string;
  useQueryOptions?: {
    enabled?: boolean;
  };
};

const useDocument = ({
  collectionName,
  id,
  useQueryOptions,
}: UseDocumentProps) => {
  const { firebase } = useApp();
  const firestore = getFirestore(firebase);

  const ref = fsdoc(firestore, collectionName, id);
  const document = useFirestoreDocumentData(
    [collectionName, id],
    ref,
    {
      idField: "_id",
    },
    useQueryOptions
  );

  const mutation = useFirestoreDocumentMutation(ref);

  return { document, mutation };
};

export default useDocument;
