import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { environment } from 'environments/environment';
import { DevolucionDeVenta } from 'app/logistica/models/devolucionDeVenta';
import { Venta } from 'app/models';
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class DevolucionesService {

  readonly apiUrl = environment.apiUrl + '/inventario/devoluciones';

  sucursal: Sucursal;
  
  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
  {
    this.sucursal = configService.getCurrentSucursal();
  }

  get(id: string): Observable<DevolucionDeVenta> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<DevolucionDeVenta>(url)
  }

  list(filter: any): Observable<DevolucionDeVenta[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (filter.documento) {
      params = params.set('documento', filter.documento)
    }
    return this.http.get<DevolucionDeVenta[]>(this.apiUrl, {params: params})
  }

  save(devolucion: DevolucionDeVenta) {
    return this.http.post(this.apiUrl, devolucion);
  }

  update(devolucion: DevolucionDeVenta) {
    const url = `${this.apiUrl}/${devolucion.id}`;
    return this.http.put(url, devolucion);
  }

  delete(id: string) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  inventariar(dev: DevolucionDeVenta) {
    const url = `${this.apiUrl}/${dev.id}`;
    return this.http.put(url, dev, {
      params: new HttpParams().set('inventariar', 'inventariar')
    });
  }

  buscarVenta( filtro: {sucursal: string; tipo: string, documento: string, fecha?: string} ) {
    let params = new HttpParams();
    _.forIn(filtro, (value, key) => {
      params = params.set(key, value);
    });
    const url = `${this.apiUrl}/buscarVenta`;
    return this.http.get<Venta[]>(url, {params: params})
  }
  

}
