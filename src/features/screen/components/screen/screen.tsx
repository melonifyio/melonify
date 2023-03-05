import * as React from "react";

import { EmptyState } from "components/empty-state";

import { Denied } from "features/auth";

import { Widget, WidgetProps } from "../widget";
import { Box, Stack } from "@mui/material";

export type ScreenProps = {
  title?: string;
  children?: JSX.Element | JSX.Element[];
  rolesAllowed?: string[];
  widgets?: Record<string, WidgetProps>;
};

export function Screen(props: ScreenProps) {
  const { title, widgets = {}, rolesAllowed, children } = props;

  return (
    <Denied
      rolesAllowed={rolesAllowed}
      fallback={<EmptyState title="Permissions needed 😔" />}
    >
      <Stack>
        {Object.keys(widgets).map((key) => {
          const widget = widgets[key];

          return <Widget key={key} {...widget} />;
        })}

        {children}
      </Stack>
    </Denied>
  );
}
