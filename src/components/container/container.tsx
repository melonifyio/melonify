import React from "react";

import Stack from "@mui/material/Stack";
import MuiContainer from "@mui/material/Container";

type ContainerProps = {
  children: React.ReactNode;
};

export default function Container(props: ContainerProps) {
  const { children } = props;

  return (
    <MuiContainer>
      <Stack gap={4}>{children}</Stack>
    </MuiContainer>
  );
}
