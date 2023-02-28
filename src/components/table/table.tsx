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
import { TableDrawer } from "./table-drawer/table-drawer";
import { FilterItem } from "./table-filter/table-filter-item";

export type RolesAllowedProps = {
  create: string[];
  view: string[];
  update: string[];
  delete: string[];
};

type TableProps = {
  collection: CollectionProps;
  rolesAllowed?: RolesAllowedProps;
};

export default function Table(props: TableProps): JSX.Element {
  const { collection, rolesAllowed } = props;
  const [filters, setFilters] = React.useState<Record<string, FilterItem>>({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [activeDocumentId, setActiveDocumentId] = React.useState<string>("");

  const { data, isLoading, count, showNextPage, showPreviousPage } = useTable({
    collectionId: collection.id,
    rowsPerPage,
    filters,
  });

  const columns = getColumns(collection.schema);

  const handleChangePage = (event: unknown, newPage: number) => {
    newPage > page ? showNextPage() : showPreviousPage();
    setPage(newPage);
  };

  return (
    <>
      <TableToolbar
        collectionId={collection.id}
        schema={collection.schema}
        initialFilters={filters}
        onChangeFitler={setFilters}
        rolesAllowed={rolesAllowed}
      />

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

      <TablePagination
        page={page}
        rowsPerPage={rowsPerPage}
        onPageChange={handleChangePage}
        count={count as number}
      />

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
