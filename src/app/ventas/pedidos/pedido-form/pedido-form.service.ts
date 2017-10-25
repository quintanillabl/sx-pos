import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { PedidoDetFormComponent } from './pedido-det-form/pedido-det-form.component';
import {Sucursal, VentaDet} from 'app/models';

import * as _ from 'lodash';
import { CONTADO, CREDITO } from 'app/ventas/models/descuentos';
 

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
    let descuento = 0;
    let descuentoImporte = 0;
    let subTotal = 0;
    let impuesto = 0;
    let total = 0;

    partidas.forEach(row => {
      this.actualizarPartida(row);
      importe += row.importe;
      descuento = descuento < row.descuento ? row.descuento : descuento;
      descuentoImporte += row.descuentoImporte;
      subTotal += row.subTotal;
      impuesto += row.impuesto;
      total += row.total;
    });
    
    this.form.get('importe').setValue(importe);
    this.form.get('descuento').setValue(descuento);
    this.form.get('subTotal').setValue(subTotal);
    this.form.get('impuesto').setValue(impuesto);
    this.form.get('total').setValue(total);
  }

  actualizarPartida(det: VentaDet) {
    
    const factor = det.producto.unidad === 'MIL' ? 1000 : 1;
    const cantidad = det.cantidad;
    const precio = det.precio;
    let importe = (cantidad * precio) / factor;
    importe = _.round(importe, 2);
    det.importe = importe;
    det.descuentoImporte = _.round( (importe * det.descuento) , 2);
    det.subTotal = det.importe - det.descuentoImporte
    det.impuestoTasa = 0.16;
    det.impuesto = _.round(det.subTotal * det.impuestoTasa , 2);
    det.total = det.subTotal + det.impuesto;
    
  }

  aplicarDescuento(descuento: number) {
    const partidas: VentaDet[] = this.partidas.value;
    partidas.forEach(row => {
      row.descuento = (descuento / 100)
    });
    this.actualizarTotales();
  }

  findDescuento(tipo: string, importe: number){
    const descuentos = tipo === 'CRE' ? CREDITO : CONTADO;
    const found = _.findLast(descuentos, item => item.importe < importe);
    return  found
  }

  
}
