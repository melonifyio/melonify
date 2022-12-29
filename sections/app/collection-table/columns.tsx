import { GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import { FieldProps } from "../../../components/form-field/types";

export const columns = (model: {
  fields: Record<string, FieldProps>;
}): GridColDef[] => {
  const transformedColumns = Object.keys(model.fields || {}).map(
    (fieldKey) => ({
      field: model.fields[fieldKey].fieldKey,
      headerName: model.fields[fieldKey].name,
      width: 150,
    })
  );

  return transformedColumns;
};
