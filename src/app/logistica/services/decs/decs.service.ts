import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { DevolucionDeCompra } from 'app/logistica/models/devolucionDeCompra';


@Injectable()
export class DecsService {

  readonly apiUrl = environment.apiUrl + '/inventario/decs';

  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }


  constructor(private http: HttpClient) { }

  get(id: string): Observable<DevolucionDeCompra> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<DevolucionDeCompra>(url)
  }

  list(): Observable<DevolucionDeCompra[]> {
    let params = new HttpParams().set('sucursal',this.sucursal.id);
    return this.http.get<DevolucionDeCompra[]>(this.apiUrl, {params: params})
  }
  
  save(devolucion: DevolucionDeCompra) {
    return this.http.post(this.apiUrl, devolucion);
  }

  update(devolucion: DevolucionDeCompra) {
    return this.http.put(this.apiUrl+'/'+devolucion.id, devolucion);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  inventariar(dev: DevolucionDeCompra) {
    const url = `${this.apiUrl}/${dev.id}`;
    return this.http.put(url, dev, {
      params: new HttpParams().set('inventariar','inventariar')
    });
  }

  buscarCompra( filtro: {sucursal: string; tipo: string, documento: string, fecha?: string} ){
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    const url = `${this.apiUrl}/buscarCompra`;
    return this.http.get<any[]>(url, {params: params})
  }

}
