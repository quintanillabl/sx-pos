import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromRoot from 'app/reducers';

export interface PedidosState {

}

export interface State extends fromRoot.State {
  pedidos: PedidosState;
}