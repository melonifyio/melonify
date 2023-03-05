import * as React from "react";

import { PageHeader } from "components/page-header";
import { Container } from "components/container";
import { EmptyState } from "components/empty-state";

import { Denied } from "features/auth";

import { Widget, WidgetProps } from "../widget";

export type ScreenProps = {
  title?: string;
  children?: JSX.Element | JSX.Element[];
  rolesAllowed?: string[];
  widgets?: Record<string, WidgetProps>;
};

export function Screen(props: ScreenProps) {
  const { title, widgets = {}, rolesAllowed, children } = props;

  return (
    <Container>
      <PageHeader title={title || ""} />
      <Denied
        rolesAllowed={rolesAllowed}
        fallback={<EmptyState title="Permissions needed 😔" />}
      >
        <div id="screen">
          {Object.keys(widgets).map((key) => {
            const widget = widgets[key];

            return <Widget key={key} {...widget} />;
          })}

          {children}
        </div>
      </Denied>
    </Container>
  );
}
