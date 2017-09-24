import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromOrdenes from './ordenes.reducer';

export interface ComprasState {
  ordenes: fromOrdenes.State
}

export interface State extends fromRoot.State {
  compras: ComprasState;
}

export const reducers = {
  ordenes: fromOrdenes.reducer
};

export const selectComprasState = createFeatureSelector<ComprasState>('compras');

export const selectOrdenesDeCompraState = createSelector(
  selectComprasState,
  (state: ComprasState) => state.ordenes
);

export const getSelectedOrden = createSelector(
  selectOrdenesDeCompraState,
  fromOrdenes.getSelected
);

export const getPendientes = createSelector(
  selectOrdenesDeCompraState,
  fromOrdenes.getPendientes
)

export const getSearchTerm = createSelector(
  selectOrdenesDeCompraState,
  fromOrdenes.getSearchTerm
);
export const getOrdenesLoading = createSelector(
  selectOrdenesDeCompraState,
  fromOrdenes.getLoading
);