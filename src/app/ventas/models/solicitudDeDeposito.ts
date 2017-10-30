import {Cliente, Sucursal} from '@siipapx/models';

export interface SolicitudDeDeposito {
  id: string
  sucursal: Sucursal
  cliente: Cliente
  cobro: {},
  banco: {},
  cuenta: {},
  tipo: string,
  folio: number,
  fecha: string
  fechaDeposito: string
  referencia: string
  importe_cheque: number
  importe_efectivo: number
  importe_tarjeta: number
  total: number
  comentario: string
  cancelacion?: string
  comentario_cancelacion?: string
  enviado: boolean
  dateCreated?: string
  lastUpdated?: string
  createUser?: string
  updateUser?: string
}
