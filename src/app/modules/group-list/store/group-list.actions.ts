import {createAction, props} from '@ngrx/store';
import {Group} from '../model/group';

export const loadGroups = createAction(
    '[Group List] Load Groups',
);

export const startLoad = createAction(
    '[Group List] Start Load Groups',
);

export const setGroups = createAction(
    '[Group List] Set Groups',
    props<{ groups: Group[]}>()
);
