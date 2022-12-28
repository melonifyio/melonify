import * as React from "react";
import {
  DragDropContext,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd";

export type DroppableListProps = {
  onDragEnd: OnDragEndResponder;
  children: React.ReactNode;
};

const DroppableList = React.memo(
  ({ onDragEnd, children }: DroppableListProps) => {
    return (
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {children}

              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
);

DroppableList.displayName = "Droppable";

export default DroppableList;
