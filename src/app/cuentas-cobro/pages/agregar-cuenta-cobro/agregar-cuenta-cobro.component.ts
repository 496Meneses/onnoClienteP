import { Component, Input, OnInit } from '@angular/core';
import { ApiUrl, Estados } from '../../../shared/enums';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CuentaCobroDTO } from '../../../interfaces/cuentaCobroDTO';
import { ProductoDTO } from '../../../interfaces/productoDTO';
import { CuentasCobroService } from '../../services/cuentas-cobro.service';

@Component({
  selector: 'app-agregar-cuenta-cobro',
  templateUrl: './agregar-cuenta-cobro.component.html',
  styleUrls: ['./agregar-cuenta-cobro.component.css']
})
export class AgregarCuentaCobroComponent implements OnInit {

  @Input() clienteIdSeleccionado = ''
  estados: string[] = [Estados.anulado,Estados.pagado,Estados.pendiente]
  formulario!: FormGroup;
  banderaEstaEditando: boolean = false

  cuentaCobroEditar: CuentaCobroDTO | undefined;
  productos: ProductoDTO[] = []

  constructor(private cuentasCobroService: CuentasCobroService) {
  
  }

  ngOnInit(): void {
    this.obtenerProductos()
    this.inicializarFormulario()

  }

  obtenerProductos(){
    this.cuentasCobroService.obtenerProductos().subscribe( productos => {
      this.productos = productos
    })
  }
  inicializarFormulario(){
    this.formulario = new FormGroup({
      numero: new FormControl('',[Validators.required,Validators.pattern("^[0-9]+")]),
      estado: new FormControl('',[Validators.required]),
      descripcion: new FormControl(''),
      productos: new FormControl('',[Validators.required]),
      valorTotal: new FormControl('')
    })
  }
  editarCuentaCobro(){

  }
  agregarCuentaCobro(){
    let CuentaCobroNueva = {
      clienteId: this.clienteIdSeleccionado,
      descripcion: this.descripcionControl.value,
      estado: this.estadoControl.value,
      numero: this.numeroControl.value,
      productos: this.productosControl.value,
      valorTotal: this.calcularValorTotalProductos()

    } as CuentaCobroDTO
    this.cuentasCobroService.agregarCuentaCobro(CuentaCobroNueva).subscribe( r => {
      alert("Cuenta Cobro creada")
      this.formulario.reset()
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
