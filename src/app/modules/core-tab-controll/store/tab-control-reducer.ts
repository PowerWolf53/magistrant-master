import {createReducer, on} from '@ngrx/store';
import {addTab, removeTab} from './tab-control-actions';
import {TabType} from '../model/TabType';

export const initialState  = [
        {
            id: 1,
            name: 'Список групп',
            type: TabType.GROUP_LIST
        }
];

export const tabControlReducer = createReducer(
    initialState,
    on(addTab, (state, {tabInfo}) => ([...state, tabInfo])),
    on(removeTab, (state, {tabId}) => (state.filter(tab => tab.id !== tabId)))
);
