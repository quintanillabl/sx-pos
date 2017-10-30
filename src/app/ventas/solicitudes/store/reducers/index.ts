import {ActionReducerMap, createSelector, createFeatureSelector, Action, ActionReducer} from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromSolcitidues from './solicitudes.reducer';


export interface SolicitudesState {
  solicitudes: fromSolcitidues.State
}

export interface State extends fromRoot.State {
  'pedidos': SolicitudesState
}

export const reducers = {
  'solicitudes': fromSolcitidues.reducer
}

export const selectSolicitudDeDepostosState = createFeatureSelector<SolicitudesState>('solicitudes');

/**** Sectores state selectors */
export const selectSolicitudesState = createSelector(
  selectSolicitudDeDepostosState,
  (state: SolicitudesState) => state.solicitudes
);

export const getPendientes = createSelector(
  selectSolicitudesState,
  fromSolcitidues.getEntities
);
export const getSectoresLoading = createSelector(
  selectSolicitudesState,
  fromSolcitidues.getLoading
);
export const getSelectedSector = createSelector(
  selectSolicitudesState,
  fromSolcitidues.getSelected
);
