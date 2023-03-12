import * as React from "react";

import Nav from "./nav";

import { StyledMain, StyledRoot } from "./styled";
import Header from "./header";
import { useMenu } from "core/menu";
import { Private } from "core/auth";

type DashboardProps = {
  children: React.ReactNode;
};

export function DashboardLayout(props: DashboardProps) {
  const { children } = props;
  const [open, setOpen] = React.useState(false);

  const { data } = useMenu();

  return (
    <Private>
      <StyledRoot>
        <Nav
          items={data?.regular || []}
          footerItems={data?.footer || []}
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
