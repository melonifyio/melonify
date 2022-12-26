import Head from "next/head";

import Stack from "@mui/material/Stack";

import { useApp } from "../../../hooks/useApp";
import Dashboard from "../../../layouts/dashboard";

export default function Home() {
  return (
    <>
      <Head>
        <title>Melonify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Dashboard>
        <HomePageContent />
      </Dashboard>
    </>
  );
}

const HomePageContent = () => {
  const app = useApp();

  console.log(app);

  return <div></div>;
};
