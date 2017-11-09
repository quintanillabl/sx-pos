import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Venta, Sucursal, Producto } from 'app/models';

@Injectable()
export class PedidosService {

  readonly apiUrl = environment.apiUrl + '/ventas';

  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Venta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Venta>(url)
  }

  pendientes(sucursal: Sucursal): Observable<Venta[]> {
    // let params = new HttpParams().set('sucursal', sucursal.id);
    const url = `${this.apiUrl}/pendientes/${sucursal.id}`;
    return this.http.get<Venta[]>(url)
  }

  list(): Observable<Venta[]> {
    return this.http.get<Venta[]>(this.apiUrl)
  }

  save(venta: Venta) {
    return this.http.post(this.apiUrl, venta);
  }

  update(venta: Venta) {
    const url = `${this.apiUrl}/${venta.id}`;
    return this.http.put(url, venta);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  findManiobraFlete(): Observable<Producto> {
    const params = new HttpParams().set('clave', 'MANIOBRAF');
    const url = `${this.apiUrl}/findManiobra`;
    return this.http.get<Producto>(url, {params: params});
  }

  findManiobra(): Observable<Producto> {
    const params = new HttpParams().set('clave', 'MANIOBRA');
    const url = `${this.apiUrl}/findManiobra`;
    return this.http.get<Producto>(url, {params: params});
  }

  findCorte(): Observable<Producto> {
    const params = new HttpParams().set('clave', 'CORTE');
    const url = `${this.apiUrl}/findManiobra`;
    return this.http.get<Producto>(url, {params: params});
  }

  mandarFacturar(venta: Venta) {
    const url = `${this.apiUrl}/mandarFacturar/${venta.id}`;
    return this.http.put(url, venta);
  }

  pendientesDeFacturar(tipo: string) {
    const params = new HttpParams().set('facturables', tipo);
    return this.http.get<Venta[]>(this.apiUrl, {params: params})
  }

  facturados(tipo: string) {
    const params = new HttpParams()
      .set('facturados', tipo)
      .set('sucursal', this.sucursal.id);
    return this.http.get<Venta[]>(this.apiUrl, {params: params})
  }

  facturar(venta: Venta) {
    const url = `${this.apiUrl}/facturar/${venta.id}`;
    return this.http.put(url, venta);
  }

  print(id: string) {
    const url = `${this.apiUrl}/print`;
    const params = new HttpParams()
      .set('ID', id);
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

  cancelar(factura: Venta): Observable<Venta> {
    console.log('Cancelando en el sistema la factura: ', factura);
    const url = `${this.apiUrl}/cancelar/${factura.id}`;
    return this.http.put<Venta>(url, factura);
  }

}

