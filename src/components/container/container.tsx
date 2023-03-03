import React from "react";

import Stack from "@mui/material/Stack";
import MuiContainer from "@mui/material/Container";

type ContainerProps = {
  children: React.ReactNode;
};

export function Container(props: ContainerProps) {
  const { children } = props;

  return (
    <MuiContainer>
      <Stack gap={3}>{children}</Stack>
    </MuiContainer>
  );
}
