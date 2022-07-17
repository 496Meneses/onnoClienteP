import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'onnoCobro';
  items: MenuItem[] = [];
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
}
