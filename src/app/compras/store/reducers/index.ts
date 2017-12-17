import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';
import * as fromOrdenes from './ordenes.reducer';
import * as fromCompraForm from './ocompra-form.reducer';

export interface ComprasState {
  ordenes: fromOrdenes.State,
  compraForm: fromCompraForm.State
}

export interface State extends fromRoot.State {
  compras: ComprasState;
}

export const reducers = {
  ordenes: fromOrdenes.reducer,
  compraForm: fromCompraForm.reducer
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

// Ordend de compra form

export const selectCompraFormState = createSelector(
  selectComprasState,
  (state: ComprasState) => state.compraForm
);

export const getCompraFormProveedor = createSelector(
  selectCompraFormState,
  fromCompraForm.getProveedor
);

export const getProductosPorProveedorLoading = createSelector(
  selectCompraFormState,
  fromCompraForm.getLoading
)

export const getProductosPorProveedorDisponibles = createSelector(
  selectCompraFormState,
  fromCompraForm.getProductosDisponibles
)
