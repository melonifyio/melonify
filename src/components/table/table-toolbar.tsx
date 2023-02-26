import * as React from "react";

import { Toolbar, Button, Stack, Divider } from "@mui/material";
import { Add, FilterList } from "@mui/icons-material";
import FormModal from "components/form/form-modal";
import { CollectionProps } from "components/collection/types";
import FormFields from "components/form/form-fields/form-fields";
import useFirestoreAddDoc from "hooks/useFirestoreAddDoc";
import { collection } from "firebase/firestore";
import firestore from "services/firebase/firestore";
import TableFilter from "./table-filter/table-filter";
import { FilterItem } from "./table-filter/table-filter-item";

type TableToolbarProps = {
  collectionId: string;
  schema: CollectionProps["schema"];
  initialFilters: Record<string, FilterItem>;
  onChangeFitler: (values: Record<string, FilterItem>) => void;
};

export default function TableToolbar(props: TableToolbarProps) {
  const { collectionId, schema, onChangeFitler, initialFilters } = props;
  const [createIsOpen, setCreateOpen] = React.useState(false);

  const [createDoc, creating] = useFirestoreAddDoc(
    collection(firestore, collectionId),
    {
      onSuccess: () => {
        setCreateOpen(false);
      },
    }
  );

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
          <Button
            size="small"
            startIcon={<Add />}
            variant="contained"
            onClick={() => setCreateOpen(true)}
          >
            New
          </Button>
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
