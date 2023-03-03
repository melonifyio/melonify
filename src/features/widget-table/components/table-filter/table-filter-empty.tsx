import * as React from "react";

import { Typography } from "@mui/material";

export function TableFilterEmpty() {
  return (
    <Typography variant="caption" sx={{ opacity: 0.34 }}>
      No filters are applied
    </Typography>
  );
}
