import * as React from "react";
import { DropResult } from "react-beautiful-dnd";

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

import Droppable from "../../components/dragndrop/droppable";
import Draggable from "../../components/dragndrop/draggable";

import stringToColour from "../../utils/string-to-color";

type SmartListItemProps<T> = T & {
  _id: string;
  title: string;
  subtitle?: string;
  logo?: string;
};

type SmartListProps<T> = {
  title: string;
  items: SmartListItemProps<T>[];
  onClickItem?: (item: SmartListItemProps<T>) => void;
  CreateComponent?: JSX.Element;
  ActionComponent?: (item: T) => JSX.Element;
  renderTitle?: (item: T) => string;
  getId?: (item: T) => string;
  onReorder?: (newItems: SmartListItemProps<T>[]) => void;
  squareAvatar?: boolean;
};

// a little function to help us with reordering the result
const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list) as any;
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export function SmartList<T>(props: SmartListProps<T>) {
  const {
    title,
    items,
    onClickItem,
    CreateComponent,
    ActionComponent,
    renderTitle,
    getId,
    onReorder,
    squareAvatar,
  } = props;

  const handleDragEnd = (result: DropResult) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newItems = reorder(
      items,
      result.source.index,
      result.destination.index
    );

    onReorder &&
      onReorder(
        newItems.map((item: object, index: number) => ({ ...item, index }))
      );
  };

  return (
    <Paper>
      <Droppable onDragEnd={handleDragEnd}>
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
            <Draggable
              key={getId ? getId(item) : item._id}
              id={getId ? getId(item) : item._id}
              index={index}
            >
              <ListItem
                disablePadding
                secondaryAction={ActionComponent && ActionComponent(item)}
              >
                <ListItemButton
                  onClick={() => onClickItem && onClickItem(item)}
                >
                  <ListItemAvatar>
                    <Avatar
                      src={item?.logo}
                      variant={squareAvatar ? "square" : "rounded"}
                      sx={{
                        borderRadius: 1,
                        width: 44,
                        height: 44,
                        backgroundColor: stringToColour(
                          renderTitle ? renderTitle(item) : item.title
                        ),
                        fontFamily: "Tahoma",
                        fontSize: "small",
                        fontWeight: "bold",
                      }}
                    >
                      {renderTitle && renderTitle(item)
                        ? renderTitle(item).charAt(0)
                        : item.title.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={renderTitle ? renderTitle(item) : item.title}
                    secondary={item.subtitle}
                  />
                </ListItemButton>
              </ListItem>
            </Draggable>
          ))}
        </List>
      </Droppable>

      {items.length === 0 && (
        <Stack direction="row" justifyContent="center" p={8}>
          <Typography variant="caption">Empty</Typography>
        </Stack>
      )}
    </Paper>
  );
}
