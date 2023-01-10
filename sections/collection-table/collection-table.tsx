import * as React from "react";
import { useFirestoreInfiniteQueryData } from "@react-query-firebase/firestore";
import {
  getFirestore,
  collection,
  query,
  limit,
  startAfter,
  orderBy,
  where,
  getCountFromServer,
  Query,
  DocumentData,
  QueryConstraint,
} from "firebase/firestore";

import {
  DataGrid,
  GridSortModel,
  GridFilterModel,
  GridEventListener,
} from "@mui/x-data-grid";
import { Box, LinearProgress, Typography } from "@mui/material";

import { useApp } from "../../hooks/useApp";

import { Toolbar } from "./toolbar";
import { SmartTableProps } from "./types";
import { columns } from "./columns";
import { DetailsDrawer } from "./details-drawer";
import { Stack } from "@mui/system";

const PAGE_SIZE = 10;

function CollectionTable(props: SmartTableProps) {
  const { collectionName, model, title } = props;

  const [activeDocumentId, setActiveDocumentId] = React.useState<
    string | undefined
  >(undefined);

  const [error, setError] = React.useState("");
  const [sortModel, setSortModel] = React.useState<GridSortModel>([
    { field: "createdAt", sort: "desc" },
  ]);
  const [filterModel, setFilterModel] = React.useState<GridFilterModel>({
    items: [],
  });
  const [page, setPage] = React.useState(0);
  const [count, setCount] = React.useState(0);

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  let whereConstraints: QueryConstraint[] = [];

  filterModel.items.length > 0 &&
    filterModel.items.map((item) => {
      if (item.value && item.value.length > 0) {
        if (item.operatorValue === "startsWith") {
          whereConstraints.push(where(item.columnField, ">=", item.value));
          whereConstraints.push(
            where(item.columnField, "<=", item.value + "\uf8ff")
          );

          if ((sortModel[0]?.field || "createdAt") !== item.columnField) {
            whereConstraints.push(orderBy(item.columnField));
          }
        }

        if (item.operatorValue === "equals") {
          whereConstraints.push(where(item.columnField, "==", item.value));
          // whereConstraints.push(orderBy(item.columnField));
        }
      }
    });

  const { firebase } = useApp();
  const firestore = getFirestore(firebase);

  const col = collection(firestore, collectionName);
  const query_ = query(
    col,
    ...whereConstraints,
    orderBy(sortModel[0]?.field || "createdAt", sortModel[0]?.sort || "desc"),
    limit(PAGE_SIZE)
  );
  const queryCount_ = query(
    col,
    ...whereConstraints,
    orderBy(sortModel[0]?.field || "createdAt")
  );

  const documents = useFirestoreInfiniteQueryData(
    [collectionName, sortModel, filterModel],
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
    },
    {}
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

  const onFilterChange = React.useCallback((filterModel: GridFilterModel) => {
    setFilterModel(filterModel);
  }, []);

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    setActiveDocumentId(params.id as string);
  };

  React.useEffect(() => {
    const handleCount = async (q: Query<DocumentData>) => {
      try {
        const snapshot = await getCountFromServer(q);

        setError("");
        return snapshot.data().count;
      } catch (err: any) {
        setError(err?.message);
        return 0;
      }
    };

    handleCount(queryCount_).then(setCount);
  }, [queryCount_]);

  return (
    <Box sx={{ height: "68vh", width: "100%" }}>
      {title && (
        <Typography variant="subtitle1" my={2}>
          {title}
        </Typography>
      )}

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
            error,
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
        filterMode="server"
        onFilterModelChange={onFilterChange}
        onRowClick={handleRowClick}
      />

      <DetailsDrawer
        open={!!activeDocumentId}
        collectionName={collectionName}
        documentId={activeDocumentId || "unknown"}
        onClose={() => setActiveDocumentId(undefined)}
        model={model}
      />
    </Box>
  );
}

export default React.memo(CollectionTable);
