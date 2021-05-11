import {createReducer, on} from '@ngrx/store';
import {setGroup, startLoading} from './magistrant-list.actions';
import {GroupMagistrants} from '../model/groupMagistrants';
import {MaigistrantModel} from '../model/maigistrant.model';


export const initialState = new Map<number, GroupMagistrants>();

export const magistrantListReducer = createReducer(
    initialState,
    on(startLoading, (state, {groupId}) => (getMapWithCreatedGroup(state, groupId))),
    on(setGroup, (state, {magistrants, groupId}) => (getMapWithUpdatedGroup(state, magistrants, groupId)))

);

const getMapWithCreatedGroup = (state: Map<number, GroupMagistrants>, groupId: number) => {
    const stateCopy = new Map(state);
    stateCopy.set(groupId, createNewGroup(groupId));
    return stateCopy;
};

const getMapWithUpdatedGroup = (state: Map<number, GroupMagistrants>, magistrants: MaigistrantModel[], groupId: number) => {
    const stateCopy = new Map(state);
    const group = stateCopy.get(groupId);
    group.loading = false;
    group.magistrants = magistrants;
    state.set(groupId, group);
    return stateCopy;
};

const createNewGroup = (groupId: number): GroupMagistrants => {
    return {
        loading: true,
        groupNumber: groupId,
        magistrants: []
    };
};
