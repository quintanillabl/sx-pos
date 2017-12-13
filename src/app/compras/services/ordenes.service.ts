import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { Compra, Proveedor, Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


import { environment} from 'environments/environment';

@Injectable()
export class OrdenesService {

  readonly apiUrl = environment.apiUrl + '/compras';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) { 
    this.sucursal = configService.getCurrentSucursal();
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
    const url = `${environment.apiUrl}/proveedores/${proveedor.id}/productos`;
    return this.http.get<Array<any>>(url, {params: params});
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

}
