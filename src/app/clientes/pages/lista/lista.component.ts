import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { ClienteDTO } from '../../../interfaces/clienteDTO';
import { ClienteService } from '../../services/cliente.service';
import { AgregarComponent } from '../agregar/agregar.component';
import { AgregarCuentaCobroComponent } from '../../../cuentas-cobro/pages/agregar-cuenta-cobro/agregar-cuenta-cobro.component';
import { CuentasCobroService } from '../../../cuentas-cobro/services/cuentas-cobro.service';
import { CuentaCobroDTO } from '../../../interfaces/cuentaCobroDTO';
import { Estados } from '../../../shared/enums';

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
  constructor(private clienteService: ClienteService, private dialogService: DialogService, private cuentaCobroService: CuentasCobroService) { }

  ngOnInit(): void {

    this.obtenerClientes()
  }

  obtenerClientes(){
    this.clienteService.obtenerClientes().subscribe( respuesta => {
      this.listaDeClientes = respuesta
      this.obtenerCuentasCobroPorCadaCliente();
    })
  }
  obtenerCuentasCobroPorCadaCliente(){
    if(this.listaDeClientes.length > 0){
      this.listaDeClientes.forEach( cliente => {
        this.cuentaCobroService.obtenerCuentaDeCobroPorIdCliente(cliente.id).subscribe(cuentasCobro => {
          this.agregarCuentaCobroACliente(cliente,cuentasCobro)
        }) 
      })

    }

  }

  agregarCuentaCobroACliente(cliente:ClienteDTO,listaCuentaCobro:CuentaCobroDTO[]){
    let contadorValorTotalPendiente = 0
    let contadorCuentasPendientes = 0
    listaCuentaCobro.forEach( cuentaCobro => {
      if(cuentaCobro.estado === Estados.pendiente){
        contadorValorTotalPendiente = cuentaCobro.valorTotal + contadorValorTotalPendiente
        contadorCuentasPendientes += 1 
      }
    })
    cliente.valorPendiente = contadorValorTotalPendiente
    cliente.numeroDeCuentasPendientes = contadorCuentasPendientes
  }

  agregarCuentaCobro(clienteId: string){
    this.mostrarCuentaCobro = true
    this.idSeleccionado = clienteId
  }

  eliminarCliente(cliente: ClienteDTO){
    console.log("ELIMINAR CLIENTE")
    this.clienteService.eliminarCliente(cliente).subscribe( () => {
      console.log("eliminado")
      this.obtenerClientes()
    })
  }

}
