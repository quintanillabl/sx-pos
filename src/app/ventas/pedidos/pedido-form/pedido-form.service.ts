import { Injectable } from '@angular/core';
import { MdDialog } from '@angular/material';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

import { PedidoDetFormComponent } from './pedido-det-form/pedido-det-form.component';
import {Sucursal, VentaDet, Cliente, Producto } from 'app/models';

import * as _ from 'lodash';
import { CONTADO, CREDITO } from 'app/ventas/models/descuentos';

import { PedidosService } from 'app/ventas/pedidos/services/pedidos.service';

export function mapPartidaToImporte( det: VentaDet) {
  const factor = det.producto.unidad === 'MIL' ? 1000 : 1;
  const res =  (det.cantidad * det.precio) / factor
  return _.round(res, 2);
}

@Injectable()
export class PedidoFormService {

  form: FormGroup;

  constructor(
    public dialog: MdDialog,
    private service: PedidosService
  ) { }

  registerForm(parentForm: FormGroup) {
    this.form = parentForm;
  }

  get tipo() {
    return this.form.get('tipo').value;
  }

  isCredito() {
    return this.tipo === 'CRE';
  }

  /**
   * Agrega una partida de pedido al
   */
  agregarPartida(config: {sucursal: Sucursal}) {
    const dialogRef = this.dialog.open(PedidoDetFormComponent, {
      data: {
        sucursal: config.sucursal,
        tipo: this.tipo
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.partidas.push(new FormControl(result));
        this.recalcular();
      }
    });
  }

  /**
   * Editar una partida del pedido
   */
  editarPartida(index: number, config: {sucursal: Sucursal}) {
    const det = this.partidas.value[index];
    // console.log('Editando partida: ', det);
    const dialogRef = this.dialog.open(PedidoDetFormComponent, {
      data: {
        sucursal: config.sucursal,
        tipo: this.tipo,
        partida: det
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.partidas.push(new FormControl(result));
        this.recalcular();
      }
    });

  }

  elimiarPartida( index: number) {
    this.partidas.removeAt(index);
    this.recalcular();
  }


  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  get partidasActualizables() {
    const EXCEPTIONS = ['MANIOBRA'];
    return this.partidas.value.filter(value => !_.includes(EXCEPTIONS, value.producto.clave ));
  }

  recalcular() {
    console.log('Recalcuando el pedido....');
    this.quitarCargosEspeciales();
    if (this.partidasActualizables.length > 0) {

      this.actualizarPrecios();
      this.actualizarImportesEnPartidas();
      // console.log('Actualizar descuentos');
      this.calcularDescuentos();
      this.actualizarImportesEnPartidas(); // Segunda pasada para actualizar sub total en partidas
    }
    // Cargos y maniobras por tarjeta, felte y cortes
    this.generarCargosPorPagoConTarjeta();
    this.generarCargoPorCorte();
    this.actualizarTotales();
  }

  actualizarPrecios() {
    const contado = this.form.get('tipo').value === 'CON';
    const partidas: VentaDet[] = this.partidasActualizables;
    if (partidas.length > 0) {
      // console.log('Actualizando precios....')
      partidas
        .forEach(item => {
          const precio = contado ? item.producto.precioContado : item.producto.precioCredito;
          item.precio = precio;
          this.actualizarPartida(item);
        });
    }
  }

  actualizarImportesEnPartidas() {
    const partidas: VentaDet[] = this.partidasActualizables;
    partidas.forEach(value => this.actualizarPartida(value));
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
    det.kilos = (cantidad * det.producto.kilos) / factor;

  }

  /********************* END RE INGENIERIA ************************/

  actualizarTotales() {
    const partidas: VentaDet[] = this.partidas.value;
    let importe = 0;
    let descuento = 0;
    let descuentoImporte = 0;
    let subTotal = 0;
    let impuesto = 0;
    let total = 0;
    let kilos = 0;

    partidas.forEach(row => {
      this.actualizarPartida(row);
      importe += row.importe;
      descuento = descuento < row.descuento ? row.descuento : descuento;
      descuentoImporte += row.descuentoImporte;
      subTotal += row.subTotal;
      impuesto += row.impuesto;
      total += row.total;
      kilos += row.kilos
    });

    this.form.get('importe').setValue(importe);
    this.form.get('descuento').setValue(descuento);
    this.form.get('descuentoImporte').setValue(descuentoImporte);
    this.form.get('subTotal').setValue(subTotal);
    this.form.get('impuesto').setValue(impuesto);
    this.form.get('total').setValue(total);
    this.form.get('kilos').setValue(kilos);
  }



  calcularDescuentos() {
    const tipo = this.form.get('tipo').value;
    const fpago = this.form.get('formaDePago').value;
    if (tipo === 'CRE') {
      this.aplicarDescuentoCredito();
    } else {
      let pena = 0;
      if (fpago === 'TARJETA_CREDITO') {
        pena = 2;
      } else if (fpago === 'TARJETA_DEBITO') {
        pena = 1;
      }
      this.aplicarDescuentoContado(pena);
    }
  }

  aplicarDescuentoContado(pena = 0) {
    // console.log('Aplicando descuento por volumen a precios brutos con pena del: ', pena);
    const partidas: VentaDet[] = this.partidasActualizables;
    const partidasPrecioBruto = this.partidas.value
      .filter(item => item.producto.modoVenta === 'B' );
    const importes = _.map(partidasPrecioBruto, mapPartidaToImporte);
    const importeBruto = _.sum(importes);
    const descRow = this.findDescuentoPorVolumen(importeBruto);
    let descuento = descRow ? descRow.descuento : 0
    if (descuento > pena ) {
      descuento = descuento - pena
    }
    _.forEach(partidas, item => {
      if (item.producto.modoVenta === 'B') {
        // item.precio = item.producto.precioContado;
        item.descuento = (descuento) / 100
      } else if (item.producto.modoVenta === 'N' && item.producto.clave !== 'MANIOBRA') {
        // item.precio = item.producto.precioContado;
        item.descuento = 0
      }
    });
  }

  aplicarDescuentoCredito() {
    const cliente: Cliente = this.form.get('cliente').value;
    if (cliente && cliente.credito) {
      if (!cliente.credito.postfechado) {
        this.aplicarDescuentCreditoDescuentoFijo(cliente.credito.descuentoFijo);
      } else {
        this.aplicarDescuentoContado(4);
      }
    }

  }

  aplicarDescuentCreditoDescuentoFijo(descuento: number) {
    // console.log('Aplicando descuento en CREDITO Desc fijo de: ', descuento);
    const partidas: VentaDet[] = this.partidasActualizables
    _.forEach(partidas, item => {
      item.descuento = descuento / 100;
    });
  }

  aplicarDescuentoCreditoPostfechado() {
    // console.log('Calculando descuento de credito POST FECHADO...');
    const tipo = this.form.get('tipo').value;
    const cliente: Cliente = this.form.get('cliente').value;
    if (tipo === 'CRE' && cliente && cliente.credito && cliente.credito.postfechado) {
      this.aplicarDescuentoContado(4);
    }
  }

  findDescuentoPorVolumen(importe: number) {
    const found = _.findLast(CONTADO, item => item.importe < importe);
    return  found
  }

  generarCargosPorPagoConTarjeta() {
    const fp = this.form.get('formaDePago').value;
    if (_.startsWith(fp, 'TARJETA') && this.tipo === 'CON') {
      // console.log('Calculando cargos por pago con tarjeta de credito');
      const pena = fp === 'TARJETA_DEBITO' ? 1 : 2;
      let totalNeto = this.getImporte('N');
      // console.log(' Total neto: ', totalNeto);
      // Posibles precios brutos sin descuento
      const totalBruto = this.getImporte('B');
      // console.log(' .... Total bruto: ', totalBruto);
      const descuentoBruto = this.findDescuentoPorVolumen(totalBruto);

      if (!descuentoBruto) {
        totalNeto += totalBruto;
      }
      // console.log('Total para cargo: ', totalNeto);
      let importeT = totalNeto * (pena / 100);
      importeT = _.round(importeT, 2);
      // console.log(' .... Total neto: ', totalNeto);
      if (totalNeto > 0 ) {
        /*console.log(`
          Generar un cargo por maniobra T por un importe de ${importeT} ( ${pena} %   de ${totalNeto} )
          en virtud de  pago con ${fp} en contado usando la clave MOANIOBRAT
          `);*/

        this.service.findManiobra().subscribe(producto => {
          this.form.get('comisionTarjeta').setValue( (pena / 100)) ;
          this.form.get('comisionTarjetaImporte').setValue(importeT);
          const det = this.buildPartidaDeManiobra(producto, importeT);
          // console.log('Maniobra registrada: ', {...det});
          this.partidas.push(new FormControl(det));
          this.actualizarTotales();
          // this.doAgregarPartida(det);

        }, err => {
          console.log('No se encuentra el producto de maniobras');
        });
      }
    }
  }

  private quitarCargosEspeciales() {
    const cargoPorTarjeta = _.findIndex(this.partidas.value, (item: VentaDet) => item.producto.clave === 'MANIOBRA');
    if (cargoPorTarjeta !== -1) {
      // console.log('Qutandi cargo por maniobra T');
      this.partidas.removeAt(cargoPorTarjeta);
    }
    console.log('Buscando partida de corte en:', this.partidas.value);
    const cargoPorCorte = _.findIndex(this.partidas.value, (item: VentaDet) => item.producto.clave === 'CORTE');
    console.log('Partida de corte: ', cargoPorCorte);
    if (cargoPorCorte !== -1) {
      console.log('Quitando cargo por corte');
      this.partidas.removeAt(cargoPorCorte);
    }

  }

  generarCargoPorCorte() {
    const partidas = this.partidasActualizables;
    const cortes = partidas.filter( item => item.corte);
    const importeCortes = _.sumBy( cortes, (item: VentaDet) => {
      const imp = item.corte.cantidad * item.corte.precio;
      return imp;
    });
    if ( importeCortes > 0) {
      this.service.findCorte().subscribe(producto => {
        this.form.get('corteImporte').setValue( (importeCortes)) ;
        const det = this.buildPartidaDeManiobra(producto, importeCortes);
        console.log('Agregando partida de corte: ', {...det});
        console.log('... Partidas actuales: ', this.partidas.value);
        this.partidas.push(new FormControl(det));
        this.actualizarTotales();

      }, err => {
        console.log('No se encuentra el producto CORTE');
      });
    }
  }



  private getImporte(tipo: 'B' | 'N') {
    const partidas: VentaDet[] = this.partidas.value;
    const partidasPrecioBruto = this.partidas.value
      .filter(item => (item.producto.modoVenta === tipo && item.producto.clave !== 'MANIOBRA'));
    const importes = _.map(partidasPrecioBruto, mapPartidaToImporte);
    const importeNeto = _.sum(importes);
    return importeNeto;
  }

  private buildPartidaDeManiobra(producto: Producto, importe: number): VentaDet {
    return {
      producto: producto,
      cantidad: 1,
      precio: importe,
      importe: importe,
      desctoOriginal: 0,
      descuento: 0,
      descuentoImporte: 0,
      subTotal: importe,
      impuesto: 0,
      impuestoTasa: 0.16,
      total: importe,
      precioLista: importe,
      precioOriginal: importe,
      kilos: 0,
      comentario: '',
      conVale: false,
      importeCortes: 0,
      sucursal: this.form.get('sucursal').value
    }
  }




}
