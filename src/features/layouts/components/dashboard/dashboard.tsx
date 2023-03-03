import * as React from "react";

import Nav from "./nav";
import { Private } from "features/auth";

import { StyledMain, StyledRoot } from "./styled";
import Header from "./header";
import melonify from "config/melonify";

type DashboardProps = {
  children: React.ReactNode;
};

export function DashboardLayout(props: DashboardProps) {
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <Private>
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
    </Private>
  );
}
