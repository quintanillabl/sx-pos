import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { Embarque } from 'app/logistica/models/embarque';
import { Venta } from 'app/models';

@Injectable()
export class EmbarqueService {

  readonly apiUrl = environment.apiUrl + '/embarques/embarques';

  sucursal = {
    id: '402880fc5e4ec411015e4ec64e70012e',
    nombre: 'TACUBA'
  }

  constructor(private http: HttpClient) { }

  get(id: string): Observable<Embarque> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Embarque>(url)
  }

  peidnetes(documento?: string ) {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params =  params.set('documento', documento);
    }
    return this.http.get<Embarque[]>(this.apiUrl, {params: params})
  }

  list(filter = {} ): Observable<Embarque[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (filter) {
      _.forIn(filter, (value, key) =>{
        params = params.set(key, value.toString());
      });
    }
    return this.http.get<Embarque[]>(this.apiUrl, {params: params})
  }

  transito(): Observable<Embarque[]> {
    let params = new HttpParams()
      .set('sucursal', this.sucursal.id)
      .set('transito','transito');
    return this.http.get<Embarque[]>(this.apiUrl, {params: params})
  }

  save(sol: Embarque) {
    return this.http.post(this.apiUrl, sol);
  }

  update(sol: Embarque) {
    const url = `${this.apiUrl}/${sol.id}`;
    return this.http.put(url, sol);
  }

  registrarSalida(sol: Embarque) {
    const url = `${this.apiUrl}/registrarSalida/${sol.id}`;
    return this.http.put(url, sol);
  }
  registrarRegreso(sol: Embarque) {
    const url = `${this.apiUrl}/registrarSalida/${sol.id}`;
    return this.http.put(url, sol);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  buscarDocumento( sucursal, tipo, documento, fecha ) {
    let params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha',fecha)
      .set('documento', documento)
      .set('tipo',tipo);
    const url = `${this.apiUrl}/buscarDocumento`;
    return this.http.get<any>(url, {params: params})
  }

  print(id: string){
    console.log('Printing id: ', id);
    const url = `${this.apiUrl}/print`;
    let params = new HttpParams()
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

  reporteDeEntregasPorChofer(reportParams: {}) {
    
    reportParams['SUCURSAL'] = this.sucursal.id;
    reportParams['CHOFER'] = '6f8b7d4a-aed7-11e7-b1f8-b4b52f67eab0';
    reportParams['FECHA'] = new Date().toISOString()

    const url = `${this.apiUrl}/reporteDeEntregasPorChofer`;
    let params = new HttpParams()
    if (reportParams) {
      _.forIn(reportParams, (value, key) =>{
        params = params.set(key, value.toString());
      });
    }
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
