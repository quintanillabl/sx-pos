import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { Banco } from '../models/banco';
import { CuentaDeBanco } from '../models/cuentaDeBanco';


@Injectable()
export class BancoService {

  readonly apiUrl = environment.apiUrl + '/tesoreria/bancos';

  constructor(private http: HttpClient) { }

  list(): Observable<Banco[]> {
    return this.http.get<Banco[]>(this.apiUrl)
  }

  findCuentasBancarias(): Observable<CuentaDeBanco[]> {
    const params = new HttpParams()
    .set('activa', 'activa')
    .set('disponibleEnVenta', 'disponibleEnVenta');
    const url = `${environment.apiUrl}/tesoreria/cuentas`;
    return this.http.get<CuentaDeBanco[]>(url, {params: params})
  }

}

