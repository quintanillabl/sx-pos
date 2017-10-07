import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import {SolicitudDeTraslado} from 'app/logistica/models/solicitudDeTraslado';


@Injectable()
export class SolsService {

  readonly apiUrl = environment.apiUrl + '/inventario/sols';

  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  constructor(private http: HttpClient) { }

  get(id: string): Observable<SolicitudDeTraslado> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SolicitudDeTraslado>(url)
  }

  peidnetesDeAtender(documento?: string ) {
    let params = new HttpParams().set('sucursalAtiende', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<SolicitudDeTraslado[]>(this.apiUrl, {params: params})
  }

  list(documento?: string ): Observable<SolicitudDeTraslado[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<SolicitudDeTraslado[]>(this.apiUrl, {params: params})
  }

  save(sol: SolicitudDeTraslado) {
    return this.http.post(this.apiUrl, sol);
  }

  update(sol: SolicitudDeTraslado) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  inventariar(dev: SolicitudDeTraslado) {
    const url = `${this.apiUrl}/${dev.id}`;
    return this.http.put(url, dev, {
      params: new HttpParams().set('inventariar', 'inventariar')
    });
  }

  buscarSolicitudPendiente( filtro: {sucursal: string; documento: string} ): Observable<SolicitudDeTraslado> {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/buscarSolicitudPendiente`;
    return this.http.get<SolicitudDeTraslado>(url, {params: params})
  }

}
