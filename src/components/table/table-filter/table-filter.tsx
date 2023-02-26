import * as React from "react";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import { Add, FilterList } from "@mui/icons-material";
import { Badge, Box, Divider, Stack } from "@mui/material";
import TableFilterItem, { FilterItem } from "./table-filter-item";
import { CollectionProps } from "components/collection/types";
import TableFilterEmpty from "./table-filter-empty";

type TableFilterProps = {
  schema: CollectionProps["schema"];
  initialFilters: Record<string, FilterItem>;
  onChange: (filter: Record<string, FilterItem>) => void;
};

export default function TableFilter(props: TableFilterProps) {
  const { schema, initialFilters, onChange } = props;

  const defaultFieldKey =
    Object.keys(schema).find((key) => schema[key].config?.isDefaultFilter) ||
    "title";

  const [values, setValues] = React.useState(initialFilters);

  const valuesCount = Object.keys(values).length;

  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setValues(initialFilters); // reset filter
  };

  const handleFilterChange = (key: string, value: FilterItem) => {
    const newValues = { ...values };
    newValues[key] = value;

    setValues({ ...newValues });
  };

  const handleApplyFilter = () => {
    onChange(values);
  };

  const handleAddFilter = () => {
    setValues({
      ...values,
      [`${defaultFieldKey}-${valuesCount + 1}`]: {
        field: defaultFieldKey,
        operator: schema[defaultFieldKey]?.config?.defaultOperator || "==",
        value: "",
      },
    });
  };

  const handleRemoveItem = (key: string) => {
    const newValues = { ...values }; // it is important to create a new array with {...} to act properly
    delete newValues[key];

    setValues(newValues);
  };

  const open = Boolean(anchorEl);
  const id = open ? "table-filter" : undefined;

  return (
    <div>
      <Badge badgeContent={Object.keys(initialFilters).length} color="primary">
        <Button
          size="small"
          startIcon={<FilterList />}
          variant="text"
          onClick={handleClick}
        >
          Filter
        </Button>
      </Badge>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        sx={{ mt: 1 }}
      >
        <Box p={2} sx={{ minWidth: 360 }}>
          {valuesCount === 0 && <TableFilterEmpty />}

          <Stack gap={2}>
            {Object.keys(values).map((key) => (
              <TableFilterItem
                key={key}
                value={values[key]}
                schema={schema}
                onChange={(val) => handleFilterChange(key, val)}
                onRemove={() => handleRemoveItem(key)}
              />
            ))}
          </Stack>

          <Divider sx={{ my: 2 }} />

          <Stack direction="row" justifyContent="space-between">
            <Button size="small" startIcon={<Add />} onClick={handleAddFilter}>
              Add filter
            </Button>

            <Button
              disabled={
                Object.keys(initialFilters).length === 0 && valuesCount === 0
              }
              size="small"
              variant="contained"
              onClick={handleApplyFilter}
            >
              Apply filter
            </Button>
          </Stack>
        </Box>
      </Popover>
    </div>
  );
}
