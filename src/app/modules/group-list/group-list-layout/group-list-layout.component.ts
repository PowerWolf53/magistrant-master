import {Component, NgZone, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {Group} from '../model/group';
import {loadGroups} from '../store/group-list.actions';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {addTab} from '../../core-tab-controll/store/tab-control-actions';
import {TabType} from '../../core-tab-controll/model/TabType';
import {TabServiceService} from '../../../services/tab-service.service';

@Component({
    selector: 'app-group-list-layout',
    templateUrl: './group-list-layout.component.html',
    styleUrls: ['./group-list-layout.component.scss']
})
export class GroupListLayoutComponent implements OnInit {

    displayedColumns: string[] = ['select', 'name', 'type', 'course', 'link'];
    dataSource: Group[];

    constructor(private store: Store<{ groupList }>,
                private tabStore: Store<{ tabInfo }>,
                private ngZone: NgZone,
                private tabServiceService: TabServiceService) {
    }

    ngOnInit(): void {
        this.store.dispatch(loadGroups());
        this.store.select('groupList').pipe(map(data => data.groups)).subscribe(groups => {
            this.ngZone.run(() => {
                this.dataSource = groups;
            });
        });
    }

    handleViewClick(row: any): void {
        this.tabServiceService.addTab({
            id: +row.name,
            name: 'гр.' + row.name,
            type: TabType.MAGISTRANT_LIST
        });
    }
}
