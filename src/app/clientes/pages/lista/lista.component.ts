import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ClienteDTO } from '../../../interfaces/clienteDTO';
import { ClienteService } from '../../services/cliente.service';
import { AgregarComponent } from '../agregar/agregar.component';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {


  listaDeClientes: ClienteDTO[] = []

  constructor(private clienteService: ClienteService, private dialogService: DialogService) { }

  ngOnInit(): void {

    this.obtenerClientes()
  }

  obtenerClientes(){
    this.clienteService.obtenerClientes().subscribe( respuesta => {
      this.listaDeClientes = respuesta
    })
  }

  agregarCliente(){
    this.dialogService.open(AgregarComponent, {
      header: 'Agregar Cliente',
      width: '70%'
  });
  }

  eliminarCliente(cliente: ClienteDTO){
    console.log("ELIMINAR CLIENTE")
    this.clienteService.eliminarCliente(cliente).subscribe( () => {
      console.log("eliminado")
      this.obtenerClientes()
    })
  }

}
