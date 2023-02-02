import Head from "next/head";
import { useRouter } from "next/router";

import { Container, Typography, Stack, IconButton } from "@mui/material";
import SettingIcon from "@mui/icons-material/SettingsOutlined";
import CircularProgress from "@mui/material/CircularProgress";

import Dashboard from "layouts/dashboard";
import usePage from "hooks/use-page";
import CollectionTable from "components/collection-table";

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
      <Stack gap={4}>
        <Stack direction="row" gap={2} alignItems="center">
          <Typography variant="h4">{page.data?.title}</Typography>

          <IconButton
            onClick={() => {
              router.push(`/c/edit/${pageId}`);
            }}
          >
            <SettingIcon fontSize="small" />
          </IconButton>
        </Stack>

        <CollectionTable
          collectionName={page.data._id}
          model={{ fields: page.data.schema }}
        />
      </Stack>
    </Container>
  );
}

GenericPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Melonify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard>{page}</Dashboard>
    </>
  );
};
