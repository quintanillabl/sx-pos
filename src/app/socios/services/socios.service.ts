import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {Socio} from '../models/socio';
import {environment} from '../../../environments/environment';

@Injectable()
export class SociosService {

  readonly url = environment.apiUrl + '/socios';

  constructor(private http: HttpClient) { }

  list(term: string = ''): Observable<Socio[]> {
    const params = new HttpParams()
      .set('max', '10')
      .set('sort', 'lastUpdated')
      .set('order', 'desc')
      .set('term', term);
    return this.http.get<Socio[]>(this.url, {params: params});
  }

  getFoto(socioId: string, fotoId: string): Observable<any> {
    const fotoUrl = `${this.url}/${socioId}/foto/${fotoId}`;
    return this.http.get(fotoUrl);
  }

  getSocioImage(socio: Socio): Observable<any> {
    if (socio.foto === undefined) {
      return Observable.of();
    } else {
      return this.getFoto(socio.id, socio.foto.id).pluck('imagen');
    }
  }

}
