import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagistrantListLayoutComponent } from './magistrant-list-layout/magistrant-list-layout.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatButtonModule} from "@angular/material/button";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatTableModule,
        MatButtonModule,
        MatCheckboxModule,
        MatProgressSpinnerModule,
        RouterModule
    ],
    exports: [
        MagistrantListLayoutComponent
    ],
    declarations: [MagistrantListLayoutComponent]
})
export class MagistrantListModule { }
