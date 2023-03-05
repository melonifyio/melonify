import * as React from "react";

import { Box } from "@mui/material";

export type WidgetProps = {
  children?: JSX.Element | JSX.Element[];
  component?: (props: any) => JSX.Element;
  props?: any;
  rolesAllowed?: Record<string, string[]>;
};

export function Widget({
  component: Component,
  props,
  rolesAllowed,
  children,
}: WidgetProps) {
  return (
    <Box>
      {Component && <Component {...props} rolesAllowed={rolesAllowed} />}

      {children}
    </Box>
  );
}
