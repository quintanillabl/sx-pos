import { Sucursal, Cliente, VentaDet } from "app/models";


export interface Venta {
  id: string;
  sucursal: Sucursal;
  cliente: Cliente;
  vendedor: {id: string, nombre: string},
  tipo: string;
  documeto: number;
  importe: number;
  impuesto: number;
  total: number;
  formaDePago: string;
  moneda: string;
  tipoDeCambio: number;
  kilos: number;
  partidas: Array<VentaDet>
}