import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Existencia, Producto, Sucursal } from '@siipapx/models';

@Injectable()
export class ExistenciasService {

  readonly apiUrl = environment.apiUrl + '/existencias';

  constructor(
    private http: HttpClient
  ) { }

  buscarExistencias(producto: Producto, fecha: Date = new Date()) {
    const year = fecha.getFullYear();
    const month = fecha.getMonth() + 1;
    const url = `${this.apiUrl}/${producto.id}/${year}/${month}`;
    // console.log(`Buscando existencias del producto ${producto.clave} para el ${month} - ${year}`);
    // console.log('URL: ', url);
    return this.http.get<Existencia[]>(url);
  }



}



