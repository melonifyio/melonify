import * as React from "react";
import { ZodType } from "zod";

import { Toolbar, Button, Stack, Divider } from "@mui/material";
import { Add } from "@mui/icons-material";

import { Denied } from "features/auth";
import { FormFieldProps, FormModal } from "features/forms";
import { FormFields } from "features/forms";
import { useDataProvider } from "features/data";

import { FilterTokenProps, TableFilter } from "../table-filter";
import { FilterItem } from "../table-filter";
import { RolesAllowedProps } from "../table/table";

type TableToolbarProps = {
  collectionId: string;
  filterTokens?: Record<string, FilterTokenProps>;
  fields?: Record<string, FormFieldProps>;
  schema?: ZodType;
  initialFilters: Record<string, FilterItem>;
  onChangeFitler: (values: Record<string, FilterItem>) => void;
  rolesAllowed?: RolesAllowedProps;
};

export function TableToolbar(props: TableToolbarProps) {
  const {
    collectionId,
    filterTokens,
    fields,
    onChangeFitler,
    initialFilters,
    rolesAllowed,
    schema,
  } = props;

  const { useCreateDocument } = useDataProvider();

  const [createIsOpen, setCreateOpen] = React.useState(false);

  const [createDoc, creating] = useCreateDocument({
    collectionId,
    onSuccess: () => {
      setCreateOpen(false);
    },
  });

  return (
    <>
      <Toolbar sx={{ padding: { xs: 0 } }}>
        <Stack
          direction="row"
          divider={<Divider orientation="vertical" flexItem />}
          spacing={2}
        >
          <TableFilter
            filterTokens={filterTokens || {}}
            initialFilters={initialFilters}
            onChange={onChangeFitler}
          />

          <Denied rolesAllowed={rolesAllowed && rolesAllowed["create"]}>
            <Button
              startIcon={<Add />}
              variant="contained"
              onClick={() => setCreateOpen(true)}
            >
              New
            </Button>
          </Denied>
        </Stack>
      </Toolbar>

      <FormModal
        open={createIsOpen}
        onClose={() => setCreateOpen(false)}
        title="New document"
        initialValues={{}}
        isSubmitting={creating as boolean}
        schema={schema}
        contentComponent={(params) => (
          <FormFields fields={fields || {}} {...params} />
        )}
        onSubmit={createDoc as (values: any) => void}
      />
    </>
  );
}
