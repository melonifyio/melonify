import * as React from "react";

import { Box } from "@mui/material";

import { ScreenProps, WidgetProps } from "./types";

export default function Screen(props: {
  widgets: Record<string, WidgetProps>;
}) {
  const { widgets } = props;

  return (
    <div id="screen">
      {Object.keys(widgets).map((key) => {
        const widget = widgets[key];
        const Component = widget.component;

        return (
          <Box key={widget.component.name}>
            <Component {...widget.props} />
          </Box>
        );
      })}
    </div>
  );
}
