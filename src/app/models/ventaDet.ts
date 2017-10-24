import { Producto, Sucursal } from 'app/models';

export interface VentaDet {
  id?: string
  sucursal: Sucursal
  producto: Producto
  cantidad: number
  precioLista: number
  precioOriginal: number
  precio: number
  importe: number
  desctoOriginal: number
  descuento: number
  importeDescuento: number
  importeNeto: number
  subtotal: number
  nacional?: boolean
  kilos?: number
  comentario?: string
  conVale?: boolean
  cortado?: boolean
  importeCortes?: number
  dateCreated?: string
  lastUpdated?: string
  devuelto?: number
  disponibleParaDevolucion?: number
  enviado?: number,
}
