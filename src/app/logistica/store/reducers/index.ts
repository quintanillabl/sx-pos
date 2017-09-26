import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromDevoluciones from './devoluciones.reducer';

export interface LogisticaState {
  devoluciones: fromDevoluciones.State
}

export interface State extends fromRoot.State {
  logistica: LogisticaState;
}

export const reducers = {
  devoluciones: fromDevoluciones.reducer
};

export const selectLogisticaState = createFeatureSelector<LogisticaState>('logistica');

export const selectDevolucionesState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.devoluciones
);

export const getSelectedDevolucion = createSelector(
  selectDevolucionesState,
  fromDevoluciones.getSelected
);

export const getDevoluciones = createSelector(
  selectDevolucionesState,
  fromDevoluciones.getEntities
)

export const getDevolucionesFilter = createSelector(
  selectDevolucionesState,
  fromDevoluciones.getFilter
);
export const getDevolucionesLoading = createSelector(
  selectDevolucionesState,
  fromDevoluciones.getLoading
);