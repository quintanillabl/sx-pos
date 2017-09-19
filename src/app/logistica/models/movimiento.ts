
import { Sucursal } from "app/models";

export interface Movimiento {
  id: string,
  sucursal: Sucursal,
  documento: number,
  fecha: string,
  tipo: string,
  comentario?: string,
  partidas?: Array<any>,
  dateCreated?: string,
  lastUpdated?: string,
  createUser?: string,
  updateUser?: string

}
    