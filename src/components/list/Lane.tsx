import React from "react";
import { useSelector } from "react-redux";
import { StoreState } from "../../types";
import { ItemList } from "./item";
import styled from "styled-components";

const Wrapper = styled.div<{ grid: number }>`
  display: flex;
  flex-direction: column;
  background-color: white;
  border-radius: 5px;
  margin-left: ${(props) => props.grid + "px"};
  box-sizing: border-box;
  white-space: nowrap;
`;
const Content = styled.div<{ grid: number }>`
  max-height: 100%;
  overflow: hidden;
  border-radius: 5px;
  border: 1px solid rgba(20, 22, 29, 0.1);
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  white-space: normal;
  margin-bottom: ${(props) => props.grid * 2 + "px"};
`;
const Header = styled.div<{ grid: number }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${(props) => "0 " + props.grid * 2 + "px"};
`;
const Title = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

export const Lanes = (props: { list; toggleCollapse; deleteItem }) => {
  const { list, toggleCollapse, deleteItem } = props;
  const { listView, grid } = useSelector(
    (state: StoreState) => state.customProps
  );
  return list.map((lane, laneIndex) => (
    <Wrapper key={lane.id} grid={grid}>
      <Content grid={grid} style={listView.listStyle}>
        <LaneHeader
          laneIndex={laneIndex}
          title={lane.title}
          collapse={lane.collapse}
          toggleCollapse={toggleCollapse}
          isListEmpty={lane.items?.length === 0}
        />
        <ItemList lane={lane} laneIndex={laneIndex} deleteItem={deleteItem} />
      </Content>
    </Wrapper>
  ));
};

const LaneHeader = (props: {
  title: string;
  collapse: boolean;
  laneIndex: number;
  isListEmpty: boolean;
  toggleCollapse: (laneIndex: number) => void;
}) => {
  const { title, collapse, laneIndex, toggleCollapse, isListEmpty } = props;
  const { listView, grid } = useSelector(
    (state: StoreState) => state.customProps
  );
  const renderToggleButton = () => {
    if (listView.disableToggle) {
      return null;
    }

    if (listView.CustomToggleButton) {
      return (
        <listView.CustomToggleButton
          index={laneIndex}
          collapse={collapse}
          toggleCollapse={toggleCollapse}
        />
      );
    }
    return <button onClick={() => toggleCollapse(laneIndex)}>Toggle</button>;
  };

  return (
    <Header
      grid={grid}
      style={{
        ...listView.titleContainerStyle,
        borderBottom:
          collapse || isListEmpty
            ? undefined
            : listView.titleContainerStyle?.borderBottom,
      }}
    >
      <Title style={listView.titleStyle}>{title}</Title>

      {renderToggleButton()}
    </Header>
  );
};
