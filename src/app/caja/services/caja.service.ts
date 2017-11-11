import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Venta, Sucursal, Producto, Banco } from 'app/models';



@Injectable()
export class CajaService {

  readonly apiUrl = environment.apiUrl + '/ventas';
  
  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  constructor(private http: HttpClient) { }

  pendientesDeFacturar(tipo: string) {
    const params = new HttpParams().set('facturables', tipo);
    return this.http.get<Venta[]>(this.apiUrl, {params: params})
  }

  cobradas() {
    const url = `${this.apiUrl}/cobradas/${this.sucursal.id}`;
    return this.http.get<Venta[]>(url)
  }

  getVenta(id: string): Observable<Venta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Venta>(url)
  }

  facturar(venta: Venta): Observable<Venta> {
    const url = `${this.apiUrl}/facturar/${venta.id}`;
    return this.http.put<Venta>(url, venta);
  }

  facturasPendientesCod() {
    const url = `${environment.apiUrl}/cuentasPorCobrar/pendientesCod/${this.sucursal.id}`;
    return this.http.get(url)
  }

  cuentaPorCobrar(id: string) {
    const url = `${environment.apiUrl}/cuentasPorCobrar/${id}`;
    return this.http.get(url);
  }

  cobroContado(cobro) {
    const url = `${environment.apiUrl}/cxc/cobro/cobroContado/`;
    const cob = {
      ... cobro,
      venta: cobro.venta.id
    }
    return this.http.post(url, cob);
  }

  regresarAPedidos(venta: Venta): Observable<Venta> {
    venta.facturar = null;
    const url = `${this.apiUrl}/${venta.id}`;
    return this.http.put<Venta>(url, venta);
  }

  bancos(): Observable<Banco[]> {
     const url = environment.apiUrl + '/tesoreria/bancos';
     return this.http.get<Banco[]>(url);
  }

}
