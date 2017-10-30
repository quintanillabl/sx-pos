import { Producto, Sucursal, InstruccionDeCorte } from 'app/models';


export interface VentaDet {
  id?: string
  sucursal: Sucursal
  producto: Producto
  // Manejo de importes
  cantidad: number
  precio: number
  importe: number
  descuento: number
  descuentoImporte: number
  subTotal: number
  impuesto: number
  impuestoTasa: number
  total: number
  // End importes
  nacional?: boolean
  kilos?: number
  comentario?: string
  conVale?: boolean
  importeCortes?: number
  corte?: InstruccionDeCorte
  precioLista: number
  precioOriginal: number
  desctoOriginal: number
  dateCreated?: string
  lastUpdated?: string
  devuelto?: number
  disponibleParaDevolucion?: number
  enviado?: number,
}
