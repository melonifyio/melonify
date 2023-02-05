import * as React from "react";

import FormModal from "components/form-modal";
import { useSubcollectionsSettingsModalStore } from "store/modals";
import FormFields from "components/form-fields/form-fields";
import useDocument from "hooks/use-document";
import { SCHEMA_MODEL } from "constants/collection";
import { CircularProgress, Dialog, DialogTitle, Button } from "@mui/material";

import CollectionTable from "sections/table";
import CollectionList from "sections/collection-list";
import EmptyState from "components/empty-state";

type SubcollectionsSettingsData = {
  id: string;
};

type SubcollectionsSettingsModalProps = {
  id: string;
};

export default function SubcollectionsSettingsModal(
  props: SubcollectionsSettingsModalProps
) {
  const { id } = props;

  const document = useDocument({
    collectionName: "_melonify_/config/collections",
    id,
  });

  const open = useSubcollectionsSettingsModalStore((state) => state.open);

  const handleClose = useSubcollectionsSettingsModalStore(
    (state) => state.handleClose
  );

  const onSubmit = (data: SubcollectionsSettingsData) => {
    document.update.mutate(data, {
      onSuccess: () => {
        handleClose();
      },
    });
  };

  if (document.query.isLoading) return <CircularProgress />;

  return (
    <Dialog open={open} onClose={handleClose} fullWidth>
      <DialogTitle>Configure subcollections</DialogTitle>

      <CollectionList
        collectionName={document.query?.data?._id || "unknown"}
        emptyState={
          <EmptyState
            title="Get started"
            description="Create subcollection of the collection"
            actions={<Button>Create</Button>}
          />
        }
      />
    </Dialog>
  );
}
