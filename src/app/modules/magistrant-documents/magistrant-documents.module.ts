import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MagistrantDocumentsLayoutComponent } from './magistrant-documents-layout/magistrant-documents-layout.component';
import {MatButtonModule} from '@angular/material/button';
import {DocCardComponent} from './components/doc-card/doc-card.component';
import { CommonDocumentsLayoutComponent } from './common-documents-layout/common-documents-layout.component';
import {MatIconModule} from '@angular/material/icon';
import {MatChipsModule} from '@angular/material/chips';



@NgModule({
    declarations: [
        MagistrantDocumentsLayoutComponent,
        DocCardComponent,
        CommonDocumentsLayoutComponent
    ],
    exports: [
        MagistrantDocumentsLayoutComponent,
        CommonDocumentsLayoutComponent,
    ],
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatChipsModule,
    ]
})
export class MagistrantDocumentsModule { }
