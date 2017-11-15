

import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';

import * as fromAuth from '../reducers';
import * as fromRoot from '../../reducers';
import {Sucursal} from 'app/models';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  authentication$: Observable<any>;
  private token; string

  sucursal$: Observable<Sucursal>;
  sucursal: Sucursal;

  constructor(private store: Store<fromAuth.State>) {

    this.authentication$ = store.select(fromAuth.getAuthentication);


    this.authentication$.subscribe(auth => {
      this.token = auth.access_token;
    });

    this.sucursal$ = store.select(fromRoot.getSucursal);
    this.sucursal$.subscribe( sucursal => {
      this.sucursal = sucursal
    });
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {
    // const params = this.sucursal === null ? req.params : req.params.append('SUCURSAL', this.sucursal.id );
    const cloneRequest = req.clone({
      headers: req.headers.set('Authorization', `Bearer ${this.token}`),
    });
    return next.handle(cloneRequest);
  }

}
