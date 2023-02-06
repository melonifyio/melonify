import * as React from "react";

import Fab from "@mui/material/Fab";
import Tooltip from "@mui/material/Tooltip";

import AddIcon from "@mui/icons-material/Add";
import { useStartCollectionModalStore } from "store/modals";

const fabStyle = {
  position: "absolute",
  bottom: 44,
  right: 44,
};

export default function StartCollectionFab() {
  const handleOpen = useStartCollectionModalStore((state) => state.handleOpen);

  return (
    <Tooltip title="Start collection" placement="top">
      <Fab sx={fabStyle} onClick={handleOpen}>
        <AddIcon />
      </Fab>
    </Tooltip>
  );
}
