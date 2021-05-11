import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {Store} from '@ngrx/store';
import {TabInfoModel} from '../model/tab-info.model';
import {Observable} from 'rxjs';
import {addTab, removeTab} from '../store/tab-control-actions';
import {TabType} from '../model/TabType';
import {MatTabGroup} from '@angular/material/tabs';
import {TabServiceService} from '../../../services/tab-service.service';
import {focusTab} from '../store/tab-focus.actions';

@Component({
    selector: 'app-core-tab-control-layout',
    templateUrl: './core-tab-control-layout.component.html',
    styleUrls: ['./core-tab-control-layout.component.scss']
})
export class CoreTabControlLayoutComponent implements OnInit {
    @ViewChild('tabGroup', { static: false }) tabGroup: MatTabGroup;

    tabs$: Observable<TabInfoModel[]>;
    tabs: TabInfoModel[] = [];

    constructor(private store: Store<{ tabControl: TabInfoModel[] }>,
                private ngZone: NgZone,
                private tabFocusStore: Store<{ tabFocus: number }>) {
        this.tabs$ = store.select('tabControl');
    }

    ngOnInit(): void {
        this.tabs$.subscribe(tabs => {
            this.ngZone.run(() => {
                this.tabs = tabs;
                if (this.tabGroup){
                    setTimeout(() => {
                        this.tabGroup.selectedIndex = tabs.length - 1;
                    });
                }
            });
        });
        this.subscribeOnTabFocus();
    }

    closeTab(index: number): void {
        this.store.dispatch(removeTab({tabId: this.tabs[index].id}));
    }

    private subscribeOnTabFocus(): void {
        this.tabFocusStore.select('tabFocus').subscribe(selected => {
            if (selected){
                const tab = this.tabs.find(t => t.id === selected);
                const index = this.tabs.indexOf(tab);
                if (index){
                    this.ngZone.run(() => {
                        setTimeout(() => {
                            this.tabGroup.selectedIndex = index;
                        });
                    });
                    this.tabFocusStore.dispatch(focusTab({tabId: 0}));
                }
            }
        });
    }
}
