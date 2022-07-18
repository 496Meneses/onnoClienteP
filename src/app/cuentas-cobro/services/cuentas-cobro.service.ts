import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoDTO } from '../../interfaces/productoDTO';
import { BACKEND_URL, ApiUrl } from '../../shared/enums';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CuentaCobroDTO } from '../../interfaces/cuentaCobroDTO';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};
@Injectable({
  providedIn: 'root'
})
export class CuentasCobroService {

  constructor(private http: HttpClient) { }

  obtenerProductos(): Observable<ProductoDTO[]> {
    let url = BACKEND_URL.concat(ApiUrl.productos)
    return this.http.get<ProductoDTO[]>(url,httpOptions)
  }
  agregarCuentaCobro(cuentaCobro: CuentaCobroDTO): Observable<any>{
    let url = BACKEND_URL.concat(ApiUrl.cuentasCobro)
    return this.http.post<any>(url,cuentaCobro,httpOptions)
  }
  obtenerCuentaDeCobroPorIdCliente(idCliente: string): Observable<CuentaCobroDTO[]>{
    let url = BACKEND_URL.concat(ApiUrl.obtenerClientes).concat("/",idCliente,"/",ApiUrl.cuentasCobro)
    return this.http.get<CuentaCobroDTO[]>(url,httpOptions)
  }
}
