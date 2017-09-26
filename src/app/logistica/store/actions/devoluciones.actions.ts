import { Action } from '@ngrx/store';
import { DevolucionDeVenta } from "app/logistica/models/devolucionDeVenta";

export const SEARCH = '[DevolucionDeVenta] Search';
export const SEARCH_SUCCESS = '[DevolucionDeVenta] Search Success';
export const SEARCH_ERROR = '[DevolucionDeVenta] Search error'

export const SELECT = '[DevolucionDeVenta] Select';
export const SELECT_SUCCESS = '[DevolucionDeVenta] Select succes';
export const SELECT_ERROR = '[DevolucionDeVenta] Select error';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: any) {}
}

export class SearchSuccessAction implements Action {
  readonly type = SEARCH_SUCCESS;

  constructor(public payload: DevolucionDeVenta[]) {}
}
export class SearchError implements Action {
  readonly type = SEARCH_ERROR;

  constructor(public payload: any) {}
}

export class SelectAction  implements Action {
  readonly type = SELECT;
  
  constructor(public payload: string) {}
}
export class SelectSuccessAction implements Action {
  readonly type = SELECT_SUCCESS;

  constructor(public payload: DevolucionDeVenta) {}
}
export class SelectErrorAction implements Action {
  readonly type = SELECT_ERROR;
  
  constructor(public payload: any) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
| SearchAction
| SearchSuccessAction
| SearchError
| SelectAction
| SelectSuccessAction
| SelectErrorAction