import { doc } from "firebase/firestore";
import {
  useFirestoreDocumentData,
  useFirestoreDocumentMutation,
} from "@react-query-firebase/firestore";
import firestore from "config/firestore";

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
  const ref = doc(firestore, collectionName, id);
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
