import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions } from '@ngrx/effects';
import { RouterAction, ROUTER_NAVIGATION, RouterNavigationAction } from "@ngrx/router-store";
import { Observable } from 'rxjs/Observable'; 
import * as _ from 'lodash';

import * as Compras from '../actions/ordenes.actions';
import { OrdenesService } from "app/compras/services/ordenes.service";


@Injectable()
export class OrdenesEffects {

  @Effect()
  navigateToOrdenes = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
  .map(r => r.payload.routerState.url)
  .delay(300)
  .filter( r => r ==='/compras/ordenes' )
  .do(route => console.log('Navegando a: ', route))
  //.map( r => new Compras.SearchAction('0'))
  
  .switchMap( r => 
    this.service.buscarPendientes()
    .map(ordenes => new Compras.SearchCompleteAction(ordenes))
    .catch(error => Observable.of(new Compras.SearchError(error))) 
  );
  
  
  /**
   * Side effect to make an async call to the backend api server to lookup orders
   * with an specific search criteria
   * 
   * @todo Should the search criteria be in the store instead of using the payload or
   * keep the criteria in the store and make the smart component us it as a paylod when
   * dispatching the SEARCH action?
   * @type {Observable<any>}
   */
  @Effect()
  search$ = this.actions$
    .ofType(Compras.SEARCH)
    .map((action: Compras.SearchAction) => action.payload)
    .debounceTime(300)
    .distinctUntilChanged()
    .do( value => console.log('Searcing ordnes: ', value))
    .exhaustMap( term =>
      this.service.buscarPendientes(term)
      .map(ordenes => new Compras.SearchCompleteAction(ordenes))
      .catch(error => Observable.of(new Compras.SearchError(error))) 
    );
  
  @Effect() select$ = this.actions$.ofType<Compras.SelectAction>(Compras.SELECT)
  .map( action => action.payload)
  .do(value => console.log('Setting current orden :', value))
  .switchMap(id => 
    this.service.get(id))
    .map(compra => new Compras.SelectSuccessAction(compra))
    .catch(error => Observable.of(new Compras.SelectErrorAction(error))
  );
  
  @Effect()
  navigateToShow = this.actions$.ofType<RouterNavigationAction>(ROUTER_NAVIGATION)
  .map(r => r.payload.routerState.url)
  .filter( r => r.startsWith('/compras/ordenes/show/'))
  .map(r => _.replace(r, '/compras/ordenes/show/', ''))
  .do(route => {
    console.log('Show orden id: ', route);
  })
  .switchMap( id => Observable.of(new Compras.SelectAction(id)));
  // .switchMap( id => 
  //   this.service.get(id)
  //   .map(orden => new Compras.SelectSuccessAction(orden))
  //   .catch(error => Observable.of(new Compras.SelectErrorAction(error)))
  // );
  

  constructor(
    private actions$: Actions,
    private router: Router,
    private service: OrdenesService
  ) {}
}

function firstSegment(r: RouterNavigationAction) {
  return r.payload.routerState.root.firstChild;
}