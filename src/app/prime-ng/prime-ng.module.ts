import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MenubarModule} from 'primeng/menubar';
import {PanelModule} from 'primeng/panel';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {MultiSelectModule} from 'primeng/multiselect';
import {DialogModule} from 'primeng/dialog';
@NgModule({
  exports: [
    ButtonModule,
    TableModule,
    MenubarModule,
    PanelModule,
    DynamicDialogModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    InputTextareaModule,
    MultiSelectModule,
    DialogModule
  ]
})
export class PrimeNgModule { }
