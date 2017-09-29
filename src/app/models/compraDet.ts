import { Producto } from "@siipapx/models";

export interface CompraDet {
  id: string;
  producto: Producto;
  solicitado: number;
  comentario?: string;  
}