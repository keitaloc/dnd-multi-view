import React from 'react';
import {
    Draggable,
    DraggableProvided,
    DraggableStateSnapshot,
} from 'react-beautiful-dnd';
import {ItemList} from './Item';
import {forceUpdate} from '../utils';
import {StoreState} from '../types';
import {useSelector} from 'react-redux';
import {makeStyles} from '@material-ui/core';
import {DRAGGING_BG_COLOR} from '../constant';

const useStyle = (grid: number) =>
    makeStyles({
        'list-wrapper': {
            width: 272,
            margin: `0 ${grid}px`,
            height: '100%',
            boxSizing: 'border-box',
            display: 'inline-block',
            verticalAlign: 'top',
            whiteSpace: 'nowrap',
        },
        'list-content': {
            maxHeight: '100%',
            overflow: 'hidden',
            borderRadius: 5,
            border: '1px solid lightgray',
            backgroundColor: 'rgba(20, 22, 29, 0.03)',
            boxSizing: 'border-box',
            display: 'flex',
            flexDirection: 'column',
            whiteSpace: 'normal',
        },
        'list-header': {
            paddingLeft: grid,
        },
        'list-title': {
            fontSize: 16,
            fontWeight: 'bold',
        },
    });

export const ColumnList = React.memo((props: {list}) => {
    console.log('render list');
    const {list} = props;
    return list.map((column, index) => (
        <Column key={column.id} column={column} index={index} />
    ));
});

export const Column = React.memo((props: {column; index}) => {
    const {column, index} = props;
    const {kanbanBoard, grid} = useSelector(
        (state: StoreState) => state.customProps,
    );
    const classes = useStyle(grid)();
    return (
        <Draggable
            draggableId={column.id}
            index={index}
            isDragDisabled={!kanbanBoard.draggableColumn}
        >
            {(
                provided: DraggableProvided,
                snapshot: DraggableStateSnapshot,
            ) => {
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
                    <div
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                        className={classes['list-wrapper']}
                    >
                        <div
                            className={classes['list-content']}
                            style={{
                                ...kanbanBoard.columnStyle,
                                ...kanbanBoard.draggingOverColumnStyle,
                                ...draggingColumnStyle,
                            }}
                        >
                            <div
                                {...provided.dragHandleProps}
                                className={classes['list-header']}
                                style={{
                                    ...kanbanBoard.titleContainerStyle,
                                    ...draggingTitleContainerStyle,
                                }}
                            >
                                <p
                                    className={classes['list-title']}
                                    style={{
                                        ...kanbanBoard.titleStyle,
                                        ...draggingTitleStyle,
                                    }}
                                >
                                    {column.title}
                                </p>
                            </div>

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
                        </div>
                    </div>
                );
            }}
        </Draggable>
    );
}, forceUpdate);
