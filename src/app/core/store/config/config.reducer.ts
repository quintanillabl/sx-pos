import * as config from './config.actions';
import { Sucursal } from 'app/models';

export interface State {
  sucursal: Sucursal;
}

const initialState: State = {
  sucursal: null
};

export function reducer(state = initialState, action: config.Actions): State {
  switch (action.type) {
    case config.SET_SUCURSAL_SUCCESS: {
      return {
        ...state,
        sucursal: action.payload.sucursal
      };
    }
    default:
      return state;
  }
}

export const getSucursal = (state: State) => state.sucursal;

