import Head from "next/head";
import { useRouter } from "next/router";

import Button from "@mui/material/Button";

import SchemaIcon from "@mui/icons-material/Schema";

import Dashboard from "layouts/dashboard";
import PageHeader from "components/elements/page-header";
import Container from "components/elements/container";
import EmptyState from "components/elements/empty-state";
import {
  useCollectionSettingsModalStore,
  useSchemaSettingsModalStore,
} from "store/modals";

export default function GenericPage() {
  const router = useRouter();
  const pageId = router.query.pageId;

  const handleOpenSchemaSettingsModal = useSchemaSettingsModalStore(
    (state) => state.handleOpen
  );

  const collectionSettingsModalStore = useCollectionSettingsModalStore();

  return (
    <Container>
      <PageHeader title="" />

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
    </Container>
  );
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Dashboard>{page}</Dashboard>;
};
