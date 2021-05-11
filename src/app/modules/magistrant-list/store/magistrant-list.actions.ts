import {createAction, props} from '@ngrx/store';
import {GroupMagistrants} from '../model/groupMagistrants';
import {MaigistrantModel} from '../model/maigistrant.model';

export const loadGroup = createAction(
    '[MagistrantList] Load Group',
    props<{ groupId: number}>()
);
export const setGroup = createAction(
    '[MagistrantList] Set Group',
    props<{ magistrants: MaigistrantModel[], groupId: number}>()
);

export const startLoading = createAction(
    '[MagistrantList] Start Loading Group',
    props<{ groupId: number}>()
);

