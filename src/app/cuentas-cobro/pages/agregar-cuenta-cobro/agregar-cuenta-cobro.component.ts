import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChange } from '@angular/core';
import { ApiUrl, Estados } from '../../../shared/enums';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuentaCobroDTO } from '../../../interfaces/cuentaCobroDTO';
import { ProductoDTO } from '../../../interfaces/productoDTO';
import { CuentasCobroService } from '../../services/cuentas-cobro.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agregar-cuenta-cobro',
  templateUrl: './agregar-cuenta-cobro.component.html',
  styleUrls: ['./agregar-cuenta-cobro.component.css']
})
export class AgregarCuentaCobroComponent implements OnInit{

  @Input() clienteIdSeleccionado = ''
  @Input () cuentaCobroEditar!: CuentaCobroDTO;
  @Output() actualizarCuentaCobro = new EventEmitter<CuentaCobroDTO>();
  estados: string[] = [Estados.anulado,Estados.pagado,Estados.pendiente]
  formulario!: FormGroup;
  banderaEstaEditando: boolean = false


  productos: ProductoDTO[] = []

  constructor(private cuentasCobroService: CuentasCobroService, private messageService: MessageService) {
  
  }

  ngOnInit(): void {
    this.obtenerProductos()
    this.inicializarFormulario()
    if(this.cuentaCobroEditar){
      this.banderaEstaEditando = true
      this.inicializarItemsDelFormulario()
    }

  }

  inicializarItemsDelFormulario(){
    this.estadoControl.setValue(this.cuentaCobroEditar?.estado)
    this.numeroControl.setValue(this.cuentaCobroEditar?.numero)
    this.productosControl.setValue(this.cuentaCobroEditar?.productos)
    this.valorTotalControl.setValue(this.cuentaCobroEditar?.valorTotal)
    this.descripcionControl.setValue(this.cuentaCobroEditar?.descripcion)
  }

  obtenerProductos(){
    this.cuentasCobroService.obtenerProductos().subscribe( productos => {
      this.productos = productos
    })
  }
  inicializarFormulario(){
    this.formulario = new FormGroup({
      numero: new FormControl('',[Validators.required,Validators.pattern("^(FA|CB)[0-9]{6}$")]),
      estado: new FormControl('',[Validators.required]),
      descripcion: new FormControl(''),
      productos: new FormControl('',[Validators.required]),
      valorTotal: new FormControl('')
    })
  }
  editarCuentaCobro(){
    this.cuentaCobroEditar.descripcion = this.descripcionControl.value
    this.cuentaCobroEditar.estado = this.estadoControl.value
    this.cuentaCobroEditar.numero = this.numeroControl.value
    this.cuentaCobroEditar.productos = this.productosControl.value
    this.cuentaCobroEditar.valorTotal = this.calcularValorTotalProductos()
    this.cuentasCobroService.editarCuentaCobro(this.cuentaCobroEditar).subscribe( r => {
      this.messageService.add({
        severity: 'success',
        detail: 'Editada correctamente',
        summary: 'Cuenta de cobro'
      })
    }, () => {
      this.messageService.add({
        severity: 'error',
        detail: 'Ups! Algo anda mal',
        summary: 'Cuenta de cobro'
      })
    })
  }
  agregarCuentaCobro(){
    let cuentaCobroNueva = {
      clienteId: this.clienteIdSeleccionado,
      descripcion: this.descripcionControl.value,
      estado: this.estadoControl.value,
      numero: this.numeroControl.value,
      productos: this.productosControl.value,
      valorTotal: this.calcularValorTotalProductos()

    } as CuentaCobroDTO
    this.cuentasCobroService.agregarCuentaCobro(cuentaCobroNueva).subscribe( r => {
      this.messageService.add({
        severity: "success",
        detail: "Creada correctamente!",
        summary: "Cuenta de cobro"
      })
      this.actualizarCuentaCobro.emit(cuentaCobroNueva)
      this.formulario.reset()
    }, err => {
      this.messageService.add({
        severity: "error",
        detail: "Ups! algo anda mal",
        summary: "Cuenta de cobro"
      })
    })
  }

  calcularValorTotalProductos(): number{
    let valorTotal = 0
    let productosSeleccionados = this.productosControl.value as ProductoDTO[]
    productosSeleccionados.forEach( p => {
      valorTotal = p.precio + valorTotal
    })
    return valorTotal
  }

  //getters form

  get numeroControl(): FormControl {
    return this.formulario.get('numero') as FormControl
  }
  get estadoControl(): FormControl {
    return this.formulario.get('estado') as FormControl
  }
  get descripcionControl(): FormControl {
    return this.formulario.get('descripcion') as FormControl
  }
  get productosControl(): FormControl {
    return this.formulario.get('productos') as FormControl
  }
  get valorTotalControl(): FormControl {
    return this.formulario.get('valorTotal') as FormControl
  }

}
