import Head from "next/head";
import { useRouter } from "next/router";

import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import SchemaIcon from "@mui/icons-material/Schema";

import Dashboard from "layouts/dashboard";
import CollectionTable from "components/collections/table";
import PageHeader from "components/page-header";
import Container from "components/container";
import EmptyState from "components/empty-state";
import {
  useCollectionSettingsModalStore,
  useSchemaSettingsModalStore,
} from "store/modals";
import SchemaSettingsModal from "components/collections/schema";
import useDocument from "hooks/use-document";
import CollectionSettingsModal from "components/collections/settings";
import CollectionToolbar from "components/collections/toolbar";

export default function GenericPage() {
  const router = useRouter();
  const pageId = router.query.pageId;

  const handleOpenSchemaSettingsModal = useSchemaSettingsModalStore(
    (state) => state.handleOpen
  );

  const collectionSettingsModalStore = useCollectionSettingsModalStore();

  const page = useDocument({
    collectionName: "_melonify_/config/collections",
    id: pageId as string,
  });

  if (page.query.isLoading) {
    return (
      <Stack direction="row" p={10} alignItems="center" justifyContent="center">
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (!page.query.data) return <div>Page not found</div>;

  return (
    <Container>
      <PageHeader
        title={page.query.data?.collectionId}
        actions={<CollectionToolbar id={page.query.data._id} />}
      />

      {!Object.keys(page.query.data.schema || {}).length ? (
        <EmptyState
          title="Define schema"
          description="Organize the collection schema"
          actions={
            <Button
              variant="contained"
              startIcon={<SchemaIcon />}
              onClick={handleOpenSchemaSettingsModal}
            >
              Schema
            </Button>
          }
        />
      ) : (
        <CollectionTable
          collectionName={page.query.data.collectionId}
          model={page.query.data.schema}
        />
      )}

      <SchemaSettingsModal id={page.query.data._id} />
      <CollectionSettingsModal
        collectionName="_melonify_/config/collections"
        id={page.query.data._id}
        open={collectionSettingsModalStore.open}
        onClose={collectionSettingsModalStore.handleClose}
        initialValues={page.query.data}
      />
    </Container>
  );
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Dashboard>{page}</Dashboard>;
};
