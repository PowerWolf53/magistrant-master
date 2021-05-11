import {Component, Input, NgZone, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {loadGroup} from '../store/magistrant-list.actions';
import {GroupMagistrants} from '../model/groupMagistrants';
import {MaigistrantModel} from '../model/maigistrant.model';
import {Group} from '../../group-list/model/group';
import {TabServiceService} from '../../../services/tab-service.service';
import {TabType} from '../../core-tab-controll/model/TabType';
import {SelectionModel} from '@angular/cdk/collections';
import {TabInfoModel} from '../../core-tab-controll/model/tab-info.model';

@Component({
    selector: 'app-magistrant-list-layout',
    templateUrl: './magistrant-list-layout.component.html',
    styleUrls: ['./magistrant-list-layout.component.scss']
})
export class MagistrantListLayoutComponent implements OnInit {

    tabs: TabInfoModel[] = [];

    @Input() groupId;

    public loading: boolean;

    public magistrants: MaigistrantModel[];

    displayedColumns: string[] = ['multiSelect', 'select', 'name', 'supervisor', 'practicePlace', 'workingTopic'];

    selection = new SelectionModel<MaigistrantModel>(true, []);

    constructor(private store: Store<{ magistrantList }>,
                private ngZone: NgZone,
                private tabServiceService: TabServiceService,
                private tabStore: Store<{ tabControl: TabInfoModel[] }>) {
    }

    ngOnInit(): void {
        this.store.dispatch(loadGroup({groupId: this.groupId}));
        this.store.select('magistrantList').subscribe(magistrantsData => {
            const currentGroup = magistrantsData.get(this.groupId);
            if (currentGroup) {
              this.ngZone.run(() => {
                this.loading = currentGroup.loading;
                this.magistrants = currentGroup.magistrants;
                console.log(this.magistrants);
              });
            }
        });
        this.subscrieToTabs();
    }


    handleViewClick(row: MaigistrantModel): void {
        this.tabServiceService.addTab({
            id: +row.privateNumber,
            name: this.getInitials(row.name),
            type: TabType.MAGISTRANT,
            data: row
        });

    }

    getInitials(name: string): string{
        return name.trim().split(' ').map((n, index) => {
            if (index === 0){
                return n + ' ';
            } else {
                if (index === 1){
                    return n[0] + '.';
                }else {
                    return n[0];
                }
            }
        }).join('');
    }

    isAllSelected(): boolean {
        const numSelected = this.selection.selected.length;
        const numRows = this.magistrants.length;
        return numSelected === numRows;
    }

    masterToggle(): void {
        this.isAllSelected() ?
            this.selection.clear() :
            this.magistrants.forEach(row => this.selection.select(row));
    }

    private subscrieToTabs(): void {
        this.tabStore.select('tabControl').subscribe(tabs => {
            this.tabs = tabs;
            });
    }

    handleCommonDocsClick(): void {
        this.tabServiceService.addCommonDocsTab(this.tabs, this.magistrants[0].groupNumber, this.selection.selected );
    }
}
