import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BACKEND_URL, ApiUrl } from '../../shared/enums';
import { ClienteDTO } from '../../interfaces/clienteDTO';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(private http:HttpClient) { }

  agregarCliente(cliente: ClienteDTO){
    let url = BACKEND_URL.concat(ApiUrl.obtenerClientes)
    return this.http.post<any>(url,cliente,httpOptions)
  }
  editarCliente(cliente: ClienteDTO){
    let url = BACKEND_URL.concat(ApiUrl.obtenerClientes).concat("/", cliente.id)
    return this.http.put<ClienteDTO>(url,cliente,httpOptions)
  }
  obtenerClientes(): Observable<ClienteDTO[]>{
    let url = BACKEND_URL.concat(ApiUrl.obtenerClientes)
    return this.http.get<ClienteDTO[]>(url, httpOptions)
  }
  eliminarCliente(cliente: ClienteDTO): Observable<any>{

    let url = BACKEND_URL.concat(ApiUrl.obtenerClientes).concat("/" + cliente.id)
    console.log(url)
    return this.http.delete<any>(url,httpOptions)
  }
  obtenerClientePorId(id: string): Observable<ClienteDTO>{
    let url = BACKEND_URL.concat(ApiUrl.obtenerClientes).concat("/" + id)
    return this.http.get<ClienteDTO>(url,httpOptions)
  }

}
