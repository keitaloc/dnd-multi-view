import React from 'react';
import {Draggable, Droppable} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';
import {DRAGGING_BG_COLOR, DRAGGING_OVER_BG_COLOR} from '../constant';
import {StoreState} from '../types';

export const ItemList = (props: {lane; laneIndex; deleteItem}) => {
    const {lane, laneIndex} = props;
    const {listView, grid} = useSelector(
        (state: StoreState) => state.customProps,
    );
    return (
        <div
            style={{
                width: '100%',
                overflow: 'hidden',
                height: lane.collapse ? 0 : 'auto',
                transition: 'height 0.3s linear',
            }}
        >
            <Droppable key={laneIndex} droppableId={`${lane.id}`}>
                {(provided, snapshot) => {
                    const draggingItemContainerStyle = snapshot.draggingFromThisWith
                        ? listView.draggingItemContainerStyle || {
                              backgroundColor: DRAGGING_BG_COLOR,
                          }
                        : {};
                    const draggingOverItemContainerStyle = snapshot.isDraggingOver
                        ? listView.draggingOverItemContainerStyle || {
                              backgroundColor: DRAGGING_OVER_BG_COLOR,
                          }
                        : {};
                    return (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                padding: grid,
                                ...listView.itemsContainerStyle,
                                ...draggingItemContainerStyle,
                                ...draggingOverItemContainerStyle,
                            }}
                        >
                            {listView.CustomHeadingRowItem && (
                                <listView.CustomHeadingRowItem
                                    lane={lane}
                                    laneIndex={laneIndex}
                                />
                            )}

                            <ItemsRow lane={lane} laneIndex={laneIndex} />

                            {provided.placeholder}
                        </div>
                    );
                }}
            </Droppable>
        </div>
    );
};

const ItemsRow = (props: {lane: any; laneIndex: number}) => {
    const {lane, laneIndex} = props;
    const {CustomRowItem} = useSelector(
        (state: StoreState) => state.customProps.listView,
    );
    return lane.items.map((item, index) => (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.draggableProps}>
                    {CustomRowItem ? (
                        <CustomRowItem
                            lane={lane}
                            laneIndex={laneIndex}
                            item={item}
                            index={index}
                            dragHandleProps={provided.dragHandleProps as any}
                            snapshot={snapshot}
                        />
                    ) : (
                        <div {...provided.dragHandleProps}>
                            <p>{item.content}</p>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    ));
};
