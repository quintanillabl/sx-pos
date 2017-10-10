import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Conteo } from 'app/logistica/models/conteo';

@Injectable()
export class ConteosService {

  readonly apiUrl = environment.apiUrl + '/inventario/conteos';

  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Conteo> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Conteo>(url)
  }

  peidnetes(documento?: string ) {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Conteo[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<Conteo[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Conteo[]>(this.apiUrl, {params: params})
  }

  save(sol: Conteo) {
    return this.http.post(this.apiUrl, sol);
  }

  update(sol: Conteo) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  generarConteo() {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
    const url = `${this.apiUrl}/generarConteo`;
    return this.http.post(url, {params: params})
  }

  generarExistencias() {
    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/generarExistencias`;
    return this.http.get(url, {params: params})
  }

  limpiarExistencias() {
    const params = new HttpParams().set('id', this.sucursal.id);
    const url = `${this.apiUrl}/limpiarExistencias`;
    return this.http.get(url, {params: params});
  }

}
