
import {Injectable} from '@angular/core';
import {Actions, Effect, toPayload} from '@ngrx/effects';

import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';

import {SociosService} from '../services/socios.service';
import * as sociosActions from '../actions/socios.actions';
import {ROUTER_NAVIGATION, RouterNavigationAction} from '@ngrx/router-store';
import {RouterStateUrl} from '../../reducers/router.state';


@Injectable()
export class SociosEffects {

  @Effect()
  select$: Observable<Action> = this.actions$
    .ofType(sociosActions.SELECT)
    .map(toPayload)
    .switchMap(socio => {
      if (socio.foto === undefined) {
        return Observable.of(new sociosActions.SelectSuccessAction(socio));
      } else {
        return this.sociosService
          .getFoto(socio.id, socio.foto.id)
          .map(foto => {
            socio.foto = foto;
            return new sociosActions.SelectSuccessAction(socio);
          })
          .catch(err => Observable.of(new sociosActions.SelectErrorAction(err)) );
      }
    });


  @Effect() navigateToSocios = this.actions$
    .ofType<RouterNavigationAction<RouterStateUrl>>(ROUTER_NAVIGATION)
    .map( action  => action.payload.routerState)
    .filter( (routerState) => routerState.url === '/socios/todos')
    .map( roterState => new sociosActions.SearchAction(roterState.queryParams.query));

  @Effect() searchSocios = this.actions$
    .ofType<sociosActions.SearchAction>(sociosActions.SEARCH)
    .map( action => action.payload)
    .do(value => console.log('Buscando socios...', value))
    .switchMap(term => {
      return this.sociosService.list(term)
        .map( socios => new sociosActions.SearchCompleteAction(socios))
        .catch( error => {
          return Observable.of(new sociosActions.SearchErrorAction(error))
        });
    });

  constructor(
    private actions$: Actions,
    private sociosService: SociosService
  ) {}

}
