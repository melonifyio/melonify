import { doc } from "firebase/firestore";
import { useFirestoreDocumentData } from "@react-query-firebase/firestore";
import firestore from "config/firestore";

type UsePageProps = {
  id: string;
};

const usePage = ({ id }: UsePageProps) => {
  const ref = doc(firestore, `_melonify_/config/collections`, id);
  const page = useFirestoreDocumentData<any>(["apps", id], ref, {
    idField: "_id",
  });

  return page;
};

export default usePage;
