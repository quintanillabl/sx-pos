import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Cobro } from 'app/models/cobro';
import {Cliente, Sucursal} from 'app/models';

import {Store} from '@ngrx/store';
import * as fromRoot from 'app/reducers';

@Injectable()
export class CobroService {

  readonly apiUrl = environment.apiUrl + '/cxc/cobro';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getSucursal).subscribe( s => this.sucursal = s);
  }

  get(id: string): Observable<Cobro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cobro>(url)
  }

  peidnetes(documento?: string ) {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Cobro[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<Cobro[]> {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Cobro[]>(this.apiUrl, {params: params})
  }

  save(sol: Cobro): Observable<Cobro> {
    console.log('Salvando cobro: ', sol);
    return this.http.post<Cobro>(this.apiUrl, sol);
  }

  update(sol: Cobro) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  buscarDisponibles(cliente: Cliente): Observable<Cobro[]> {
    const url = `${this.apiUrl}/buscarDisponibles/${cliente.id}`;
    return this.http.get<Cobro[]>(url);
  }

}
