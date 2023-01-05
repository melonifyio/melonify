import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FieldProps } from "../../components/form-field/types";
import { TableField } from "../../components/table-field/table-field";

const getColumnWidth = (columnType: string): number => {
  if (columnType === "IMAGE") return 96;

  return 150;
};

const getColumnFlex = (columnType: string): number => {
  if (columnType === "TEXT") return 1;

  return 0;
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
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <TableField type={model.fields[fieldKey].type} value={params.value} />
      );
    },
  }));

  return transformedColumns;
};
