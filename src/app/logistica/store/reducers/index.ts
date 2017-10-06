import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromDevoluciones from './devoluciones.reducer';
import * as fromComs from './coms.reducer';
import * as fromDecs from './decs.reducer';
import * as fromSols from './sols.reducers';

export interface LogisticaState {
  devoluciones: fromDevoluciones.State
  coms: fromComs.State
  decs: fromDecs.State
  sols: fromSols.State
}

export interface State extends fromRoot.State {
  logistica: LogisticaState;
}

export const reducers = {
  devoluciones: fromDevoluciones.reducer,
  coms: fromComs.reducer,
  decs: fromDecs.reducer,
  sols: fromSols.reducer,
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

/**** COMS state selectors */
export const selectComsState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.coms
);

export const getComs = createSelector(
  selectComsState,
  fromComs.getEntities
);
export const getComsLoading = createSelector(
  selectComsState,
  fromComs.getLoading
);
export const getSelectedCom = createSelector(
  selectComsState,
  fromComs.getSelected
);

// Decs state selctors
export const selectDecState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.decs
);

export const getDecs = createSelector(
  selectDecState,
  fromDecs.getEntities
);
export const getDecsLoading = createSelector(
  selectDecState,
  fromDecs.getLoading
);
export const getSelectedDec = createSelector(
  selectDecState,
  fromDecs.getSelected
);

/**** SOLS state selectors */
export const selectSolsState = createSelector(
  selectLogisticaState,
  (state: LogisticaState) => state.sols
);

export const getSols = createSelector(
  selectSolsState,
  fromSols.getEntities
);
export const getSolsLoading = createSelector(
  selectSolsState,
  fromSols.getLoading
);
export const getSelectedSol = createSelector(
  selectSolsState,
  fromSols.getSelected
);


