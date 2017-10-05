import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { RecepcionDeCompra } from 'app/logistica/models/recepcionDeCompra';
import { Compra } from "app/models";


@Injectable()
export class ComsService {

  readonly apiUrl = environment.apiUrl + '/compras/recepciones';

  constructor(
    private http: HttpClient,
  ) { }
  
  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  get(id: string): Observable<RecepcionDeCompra> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<RecepcionDeCompra>(url)
  }

  list(filter?: any): Observable<RecepcionDeCompra[]> {
    let params = new HttpParams().set('sucursal',this.sucursal.id);
    if (filter.documento) {
      params = params.set('documento', filter.documento);
    }
    if( filter.remision) {
      params = params.set('remision', filter.remisio);
    }
    return this.http.get<RecepcionDeCompra[]>(this.apiUrl, {params: params})
  }
  
  save(com: RecepcionDeCompra) {
    return this.http.post(this.apiUrl, com);
  }

  update(com: RecepcionDeCompra) {
    return this.http.put(this.apiUrl+'/'+com.id, com);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  inventariar(com: RecepcionDeCompra) {
    const url = `${this.apiUrl}/${com.id}`;
    return this.http.put(url, com, {
      params: new HttpParams().set('inventariar','inventariar')
    });
  }

  buscarCompra( filtro: {sucursal: string; documento: string} ){
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    const url = `${this.apiUrl}/buscarCompra`;
    return this.http.get<Compra[]>(url, {params: params})
  }

}
