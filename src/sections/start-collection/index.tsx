import * as React from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import { useStartCollectionModalStore } from "store/modals";

export default function StartCollection() {
  const handleOpen = useStartCollectionModalStore((state) => state.handleOpen);

  return (
    <Button size="small" startIcon={<AddIcon />} onClick={handleOpen}>
      Start Collection
    </Button>
  );
}
