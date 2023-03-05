import React from "react";
import {
  QueryResponse,
  IDataContext,
  PaginatedQueryResponse,
  UseDocumentParams,
  UseDocumentsParams,
  UseCreateDocumentParams,
  UseDeleteDocumentParams,
  MutationResponse,
  UseUpdateDocumentParams,
  UseCountParams,
} from "features/data-provider";
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
import firestore from "lib/firebase/firestore";
import { useFirestoreQuery } from "./hooks/use-firestore-query";
import { useFirestoreCount } from "./hooks/use-firestore-count";
import { useFirestoreDoc } from "./hooks/use-firestore-doc";
import { useFirestoreAddDoc } from "./hooks/use-firestore-add-doc";
import { useFirestoreDelete } from "./hooks/use-firestore-delete";
import { useFirestoreSetDoc } from "./hooks/use-firestore-set-doc";

export function firebaseDataProvider(): IDataContext {
  return {
    useDocuments<T>(params: UseDocumentsParams): PaginatedQueryResponse<T[]> {
      const { collectionId, rowsPerPage, filters } = params;

      const initialConstraints = [orderBy("createdAt"), limit(rowsPerPage)];
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

        setQueryConstraints([...initialConstraints, ...newConstraints]);
      }, [filters]);

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
    useCreateDocument(params: UseCreateDocumentParams): MutationResponse {
      const { collectionId, onSuccess } = params;

      const res = useFirestoreAddDoc(collection(firestore, collectionId), {
        onSuccess,
      });

      return res;
    },
    useDeleteDocument(params: UseDeleteDocumentParams): MutationResponse {
      const { collectionId, documentId, onSuccess } = params;

      const docRef = doc(firestore, `${collectionId}/${documentId}`);

      const res = useFirestoreDelete(docRef, {
        onSuccess,
      });

      return res;
    },
    useUpdateDocument(params: UseUpdateDocumentParams): MutationResponse {
      const { collectionId, documentId, onSuccess } = params;

      const docRef = doc(firestore, `${collectionId}/${documentId}`);

      const res = useFirestoreSetDoc(docRef, {
        onSuccess,
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
