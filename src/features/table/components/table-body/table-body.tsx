import * as React from "react";

import MuiTableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import { EmptyState } from "components/empty-state";

import { IColumn } from "../../../table/types";
import { Field } from "features/fields";

type TableBodyProps = {
  columns: Record<string, IColumn>;
  rows: any;
  onItemClick: (name: string) => void;
};

export function TableBody(props: TableBodyProps): JSX.Element {
  const { columns, rows, onItemClick } = props;

  const handleClick = (event: React.MouseEvent<unknown>, _id: string) => {
    onItemClick(_id);
  };

  return (
    <MuiTableBody>
      {rows.length === 0 && (
        <TableRow>
          <TableCell colSpan={Object.keys(columns).length}>
            <EmptyState
              title="No results"
              description="Please try add or fitler the table"
            />
          </TableCell>
        </TableRow>
      )}

      {rows.map((row: any) => (
        <TableRow
          key={row._id}
          hover
          onClick={(event) => handleClick(event, row._id)}
          sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
        >
          {Object.keys(columns).map((col) => {
            const renderField = columns[col].renderCell;

            return (
              <TableCell key={col} align={columns[col].align}>
                {typeof renderField === "function" ? (
                  renderField(row)
                ) : (
                  <Field
                    type={columns[col].type}
                    value={row[col]}
                    config={columns[col].config}
                  />
                )}
              </TableCell>
            );
          })}
        </TableRow>
      ))}
    </MuiTableBody>
  );
}
