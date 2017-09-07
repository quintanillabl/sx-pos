import { createSelector, createFeatureSelector } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import * as fromSocios from './socios.reducer';
import * as fromSearch from './socios-search.reducer';

export interface SociosState {
  socios: fromSocios.State;
  search: fromSearch.State;
}

export interface State extends fromRoot.State {
  'socios': SociosState;
}

export const reducers = {
  socios: fromSocios.reducer,
  search: fromSearch.reducer,
};

export const getSociosState = createFeatureSelector<SociosState>('socios');

export const getSociosEntitiesState = createSelector(
  getSociosState,
  (state: SociosState) => state.socios
);

export const getSociosEntities = createSelector(
  getSociosEntitiesState,
  fromSocios.getEntities
);
export const getSelectedSocio = createSelector(
  getSociosEntitiesState,
  fromSocios.getSelected
);


/**
 * Just like with the socios selectors, we also have to compose the search
 * reducer's and collection reducer's selectors.
 */
export const getSearchState = createSelector(
  getSociosState,
  (state: SociosState) => state.search
);

export const getSearchBookIds = createSelector(
  getSearchState,
  fromSearch.getIds
);
export const getSearchQuery = createSelector(
  getSearchState,
  fromSearch.getQuery
);
export const getSearchLoading = createSelector(
  getSearchState,
  fromSearch.getLoading
);

/**
 * Some selector functions create joins across parts of state. This selector
 * composes the search result IDs to return an array of books in the store.
 */
export const getSearchResults = createSelector(
  getSociosEntities,
  getSearchBookIds,
  (socios, searchIds) => {
    return searchIds.map(id => socios[id]);
  }
);
