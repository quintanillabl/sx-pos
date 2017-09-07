import { Injectable } from '@angular/core';
import { of } from 'rxjs/observable/of';
import {HttpClient} from '@angular/common/http';

import * as fromAuth from '../reducers';
import { User, Authenticate } from '../models/user';
import {environment} from '../../../environments/environment';
import {Store} from '@ngrx/store';

@Injectable()
export class AuthService {

  private readonly url = environment.apiUrl + '/login';

  constructor(
    private http: HttpClient,
    private store: Store<fromAuth.State>) {}

  login(auth: Authenticate) {
    return this.http.post(this.url, auth)
  }

  logout() {
    return of(true);
  }

  getCurrentUser() {
    return this.store
      .select(fromAuth.getAuthentication)
  }

  getUser() {
    return this.store.select(fromAuth.getCurrentUser);
  }
}
