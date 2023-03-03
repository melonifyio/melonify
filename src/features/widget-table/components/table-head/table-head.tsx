import * as React from "react";

import TableCell from "@mui/material/TableCell";
import MuiTableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import { IColumn } from "../../helpers/columns";

type TableHeadProps = {
  columns: IColumn[];
};

export function TableHead(props: TableHeadProps) {
  const { columns } = props;

  return (
    <MuiTableHead>
      <TableRow>
        {columns.map((col) => (
          <TableCell
            key={col.field}
            align={col.align}
            width={col.width}
            sx={{ flex: col.flex }}
          >
            {col.headerName}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}
