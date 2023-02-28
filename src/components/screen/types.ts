import { CollectionProps } from "components/collection/types";

export type WidgetProps = {
  component: (props: any) => JSX.Element;
  props: any;
  rolesAllowed?: Record<string, string[]>;
};

export type ScreenProps = Record<
  string,
  {
    rolesAllowed?: string[];
    widgets: Record<string, WidgetProps>;
  }
>;
