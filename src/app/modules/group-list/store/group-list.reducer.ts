import {createReducer, on} from '@ngrx/store';
import {setGroups} from './group-list.actions';

export const initialState = {
    groups: []
};

export const groupListReducer = createReducer(
    initialState,
    on(setGroups, (state, {groups}) => ({...state, groups}))
);
