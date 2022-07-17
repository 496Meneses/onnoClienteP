import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgregarComponent } from './pages/agregar/agregar.component';
import { ClienteComponent } from './pages/cliente/cliente.component';
import { HomeComponent } from './pages/home/home.component';
import { ListaComponent } from './pages/lista/lista.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ClienteService } from './services/cliente.service';
import { HttpClientModule } from '@angular/common/http';
import { DialogService } from 'primeng/dynamicdialog';

import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    AgregarComponent,
    ClienteComponent,
    HomeComponent,
    ListaComponent
  ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
    PrimeNgModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [
    ClienteService,
    DialogService
  ]
})
export class ClientesModule { }
