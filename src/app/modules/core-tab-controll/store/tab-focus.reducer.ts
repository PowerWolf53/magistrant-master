import {createReducer, on} from '@ngrx/store';
import {focusTab} from './tab-focus.actions';

export const initialState  = 1;

export const tabFocusReducer = createReducer(
    initialState,
    on(focusTab, (state, {tabId}) => (tabId)),
);
