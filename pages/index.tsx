import Stack from "@mui/material/Stack";
import Head from "next/head";
import { useRouter } from "next/router";

import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";

import useApps from "../hooks/useApps";
import Simple from "../layouts/simple";
import Card from "../components/card";
import CreateAppModal from "../sections/apps/create-app-modal";
import { SmartList } from "../components/list/list";
import { Container } from "@mui/system";

export default function AppsPage() {
  const apps = useApps();
  const router = useRouter();

  if (apps.isLoading)
    return (
      <Stack direction="row" alignItems="center" justifyContent="center">
        <CircularProgress size={24} />
      </Stack>
    );

  if (apps.data) {
    return (
      <Container maxWidth="md">
        <SmartList
          title="Apps"
          items={apps.data.map((item) => ({
            id: item._id,
            title: item.title,
          }))}
          onClickItem={(item) => {
            router.push(`/app/${item.id}`);
          }}
          model={{
            fields: {
              title: {
                fieldKey: "title",
                name: "Title",
                type: "TEXT",
              },
            },
          }}
          CreateTrigger={<Button>Create app</Button>}
        />
      </Container>
    );
  }

  return null;
}

AppsPage.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <>
      <Head>
        <title>Melonify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Simple>{page}</Simple>
    </>
  );
};
