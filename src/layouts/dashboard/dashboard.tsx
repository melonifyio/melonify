import * as React from "react";

import Nav from "./nav";
import RequireAuth from "components/auth/require-auth/require-auth";

import { StyledMain, StyledRoot } from "./styled";
import Header from "./header";
import { useStartCollectionModalStore } from "store/modals";

type DashboardProps = {
  children: React.ReactNode;
};

function DashboardLayout(props: DashboardProps) {
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  const startIsOpen = useStartCollectionModalStore((state) => state.open);
  const handleStartClose = useStartCollectionModalStore(
    (state) => state.handleClose
  );

  return (
    <StyledRoot>
      <Header onOpenNav={() => setOpen(true)} />
      <Nav items={[]} openNav={open} onCloseNav={() => setOpen(false)} />
      <StyledMain>{children}</StyledMain>
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
