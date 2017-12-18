import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { environment } from 'environments/environment';
import { AppConfig } from 'app/models/appConfig';
import { Sucursal } from 'app/models';

@Injectable()
export class ConfigService {

  private config: AppConfig;

  private apiUrl: string;

  private configurationUrl;

  constructor(
    private http: HttpClient,
  ) {
    this.configurationUrl = 'assets/api-config.json';
  }

  get(): Observable<AppConfig> {
    const url = `${this.getApiUrl()}/config`;
    return this.http.get<AppConfig>(url).shareReplay();
  }

  getAppConfig() {
    return this.config;
  }

  getCurrentSucursal(): Sucursal {
    return this.config.sucursal;
  }

  getApiUrl() {
    return this.apiUrl;
  }

  load(): Promise<any> {
    console.log('Cargando configuracion en: ', this.configurationUrl);
    const promise = this.http.get(this.configurationUrl)
      .pluck('apiUrl')
      .switchMap((apiUrl: string) => {
        this.apiUrl = apiUrl;
        return this.http.get<AppConfig>(apiUrl + '/config')
      })
      .catch( error => {
        console.error('Error al cargar AppConfig from ', error)
        return Observable.of(error);
      })
      .toPromise();

    promise.then(config => {
      this.config = config;
      // localStorage.setItem('appConfig', JSON.stringify(config));
      console.log('Configuración: ', this.config);
    });
    return promise;
  }

  private getProperty(property: string): any {
    //noinspection TsLint
    if (!this.config) {
      throw new Error(`Attempted to access configuration property before configuration data was loaded,
      please double check that 'APP_INITIALIZER is properly implemented.`);
    }

    if (!this.config[property]) {
      throw new Error(`
      Required property ${property} was not defined within the configuration object. Please double check the
      assets/config.json file`);
    }
    return this.config[property];
  }

}
