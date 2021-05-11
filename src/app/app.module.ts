import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MagistrantListModule} from './modules/magistrant-list/magistrant-list.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {CoreTabControllModule} from './modules/core-tab-controll/core-tab-controll.module';
import { HeaderComponent } from './components/header/header.component';
import {StoreModule} from '@ngrx/store';
import {groupListReducer} from './modules/group-list/store/group-list.reducer';
import {EffectsModule} from '@ngrx/effects';
import {GroupListEffects} from './modules/group-list/store/group-list.effects';
import {tabControlReducer} from './modules/core-tab-controll/store/tab-control-reducer';
import {tabFocusReducer} from './modules/core-tab-controll/store/tab-focus.reducer';
import {magistrantListReducer} from './modules/magistrant-list/store/magistrant-list.reducer';
import {MagistrantListEffects} from './modules/magistrant-list/store/magistrant-list.effects';


@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatTableModule,
        MatCheckboxModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatProgressSpinnerModule,
        MagistrantListModule,
        CoreTabControllModule,
        StoreModule.forRoot({
            groupList: groupListReducer,
            tabControl: tabControlReducer,
            tabFocus: tabFocusReducer,
            magistrantList: magistrantListReducer
        }),
        EffectsModule.forRoot([GroupListEffects, MagistrantListEffects])
    ],
    providers: [],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
