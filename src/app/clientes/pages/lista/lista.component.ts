import { Component, OnInit } from '@angular/core';

import { ClienteDTO } from '../../../interfaces/clienteDTO';
import { ClienteService } from '../../services/cliente.service';

import { CuentasCobroService } from '../../../cuentas-cobro/services/cuentas-cobro.service';
import { CuentaCobroDTO } from '../../../interfaces/cuentaCobroDTO';
import { Estados } from '../../../shared/enums';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.css']
})
export class ListaComponent implements OnInit {


  listaDeClientes: ClienteDTO[] = []
  listaDeClientesConCuentasCobro: any[] = []

  mostrarCuentaCobro: boolean = false
  idSeleccionado: string = ''
  constructor(private clienteService: ClienteService, private confirmationService: ConfirmationService,
    private cuentaCobroService: CuentasCobroService, private messageService: MessageService) { }

  ngOnInit(): void {

    this.obtenerClientes()
  }

  obtenerClientes() {
    this.clienteService.obtenerClientes().subscribe(respuesta => {
      this.listaDeClientes = respuesta
      this.obtenerCuentasCobroPorCadaCliente();
    })
  }
  obtenerCuentasCobroPorCadaCliente() {
    if (this.listaDeClientes.length > 0) {
      this.listaDeClientes.forEach(cliente => {
        this.cuentaCobroService.obtenerCuentaDeCobroPorIdCliente(cliente.id).subscribe(cuentasCobro => {
          this.agregarCuentaCobroACliente(cliente, cuentasCobro)
        })
      })

    }

  }

  agregarCuentaCobroACliente(cliente: ClienteDTO, listaCuentaCobro: CuentaCobroDTO[]) {
    let contadorValorTotalPendiente = 0
    let contadorCuentasPendientes = 0
    listaCuentaCobro.forEach(cuentaCobro => {
      if (cuentaCobro.estado === Estados.pendiente) {
        contadorValorTotalPendiente = cuentaCobro.valorTotal + contadorValorTotalPendiente
        contadorCuentasPendientes += 1
      }
    })
    cliente.valorPendiente = contadorValorTotalPendiente
    cliente.numeroDeCuentasPendientes = contadorCuentasPendientes
  }

  agregarCuentaCobro(clienteId: string) {
    this.mostrarCuentaCobro = true
    this.idSeleccionado = clienteId
  }
  actualizarListaCuentaCobro() {
    this.obtenerClientes() //TODO, SE DEBE MEJORAR
  }

  eliminarCliente(cliente: ClienteDTO) {
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar el cliente?',
      accept: () => {
        this.clienteService.eliminarCliente(cliente).subscribe(() => {
          this.messageService.add({
            severity: 'success',
            detail: 'Eliminado con exito!',
            summary: 'Eliminar cliente'
          })
          this.obtenerClientes()
        })
      }
    })

  }

}
