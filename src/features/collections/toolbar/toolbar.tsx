import * as React from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import { ButtonGroup, IconButton, Tooltip } from "@mui/material";
import Button from "@mui/material/Button";

import SettingIcon from "@mui/icons-material/SettingsOutlined";
import SchemaIcon from "@mui/icons-material/Schema";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import {
  useCollectionSettingsModalStore,
  useSchemaSettingsModalStore,
} from "store/modals";
import { AlertDialog } from "components/alert-dialog";
import useDocument from "hooks/use-document";

type CollectionToolbarProps = {
  id: string;
};

export default function CollectionToolbar(props: CollectionToolbarProps) {
  const { id } = props;

  const router = useRouter();

  const document = useDocument({
    collectionName: "_melonify_/config/collections",
    id,
  });

  const [openAlertDialog, setOpenAlertDialog] = React.useState(false);

  const handleOpenSchemaSettingsModal = useSchemaSettingsModalStore(
    (state) => state.handleOpen
  );

  const handleOpenCollectionSettingsModal = useCollectionSettingsModalStore(
    (state) => state.handleOpen
  );

  return (
    <ButtonGroup>
      <Tooltip title="Schema">
        <IconButton onClick={handleOpenSchemaSettingsModal}>
          <SchemaIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Settings">
        <IconButton onClick={handleOpenCollectionSettingsModal}>
          <SettingIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete">
        <AlertDialog
          open={openAlertDialog}
          onClose={() => {
            setOpenAlertDialog(false);
          }}
          title="Are you sure?"
          description="Are you sure you want to delete this item?"
          onConfirm={() => {
            document.remove.mutate(undefined, {
              onSuccess: () => {
                setOpenAlertDialog(false);
                router.push("/");
              },
            });
          }}
          TriggerComponent={
            <IconButton
              aria-label="delete"
              onClick={(e) => {
                e.stopPropagation();
                setOpenAlertDialog(true);
              }}
            >
              <DeleteIcon />
            </IconButton>
          }
        />
      </Tooltip>
    </ButtonGroup>
  );
}
