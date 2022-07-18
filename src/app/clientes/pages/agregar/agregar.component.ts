import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from '../../services/cliente.service';
import { ClienteDTO } from '../../../interfaces/clienteDTO';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styleUrls: ['./agregar.component.css']
})
export class AgregarComponent implements OnInit {

  formulario!: FormGroup;


  banderaEstaEditando = false
  clienteEditar: ClienteDTO | undefined
  constructor(private clienteService: ClienteService, private router: ActivatedRoute, private messageService: MessageService) { }

  ngOnInit(): void {
    this.inicializarFormulario()
    this.obtenerClienteAEditar()

  }

  inicializarFormulario() {
    this.formulario = new FormGroup({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      identificacion: new FormControl('', [Validators.required, Validators.pattern("^[0-9]+")])
    })
  }

  agregarCliente() {
    let clienteNuevo = {
      nombre: this.nombresControl.value,
      apellidos: this.apellidosControl.value,
      identificacion: this.identificacionControl.value
    } as ClienteDTO
    this.clienteService.agregarCliente(clienteNuevo).subscribe(r => {
      this.messageService.add({
        severity: 'success',
        detail: 'Agregado con exito!',
        summary: 'Agregar Cliente'
      })
      this.formulario.reset()
    }, err => {
      this.messageService.add({
        severity: 'error',
        detail: 'Ups! Algo anda mal',
        summary: 'Agregar Cliente'
      })
    })
  }

  editarCliente() {
    this.clienteEditar!.nombre = this.nombresControl.value
    this.clienteEditar!.apellidos = this.apellidosControl.value
    this.clienteEditar!.identificacion = this.identificacionControl.value
    this.clienteService.editarCliente(this.clienteEditar!).subscribe(() => {
      this.messageService.add({
        severity: 'success',
        detail: 'Cliente actualizado',
        summary: 'Editar cliente'
      })
    })
  }

  obtenerClienteAEditar() {
    let url = document.location.href
    let id = url.split('/')[5]
    if (id) {
      this.clienteService.obtenerClientePorId(id).subscribe(cliente => {
        this.clienteEditar = cliente
        this.valoresInicialesFormulario()
      })
      this.banderaEstaEditando = true
    } else {
      this.banderaEstaEditando = false

    }

  }

  validarIdentificacion() {
    this.clienteService.obtenerClientes().subscribe(clientes => {
      let filterClientes = clientes.filter(cliente => cliente.identificacion == this.identificacionControl.value)
      if (filterClientes.length > 0) {
        alert("Existe usuario con identificacion ")
        this.identificacionControl.reset()
      }
    })
  }

  valoresInicialesFormulario() {
    this.nombresControl.setValue(this.clienteEditar?.nombre)
    this.apellidosControl.setValue(this.clienteEditar?.apellidos)
    this.identificacionControl.setValue(this.clienteEditar?.identificacion)
  }


  //GETTERS formcontrol
  get nombresControl(): FormControl {
    return this.formulario.get('nombres') as FormControl
  }

  get apellidosControl(): FormControl {
    return this.formulario.get('apellidos') as FormControl
  }

  get identificacionControl(): FormControl {
    return this.formulario.get('identificacion') as FormControl
  }

}
