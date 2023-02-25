import { CollectionProps } from "components/collection/types";

export type WidgetProps = {
  component: (props: any) => JSX.Element;
  props: any;
};

export type ScreenProps = {
  widgets: Record<string, WidgetProps>;
};
