import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  items: MenuItem[] = [];
  constructor(private router: Router, private authService: AuthService) { }
  ngOnInit(): void {
    this.items = [
      {
        label: 'Clientes',
        items: [
          { label: 'Listar', routerLink: '/clientes/lista' },
          { label: 'Agregar', routerLink: '/clientes/agregar' },
        ]
      },
    ];
  }

  cerrarSesion() {
    this.router.navigate(['/login'])
  }

  get usuario(){
    return localStorage.getItem('fullname')
  }

}
