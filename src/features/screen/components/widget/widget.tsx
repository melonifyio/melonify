import * as React from "react";

import { Box } from "@mui/material";

export type WidgetProps = {
  component: (props: any) => JSX.Element;
  props: any;
  rolesAllowed?: Record<string, string[]>;
};

export function Widget({
  component: Component,
  props,
  rolesAllowed,
}: WidgetProps) {
  return (
    <Box>
      <Component {...props} rolesAllowed={rolesAllowed} />
    </Box>
  );
}
