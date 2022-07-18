import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ClienteService } from './services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';
import {DialogModule} from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { CuentasCobroModule } from '../cuentas-cobro/cuentas-cobro.module';
import { MessageService } from 'primeng/api';
import {ToolbarModule} from 'primeng/toolbar';
@NgModule({
  declarations: [
    AgregarComponent,
    HomeComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    PrimeNgModule,
    HttpClientModule,
    ReactiveFormsModule,
    CuentasCobroModule,
    DialogModule,
    ToolbarModule
  ],
  providers: [
    ClienteService,
    DialogService,
    MessageService
  ]
})
export class ClientesModule { }
