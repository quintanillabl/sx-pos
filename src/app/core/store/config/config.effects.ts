import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Observable } from 'rxjs/Observable';

import * as config from './config.actions';
import {ConfigService} from 'app/core/services/config.service';
import {HttpClient} from '@angular/common/http';


@Injectable()
export class ConfigEffects {


  @Effect() findSucursal$ = this.actions$
    .ofType<config.SetSucursalAction>(config.SET_SUCURSAL)
    .switchMap( () =>
      this.service.get()
        .map(appConfig => new config.SetSucursalSuccessAction(appConfig))
        .catch(error => Observable.of({type: 'HTTP_ERROR', payload: error}))
    );


  constructor(
    private actions$: Actions,
    private service: ConfigService,
  ) {}
}
