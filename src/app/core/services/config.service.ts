import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { AppConfig } from 'app/models/appConfig';
import { Sucursal } from 'app/models';

@Injectable()
export class ConfigService {

  readonly apiUrl = environment.apiUrl + '/config';

  private url = null;

  constructor(
    private http: HttpClient,
  ) {}

  get(): Observable<AppConfig> {
    const url = `${this.apiUrl}`;
    return this.http.get<AppConfig>(url);
  }

  getCurrentSucursal(): Sucursal {
    const appConfig: AppConfig = JSON.parse(localStorage.getItem('appConfig')) ;
    return appConfig.sucursal;
  }

  getApiUrl() {
    return this.url;
  }

  load(): Promise<any> {
    return this.http.get('assets/api-config.json')
      .pluck('apiUrl')
      .toPromise()
      .then(data => {
        this.url = data;
        console.log('POS ApiUrl: ', data);
        return data;
      })
  }

}
