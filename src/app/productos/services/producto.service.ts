import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { environment } from "environments/environment";
import { Producto } from "@siipapx/models";

@Injectable()
export class ProductoService {

  readonly apiUrl = environment.apiUrl + '/productos';

  constructor(
    private http: HttpClient
  ) { }

  list(term: string, filter:{ [key:string]: any; } = {}): Observable<Producto[]> {
    console.log('Buscando productos.....', term);
    console.log('Usando filtro: ', filter);
    let params = new HttpParams()
      .set('term', term);
    if (filter.activos === true) {
      params = params.set('activos','activos')
    } if( filter.deLinea === true) {
      params = params.set('deLinea','deLinea')  
    }
    return this.http.get<Producto[]>(this.apiUrl, {params: params});
  }
}


