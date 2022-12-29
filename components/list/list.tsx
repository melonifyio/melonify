import * as React from "react";
import {
  Controller,
  Control,
  UseFormSetValue,
  UseFormHandleSubmit,
} from "react-hook-form";

import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import FormLabel from "@mui/material/FormLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DraftsIcon from "@mui/icons-material/Drafts";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import EditIcon from "@mui/icons-material/EditOutlined";

import FormModal from "../../sections/shared/form-modal";
import Droppable from "../../components/dragndrop/droppable";
import Draggable from "../../components/dragndrop/draggable";
import { ModelProps } from "../form-field/types";

import Actions from "./actions";

type SmartListItemProps<T> = T & {
  id: string;
  title: string;
  subtitle?: string;
};

type SmartListProps<T> = {
  title: string;
  items: SmartListItemProps<T>[];
  onClickItem?: (item: SmartListItemProps<T>) => void;
  model?: ModelProps;
  onCreate?: (data: any) => void;
  onUpdate?: (data: any) => void;
  CreateTrigger?: JSX.Element;
};

export function SmartList<T>(props: SmartListProps<T>) {
  const {
    title,
    items,
    onClickItem,
    model,
    onCreate,
    onUpdate,
    CreateTrigger,
  } = props;

  return (
    <Paper>
      <Droppable onDragEnd={() => {}}>
        <List
          subheader={
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              pr={1}
            >
              <ListSubheader component="div" id="nested-list-subheader">
                {title}
              </ListSubheader>

              {model && (
                <FormModal
                  onSuccess={(data) => {
                    onCreate && onCreate(data);
                  }}
                  model={model}
                  Trigger={CreateTrigger}
                />
              )}
            </Stack>
          }
        >
          {items.map((item, index) => (
            <Draggable key={item.id} id={item.id} index={index}>
              <ListItem
                disablePadding
                secondaryAction={
                  model && (
                    <Actions<T> model={model} item={item} onUpdate={onUpdate} />
                  )
                }
              >
                <ListItemButton
                  onClick={() => onClickItem && onClickItem(item)}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <DraftsIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={item.title}
                    secondary={item.subtitle}
                  />
                </ListItemButton>
              </ListItem>
            </Draggable>
          ))}
        </List>
      </Droppable>
    </Paper>
  );
}
