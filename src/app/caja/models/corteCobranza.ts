export interface CorteCobranza {
  id?: string
  formaPago: string
  tipo: string
  corte: string
  deposito: number
  corteAcumulado: number
  fecha: string
  cierre: boolean
  anticipoCorte: boolean
  fechaDeposito: string
  cambioCheque: boolean	
  comentario?: string
}
