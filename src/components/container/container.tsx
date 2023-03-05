import React from "react";

import Stack from "@mui/material/Stack";
import MuiContainer, {
  ContainerProps as MuiContainerProps,
} from "@mui/material/Container";

type ContainerProps = MuiContainerProps & {
  children: React.ReactNode;
};

export function Container(props: ContainerProps) {
  const { children, ...rest } = props;

  return (
    <MuiContainer {...rest}>
      <Stack gap={3}>{children}</Stack>
    </MuiContainer>
  );
}
