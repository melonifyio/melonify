import * as React from "react";
import { useFirestoreQueryData } from "@react-query-firebase/firestore";
import { getFirestore, collection, query } from "firebase/firestore";

import { DataGrid } from "@mui/x-data-grid";
import { Box, LinearProgress } from "@mui/material";

import { useApp } from "../../../hooks/useApp";

import { Toolbar } from "./toolbar";
import { SmartTableProps } from "./types";
import { columns } from "./columns";

export default function CollectionTable(props: SmartTableProps) {
  const { collectionName, model } = props;

  const [filterButtonEl, setFilterButtonEl] =
    React.useState<HTMLButtonElement | null>(null);

  const { firebase } = useApp();
  const firestore = getFirestore(firebase);

  const ref = query(collection(firestore, collectionName));
  const documents = useFirestoreQueryData([collectionName], ref, {
    idField: "_id",
  });

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        loading={documents.isLoading}
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
        rows={documents.data || []}
        columns={columns(model)}
        getRowId={(item) => item._id}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
  );
}
