import * as React from "react";

import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

import StartColectionFormModal from "sections/start-collection-form-modal/start-collection-form-modal";

export default function StartCollection() {
  return (
    <StartColectionFormModal
      TriggerComponent={
        <Button size="small" startIcon={<AddIcon />}>
          Start Collection
        </Button>
      }
    />
  );
}
