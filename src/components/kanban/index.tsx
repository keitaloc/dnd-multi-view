import React from "react";
import {
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { SCROLL_BAR_SIZE } from "../../constant";
import { StoreState } from "../../types";
import { ColumnList } from "./Column";

export const KanbanBoard = (props: { list }) => {
  const { grid } = useSelector((state: StoreState) => state.customProps);
  return (
    <div
      style={{
        flexGrow: 1,
        position: "relative",
      }}
    >
      <Droppable droppableId="board" direction="horizontal" type="column">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              paddingBottom: SCROLL_BAR_SIZE,
              marginBottom: grid,
              overflowX: "auto",
              overflowY: "hidden",
              userSelect: "none",
              whiteSpace: "nowrap",
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
            }}
          >
            <ColumnList {...props} />

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
