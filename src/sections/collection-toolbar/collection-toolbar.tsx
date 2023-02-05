import Head from "next/head";
import { useRouter } from "next/router";

import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";

import SettingIcon from "@mui/icons-material/SettingsOutlined";
import SchemaIcon from "@mui/icons-material/Schema";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import { useSchemSettingsModalStore } from "store/modals";

export default function CollectionToolbar() {
  const handleOpenSchemaSettingsModal = useSchemSettingsModalStore(
    (state) => state.handleOpen
  );

  return (
    <ButtonGroup>
      <Tooltip title="Schema">
        <IconButton onClick={handleOpenSchemaSettingsModal}>
          <SchemaIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Subcollections">
        <IconButton onClick={() => {}}>
          <FolderIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Settings">
        <IconButton onClick={() => {}}>
          <SettingIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <IconButton onClick={() => {}}>
          <DeleteIcon />
        </IconButton>
      </Tooltip>
    </ButtonGroup>
  );
}
