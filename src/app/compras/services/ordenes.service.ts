import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Compra, Proveedor, Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class OrdenesService {

  private apiUrl: string

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { 
    this.sucursal = configService.getCurrentSucursal();
    this.apiUrl = configService.buildApiUrl('compras');
  }

  buscarPendientes(folio?: string) {
    return this.list({pendientes: true, folio: folio})
  }

  list(filtro: {pendientes: boolean, folio?: string} ): Observable<Compra[]> {
    let params = new HttpParams()
      .set('sucursal', this.sucursal.id);
    if (filtro.pendientes) {
      params = params.set('pendientes','pendientes');
    }
    if(filtro.folio) {
      params = params.set('folio',filtro.folio);
    }
    return this.http.get<Compra[]>(this.apiUrl,{params: params});
  }

  get(id: string): Observable<Compra> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Compra>(url);
  }

  save(compra: Compra) {
    compra.folio = 0;
    return this.http.post(this.apiUrl, compra);
  }

  buscarProductos(proveedor: Proveedor){
    let params = new HttpParams()
      .set('activos','activos');
    const endpoint = `proveedores/${proveedor.id}/productos`;
    const url = this.configService.buildApiUrl(endpoint);
    return this.http.get<Array<any>>(url, {params: params});
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  print(compra: Compra) {
    //const endpoint = `/print/${compra.id}`;
    const endpoint = `compras/print/${compra.id}`;
    const url = this.configService.buildApiUrl(endpoint);
    const headers = new HttpHeaders().set('Content-type' , 'application/pdf');
    return this.http.get(
      url, {
        headers: headers,
        responseType: 'blob'
      }
    );
  }

}
