import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable'; 
import * as _ from 'lodash';

import * as CompraForm from '../actions/ocompra-form.actions';
import { OrdenesService } from "app/compras/services/ordenes.service";

@Injectable()
export class CompraFormEffects {
  
  @Effect()
  search$ = this.actions$
    .ofType<CompraForm.SelectProveedorAction>(CompraForm.SELECT_PROVEEDOR)
    .map(action => action.payload)
    .do( proveedor => console.log('ngrx effect: Buscando productos del proveedor: ', proveedor))
    .exhaustMap( proveedor =>
      this.service.buscarProductos(proveedor)
      .map(prods => new CompraForm.SelectProveedorCompleteAction(prods))
      .catch(error => Observable.of({type:' HTTP_ERROR', payload: error})) 
    );
  
  
  
  constructor(
    private actions$: Actions,
    private service: OrdenesService
  ) {}
}

