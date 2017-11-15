import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'environments/environment';
import { AppConfig } from 'app/models/appConfig';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class ConfigService {

  readonly apiUrl = environment.apiUrl + '/config';

  constructor(
    private http: HttpClient,
  ) {}

  get(): Observable<AppConfig> {
    const url = `${this.apiUrl}`;
    return this.http.get<AppConfig>(url);
  }

}
