import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Compra } from '../../models/compra';
import { environment} from '../../../environments/environment';

@Injectable()
export class OrdenesService {

  readonly apiUrl = environment.apiUrl + '/compras';

  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  constructor(private http: HttpClient) { }

  buscarPendientes(folio?: string) {
    return this.list({pendientes: true, folio: folio})
  }

  list(filtro: {pendientes: boolean, folio?: string} ): Observable<Compra[]> {
    let params = new HttpParams()
      .set('sucursal', this.sucursal.id);
    if (filtro.pendientes) {
      params = params.set('pendientes','pendientes');
    }
    if(filtro.folio) {
      params = params.set('folio',filtro.folio);
    }
    return this.http.get<Compra[]>(this.apiUrl,{params: params});
  }

  get(id: string): Observable<Compra> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Compra>(url);
  }

  save(compra: Compra) {
    compra.folio = 0;
    return this.http.post(this.apiUrl, compra);
  }

}
