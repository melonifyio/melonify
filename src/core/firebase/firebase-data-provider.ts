import React from "react";
import {
  QueryResponse,
  DataContextProps,
  PaginatedQueryResponse,
  UseDocumentParams,
  UseDocumentsParams,
  UseCreateDocumentParams,
  UseDeleteDocumentParams,
  MutationResponse,
  UseUpdateDocumentParams,
  UseCountParams,
} from "core/data";
import {
  collection,
  doc,
  endBefore,
  limit,
  orderBy,
  query,
  QueryConstraint,
  startAfter,
  where,
} from "firebase/firestore";
import firestore from "./lib/firestore";
import { useFirestoreQuery } from "./hooks/use-firestore-query";
import { useFirestoreCount } from "./hooks/use-firestore-count";
import { useFirestoreDoc } from "./hooks/use-firestore-doc";
import { useFirestoreAddDoc } from "./hooks/use-firestore-add-doc";
import { useFirestoreDelete } from "./hooks/use-firestore-delete";
import { useFirestoreSetDoc } from "./hooks/use-firestore-set-doc";
import { useToast } from "core/toast";

export function firebaseDataProvider(): DataContextProps {
  return {
    useDocuments<T>(params: UseDocumentsParams): PaginatedQueryResponse<T[]> {
      const {
        collectionId,
        rowsPerPage = 10,
        filters = {},
        sort = [{ field: "createdAt", dir: "desc" }],
      } = params;

      const initialConstraints = [limit(rowsPerPage)];

      const collectionRef = collection(firestore, collectionId);
      const [queryConstraints, setQueryConstraints] =
        React.useState<QueryConstraint[]>(initialConstraints);

      const [data, isLoading, error, firstVisible, lastVisible] =
        useFirestoreQuery<T>(
          [collectionId, queryConstraints],
          query(collectionRef, ...queryConstraints)
        );

      const [count] = useFirestoreCount<number>(
        [collectionRef, queryConstraints],
        query(collectionRef, ...queryConstraints)
      );

      const handleNext = (lastVisible: any) => {
        setQueryConstraints(
          lastVisible
            ? [...initialConstraints, startAfter(lastVisible)]
            : initialConstraints
        );
      };

      const handlePrev = (lastVisible: any) => {
        setQueryConstraints(
          lastVisible
            ? [...initialConstraints, endBefore(firstVisible)]
            : initialConstraints
        );
      };

      React.useEffect(() => {
        const newConstraints: QueryConstraint[] = [];

        Object.keys(filters).map((key) => {
          newConstraints.push(
            where(filters[key].field, filters[key].operator, filters[key].value)
          );
        });

        sort.map((sortItem) => {
          newConstraints.push(orderBy(sortItem.field, sortItem.dir));
        });

        setQueryConstraints([...initialConstraints, ...newConstraints]);
      }, [JSON.stringify(filters), JSON.stringify(sort)]);

      return [
        data,
        isLoading,
        error,
        count,
        () => handlePrev(firstVisible),
        () => handleNext(lastVisible),
      ];
    },
    useDocument<T>(params: UseDocumentParams): QueryResponse<T> {
      const { collectionId, documentId } = params;

      const docRef = doc(firestore, `${collectionId}/${documentId}`);

      const res = useFirestoreDoc<T>([collectionId, documentId], docRef);

      return res;
    },
    useCreateDocument(params: UseCreateDocumentParams): MutationResponse<any> {
      const { collectionId, onSuccess } = params;

      const toast = useToast();

      const res = useFirestoreAddDoc(collection(firestore, collectionId), {
        onSuccess: () => {
          onSuccess && onSuccess();
          toast.success("Successfully created");
        },
      });

      return res;
    },
    useDeleteDocument(params: UseDeleteDocumentParams): MutationResponse<any> {
      const { collectionId, documentId, onSuccess } = params;

      const toast = useToast();

      const docRef = doc(firestore, `${collectionId}/${documentId}`);

      const res = useFirestoreDelete(docRef, {
        onSuccess: () => {
          onSuccess && onSuccess();
          toast.success("Successfully deleted");
        },
      });

      return res;
    },
    useUpdateDocument(params: UseUpdateDocumentParams): MutationResponse<any> {
      const { collectionId, documentId, onSuccess, merge } = params;

      const toast = useToast();

      const docRef = doc(firestore, `${collectionId}/${documentId}`);

      const res = useFirestoreSetDoc(docRef, {
        merge,
        onSuccess: () => {
          onSuccess && onSuccess();
          toast.success("Successfully updated");
        },
      });

      return res;
    },
    useCount<T>(params: UseCountParams): QueryResponse<T> {
      const { collectionId } = params;

      const res = useFirestoreCount<T>(
        collectionId,
        collection(firestore, collectionId)
      );

      return res;
    },
  };
}
