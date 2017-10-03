import { Action } from '@ngrx/store';
import { Compra, Proveedor } from "app/models";

export const SELECT_PROVEEDOR = '[Ordenes de Compras create form] Select proveedor';
export const SELECT_PROVEEDOR_COMPLETE = '[Ordenes de Compras create form] Select proveedor complete';

export class SelectProveedorAction implements Action {
  readonly type = SELECT_PROVEEDOR;

  constructor(public payload: Proveedor) {}
}

export class SelectProveedorCompleteAction implements Action {
  readonly type = SELECT_PROVEEDOR_COMPLETE;

  constructor(public payload: any) {}
}

export type Actions =
| SelectProveedorAction
| SelectProveedorCompleteAction
