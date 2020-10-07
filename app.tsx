import React, {useState, useEffect, useLayoutEffect} from 'react';
import {DragDropContext, DropResult} from 'react-beautiful-dnd';
import {GRID} from './constant';
import {KanbanBoard} from './kanban';
import {moveItem, reorderList} from './utils';
import {ListView} from './list';
import {DndMultiViewProps, ViewType} from './types';
import {useDispatch} from 'react-redux';
import {setCustomPropsAction} from './action';

export const App = (props: DndMultiViewProps) => {
    const {
        list,
        kanbanBoardProps,
        listViewProps,
        grid,
        Toolbar,
        defaultView,
    } = props;

    const [viewType, setViewType] = useState<ViewType>(defaultView || 'kanban');
    const [state, setState] = useState<any[]>([]);

    const dispatch = useDispatch();

    useEffect(() => {
        setState(list);
    }, [list]);

    useLayoutEffect(() => {
        dispatch(
            setCustomPropsAction({
                grid: grid || GRID,
                Toolbar,
                kanbanBoard: kanbanBoardProps || {},
                listView: listViewProps || {},
            }),
        );
    }, [kanbanBoardProps, grid, dispatch, Toolbar, listViewProps]);

    const onDragEnd = (result: DropResult) => {
        const {source, destination, type} = result;

        if (
            !destination ||
            (source.droppableId === destination.droppableId &&
                source.index === destination.index)
        ) {
            return;
        }

        let newState = state;
        if (type === 'column') {
            newState = reorderList(newState, source.index, destination.index);
        } else {
            const srcIndex = state.findIndex(
                (el) => el.id === source.droppableId,
            );
            const desIndex = state.findIndex(
                (el) => el.id === destination.droppableId,
            );

            if (source.droppableId === destination.droppableId) {
                const reorderedItems = reorderList(
                    newState[desIndex].items,
                    source.index,
                    destination.index,
                );
                newState[desIndex].items = reorderedItems;
            } else {
                const result = moveItem(
                    newState[srcIndex],
                    newState[desIndex],
                    source,
                    destination,
                );
                newState[srcIndex].items = result[source.droppableId];
                newState[desIndex].items = result[destination.droppableId];
            }
        }
        setState([...newState]);
    };

    const toggleCollapse = (laneIndex: number) => {
        const newState = state;
        newState[laneIndex].collapse = !newState[laneIndex].collapse;
        setState([...newState]);
    };

    const deleteItem = (itemIndex: number, listIndex: number) => () => {
        const newState = [...state];
        newState[listIndex].splice(itemIndex, 1);
        setState(newState.filter((group) => group.length));
    };

    const renderView = () => {
        switch (viewType) {
            case 'kanban':
                return <KanbanBoard list={state} />;
            case 'list':
                return (
                    <ListView
                        list={list}
                        toggleCollapse={toggleCollapse}
                        deleteItem={deleteItem}
                    />
                );
            default:
                return null;
        }
    };

    const renderToolbar = () => {
        if (Toolbar) {
            return <Toolbar setViewType={setViewType} />;
        }
        return (
            <div
                style={{
                    height: 80,
                    display: 'flex',
                    flexDirection: 'row-reverse',
                    alignItems: 'center',
                }}
            >
                <div>
                    <button
                        style={{marginRight: grid || GRID}}
                        onClick={() => setViewType('kanban')}
                    >
                        KANBAN
                    </button>
                    <button onClick={() => setViewType('list')}>List</button>
                </div>
            </div>
        );
    };

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
            }}
        >
            <DragDropContext onDragEnd={onDragEnd}>
                {renderToolbar()}

                {renderView()}
            </DragDropContext>
        </div>
    );
};
