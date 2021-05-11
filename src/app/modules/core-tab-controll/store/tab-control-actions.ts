import {createAction, props} from '@ngrx/store';
import {TabInfoModel} from '../model/tab-info.model';

export const addTab = createAction(
    '[Tab Control] Add tab',
    props<{ tabInfo: TabInfoModel }>()
);

export const removeTab = createAction(
    '[Tab Control] Remove tab',
    props<{ tabId: number }>()
);
