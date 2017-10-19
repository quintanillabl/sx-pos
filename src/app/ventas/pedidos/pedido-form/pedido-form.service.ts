import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';

import { PedidoDetFormComponent } from './pedido-det-form/pedido-det-form.component';


@Injectable()
export class PedidoFormService {

  constructor(
    public dialog: MdDialog,
  ) { }

  /**
   * Agrega una partida de pedido al
   */
  agregarPartida() {
    const dialogRef = this.dialog.open(PedidoDetFormComponent, {
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Insertando partida:  ', result);
      }
    });
  }
}