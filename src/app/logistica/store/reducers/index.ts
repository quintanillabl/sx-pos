import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromDevoluciones from './devoluciones.reducer';
import * as fromDecs from './decs.reducer';

export interface LogisticaState {
  devoluciones: fromDevoluciones.State
  decs: fromDecs.State
}

export interface State extends fromRoot.State {
  logistica: LogisticaState;
}

export const reducers = {
  devoluciones: fromDevoluciones.reducer,
  decs: fromDecs.reducer
};

export const selectLogisticaState = createFeatureSelector<LogisticaState>('logistica');

// Devoluciones state selectors
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

// Decs state selctors
export const selectDecState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.decs
);

export const selectDecs = createSelector(
  selectDecState,
  fromDecs.getEntities
);
export const selectDecsLoading = createSelector(
  selectDecState,
  fromDecs.getLoading
);
export const selectCurrentDec = createSelector(
  selectDecState,
  fromDecs.getSelected
);


