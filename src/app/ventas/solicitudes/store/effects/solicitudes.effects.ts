import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { ROUTER_NAVIGATION, RouterNavigationAction } from '@ngrx/router-store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as Sectores from '../actions/solicitudes.actions';
import { SolicitudesService } from 'app/ventas/solicitudes/services/solicitudes.service';


@Injectable()
export class SolicitudesEffects {

  @Effect() load$ = this.actions$
    .ofType<Sectores.SearchAction>(Sectores.SEARCH)
    .map(action => action.payload)
    .switchMap( filter =>
      this.service.list(filter)
        .map(sols => new Sectores.SearchSuccessAction(sols))
        .catch(error => Observable.of({type: 'HTTP_ERROR', payload: error}))
    );

  @Effect() select$ = this.actions$.ofType<Sectores.SelectAction>(Sectores.SELECT)
    .map( action => action.payload)
    .switchMap(id =>
      this.service.get(id))
    .map(sol => new Sectores.SelectSuccessAction(sol))
    .catch(error => Observable.of(new Sectores.SelectErrorAction(error))
    );

  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/ventas/pedidos/solicitudes/show/'))
    .map(r => _.replace(r, '/ventas/pedidos/solicitudes/show/', ''))
    // .do(route => console.log('Show SOL id: ', route))
    .switchMap( id => Observable.of(new Sectores.SelectAction(id)));

  @Effect()
  navigateToEdit = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
    .map(r => r.payload.routerState.url)
    .filter( r => r.startsWith('/ventas/pedidos/solicitudes/edit/'))
    .map(r => _.replace(r, '/ventas/pedidos/solicitudes/edit/', ''))
    // .do(route => console.log('Edit sector id: ', route))
    .switchMap( id => Observable.of(new Sectores.SelectAction(id)));


  @Effect()
  delete$ = this.actions$.ofType<Sectores.DeleteAction>(Sectores.DELETE)
    .map(action => action.payload)
    .do( value => console.log('Eliminando sector:', value))
    .switchMap(id =>
      this.service.delete(id))
    .map(dev => new Sectores.DeleteSuccessAction())
    .catch(error => Observable.of(new Sectores.DeleteErrorAction(error))
    );

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: SolicitudesService
  ) {}
}
