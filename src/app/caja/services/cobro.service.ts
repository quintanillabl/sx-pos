import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Cobro } from 'app/models/cobro';

@Injectable()
export class CobroService {

  readonly apiUrl = environment.apiUrl + '/cxc/cobro';

  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Cobro> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Cobro>(url)
  }

  peidnetes(documento?: string ) {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    return this.http.get<Cobro[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<Cobro[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
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

}
