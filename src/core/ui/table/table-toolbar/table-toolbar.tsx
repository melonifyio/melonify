import * as React from "react";
import { ZodType } from "zod";

import { Toolbar, Button, Stack, Divider } from "@mui/material";
import { Add } from "@mui/icons-material";

import { FilterTokenProps, TableFilter } from "../table-filter";
import { FilterItem } from "../table-filter";
import { Timestamp } from "firebase/firestore";
import { TableRolesAllowedProps } from "../table/table";

import { Denied, useAuthProvider } from "core/auth";
import { FormFieldProps, FormFields, FormModal } from "core/ui/form";
import { useDataProvider } from "core/data";

type TableToolbarProps = {
  collectionId: string;
  filterTokens?: Record<string, FilterTokenProps>;
  fields?: Record<string, FormFieldProps>;
  schema?: ZodType;
  initialFilters: Record<string, FilterItem>;
  onChangeFitler: (values: Record<string, FilterItem>) => void;
  rolesAllowed?: TableRolesAllowedProps;
  hasCreatedBy?: boolean;
  hasTimestamps?: boolean;
  initialValues?: any;
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
    hasCreatedBy,
    hasTimestamps,
    initialValues,
  } = props;

  const { useProfile } = useAuthProvider();

  const [profile] = useProfile();

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
        initialValues={{
          ...initialValues,
          createdBy: hasCreatedBy ? profile : null,
          createdAt: hasTimestamps ? Timestamp.now() : null,
        }}
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
