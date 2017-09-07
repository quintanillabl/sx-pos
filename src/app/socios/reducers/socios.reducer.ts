import { createSelector } from '@ngrx/store';
import * as _ from 'lodash';

import * as socio from '../actions/socios.actions';

import {Socio} from '../models/socio';

export interface State {
  ids: string[];
  entities: { [id: string]: Socio };
  selectedSocioId: string | null;
  selected: Socio | null;
}

export const initialState: State = {
  ids: [],
  entities: {},
  selectedSocioId: null,
  selected: null
};

export function reducer(state = initialState, action: socio.Actions): State {

  switch (action.type) {
    case socio.SEARCH_COMPLETE : {
      const newSocios = action.payload;
      const newSociosIds = newSocios.map(socio => socio.id);
      const newSociosEntities = _.keyBy(newSocios, 'id');

      return {
        ids: [...state.ids, ...newSociosIds],
        entities: Object.assign({}, newSociosEntities),
        selectedSocioId: state.selectedSocioId,
        selected: state.selected,
      };
    }

    case socio.LOAD: {
      const socio = action.payload;

      if (state.ids.indexOf(socio.id) > -1) {
        return state;
      }

      return {
        ids: [...state.ids, socio.id],
        entities: Object.assign({}, state.entities, {[socio.id]: socio}),
        selectedSocioId: state.selectedSocioId,
        selected: state.selected,
      };
    }

    case socio.SELECT_SUCCESS: {
      return {
        ids: state.ids,
        entities: state.entities,
        selectedSocioId: state.selectedSocioId,
        selected: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}

export const getEntities = (state: State) => _.values(state.entities);

export const getIds = (state: State) => state.ids;

export const getSelectedId = (state: State) => state.selectedSocioId;

export const getSelected = (state: State) => state.selected
/*
export const getSelected = createSelector(
  getEntities,
  getSelectedId,
  (entities, selectedId) => {
    return entities[selectedId];
  }
);
*/

export const getAll = createSelector(getEntities, getIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
