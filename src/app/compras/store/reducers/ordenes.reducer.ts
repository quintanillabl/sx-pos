import { Action } from "@ngrx/store";

import { Compra } from "@siipapx/models";
import * as compras from '../actions/ordenes.actions';

export interface State {
  selected: Compra;
  searchTerm: string;
  loading: boolean;
  pendientes: Compra[];
}

export const initialState: State = {
  selected: undefined,
  searchTerm: '%',
  loading: false,
  pendientes: []
};

export function reducer(state = initialState, action: compras.Actions): State {
  switch (action.type) {
    case compras.SEARCH: {
      return {
        ...state,
        searchTerm: action.payload,
        loading: true
      }
    }
    case compras.SEARCH_COMPLETE: {
      return {
        ...state,
        pendientes: action.payload,
        loading: false
      }
    }
    case compras.SEARCH_ERROR: {
      return {
        ...state,
        loading: false
      };
    }
    case compras.SELECT: {
      return {
        ...state,
        loading: true
      }
    }
    case compras.SELECT_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: action.payload
      }
    }
    case compras.SELECT_ERROR: {
      return {
        ...state,
        loading: false
      }
    }
    case compras.DELETE: {
      return {
        ...state,
        loading: true
      }
    }

    case compras.DELETE_SUCCESS: {
      return {
        ...state,
        loading: false,
        selected: null
      }
    }
    case compras.DELETE_ERROR: {
      return {
        ...state,
        loading: false,
      }
    } 
    default:
      return state;
  }
}

export const getPendientes = (state: State) => state.pendientes;
export const getSelected = (state: State) => state.selected;
export const getSearchTerm = (state: State) => state.searchTerm;
export const getLoading = (state: State) => state.loading;
