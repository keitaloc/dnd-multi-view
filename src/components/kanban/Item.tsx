import React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { DRAGGING_BG_COLOR, DRAGGING_OVER_BG_COLOR } from "../../constant";
import { StoreState } from "../../types";
import { isPropsEqual } from "../../utils";
import styled from "styled-components";

const ListCards = styled.div<{ grid: number }>`
  display: flex;
  flex-direction: column;
  margin: ${(props) => props.grid + "px"};
  padding: ${(props) => props.grid + "px"};
  overflow-y: auto;
  transition: background-color 0.5 easy;
  min-height: 100px;
`;

const CardSample = styled.div<{ grid: number; isDragging: boolean }>`
  min-height: 50px;
  border: 1px solid lightGrey;
  border-radius: 5;
  margin: ${(props) => props.grid / 2 + "px 0"};
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none;
  backgroundcolor: ${(props) =>
    props.isDragging ? "darkorange" : "transparent"};
`;

export const ItemList = (props: { items; columnId; isColumnDragging }) => {
  const { items, columnId, isColumnDragging } = props;

  const { kanbanBoard, grid } = useSelector(
    (state: StoreState) => state.customProps
  );
  return (
    <Droppable droppableId={columnId} direction="vertical" type="item">
      {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => {
        const draggingItemContainerStyle =
          snapshot.draggingFromThisWith || isColumnDragging
            ? {
                backgroundColor: DRAGGING_BG_COLOR,
                ...kanbanBoard.draggingItemContainerStyle,
              }
            : {};
        const draggingOverItemContainerStyle = snapshot.isDraggingOver
          ? {
              backgroundColor: DRAGGING_OVER_BG_COLOR,
              ...kanbanBoard.draggingOverItemContainerStyle,
            }
          : {};
        return (
          <ListCards
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
              ...kanbanBoard.itemsContainerStyle,
              ...draggingItemContainerStyle,
              ...draggingOverItemContainerStyle,
            }}
            grid={grid}
          >
            {items?.length
              ? items.map((item, index) => (
                  <Item key={item.id} item={item} index={index} />
                ))
              : null}
            {provided.placeholder}
          </ListCards>
        );
      }}
    </Droppable>
  );
};

export const Item = (props: { item; index }) => {
  const { item, index } = props;
  const { kanbanBoard, grid } = useSelector(
    (state: StoreState) => state.customProps
  );
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            {kanbanBoard.CustomItem ? (
              <kanbanBoard.CustomItem {...props} snapshot={snapshot} />
            ) : (
              <CardSample grid={grid} isDragging={snapshot.isDragging}>
                {item.content}
              </CardSample>
            )}
          </div>
        );
      }}
    </Draggable>
  );
}
