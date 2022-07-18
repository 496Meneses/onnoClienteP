import { Component, Input, OnInit } from '@angular/core';
import { CuentasCobroService } from '../../services/cuentas-cobro.service';
import { CuentaCobroDTO } from '../../../interfaces/cuentaCobroDTO';

@Component({
  selector: 'app-lista-cuentas',
  templateUrl: './lista-cuentas.component.html',
  styleUrls: ['./lista-cuentas.component.css']
})
export class ListaCuentasComponent implements OnInit {

  @Input() idCliente: string= ''
  listaCuentasCobro: CuentaCobroDTO[] = []
  cuentaCobroSeleccionada: CuentaCobroDTO | undefined
  //sirve para mostrar el dialogo de la cuenta de cobro
  mostrarCuentaCobro: boolean = false
  constructor(private cuentasCobroService: CuentasCobroService) { }

  ngOnInit(): void {
    this.obtenerCuentasCobro();
  }

  obtenerCuentasCobro(){
    this.cuentasCobroService.obtenerCuentaDeCobroPorIdCliente(this.idCliente).subscribe(lista => {
      this.listaCuentasCobro = lista
    })
  }
  editarCuentaCobro(cuenta:CuentaCobroDTO){
    console.log(cuenta)
    this.cuentaCobroSeleccionada = cuenta
    this.mostrarCuentaCobro = true
  }
  eliminarCuentaCobro(cuenta:CuentaCobroDTO){
    this.cuentasCobroService.eliminarCuentaCobro(cuenta).subscribe(r => {
      alert("cuenta cobro eliminada")
      this.obtenerCuentasCobro();
    })
  }

}
