import Head from "next/head";
import { useRouter } from "next/router";

import { Stack, IconButton } from "@mui/material";
import SettingIcon from "@mui/icons-material/SettingsOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import Dashboard from "layouts/dashboard";
import usePage from "hooks/use-page";
import CollectionTable from "sections/collection-table";
import PageHeader from "sections/page-header";
import Container from "components/container";

export default function GenericPage() {
  const router = useRouter();
  const pageId = router.query.pageId;

  const page = usePage({ id: pageId as string });

  if (page.isLoading) {
    return (
      <Stack direction="row" p={10} alignItems="center" justifyContent="center">
        <CircularProgress size={24} />
      </Stack>
    );
  }

  if (!page.data) return <div>Page not found</div>;

  return (
    <Container>
      <PageHeader
        title={page.data?.title}
        actions={
          <IconButton
            onClick={() => {
              router.push(`/c/edit/${pageId}`);
            }}
          >
            <SettingIcon fontSize="small" />
          </IconButton>
        }
      />

      <CollectionTable
        collectionName={page.data._id}
        model={{ fields: page.data.schema }}
      />
    </Container>
  );
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return <Dashboard>{page}</Dashboard>;
};
