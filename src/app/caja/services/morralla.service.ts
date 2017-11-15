import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Morralla } from 'app/caja/models/morralla';
import { Sucursal } from 'app/models';

import {Store} from '@ngrx/store';
import * as fromRoot from 'app/reducers';


@Injectable()
export class MorrallaService {

  readonly apiUrl = environment.apiUrl + '/tesoreria/morralla';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getSucursal).subscribe( s => this.sucursal = s);
  }

  get(id: string): Observable<Morralla> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Morralla>(url)
  }

  list(): Observable<Morralla[]> {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Morralla[]>(this.apiUrl, {params: params})
  }

  save(corte: Morralla) {
    corte.sucursal = this.sucursal
    return this.http.post(this.apiUrl, corte);
  }

  update(corte: Morralla) {
    const url = `${this.apiUrl}/${corte.id}`;
    return this.http.put(url, corte);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}

