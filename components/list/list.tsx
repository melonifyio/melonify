import * as React from "react";

import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import DraftsIcon from "@mui/icons-material/Drafts";

import Droppable from "../../components/dragndrop/droppable";
import Draggable from "../../components/dragndrop/draggable";

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
  CreateComponent?: JSX.Element;
  ActionComponent?: (item: T) => JSX.Element;
};

export function SmartList<T>(props: SmartListProps<T>) {
  const { title, items, onClickItem, CreateComponent, ActionComponent } = props;

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

              {CreateComponent && CreateComponent}
            </Stack>
          }
        >
          {items.map((item, index) => (
            <Draggable key={item.id} id={item.id} index={index}>
              <ListItem
                disablePadding
                secondaryAction={ActionComponent && ActionComponent(item)}
              >
                <ListItemButton
                  onClick={() => onClickItem && onClickItem(item)}
                >
                  <ListItemAvatar>
                    <Avatar>{item.title.charAt(0)}</Avatar>
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

      {items.length === 0 && (
        <Stack direction="row" justifyContent="center" p={10}>
          <Typography>Empty</Typography>
        </Stack>
      )}
    </Paper>
  );
}
