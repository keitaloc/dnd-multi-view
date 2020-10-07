import {makeStyles} from '@material-ui/core';
import React from 'react';
import {
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
    Droppable,
    DroppableProvided,
    DroppableStateSnapshot,
} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';
import {DRAGGING_BG_COLOR, DRAGGING_OVER_BG_COLOR} from '../constant';
import {StoreState} from '../types';
import {isPropsEqual} from '../utils';

const useStyle = (grid: number) =>
    makeStyles({
        'list-cards': {
            display: 'flex',
            flexDirection: 'column',
            padding: `0 ${grid}px`,
            margin: `0 ${grid}px`,
            overflowY: 'auto',
            transition: 'background-color 0.5 easy',
            minHeight: 100,
        },
        'card-sample': {
            minHeight: 50,
            border: '1px solid lightGrey',
            borderRadius: 5,
            margin: `${grid / 2}px 0`,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            userSelect: 'none',
        },
    });

export const ItemList = (props: {items; columnId; isColumnDragging}) => {
    const {items, columnId, isColumnDragging} = props;

    const {kanbanBoard, grid} = useSelector(
        (state: StoreState) => state.customProps,
    );
    const classes = useStyle(grid)();

    return (
        <Droppable droppableId={columnId} direction="vertical" type="item">
            {(
                provided: DroppableProvided,
                snapshot: DroppableStateSnapshot,
            ) => {
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
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{
                            ...kanbanBoard.itemsContainerStyle,
                            ...draggingItemContainerStyle,
                            ...draggingOverItemContainerStyle,
                        }}
                        className={classes['list-cards']}
                    >
                        {items?.length
                            ? items.map((item, index) => (
                                  <Item
                                      key={item.id}
                                      item={item}
                                      index={index}
                                  />
                              ))
                            : null}
                        {provided.placeholder}
                    </div>
                );
            }}
        </Droppable>
    );
};

export const Item = React.memo((props: {item; index}) => {
    const {item, index} = props;
    const {kanbanBoard, grid} = useSelector(
        (state: StoreState) => state.customProps,
    );
    const classes = useStyle(grid);

    return (
        <Draggable draggableId={item.id} index={index}>
            {(
                provided: DraggableProvided,
                snapshot: DraggableStateSnapshot,
            ) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {kanbanBoard.CustomItem ? (
                            <kanbanBoard.CustomItem
                                {...props}
                                snapshot={snapshot}
                            />
                        ) : (
                            <div
                                style={{
                                    backgroundColor: snapshot.isDragging
                                        ? 'darkorange'
                                        : 'transparent',
                                }}
                                className={classes['card-sample']}
                            >
                                {item.content}
                            </div>
                        )}
                    </div>
                );
            }}
        </Draggable>
    );
}, isPropsEqual);
