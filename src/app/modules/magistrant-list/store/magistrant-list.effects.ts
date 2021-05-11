import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {IpcService} from '../../../services/ipc.service';
import {map} from 'rxjs/operators';
import {loadGroups} from '../../group-list/store/group-list.actions';
import {loadGroup, startLoading} from './magistrant-list.actions';

@Injectable()
export class MagistrantListEffects {

    constructor(
        private actions$: Actions,
        private ipcService: IpcService
    ) {
    }

    $loadGroup = createEffect(() =>
        this.actions$.pipe(
            ofType(loadGroup),
            map(({groupId}) => {
                this.ipcService.pingToGetMagistrants(groupId);
                return startLoading({groupId});
            })
        )
    );
}
