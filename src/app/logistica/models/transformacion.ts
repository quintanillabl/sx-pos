import { Sucursal } from "@siipapx/models";

export interface Transformacion {
  id: string,
  sucursal: Sucursal,
  venta?: number,
  documento: number,
  fecha: string,
  tipo: string,
  porInventario: boolean,
  fechaInventario?: string,
  comentario?: string,
  partidas?: Array<any>,
  dateCreated?: string,
  lastUpdated?: string,
  createUser?: string,
  updateUser?: string
}