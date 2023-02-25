import * as React from "react";

import { Toolbar, Button, Box, TextField, Stack, Divider } from "@mui/material";
import { Add, Filter, Filter1, FilterList } from "@mui/icons-material";
import FormModal from "components/form/form-modal";
import { CollectionProps } from "components/collection/types";
import FormFields from "components/form/form-fields/form-fields";
import useFirestoreAddDoc from "hooks/useFirestoreAddDoc";
import { collection } from "firebase/firestore";
import firestore from "services/firebase/firestore";

type TableToolbarProps = {
  collectionId: string;
  schema: CollectionProps["schema"];
};

export default function TableToolbar(props: TableToolbarProps) {
  const { collectionId, schema } = props;
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
          <Button
            startIcon={<FilterList />}
            variant="text"
            onClick={() => setCreateOpen(true)}
          >
            Filter
          </Button>
          <Button
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
