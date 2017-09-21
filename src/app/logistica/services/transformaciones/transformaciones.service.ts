import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { environment } from 'environments/environment';
import { Transformacion } from "app/logistica/models/transformacion";


@Injectable()
export class TransformacionesService {

  readonly apiUrl = environment.apiUrl + '/inventario/transformaciones';

  constructor(private http: HttpClient) { }

  list(documento = null, comentario = null): Observable<Transformacion[]> {
    let params = new HttpParams();
    if (documento) {
      params = params.set('documento', documento)
    } 
    return this.http.get<Transformacion[]>(this.apiUrl, {params: params})
      .shareReplay();
  }
  
  save(transformacion: Transformacion) {
    return this.http.post(this.apiUrl, transformacion);
  }

  update(transformacion: Transformacion) {
    return this.http.put(this.apiUrl+'/'+transformacion.id, transformacion);
  }

}
