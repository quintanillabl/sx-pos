import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import * as _ from 'lodash';

import { environment } from 'environments/environment';
import {Cliente, Sucursal} from 'app/models';
import {Observable} from 'rxjs/Observable';



@Injectable()
export class ClienteService {

  readonly apiUrl = environment.apiUrl + '/clientes';

  sucursal = { id: '402880fc5e4ec411015e4ec64e70012e', nombre: 'TACUBA' };

  constructor(
    private http: HttpClient,
  ) { }

  get(id: string): Observable<Cliente> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cliente>(url)
  }

  list(term: string = '%'): Observable<Cliente[]> {
    const params = new HttpParams()
      .set('term', term);
    return this.http.get<Cliente[]>(this.apiUrl, {params: params})
  }

  save(com: Cliente) {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.post(this.apiUrl, com, {params: params});
  }

  update(com: Cliente) {
    const url = `${this.apiUrl}/${com.id}`;
    return this.http.put(url, com);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}

