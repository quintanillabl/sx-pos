import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { Embarque } from 'app/logistica/models/embarque';
import { Venta } from 'app/models';
import { Envio } from 'app/logistica/models/envio';
import { VentaDet } from 'app/models/ventaDet';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';

@Injectable()
export class EmbarqueService {

  readonly apiUrl = environment.apiUrl + '/embarques/embarques';

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
  {
    this.sucursal = configService.getCurrentSucursal();
  }

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

  documentosEnTransito() {
    const url = `${this.apiUrl}/documentosEnTransito`;
    let params = new HttpParams()
      .set('sucursal', this.sucursal.id)
    return this.http.get<Array<any>>(url, {params: params})
  }

  enviosPendientes() {
    const url = `${this.apiUrl}/enviosPendientes`;
    let params = new HttpParams()
      .set('sucursal', this.sucursal.id)
    return this.http.get<Array<any>>(url, {params: params})
  }

  save(embarque: Embarque) {
    return this.http.post(this.apiUrl, embarque);
  }

  update(embarque: Embarque) {
    const url = `${this.apiUrl}/${embarque.id}`;
    return this.http.put(url, embarque);
  }

  registrarSalida(embarque: Embarque) {
    const url = `${this.apiUrl}/registrarSalida/${embarque.id}`;
    return this.http.put(url, embarque);
  }
  registrarRegreso(embarque: Embarque): Observable<Embarque> {
    const url = `${this.apiUrl}/registrarRegreso/${embarque.id}`;
    return this.http.put<Embarque>(url, embarque);
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
      // console.log('Buscando documento con: ', params);
    const url = `${this.apiUrl}/buscarDocumento`;
    return this.http.get<any>(url, {params: params})
  }

  buscarVenta( sucursal, tipo, documento, fecha ) {
    let params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha',fecha)
      .set('documento', documento)
      .set('tipo',tipo);
    const url = `${this.apiUrl}/buscarVenta`;
    return this.http.get<Venta>(url, {params: params})
  }

  buscarPartidasDeVenta( sucursal, tipo, documento, fecha ) {
    let params = new HttpParams()
      .set('sucursal', sucursal)
      .set('fecha',fecha)
      .set('documento', documento)
      .set('tipo',tipo);
    const url = `${this.apiUrl}/buscarPartidasDeVenta`;
    return this.http.get<VentaDet>(url, {params: params})
  }

  buscarTrasladosPendientes(): Observable<any> {
    let params = new HttpParams()
      .set('sucursal', this.sucursal.id);
    const url = `${this.apiUrl}/buscarTrasladosPendientes`;
    return this.http.get(url, {params: params})
  }

  buscarDevolucionesPendientes(): Observable<any> {
    let params = new HttpParams()
      .set('sucursal', this.sucursal.id);
    const url = `${this.apiUrl}/buscarDevolucionesPendientes`;
    return this.http.get(url, {params: params})
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

    reportParams['sucursal'] = this.sucursal.id;
    // reportParams['CHOFER'] = '6f8b7d4a-aed7-11e7-b1f8-b4b52f67eab0';
    // reportParams['FECHA'] = new Date().toISOString()
    console.log('Ejecutando reporte de entragas por chofer con: ', reportParams);
    const url = `${this.apiUrl}/reporteDeEntregasPorChofer`;
    let params = new HttpParams()
    if (reportParams) {
      _.forIn(reportParams, (value, key) => {
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

  getEnvio(id: string): Observable<Envio> {
    // const url = environment.apiUrl + '/embarques/envios';
    const url = `${environment.apiUrl}/embarques/envios/${id}`;
    return this.http.get<Envio>(url)
  }

  updateEnvio(envio) {
    const url = `${environment.apiUrl}/embarques/envios/${envio.id}`;
    return this.http.put(url, envio);
  }

  asignarFacturas(embarque, condiciones) {
    const data = {
      embarque: embarque,
      condiciones: condiciones
    };
    const url = `${this.apiUrl}/asignarFacturas`;
    return this.http.put(url, data);    
  }

}
