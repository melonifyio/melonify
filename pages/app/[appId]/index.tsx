import React from "react";
import Head from "next/head";

import Stack from "@mui/material/Stack";

import { useApp } from "../../../hooks/useApp";
import Dashboard from "../../../layouts/dashboard";

export default function Home() {
  return <>home</>;
}

Home.getLayout = function getLayout(page: React.ReactElement) {
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
