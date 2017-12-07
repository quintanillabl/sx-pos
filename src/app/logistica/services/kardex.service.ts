import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { Inventario } from 'app/logistica/models/inventario';
import { ConfigService } from 'app/core/services/config.service';
import { Sucursal } from 'app/models';

@Injectable()
export class KardexService {

  readonly apiUrl = environment.apiUrl + '/inventario';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) 
  {
    this.sucursal = configService.getCurrentSucursal();
  }
  
  list(producto?: string ): Observable<Inventario[]> {
    let params = new HttpParams().set('sucursal',this.sucursal.id);
    if(producto){
      params =  params.set('producto', producto);
    }
    return this.http.get<Inventario[]>(this.apiUrl, {params: params})
  }

  buscar( filtro: any ): Observable<Inventario>{
    let params = new HttpParams();
    _.forIn(filtro, (value, key) =>{
      params = params.set(key,value);
    });
    const url = `${this.apiUrl}/find`;
    return this.http.get<Inventario>(url, {params: params})
  }

  print(id: string) {
    const url = `${this.apiUrl}/printKardex`;
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
