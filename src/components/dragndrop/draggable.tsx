import * as React from "react";
import { Draggable } from "react-beautiful-dnd";

export type DropppableProps = {
  index: number;
  id: string;
  children: React.ReactNode;
};

export const Dropppable = ({ index, id, children }: DropppableProps) => {
  return (
    <Draggable key={id} draggableId={id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? "" : ""}
        >
          {children}
        </div>
      )}
    </Draggable>
  );
};
