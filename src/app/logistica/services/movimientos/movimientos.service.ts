import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from 'environments/environment';
import { Movimiento } from "@siipapx/logistica/models/movimiento";


@Injectable()
export class MovimientosService {

  readonly apiUrl = environment.apiUrl + '/inventario/movimientos';

  constructor(private http: HttpClient) { }

  list(documento = null, comentario = null): Observable<Movimiento[]> {
    let params = new HttpParams();
    if (documento) {
      params = params.set('documento', documento)
    } if(comentario) {
      params = params.set('comentario', comentario)  
    }
    return this.http.get<Movimiento[]>(this.apiUrl, {params: params})
      .shareReplay();
  }
  
  save(movimiento: Movimiento) {
    return this.http.post(this.apiUrl, movimiento);
  }

  update(movimiento: Movimiento) {
    return this.http.put(this.apiUrl+'/'+movimiento.id, movimiento);
  }

}
