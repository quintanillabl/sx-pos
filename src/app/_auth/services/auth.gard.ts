import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as Auth from '../actions/auth.actions';
import * as fromAuth from '../reducers';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private store: Store<fromAuth.State>) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
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
