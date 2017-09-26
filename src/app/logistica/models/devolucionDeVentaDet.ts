import { Producto } from "@siipapx/models";

export interface DevolucionDeVentaDet {
  id: string;
  producto: Producto;
  ventaDet: any;
  cantidad: number;
  costoDev: number;
  importeCosto: number;
  comentario?: string;
  dateCreated?: string;
  lastUpdated?: string;
}
    