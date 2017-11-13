import { Cliente, Sucursal } from 'app/models';
import { AplicacionDeCobro } from './aplicacionDeCobro';

export interface Cobro {
    id?: string
    cliente: Cliente
    sucursal: Sucursal
    tipo: string
    fecha: string
    formaDePago: string
    moneda: string
    tipoDeCambio: number
    importe: number
    referencia?: string
    primeraAplicacion?: string
    anticipo?: boolean
    enviado?: boolean
    dateCreated?: string
    lastUpdated?: string
    createUser?: string
    updateUser?: string
    aplicaciones?: Array<AplicacionDeCobro>
    tarjeta?: CobroTarjeta
}

export interface CobroTarjeta {
  id?: string;
  debitoCredito: boolean;
  visaMaster: boolean;
  validacion: number;
}
