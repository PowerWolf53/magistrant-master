import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupListLayoutComponent } from './group-list-layout/group-list-layout.component';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
    imports: [
        CommonModule,
        MatTableModule,
        MatCheckboxModule,
        MatIconModule,
        MatProgressSpinnerModule
    ],
    exports: [
        GroupListLayoutComponent
    ],
    declarations: [GroupListLayoutComponent]
})
export class GroupListModule { }
