import * as React from "react";

import MuiTableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { IColumn } from "./columns";

type TableBodyProps = {
  columns: IColumn[];
  rows: any;
  onItemClick: (name: string) => void;
};

export default function TableBody(props: TableBodyProps): JSX.Element {
  const { columns, rows, onItemClick } = props;

  const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {
    onItemClick(_id);
  };

  return (
    <MuiTableBody>
      {rows.map((row: any) => (
        <TableRow
          key={row._id}
          hover
          onClick={(event) => handleClick(event, row._id)}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {columns.map((col) => (
            <TableCell key={col.field} align={col.align}>
              {col.renderCell(row)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableBody>
  );
}
