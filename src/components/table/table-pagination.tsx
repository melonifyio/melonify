import * as React from "react";
import MuiTablePagination from "@mui/material/TablePagination";

type TablePaginationProps = {
  page: number;
  count: number;
  onPageChange: (event: unknown, page: number) => void;
  rowsPerPage: number;
};

export default function TablePagination(props: TablePaginationProps) {
  const { count, page, onPageChange, rowsPerPage } = props;

  return (
    <MuiTablePagination
      rowsPerPageOptions={[rowsPerPage]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      // onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
}
