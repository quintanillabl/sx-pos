import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { PedidoDetFormComponent } from './pedido-det-form/pedido-det-form.component';
import {Sucursal, VentaDet} from 'app/models';

import * as _ from 'lodash';


@Injectable()
export class PedidoFormService {

  form: FormGroup;

  constructor(
    public dialog: MdDialog,
  ) { }

  registerForm(parentForm: FormGroup) {
    this.form = parentForm;
  }

  /**
   * Agrega una partida de pedido al
   */
  agregarPartida(config: {sucursal: Sucursal}) {
    const dialogRef = this.dialog.open(PedidoDetFormComponent, {
      data: {sucursal: config.sucursal}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Insertando ventaDet:  ', result);
        this.partidas.push(new FormControl(result));
        this.actualizarTotales();
      }
    });
  }


  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  actualizarTotales() {
    const partidas: VentaDet[] = this.partidas.value;
    let importe = 0;
    const descuento = 0;
    let impuesto = 0;
    _.forEach(partidas, function(row) {
      // Calculando el importe bruto
      const factor = row.producto.unidad === 'MIL' ? 1000 : 1;
      const cantidad = row.cantidad;
      const precio = row.precio;
      let impBruto = (cantidad * precio) / factor;
      impBruto = _.round(impBruto, 2);
      impuesto += _.round((impBruto * .16), 2);
      importe += impBruto;
    });
    let total = (importe - descuento + impuesto);
    total = _.round(total, 2);

    this.form.get('importe').setValue(importe);
    this.form.get('descuento').setValue(descuento);
    this.form.get('impuesto').setValue(impuesto);
    this.form.get('total').setValue(total);
  }
}
