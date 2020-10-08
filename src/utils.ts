import {isEqual} from 'lodash';

export const isPropsEqual = (prevProps, nextProps) => {
    return isEqual(prevProps, nextProps);
};

export const forceUpdate = () => false;

export const reorderList = (list, index1, index2) => {
    let newList = list;
    const [removedItem] = newList.splice(index1, 1);
    newList.splice(index2, 0, removedItem);
    return newList;
};

export const moveItem = (
    source,
    destination,
    droppableSource,
    droppableDestination,
) => {
    const sourceClone = Array.from(source.items);
    const destClone = Array.from(destination.items);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;
    return result;
};
