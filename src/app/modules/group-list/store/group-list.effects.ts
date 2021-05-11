import {Injectable} from '@angular/core';
import {IpcService} from '../../../services/ipc.service';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import {map, mergeMap} from 'rxjs/operators';
import {loadGroups, setGroups, startLoad} from './group-list.actions';

@Injectable()
export class GroupListEffects {

    constructor(
        private actions$: Actions,
        private ipcService: IpcService
    ) {
    }

    $loadGroups = createEffect(() =>
       this.actions$.pipe(
           ofType(loadGroups),
           map(() => {
               this.ipcService.pingToGetGroups();
               return startLoad();
           })
       )
    );
}
