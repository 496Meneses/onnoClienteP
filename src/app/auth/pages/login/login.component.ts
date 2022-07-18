import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  nombreDeUsuario: string = ''
  contraseña: string = ''

  formulario! : FormGroup
 
  ngOnInit(): void {
    this.inicializarFormulario()
    
  }

  inicializarFormulario(){
    this.formulario = new FormGroup({
      username: new FormControl('',[Validators.required]),
      password: new FormControl('',[Validators.required])
    })
  }

  constructor(private router: Router, private authService:AuthService){}

  iniciarSesion(){
    this.authService.login(this.usernameControl.value,this.passwordControl.value).subscribe( r => {
      if(r.length > 0){
        this.authService.setUsuario(r[0])
        this.router.navigate(['clientes'])
      }
    })
  }

  get usernameControl(): FormControl {
    return this.formulario.get('username') as FormControl
  }
  get passwordControl(): FormControl {
    return this.formulario.get('password') as FormControl
  }

}
