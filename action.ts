import {CustomProps} from './types';

export const SET_CUSTOM_PROPS = 'SET_CUSTOM_PROPS';
export type SET_CUSTOM_PROPS = typeof SET_CUSTOM_PROPS;

export const setCustomPropsAction = (payload: CustomProps) => ({
    type: SET_CUSTOM_PROPS,
    payload,
});
