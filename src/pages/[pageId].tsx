import Head from "next/head";
import { useRouter } from "next/router";

import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import SchemaIcon from "@mui/icons-material/Schema";

import Dashboard from "layouts/dashboard";
import usePage from "hooks/use-page";
import CollectionTable from "sections/table";
import PageHeader from "sections/page-header";
import Container from "components/container";
import CollectionToolbar from "sections/collection-toolbar";
import EmptyState from "components/empty-state";
import { useSchemaSettingsModalStore } from "store/modals";
import SchemaSettingsModal from "sections/schema-settings-modal";
import useDocument from "hooks/use-document";

export default function GenericPage() {
  const router = useRouter();
  const pageId = router.query.pageId;

  const handleOpenSchemaSettingsModal = useSchemaSettingsModalStore(
    (state) => state.handleOpen
  );

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
    </Container>
  );
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Dashboard>{page}</Dashboard>;
};
