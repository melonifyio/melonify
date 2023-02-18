import * as React from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useStartCollectionModalStore } from "store/modals";

type StartCollectionButtonProps = {
  variant?: "text" | "contained" | "outlined";
};

export default function StartCollectionButton(
  props: StartCollectionButtonProps
) {
  const { variant } = props;

  const handleOpen = useStartCollectionModalStore((state) => state.handleOpen);

  return (
    <Button
      size="small"
      variant={variant}
      startIcon={<AddIcon />}
      onClick={handleOpen}
    >
      Start Collection
    </Button>
  );
}
