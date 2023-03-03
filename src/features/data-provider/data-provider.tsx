import React from "react";

export type BaseDocument = {
  _id?: string;
  [key: string]: any;
};

export type QueryResponse<T> = [T | null, boolean, Error | null];

export type PaginatedQueryResponse<T> = [
  T | null,
  boolean,
  Error | null,
  number,
  () => void | undefined,
  () => void | undefined
];

export type MutationResponse = [
  (data?: any) => Promise<void>,
  boolean,
  Error | null
];

export type FilterOperator = "==";

export type LogicalFilter = {
  field: string;
  operator: FilterOperator;
  value: unknown;
};

export type UseDocumentsParams = {
  collectionId: string;
  rowsPerPage: number;
  filters: Record<string, LogicalFilter>;
};

export type UseDocumentsResponse<TData = BaseDocument> = TData[];

export type UseDocumentParams = {
  collectionId: string;
  documentId: string;
};

export type UseDocumentResponse<TData = BaseDocument> = TData;

export type UseCreateDocumentParams = {
  collectionId: string;
  onSuccess?: () => void;
};

export type UseCreateDocumentResponse = void;

export type UseDeleteDocumentParams = {
  collectionId: string;
  documentId: string;
  onSuccess?: () => void;
};

export type UseDeleteDocumentResponse = void;

export type UseUpdateDocumentParams = {
  collectionId: string;
  documentId: string;
  onSuccess?: () => void;
};

export type IDataContext = {
  useDocuments<T>(params: UseDocumentsParams): PaginatedQueryResponse<T[]>;
  useDocument: (
    params: UseDocumentParams
  ) => QueryResponse<Promise<UseDocumentResponse>>;
  useCreateDocument: (params: UseCreateDocumentParams) => MutationResponse;
  useDeleteDocument: (params: UseDeleteDocumentParams) => MutationResponse;
  useUpdateDocument: (params: UseUpdateDocumentParams) => MutationResponse;
};

export const DataContext = React.createContext<IDataContext>({
  useDocuments: () => [[], false, null, 0, () => {}, () => {}],
  useDocument: () => [Promise.resolve({}), false, null],
  useCreateDocument: () => [() => Promise.resolve(), false, null],
  useDeleteDocument: () => [() => Promise.resolve(), false, null],
  useUpdateDocument: () => [() => Promise.resolve(), false, null],
});

export type DataProviderProps = {
  children: React.ReactNode;
  provider: IDataContext;
};

export function DataProvider({ children, provider }: DataProviderProps) {
  const contextValue = provider;

  return (
    <DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
  );
}
