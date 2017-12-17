import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as config from './config.actions';
import {ConfigService} from 'app/core/services/config.service';
import * as Auth from 'app/_auth/actions/auth.actions';
import {AppConfig} from 'app/models/appConfig';


@Injectable()
export class ConfigEffects {

  @Effect() fetchSucursal$ = this.actions$
    .ofType<Auth.LoginSuccess>(Auth.LOGIN_SUCCESS)
    .do((action: Auth.LoginSuccess) => {
      // console.log('Looking up configuration data for:', action.payload.username);
    })
    .switchMap( () =>
      this.service.get()
        .do(appConfig => this.storeConfig(appConfig))
        .map(appConfig => new config.SetSucursalSuccessAction(appConfig))
        .catch(error => Observable.of({type: 'HTTP_ERROR', payload: error}))
    );


  constructor(
    private actions$: Actions,
    private service: ConfigService,
  ) {}

  private storeConfig(appConfig: AppConfig) {
    // console.log('Saving in local storage ', appConfig)
    localStorage.setItem('appConfig', JSON.stringify(appConfig));
  }
}
