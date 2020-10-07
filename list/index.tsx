import {makeStyles} from '@material-ui/core';
import React from 'react';
import {Droppable, DroppableProvided} from 'react-beautiful-dnd';
import {useSelector} from 'react-redux';
import {SCROLL_BAR_SIZE} from '../constant';
import {StoreState} from '../types';
import {Lanes} from './Lane';

const useStyle = (grid: number) =>
    makeStyles({
        'list-view-root': {
            paddingRight: SCROLL_BAR_SIZE,
            marginRight: grid,
            overflowX: 'hidden',
            overflowY: 'auto',
            userSelect: 'none',
            whiteSpace: 'nowrap',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
        },
    });

export const ListView = React.memo(
    (props: {list; toggleCollapse; deleteItem}) => {
        const {grid} = useSelector((state: StoreState) => state.customProps);
        const classes = useStyle(grid)();
        return (
            <div
                style={{
                    flexGrow: 1,
                    position: 'relative',
                }}
            >
                <Droppable
                    droppableId="board"
                    direction="vertical"
                    type="column"
                    isDropDisabled
                >
                    {(provided: DroppableProvided) => (
                        <div
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                            className={classes['list-view-root']}
                        >
                            <Lanes {...props} />

                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </div>
        );
    },
);
