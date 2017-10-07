import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import {Sector} from 'app/logistica/models/sector';

@Injectable()
export class SectoresService {

  readonly apiUrl = environment.apiUrl + '/inventario/sectores';

  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Sector> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Sector>(url)
  }

  peidnetes(documento?: string ) {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Sector[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<Sector[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Sector[]>(this.apiUrl, {params: params})
  }

  save(sol: Sector) {
    return this.http.post(this.apiUrl, sol);
  }

  update(sol: Sector) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}
