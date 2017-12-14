import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { SolicitudDeTraslado } from 'app/logistica/models/solicitudDeTraslado';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class SolicitudesService {

  readonly apiUrl = environment.apiUrl + '/inventario/sols';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService) {
    this.sucursal = configService.getCurrentSucursal();
  }

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

  list(documento: number = 0 ): Observable<SolicitudDeTraslado[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento > 0) {
      params =  params.set('documento', documento.toString());
    }
    return this.http.get<SolicitudDeTraslado[]>(this.apiUrl, {params: params})
  }

  pendientes(): Observable<SolicitudDeTraslado[]> {
    const params = new HttpParams().set('sucursal', this.sucursal.id);
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

  print(id: string) {
    const url = `${this.apiUrl}/print`;
    const params = new HttpParams()
      .set('ID', id);
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        params: params,
        responseType: 'blob'
      }
    );
  }

}
