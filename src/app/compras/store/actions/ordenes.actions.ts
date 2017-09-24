import { Action } from '@ngrx/store';
import { Compra } from "app/models";

export const SEARCH = '[Ordenes de Compras] Search';
export const SEARCH_COMPLETE = '[Ordenes de Compras] Search Complete';
export const SEARCH_ERROR = '[Ordenes de Compras] Search error'

export const SELECT = '[Ordenes de Compras] Select';
export const SELECT_SUCCESS = '[Ordenes de Compras] Select succes';
export const SELECT_ERROR = '[Ordenes de Compras] Select error';

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}

export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Compra[]) {}
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

  constructor(public payload: Compra) {}
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
| SearchCompleteAction
| SearchError
| SelectAction
| SelectSuccessAction
| SelectErrorAction