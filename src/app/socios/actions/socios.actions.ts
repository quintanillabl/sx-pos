import { Action } from '@ngrx/store';
import {Socio} from '../models/socio';

// Search socios
export const SEARCH = '[Socio] Search';
export const SEARCH_COMPLETE = '[Socio] Search Complete';
export const SEARCH_ERROR = '[Socio] Search Error';

export const LOAD = '[Socio] Load';

export const SELECT = '[Socio] Select';
export const SELECT_SUCCESS = '[Socio] Select success';
export const SELECT_ERROR = '[Socio] Select error';



export class SearchAction implements Action {
  readonly type = SEARCH;

  constructor(public payload: string) {}
}
export class SearchCompleteAction implements Action {
  readonly type = SEARCH_COMPLETE;

  constructor(public payload: Socio[]) {}
}
export class SearchErrorAction implements Action {
  readonly type = SEARCH_ERROR;

  constructor(public payload: any) {}
}

export class LoadAction implements Action {
  readonly type = LOAD;

  constructor(public payload: Socio) {}
}

export class SelectAction implements Action {
  readonly type = SELECT;

  constructor(public payload: Socio) {}
}

export class SelectSuccessAction implements Action {
  readonly type = SELECT_SUCCESS;

  constructor(public payload: Socio) {}
}
export class SelectErrorAction implements Action {
  readonly type = SELECT_ERROR;

  constructor(public payload: any) {}
}


/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export type Actions =
  | SearchAction
  | SearchCompleteAction
  | SearchErrorAction
  | LoadAction
  | SelectAction
  | SelectSuccessAction
  | SelectErrorAction
