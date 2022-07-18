import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaCuentasComponent } from './pages/lista-cuentas/lista-cuentas.component';
import { AgregarCuentaCobroComponent } from './pages/agregar-cuenta-cobro/agregar-cuenta-cobro.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CuentasCobroService } from './services/cuentas-cobro.service';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    ListaCuentasComponent,
    AgregarCuentaCobroComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    AgregarCuentaCobroComponent,
    ListaCuentasComponent
  ],
  providers: [
    CuentasCobroService
  ]
})
export class CuentasCobroModule { }
