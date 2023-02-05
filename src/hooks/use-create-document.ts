import { collection } from "firebase/firestore";
import { useFirestoreCollectionMutation } from "@react-query-firebase/firestore";
import firestore from "config/firestore";

type UseCreateDocumentProps = {
  collectionName: string;
};

const useCreateDocument = ({ collectionName }: UseCreateDocumentProps) => {
  const ref = collection(firestore, collectionName);
  const mutation = useFirestoreCollectionMutation(ref);

  return mutation;
};

export default useCreateDocument;
