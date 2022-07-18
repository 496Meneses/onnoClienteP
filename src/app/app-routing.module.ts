import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ErrorPageComponent } from './shared/error-page/error-page.component';

const routes: Routes = [
  {
    path: 'clientes',
    loadChildren: () => import("./clientes/clientes.module").then( m => m.ClientesModule)
  },
  {
    path: 'login',
    loadChildren: () => import("./auth/auth.module").then( m => m.AuthModule)
  },
  {
    path: 'error',
    component: ErrorPageComponent
  },

  {
    path: '**',
    redirectTo: 'error'
  }

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
