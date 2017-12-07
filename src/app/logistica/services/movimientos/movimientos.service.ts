import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from 'environments/environment';
import { Movimiento } from "@siipapx/logistica/models/movimiento";
import { Sucursal } from 'app/models';
import { ConfigService } from 'app/core/services/config.service';


@Injectable()
export class MovimientosService {

  readonly apiUrl = environment.apiUrl + '/inventario/movimientos';

  sucursal: Sucursal;

  constructor(
    private http: HttpClient,
    private configService: ConfigService) 
    {
      this.sucursal = configService.getCurrentSucursal();
     }

  list(documento = null, comentario = null): Observable<Movimiento[]> {
    let params = new HttpParams().set('sucursal', this.sucursal.id);
    if (documento) {
      params = params.set('documento', documento)
    } if(comentario) {
      params = params.set('comentario', comentario)
    }
    return this.http.get<Movimiento[]>(this.apiUrl, {params: params});
  }

  save(movimiento: Movimiento) {
    movimiento.sucursal = this.sucursal;
    return this.http.post(this.apiUrl, movimiento);
  }

  update(movimiento: Movimiento) {
    return this.http.put(this.apiUrl+'/'+movimiento.id, movimiento);
  }

  get(id: string): Observable<Movimiento> {
    let url = `${this.apiUrl}/${id}`;
    return this.http.get<Movimiento>(url)
    .shareReplay();
  }

  delete(id: string) {
    return this.http.delete(this.apiUrl+'/'+id);
  }

  inventariar(mov: Movimiento) {
    const url = `${this.apiUrl}/${mov.id}`;
    return this.http.put(url, mov, {
      params: new HttpParams().set('inventariar','inventariar')
    });
  }

  print(id: string){
    console.log('Printing id: ', id);
    const url = environment.apiUrl + '/report';
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


}
