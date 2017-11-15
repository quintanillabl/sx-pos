import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { FondoFijo } from 'app/caja/models/fondoFijo';
import { Sucursal } from 'app/models';

import {Store} from '@ngrx/store';
import * as fromRoot from 'app/reducers';



@Injectable()
export class FondoFijoService {

  readonly apiUrl = environment.apiUrl + '/tesoreria/fondoFijo';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getSucursal).subscribe( s => this.sucursal = s);
  }

  get(id: string): Observable<FondoFijo> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<FondoFijo>(url)
  }

  list(): Observable<FondoFijo[]> {
    let params = new HttpParams().set('sucursal',this.sucursal.id);
    return this.http.get<FondoFijo[]>(this.apiUrl, {params: params})
  }

  save(corte: FondoFijo) {
    corte.sucursal = this.sucursal
    return this.http.post(this.apiUrl, corte);
  }

  update(corte: FondoFijo) {
    return this.http.put(this.apiUrl+'/'+corte.id, corte);
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

}
