import {createAction, props} from '@ngrx/store';

export const focusTab = createAction(
    '[Tab Control Focus] Focus tab',
    props<{ tabId: number }>()
);
