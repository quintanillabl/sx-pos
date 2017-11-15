import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import * as _ from 'lodash';

import { environment } from 'environments/environment';
import {Sucursal} from 'app/models';

import {Store} from '@ngrx/store';
import * as fromRoot from 'app/reducers';


@Injectable()
export class ReportesService {

  readonly apiUrl = environment.apiUrl;

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private store: Store<fromRoot.State>
  ) {
    this.store.select(fromRoot.getSucursal).subscribe( s => this.sucursal = s);
  }


  runReport(reportUrl: string, reportParams: {}) {

    reportParams['SUCURSAL'] = this.sucursal.id;
    // reportParams['CHOFER'] = '6f8b7d4a-aed7-11e7-b1f8-b4b52f67eab0';
    // reportParams['FECHA'] = new Date().toISOString()
    console.log('Ejecutando reporte de entragas por chofer con: ', reportParams);
    const url = `${this.apiUrl}/${reportUrl}`;
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

}
