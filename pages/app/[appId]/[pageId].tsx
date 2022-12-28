import Head from "next/head";
import { useRouter } from "next/router";

import { Container, Typography, Stack, IconButton } from "@mui/material";
import { Settings as SettingIcon } from "@mui/icons-material";

import { useApp } from "../../../hooks/useApp";
import Dashboard from "../../../layouts/dashboard";
import usePage from "../../../hooks/usePage";
import SmartTable from "../../../components/table/table";

export default function GenericPage() {
  const { appData } = useApp();
  const router = useRouter();
  const pageId = router.query.pageId;

  const page = usePage({ id: pageId as string });

  return (
    <Container>
      <Stack direction="row" gap={4} alignItems="center" mb={6}>
        <Typography variant="h4">{page.data?.title}</Typography>

        <IconButton
          onClick={() => {
            router.push(`/app/${appData?.id}/c/edit/${pageId}`);
          }}
        >
          <SettingIcon />
        </IconButton>
      </Stack>

      <SmartTable />
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
