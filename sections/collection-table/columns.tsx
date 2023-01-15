import {
  GridColDef,
  GridRenderCellParams,
  getGridStringOperators,
} from "@mui/x-data-grid";
import { FieldProps } from "../../components/form-field/types";
import { TableField } from "../../components/table-field/table-field";

const filterOperators = getGridStringOperators()
  .filter(({ value }) => ["startsWith", "equals"].includes(value))
  .reverse();

const getColumnWidth = (columnType: string): number => {
  if (columnType === "IMAGE") return 96;

  return 150;
};

const getColumnFlex = (columnType: string): number => {
  if (columnType === "TEXT") return 1;
  if (columnType === "REFERENCE") return 1;

  return 0;
};

const getFilterable = (columnType: string): boolean => {
  if (columnType === "IMAGE") return false;
  if (columnType === "DATE") return false;

  return true;
};

export const columns = (model: {
  fields: Record<string, FieldProps>;
}): GridColDef[] => {
  const fieldKeys = Object.keys(model.fields || {});
  const fieldKeysSorted = fieldKeys.sort(function (a, b) {
    return (model.fields[a].index || 0) - (model.fields[b].index || 0);
  });

  const transformedColumns = fieldKeysSorted.map((fieldKey) => ({
    field: model.fields[fieldKey].fieldKey,
    headerName: model.fields[fieldKey].name,
    width: getColumnWidth(model.fields[fieldKey].type),
    flex: getColumnFlex(model.fields[fieldKey].type),
    filterable: getFilterable(model.fields[fieldKey].type),
    filterOperators,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <TableField type={model.fields[fieldKey].type} value={params.value} />
      );
    },
  }));

  return transformedColumns;
};
