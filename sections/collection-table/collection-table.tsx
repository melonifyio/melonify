import * as React from "react";
import { useFirestoreInfiniteQueryData } from "@react-query-firebase/firestore";
import {
  getFirestore,
  collection,
  query,
  limit,
  startAfter,
  orderBy,
  getCountFromServer,
  Query,
  DocumentData,
} from "firebase/firestore";

import { DataGrid, GridSortModel } from "@mui/x-data-grid";
import { Box, LinearProgress } from "@mui/material";

import { useApp } from "../../hooks/useApp";

import { Toolbar } from "./toolbar";
import { SmartTableProps } from "./types";
import { columns } from "./columns";

const PAGE_SIZE = 5;

export default function CollectionTable(props: SmartTableProps) {
  const { collectionName, model } = props;

  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    { field: "createdAt", sort: "desc" },
  ]);
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  const { firebase } = useApp();
  const firestore = getFirestore(firebase);

  const col = collection(firestore, collectionName);
  const query_ = query(
    col,
    orderBy(sortModel[0]?.field || "createdAt", sortModel[0]?.sort || "desc"),
    limit(PAGE_SIZE)
  );
  const queryCount_ = query(col, orderBy(sortModel[0]?.field || "createdAt"));

  const documents = useFirestoreInfiniteQueryData(
    [collectionName, sortModel],
    query_,
    (data) => {
      const lastDocument = data[data.length - 1];

      if (!lastDocument) return undefined;

      return query(
        query_,
        startAfter(lastDocument[sortModel[0]?.field || "createdAt"])
      );
    },
    {
      idField: "_id",
    }
  );

  const handlePageChange = (newPage: number) => {
    setPage(newPage);

    if (newPage < page) {
      documents.fetchPreviousPage();
    }

    if (newPage > page) {
      documents.fetchNextPage();
    }
  };

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      setSortModel(sortModel);
    },
    []
  );

  React.useEffect(() => {
    const handleCount = async (q: Query<DocumentData>) => {
      try {
        const snapshot = await getCountFromServer(q);

        // setError(undefined);
        return snapshot.data().count;
      } catch (err) {
        // setError(err.message);
        return 0;
      }
    };

    handleCount(queryCount_).then(setCount);
  }, []);

  return (
    <Box sx={{ height: "411px", width: "100%" }}>
      <DataGrid
        loading={documents.isLoading || documents.isFetching}
        components={{
          Toolbar,
          LoadingOverlay: LinearProgress,
        }}
        componentsProps={{
          panel: {
            anchorEl: filterButtonEl,
          },
          toolbar: {
            setFilterButtonEl,
            model,
            collectionName,
          },
        }}
        initialState={{
          sorting: {
            sortModel,
          },
        }}
        rows={(documents.data?.pages && documents.data?.pages[page]) || []}
        columns={columns(model)}
        getRowId={(item) => item._id}
        pageSize={PAGE_SIZE}
        rowsPerPageOptions={[PAGE_SIZE]}
        rowCount={count}
        checkboxSelection
        disableSelectionOnClick
        paginationMode="server"
        onPageChange={handlePageChange}
        page={page}
        sortingMode="server"
        onSortModelChange={handleSortModelChange}
      />
    </Box>
  );
}
