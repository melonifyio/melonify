import Head from "next/head";
import { useRouter } from "next/router";

import { Container, Typography } from "@mui/material";

import { useApp } from "../../../hooks/useApp";
import Dashboard from "../../../layouts/dashboard";
import usePage from "../../../hooks/usePage";

export default function GenericPage() {
  return (
    <>
      <Head>
        <title>Melonify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard>
        <GenericPageContent />
      </Dashboard>
    </>
  );
}

const GenericPageContent = () => {
  const app = useApp();
  const router = useRouter();

  const page = usePage({ id: router.query.pageId as string });

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        {page.data?.title}
      </Typography>
    </Container>
  );
};
