import * as React from "react";

import { EmptyState } from "components/empty-state";

import { Denied } from "features/auth";

import { Widget, WidgetProps } from "../widget";

export type ScreenProps = {
  rolesAllowed?: string[];
  widgets: Record<string, WidgetProps>;
};

export function Screen(props: ScreenProps) {
  const { widgets, rolesAllowed } = props;

  return (
    <Denied
      rolesAllowed={rolesAllowed}
      fallback={<EmptyState title="Permissions needed 😔" />}
    >
      <div id="screen">
        {Object.keys(widgets).map((key) => {
          const widget = widgets[key];

          return <Widget key={widget.component.name} {...widget} />;
        })}
      </div>
    </Denied>
  );
}
