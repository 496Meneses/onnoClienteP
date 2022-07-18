import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BACKEND_URL } from '../../shared/enums';
import { map, Observable, of, tap } from 'rxjs';
import { UsuarioDTO } from '../../interfaces/usuarioDTO';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url : string = BACKEND_URL
  private _usuario: UsuarioDTO | undefined;
  
  constructor(private http:HttpClient) { }

  login(username: string, password: string): Observable<UsuarioDTO[]>{
    return this.http.get<UsuarioDTO[]>(`${this.url}usuarios?login=${username}&password=${password}`).pipe(
      tap( usuario => {
        this._usuario = usuario[0]
        localStorage.setItem('id',this._usuario.id)
        localStorage.setItem('isAdmin',this._usuario.isAdmin.toString())
        localStorage.setItem('fullname',this._usuario.fullname.toString())
      })
    );
  }

  verificarAutenticacion(): Observable<boolean>{
    if(localStorage.getItem('id') === undefined){
      console.log("llegó aqui 1")
      return of(false);
    }else{
      return this.http.get<UsuarioDTO[]>(`${this.url}usuarios/${localStorage.getItem('id')}`).pipe(
        map( usuario => {

          if(usuario ){
            console.log("llegó aqui")
            return true
          }else{
            return false
          }
        })
      )
    }

  }
  getUsuario(): UsuarioDTO | undefined{
    console.log("Se pido usuario", this._usuario)
    return this._usuario
  }
  setUsuario(usuario: UsuarioDTO){
    this._usuario = usuario
  }


}
