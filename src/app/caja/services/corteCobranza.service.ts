import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { CorteCobranza } from 'app/caja/models/corteCobranza';
import { Sucursal } from 'app/models';

import {Store} from '@ngrx/store';
import * as fromRoot from 'app/reducers';

@Injectable()
export class CorteCobranzaService {

  readonly apiUrl = environment.apiUrl + '/tesoreria/corteCobranza';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getSucursal).subscribe( s => this.sucursal = s);
  }

  get(id: string): Observable<CorteCobranza> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<CorteCobranza>(url)
  }

  list(): Observable<CorteCobranza[]> {
    const params = new HttpParams().set('sucursal',this.sucursal.id);
    return this.http.get<CorteCobranza[]>(this.apiUrl, {params: params})
  }

  save(corte: CorteCobranza) {
    corte.sucursal = this.sucursal
    return this.http.post(this.apiUrl, corte);
  }

  update(corte: CorteCobranza) {
    return this.http.put(this.apiUrl+'/'+corte.id, corte);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  cambioDeCheque(cambio: any) {
    cambio.sucursal = this.sucursal
    const url =  `${environment.apiUrl}/cxc/cobro/cambioDeCheque`
    return this.http.post(url, cambio);
  }

}