import {SET_CUSTOM_PROPS} from './action';
import {GRID} from './constant';
import {CustomProps} from './types';

export const customProps = (
    state: CustomProps = {
        grid: GRID,
        kanbanBoard: {},
        listView: {},
    },
    action,
) => {
    switch (action.type) {
        case SET_CUSTOM_PROPS: {
            return action.payload;
        }
        default:
            return state;
    }
};
