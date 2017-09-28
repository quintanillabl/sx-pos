import { Action } from '@ngrx/store';

export const SELECT_SUCURSAL = '[App Config] Select sucursal';


export class SelectSucursalAction implements Action {
  readonly type = SELECT_SUCURSAL;
}


export type Actions = SelectSucursalAction;
