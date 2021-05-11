import {Injectable} from '@angular/core';
import {TabInfoModel} from '../modules/core-tab-controll/model/tab-info.model';
import {Store} from '@ngrx/store';
import {focusTab} from '../modules/core-tab-controll/store/tab-focus.actions';
import {addTab} from '../modules/core-tab-controll/store/tab-control-actions';
import {combineLatest} from 'rxjs';
import {GroupMagistrants} from '../modules/magistrant-list/model/groupMagistrants';
import {MaigistrantModel} from '../modules/magistrant-list/model/maigistrant.model';
import {TabType} from '../modules/core-tab-controll/model/TabType';

@Injectable({
    providedIn: 'root'
})
export class TabServiceService {

    tabs: TabInfoModel[];

    constructor(private tabStore: Store<{ tabControl: TabInfoModel[] }>,
                private tabFocusStore: Store<{ tabFocus: number }>) {
        combineLatest([this.tabStore.select('tabControl')]).subscribe(tabsInfo => {
          this.tabs = tabsInfo[0];
        });
    }

    public addTab(tab: TabInfoModel): void {
        const foundTab = this.tabs.find(t => t.id === tab.id);
        if (!!foundTab) {
            this.tabFocusStore.dispatch(focusTab({tabId: foundTab.id}));
        } else {
            this.tabStore.dispatch(addTab({
                tabInfo: tab
            }));
        }
    }

    public addCommonDocsTab(tabs: TabInfoModel[], groupNumber: number, magistrants: MaigistrantModel[]): void{
        const allIds = tabs.map(tab => tab.id);
        let generatedId;
        let index = 1;
        while (generatedId == null){
               if (!allIds.includes(index)) {
                   generatedId = index;
               } else {
                   ++index;
               }
        }
        const tabInfo: TabInfoModel = {
            id: generatedId,
            type: TabType.GROUP_DOCUMENTS,
            name: 'док. ' + groupNumber,
            data : {
                selectedMagistrants: magistrants,
                groupNumber
            }
        };
        this.addTab(tabInfo);
    }
}
