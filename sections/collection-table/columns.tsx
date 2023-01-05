import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { FieldProps } from "../../components/form-field/types";
import { TableField } from "../../components/table-field/table-field";

export const columns = (model: {
  fields: Record<string, FieldProps & { index: number }>;
}): GridColDef[] => {
  const fieldKeys = Object.keys(model.fields || {});
  const fieldKeysSorted = fieldKeys.sort(function (a, b) {
    return model.fields[a].index - model.fields[b].index || 0;
  });

  const transformedColumns = fieldKeysSorted.map((fieldKey) => ({
    field: model.fields[fieldKey].fieldKey,
    headerName: model.fields[fieldKey].name,
    width: 150,
    flex: 1,
    renderCell: (params: GridRenderCellParams<any>) => {
      return (
        <TableField type={model.fields[fieldKey].type} value={params.value} />
      );
    },
  }));

  return transformedColumns;
};
