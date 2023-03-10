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
import { FilterItem } from "../table-filter/table-filter-item";
import { FilterTokenProps } from "../table-filter";

export type TableRolesAllowedProps = {
  create: string[];
  view: string[];
  update: string[];
  delete: string[];
};

type TableProps = {
  collectionId: string;
  schema: ZodType;
  columns: Record<string, IColumn>;
  fields?: Record<string, FormFieldProps>;
  filterTokens?: Record<string, FilterTokenProps>;
  rolesAllowed?: TableRolesAllowedProps;
  hasCreatedBy?: boolean;
  hasTimestamps?: boolean;
  initialValues?: any;
  onItemClick?: (_id: string) => void;
};

export function Table(props: TableProps): JSX.Element {
  const {
    collectionId,
    columns,
    schema,
    fields,
    filterTokens,
    rolesAllowed,
    hasCreatedBy = true,
    hasTimestamps = true,
    initialValues = {},
    onItemClick,
  } = props;

  const { useDocuments } = useDataProvider();

  const [filters, setFilters] = React.useState<Record<string, FilterItem>>({});

  const [page, setPage] = React.useState(0);
  const [rowsPerPage] = React.useState(10);

  const [data, isLoading, error, count, showNextPage, showPreviousPage] =
    useDocuments({
      collectionId,
      rowsPerPage,
      filters,
      sort: [{ field: "createdAt", dir: "desc" }],
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
              onItemClick={onItemClick}
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
    </>
  );
}
