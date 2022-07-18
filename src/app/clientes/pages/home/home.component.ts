import { Component, OnInit } from '@angular/core';
import { ClienteService } from '../../services/cliente.service';
import { ClienteDTO } from '../../../interfaces/clienteDTO';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


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
