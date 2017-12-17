import { Action } from "@ngrx/store";
import * as _ from 'lodash';

import { Compra, Proveedor } from "@siipapx/models";
import * as comprasForm from '../actions/ocompra-form.actions';

export interface State {
  proveedor: Proveedor;
  loading: boolean;
  productosPorProveedor:  { [key:string]: {} }
}

export const initialState: State = {
  proveedor: null,
  loading: false,
  productosPorProveedor: {}
  
};

export function reducer(state = initialState, action: comprasForm.Actions): State {
  switch (action.type) {
    case comprasForm.SELECT_PROVEEDOR: {
      return {
        ...state,
        proveedor: action.payload,
        loading: true
      }
    }
    case comprasForm.SELECT_PROVEEDOR_COMPLETE: {
      return {
        ...state,
        productosPorProveedor: _.keyBy(action.payload, 'producto.clave'),
        loading: false
      }
    }
    default:
      return state;
  }
}

export const getProveedor = (state: State) => state.proveedor;
export const getLoading = (state: State) => state.loading;
export const getProductosDisponibles = (state: State) => _.values(state.productosPorProveedor);
