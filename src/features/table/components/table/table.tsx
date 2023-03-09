import * as React from "react";
import { ZodType } from "zod";

import MuiTable from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import { Box, LinearProgress } from "@mui/material";

import { useDataProvider } from "features/data";
import { IColumn } from "features/table/types";
import { FormFieldProps } from "features/forms";

import { TableHead } from "../table-head/table-head";
import { TableBody } from "../table-body/table-body";
import { TableToolbar } from "../table-toolbar/table-toolbar";
import { TablePagination } from "../table-pagination/table-pagination";
import { TableDrawer } from "../table-drawer/table-drawer";
import { FilterItem } from "../table-filter/table-filter-item";
import { FilterTokenProps } from "../table-filter";

export type RolesAllowedProps = {
  create: string[];
  view: string[];
  update: string[];
  delete: string[];
};

type TableProps = {
  collectionId: string;
  schema: ZodType;
  subcollections?: { id: string; label: string; schema: ZodType }[];
  columns: Record<string, IColumn>;
  fields?: Record<string, FormFieldProps>;
  filterTokens?: Record<string, FilterTokenProps>;
  rolesAllowed?: RolesAllowedProps;
  hasCreatedBy?: boolean;
  hasTimestamps?: boolean;
  initialValues?: any;
};

export function Table(props: TableProps): JSX.Element {
  const {
    collectionId,
    columns,
    schema,
    fields,
    filterTokens,
    subcollections,
    rolesAllowed,
    hasCreatedBy = true,
    hasTimestamps = true,
    initialValues = {},
  } = props;

  const { useDocuments } = useDataProvider();

  const [filters, setFilters] = React.useState<Record<string, FilterItem>>({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);
  const [activeDocumentId, setActiveDocumentId] = React.useState<string>("");

  const [data, isLoading, error, count, showNextPage, showPreviousPage] =
    useDocuments({
      collectionId,
      rowsPerPage,
      filters,
    });

  // const columns = getColumns(collection.schema);

  const handleChangePage = (event: unknown, newPage: number) => {
    newPage > page ? showNextPage() : showPreviousPage();
    setPage(newPage);
  };

  return (
    <>
      <TableToolbar
        collectionId={collectionId}
        fields={fields}
        filterTokens={filterTokens}
        initialFilters={filters}
        onChangeFitler={setFilters}
        rolesAllowed={rolesAllowed}
        schema={schema}
        hasCreatedBy={hasCreatedBy}
        hasTimestamps={hasTimestamps}
        initialValues={initialValues}
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
          schema={schema}
          onClose={() => setActiveDocumentId("")}
          collectionId={collectionId}
          fields={fields}
          documentId={activeDocumentId}
          rolesAllowed={rolesAllowed}
          subcollections={subcollections}
        />
      )}
    </>
  );
}
