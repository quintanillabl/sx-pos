

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromAuth from '../reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authentication$: Observable<any>;
  private token; string

  constructor(private store: Store<fromAuth.State>) {

    this.authentication$ = store.select(fromAuth.getAuthentication);

    this.authentication$.subscribe(auth => {
      this.token = auth.access_token;
    });
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    const cloneRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.token}`)
    });
    return next.handle(cloneRequest);
  }

}
