import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './pages/login/login.component';
import { RegistrarseComponent } from './pages/registrarse/registrarse.component';
import { PrimeNgModule } from '../prime-ng/prime-ng.module';
import { AuthRoutingModule } from './auth-routing.module';



@NgModule({
  declarations: [
    LoginComponent,
    RegistrarseComponent
  ],
  imports: [
    CommonModule,
    PrimeNgModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
