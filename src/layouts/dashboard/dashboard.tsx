import * as React from "react";

import Nav from "./nav";
import Private from "components/auth/private";

import { StyledMain, StyledRoot } from "./styled";
import Header from "./header";
import melonify from "config/melonify";

type DashboardProps = {
  children: React.ReactNode;
};

function DashboardLayout(props: DashboardProps) {
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <StyledRoot>
      <Nav
        items={[
          { path: "/", title: "Dashboard", icon: "Home", home: true },
          ...melonify.menu,
        ]}
        openNav={open}
        onOpenNav={() => setOpen(true)}
        onCloseNav={() => setOpen(false)}
      />
      <Header
        open={open}
        onOpenNav={() => setOpen(true)}
        onCloseNav={() => setOpen(false)}
      />
      <StyledMain>{children}</StyledMain>
    </StyledRoot>
  );
}

export default function DashboardLayoutWrapper(props: DashboardProps) {
  const { children } = props;

  return (
    <Private>
      <DashboardLayout>{children}</DashboardLayout>
    </Private>
  );
}
