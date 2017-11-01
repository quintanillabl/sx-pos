import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Venta, Sucursal, Producto } from 'app/models';

@Injectable()
export class PedidosService {

  readonly apiUrl = environment.apiUrl + '/ventas';

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

}

