import React from "react";
import {
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";
import { ItemList } from "./Item";
import { StoreState } from "../../types";
import { useSelector } from "react-redux";
import { DRAGGING_BG_COLOR } from "../../constant";
import { forceUpdate } from "../../utils";
import styled from "styled-components";

const Wrapper = styled.div<{ grid: number }>`
  width: 272px;
  margin: ${(props) => props.grid + "px"};
  height: 100%;
  box-sizing: border-box;
  display: inline-block;
  vertical-align: top;
  white-space: nowrap;
`;
const Content = styled.div`
  maxheight: 100%;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid lightgray;
  background-color: rgba(20, 22, 29, 0.03);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  white-space: normal;
`;
const Header = styled.div<{ grid: number }>`
  padding-left: ${(props) => props.grid + "px"};
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export const ColumnList = React.memo((props: { list }) => {
  console.log("render list");
  const { list } = props;
  return list.map((column, index) => (
    <Column key={column.id} column={column} index={index} />
  ));
});

export const Column = React.memo((props: { column; index }) => {
  const { column, index } = props;
  const { kanbanBoard, grid } = useSelector(
    (state: StoreState) => state.customProps
  );
  return (
    <Draggable
      draggableId={column.id}
      index={index}
      isDragDisabled={!kanbanBoard.draggableColumn}
    >
      {(provided: DraggableProvided, snapshot: DraggableStateSnapshot) => {
        const draggingColumnStyle = snapshot.isDragging
          ? {
              backgroundColor: DRAGGING_BG_COLOR,
              ...kanbanBoard.draggingColumnStyle,
            }
          : {};
        const draggingTitleContainerStyle = snapshot.isDragging
          ? kanbanBoard.draggingTitleContainerStyle
          : {};
        const draggingTitleStyle = snapshot.isDragging
          ? kanbanBoard.draggingTitleStyle
          : {};
        return (
          <Wrapper
            grid={grid}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Content
              style={{
                ...kanbanBoard.columnStyle,
                ...kanbanBoard.draggingOverColumnStyle,
                ...draggingColumnStyle,
              }}
            >
              <Header
                grid={grid}
                {...provided.dragHandleProps}
                style={{
                  ...kanbanBoard.titleContainerStyle,
                  ...draggingTitleContainerStyle,
                }}
              >
                <Title
                  style={{
                    ...kanbanBoard.titleStyle,
                    ...draggingTitleStyle,
                  }}
                >
                  {column.title}
                </Title>
              </Header>

              <ItemList
                items={column.items}
                columnId={column.id}
                isColumnDragging={snapshot.isDragging}
              />

              {kanbanBoard.CustomAddItem && (
                <kanbanBoard.CustomAddItem
                  column={column}
                  index={index}
                  snapshot={snapshot}
                />
              )}
            </Content>
          </Wrapper>
        );
      }}
    </Draggable>
  );
}, forceUpdate);
