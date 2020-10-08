import React from "react";
import { Droppable, DroppableProvided } from "react-beautiful-dnd";
import { useSelector } from "react-redux";
import { SCROLL_BAR_SIZE } from "../../constant";
import { StoreState } from "../../types";
import { Lanes } from "./Lane";
import styled from "styled-components";

const Wrapper = styled.div<{ grid: number }>`
  padding-right: ${SCROLL_BAR_SIZE + "px"};
  margin-right: ${(props) => props.grid + "px"};
  overflow-x: hidden;
  overflow-y: auto;
  user-select: none;
  white-space: nowrap;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const ListView = React.memo(
  (props: { list; toggleCollapse; deleteItem }) => {
    const { grid } = useSelector((state: StoreState) => state.customProps);
    return (
      <div
        style={{
          flexGrow: 1,
          position: "relative",
        }}
      >
        <Droppable
          droppableId="board"
          direction="vertical"
          type="column"
          isDropDisabled
        >
          {(provided: DroppableProvided) => (
            <Wrapper
              grid={grid}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <Lanes {...props} />

              {provided.placeholder}
            </Wrapper>
          )}
        </Droppable>
      </div>
    );
  }
);
