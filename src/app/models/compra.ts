import { Sucursal } from "./sucursal";
import { Proveedor } from "./proveedor";

export interface Compra {
  id: string
  sucursal: Sucursal
  proveedor: Proveedor
  folio: number
  fecha: string
  entrega?: string
  comentario?: string
  pendiente: boolean
  centralizada: boolean
  nacional: boolean
  consolidada: boolean
  especial: boolean
  importeBruto: number
  importeDescuento: number
  importeNeto: number
  impuestos: number
  total: number
  partidas: Array<any>
  tipoDeCambio: number
  modificado: string
}
