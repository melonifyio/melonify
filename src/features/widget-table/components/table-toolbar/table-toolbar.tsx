import * as React from "react";

import { Toolbar, Button, Stack, Divider } from "@mui/material";
import { Add } from "@mui/icons-material";

import { Denied } from "features/auth";
import { FormModal } from "features/forms";
import { CollectionProps } from "features/collections";
import { FormFields } from "features/forms";
import { useDataProvider } from "features/data-provider";

import { TableFilter } from "../table-filter";
import { FilterItem } from "../table-filter";
import { RolesAllowedProps } from "../table/table";

type TableToolbarProps = {
  collectionId: string;
  schema: CollectionProps["schema"];
  initialFilters: Record<string, FilterItem>;
  onChangeFitler: (values: Record<string, FilterItem>) => void;
  rolesAllowed?: RolesAllowedProps;
};

export function TableToolbar(props: TableToolbarProps) {
  const { collectionId, schema, onChangeFitler, initialFilters, rolesAllowed } =
    props;

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
            schema={schema}
            initialFilters={initialFilters}
            onChange={onChangeFitler}
          />

          <Denied rolesAllowed={rolesAllowed && rolesAllowed["create"]}>
            <Button
              size="small"
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
        contentComponent={(params) => (
          <FormFields schema={schema} {...params} />
        )}
        onSubmit={createDoc as (values: any) => void}
      />
    </>
  );
}
