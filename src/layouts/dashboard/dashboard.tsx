import * as React from "react";

import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import Nav from "./nav";
import RequireAuth from "../require-auth";
import AppProvider from "../app-provider";
import useCollections from "hooks/use-collections";

import { StyledMain, StyledRoot } from "./styled";
import Header from "./header";

type DashboardProps = {
  children: React.ReactNode;
};

function DashboardLayout(props: DashboardProps) {
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  const collections = useCollections();

  if (collections.isLoading) {
    return (
      <Stack
        direction="row"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <CircularProgress size={24} />
      </Stack>
    );
  }

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav
        items={collections.data}
        openNav={open}
        onCloseNav={() => setOpen(false)}
      />
      <StyledMain>{children}</StyledMain>
    </StyledRoot>
  );
}

export default function DashboardLayoutWrapper(props: DashboardProps) {
  const { children } = props;

  return (
    <RequireAuth>
      <AppProvider>
        <DashboardLayout>{children}</DashboardLayout>
      </AppProvider>
    </RequireAuth>
  );
}
