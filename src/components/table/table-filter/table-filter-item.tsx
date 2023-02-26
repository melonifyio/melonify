import * as React from "react";
import { Autocomplete, IconButton, Stack, TextField } from "@mui/material";
import useDebounce from "hooks/useDebounce";
import { CollectionProps } from "components/collection/types";
import { Delete } from "@mui/icons-material";

export type FilterOperator = "==";

export type FilterItem = {
  field: string;
  operator: FilterOperator;
  value: unknown;
};

type TableFilterItemProps = {
  value: FilterItem;
  schema: CollectionProps["schema"];
  onChange: (value: FilterItem) => void;
  onRemove: () => void;
};

export default function TableFilterItem(props: TableFilterItemProps) {
  const { onChange, schema, onRemove, value } = props;

  const [inputValue, setInputValue] = React.useState(value.value);

  //   const debouncedInput = useDebounce(inputValue, 500);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleChangeField = (field: string) => {
    onChange({
      ...value,
      field,
    });
  };

  const handleChangeOperator = (operator: FilterOperator) => {
    onChange({
      ...value,
      operator,
    });
  };

  React.useEffect(() => {
    onChange({
      ...value,
      value: inputValue,
    });
  }, [inputValue]);

  return (
    <Stack direction="row" gap={1}>
      <Autocomplete
        disableClearable
        value={value.field}
        options={Object.keys(schema)}
        sx={{ minWidth: 140 }}
        renderInput={(params) => (
          <TextField {...params} size="small" label="Field" />
        )}
        onChange={(e, value) => handleChangeField(value)}
      />

      <Autocomplete
        disableClearable
        value={value.operator}
        options={schema[value.field]?.config?.availableOperators || ["=="]}
        sx={{ minWidth: 64 }}
        renderInput={(params) => (
          <TextField {...params} size="small" label="Operator" />
        )}
        onChange={(e, value) => handleChangeOperator(value as FilterOperator)}
      />

      <TextField
        value={inputValue}
        sx={{ maxWidth: 140 }}
        size="small"
        label="Value"
        onChange={handleInputChange}
      />

      <IconButton onClick={() => onRemove()}>
        <Delete />
      </IconButton>
    </Stack>
  );
}
