export class Cliente {
  id: string;
  nombre: string;
  rfc: string;
  credito: ClienteCredito
}

export class ClienteCredito {
  id: string
  creditoActivo: boolean
  descuentoFijo: number
  lineaDeCredito: number
  plazo: number
  saldo: number
  postfechado: boolean
  socio?: any
}
