import { Component, Input, OnInit } from '@angular/core';
import { CuentasCobroService } from '../../services/cuentas-cobro.service';
import { CuentaCobroDTO } from '../../../interfaces/cuentaCobroDTO';
import { MessageService, ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-lista-cuentas',
  templateUrl: './lista-cuentas.component.html',
  styleUrls: ['./lista-cuentas.component.css']
})
export class ListaCuentasComponent implements OnInit {

  @Input() idCliente: string = ''
  listaCuentasCobro: CuentaCobroDTO[] = []
  cuentaCobroSeleccionada: CuentaCobroDTO | undefined
  //sirve para mostrar el dialogo de la cuenta de cobro
  mostrarCuentaCobro: boolean = false
  constructor(private cuentasCobroService: CuentasCobroService, private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.obtenerCuentasCobro();
  }

  obtenerCuentasCobro() {
    this.cuentasCobroService.obtenerCuentaDeCobroPorIdCliente(this.idCliente).subscribe(lista => {
      this.listaCuentasCobro = lista
    })
  }
  editarCuentaCobro(cuenta: CuentaCobroDTO) {
    console.log(cuenta)
    this.cuentaCobroSeleccionada = cuenta
    this.mostrarCuentaCobro = true
  }
  eliminarCuentaCobro(cuenta: CuentaCobroDTO) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar la cuenta de cobro?',
      accept: () => {
        this.cuentasCobroService.eliminarCuentaCobro(cuenta).subscribe(r => {
          this.messageService.add({
            severity: 'success',
            detail: 'Eliminada correctamente',
            summary: 'Cuenta cobro'
          })
          this.obtenerCuentasCobro();
        }, () => {
          this.messageService.add({
            severity: 'error',
            detail: 'Ups! Algo anda mal',
            summary: 'Cuenta cobro'
          })
        })
      }
    })

  }

}
