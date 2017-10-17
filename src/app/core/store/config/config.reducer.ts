import * as config from './config.actions';
import { Sucursal } from 'app/models';

export interface State {
  sucursal: Sucursal;
}

const initialState: State = {
  sucursal: {
      id: '402880fc5e4ec411015e4ec64e70012e',
      clave: '12',
      nombre: 'TACUBA'
    }
};

export function reducer(state = initialState, action: config.Actions): State {
  switch (action.type) {
    default:
      return state;
  }
}

export const getSucursal = (state: State) => state.sucursal;

