import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import {SolicitudDeDeposito} from 'app/ventas/models/solicitudDeDeposito';


@Injectable()
export class SolicitudesService {

  readonly apiUrl = environment.apiUrl + '/tesoreria/solicitudes';

  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  constructor(private http: HttpClient) { }

  get(id: string): Observable<SolicitudDeDeposito> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<SolicitudDeDeposito>(url)
  }

  pendientes() {
    const params = new HttpParams()
      .set('sucursal', this.sucursal.id)
      .set('pendientes', 'pendientes');
    const url = `${this.apiUrl}`
    return this.http.get<SolicitudDeDeposito[]>(url, {params: params})
  }

  list(documento?: string ): Observable<SolicitudDeDeposito[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<SolicitudDeDeposito[]>(this.apiUrl, {params: params})
  }

  save(sol: SolicitudDeDeposito): Observable<SolicitudDeDeposito> {
    return this.http.post<SolicitudDeDeposito>(this.apiUrl, sol);
  }

  update(sol: SolicitudDeDeposito): Observable<SolicitudDeDeposito> {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put<SolicitudDeDeposito>(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

}
