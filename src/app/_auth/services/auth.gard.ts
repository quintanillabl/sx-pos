import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Auth from '../actions/auth.actions';
import * as fromAuth from '../reducers';
import { AppConfig } from 'app/models/appConfig';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const appConfig: AppConfig = JSON.parse(localStorage.getItem('appConfig')) ;
    if (appConfig == null) {
      console.log('Sin AppConfig...');
      this.store.dispatch(new Auth.LoginRedirect({ queryParams: { returnUrl: state.url }}));
      return Observable.of(false);
    }
    
    return this.store.select(fromAuth.getAuthentication)
      .take(1)
      .map(authed => {
        if (!authed) {
          this.store.dispatch(new Auth.LoginRedirect({ queryParams: { returnUrl: state.url }}));
          return false;
        }
        return true;
    });
  }
}
