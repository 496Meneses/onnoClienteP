import { NgModule } from '@angular/core';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {MenubarModule} from 'primeng/menubar';
import {PanelModule} from 'primeng/panel';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
@NgModule({
  exports: [
    ButtonModule,
    TableModule,
    MenubarModule,
    PanelModule,
    DynamicDialogModule,
    CardModule,
    InputTextModule
  ]
})
export class PrimeNgModule { }
