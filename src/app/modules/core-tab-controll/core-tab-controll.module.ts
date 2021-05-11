import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreTabControlLayoutComponent } from './core-tab-control-layout/core-tab-control-layout.component';
import {MatTabsModule} from '@angular/material/tabs';
import { StoreModule } from '@ngrx/store';
import {tabControlReducer} from './store/tab-control-reducer';
import {GroupListModule} from '../group-list/group-list.module';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MagistrantListModule} from '../magistrant-list/magistrant-list.module';
import {MagistrantDocumentsModule} from '../magistrant-documents/magistrant-documents.module';

@NgModule({
  declarations: [
    CoreTabControlLayoutComponent
  ],
  exports: [
    CoreTabControlLayoutComponent
  ],
    imports: [
        CommonModule,
        MatTabsModule,
        GroupListModule,
        MatButtonModule,
        MatIconModule,
        MagistrantListModule,
        MagistrantDocumentsModule
    ]
})
export class CoreTabControllModule { }
