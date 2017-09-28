import { Sucursal, Proveedor } from 'app/models';
import { DevolucionDeCompraDet } from './devolucionDeCompraDet';

export interface DevolucionDeCompra {
  id: string;
  sucursal: Sucursal;
  proveedor: Proveedor;
  documento: number;
  notaCxp?: {};
  fecha: string;
  referencia?: string;
  fechaReferencia?: string;
  comentario?: string;
  partidas?: Array<DevolucionDeCompraDet>,
  dateCreated?: string,
  lastUpdated?: string,
  createUser?: string,
  updateUser?: string,
}