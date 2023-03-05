import * as React from "react";

import TableCell from "@mui/material/TableCell";
import MuiTableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IColumn } from "../../types";

type TableHeadProps = {
  columns: Record<string, IColumn>;
};

export function TableHead(props: TableHeadProps) {
  const { columns } = props;

  return (
    <MuiTableHead>
      <TableRow>
        {Object.keys(columns).map((col) => (
          <TableCell
            key={col}
            align={columns[col].align}
            width={columns[col].width}
            sx={{ flex: columns[col].flex }}
          >
            {columns[col].headerName}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
}
