import * as React from "react";

import { Stack } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import Nav from "./nav";
import RequireAuth from "../require-auth";
import useCollections from "hooks/use-get-documents";

import { StyledMain, StyledRoot } from "./styled";
import Header from "./header";
import StartColectionFormModal from "components/collections/start/modal";
import { useStartCollectionModalStore } from "store/modals";

type DashboardProps = {
  children: React.ReactNode;
};

function DashboardLayout(props: DashboardProps) {
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  const { data = [], isLoading } = useCollections({
    collectionName: "_melonify_/config/collections",
  });

  const startIsOpen = useStartCollectionModalStore((state) => state.open);
  const handleStartClose = useStartCollectionModalStore(
    (state) => state.handleClose
  );

  if (isLoading) {
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
        items={data.map((item) => ({ ...item, title: item.collectionId }))}
        openNav={open}
        onCloseNav={() => setOpen(false)}
      />
      <StyledMain>{children}</StyledMain>
      <StartColectionFormModal
        open={startIsOpen}
        onClose={handleStartClose}
        collectionName="_melonify_/config/collections"
      />
    </StyledRoot>
  );
}

export default function DashboardLayoutWrapper(props: DashboardProps) {
  const { children } = props;

  return (
    <RequireAuth>
      <DashboardLayout>{children}</DashboardLayout>
    </RequireAuth>
  );
}
