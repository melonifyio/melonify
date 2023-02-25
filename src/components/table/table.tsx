import * as React from "react";

import MuiTable from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";

import { CollectionProps } from "components/collection/types";

import useTable from "./use-table";
import TableHead from "./table-head";
import { getColumns } from "./columns";
import TableBody from "./table-body";
import { Box, LinearProgress } from "@mui/material";
import TableToolbar from "./table-toolbar";
import TablePagination from "./table-pagination";
import { TableDrawer } from "./table-drawer";

type TableProps = {
  collection: CollectionProps;
};

export default function Table(props: TableProps): JSX.Element {
  const { collection } = props;

  const [activeDocumentId, setActiveDocumentId] = React.useState<string>("");
  const [data, isLoading] = useTable({ collectionId: collection.id });

  const columns = getColumns(collection.schema);

  return (
    <>
      <TableToolbar collectionId={collection.id} schema={collection.schema} />

      <Paper sx={{ width: "100%", mb: 2 }}>
        <TableContainer>
          <MuiTable sx={{ minWidth: 650 }}>
            <TableHead columns={columns} />

            <TableBody
              columns={columns}
              rows={data}
              onItemClick={(_id) => setActiveDocumentId(_id)}
            />
          </MuiTable>
        </TableContainer>

        {isLoading && (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
      </Paper>

      <TablePagination count={10} />

      {!!activeDocumentId && (
        <TableDrawer
          open={Boolean(activeDocumentId)}
          onClose={() => setActiveDocumentId("")}
          collectionId={collection.id}
          schema={collection.schema}
          documentId={activeDocumentId}
        />
      )}
    </>
  );
}
