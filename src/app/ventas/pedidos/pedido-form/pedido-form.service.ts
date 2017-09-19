import { Injectable } from '@angular/core';

@Injectable()
export class PedidoFormService {

  constructor() { }

  /**
   * Agrega una partida de pedido al
   */
  agregarPartida() {
    console.log('Agregando una partida al pedido');
  }
}