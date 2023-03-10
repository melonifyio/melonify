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

export type MutationResponse<T> = [
  (data?: T) => Promise<void>,
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
  rowsPerPage?: number;
  filters?: Record<string, LogicalFilter>;
  sort?: { field: string; dir: "asc" | "desc" }[];
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
  merge?: boolean;
  onSuccess?: () => void;
};

export type UseCountParams = {
  collectionId: string;
};

export type UseCountResponse = number;

export type IDataContext = {
  useDocuments<T>(params: UseDocumentsParams): PaginatedQueryResponse<T[]>;
  useDocument: <T>(
    params: UseDocumentParams
  ) => QueryResponse<UseDocumentResponse<T>>;
  useCreateDocument: (params: UseCreateDocumentParams) => MutationResponse<any>;
  useDeleteDocument: (params: UseDeleteDocumentParams) => MutationResponse<any>;
  useUpdateDocument: <T>(
    params: UseUpdateDocumentParams
  ) => MutationResponse<T>;
  useCount: (params: UseCountParams) => QueryResponse<UseCountResponse>;
};

export const DataContext = React.createContext<IDataContext>({
  useDocuments: () => [[], false, null, 0, () => {}, () => {}],
  useDocument: () => [null, false, null],
  useCreateDocument: () => [() => Promise.resolve(), false, null],
  useDeleteDocument: () => [() => Promise.resolve(), false, null],
  useUpdateDocument: () => [() => Promise.resolve(), false, null],
  useCount: () => [0, false, null],
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
