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
    this.form.get('descuentoImporte').setValue(descuentoImporte);
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
  
  calcularDescuentos() {
    // console.log('Calculando descuentos....');
    const tipo = this.form.get('tipo').value;
    const fpago = this.form.get('formaDePago').value;
    if(tipo === 'CRE'){
      this.aplicarDescuentoCredito();
    } else {
      const pena = _.startsWith(fpago, 'TARJETA') ? 2 : 0
      this.aplicarDescuentoContado(pena);
    }
    this.actualizarTotales();
  }

  aplicarDescuentoContado(pena = 0) {
    const partidas: VentaDet[] = this.partidas.value;
    const partidasPrecioBruto = this.partidas.value
      .filter(item => item.producto.modoVenta ==='B' );
    const importes = _.map(partidasPrecioBruto, mapPartidaToImporte);
    const importeBruto = _.sum(importes);
    const descRow = this.findDescuentoPorVolumen(importeBruto);
    let descuento = descRow ? descRow.descuento : 0
    if(descuento > pena ){
      descuento = descuento - pena
    }
    _.forEach(partidas, item => {
      if(item.producto.modoVenta === 'B') {
        item.precio = item.producto.precioContado;
        item.descuento = (descuento)/ 100
      } else if(item.producto.modoVenta === 'N' && item.producto.clave !== 'MANIOBRA') {
        item.precio = item.producto.precioContado;
        item.descuento = 0
      }
    });
  }

  aplicarDescuentoCredito() {
    const tipo = this.form.get('tipo').value;
    const cliente: Cliente = this.form.get('cliente').value;
    if(tipo === 'CRE' && cliente.credito && !cliente.credito.postfechado) {
      
      const partidas: VentaDet[] = this.partidas.value;
      let descuento = 0;
      if(cliente !== null && cliente.credito ) {
        descuento = cliente.credito.descuentoFijo;
        descuento = descuento / 100;
      } 
      _.forEach(partidas, item => {
        item.precio = item.producto.precioCredito;
        item.descuento = descuento;
      });
    } else {
      this.aplicarDescuentoCreditoPostfechado();
    }
  }

  aplicarDescuentoCreditoPostfechado() {
    
    const tipo = this.form.get('tipo').value;
    const cliente: Cliente = this.form.get('cliente').value;
    if(tipo === 'CRE' && cliente.credito && cliente.credito.postfechado) {
      this.aplicarDescuentoContado(4);
    }
  }

  findDescuentoPorVolumen(importe: number){
    const found = _.findLast(CONTADO, item => item.importe < importe);
    return  found
  }

  generarCargosPorPagoConTarjeta() {
    const fp = this.form.get('formaDePago').value;
    const conTarjeta = _.startsWith(fp, 'TARJETA');
    if( !this.isCredito() && conTarjeta) {
      const pena = fp === 'TARJETA_DEBITO' ? 1 : 2;
      const totalNeto = this.getImporte('N');
      let importeT = totalNeto * (pena / 100);
      importeT = _.round(importeT, 2);
      if(totalNeto > 0 ){
        
        console.log(`
          Generar un cargo por maniobra T por un importe de ${importeT} ( ${pena} %   de ${totalNeto} )
          en virtud de  pago con ${fp} en contado usando la clave MOANIOBRAT
          `);
        let maniobra = _.find(this.partidas.value, (item: VentaDet) => item.producto.clave === 'MANIOBRA');
        
        if(maniobra) {
          console.log('Maniobra ya registrada eliminarla: ', maniobra);
          const index = _.findIndex(this.partidas.value, (item: VentaDet) => item.producto.clave === 'MANIOBRA');
          this.partidas.removeAt(index);
          maniobra = null;
        }

        if(!maniobra) {
          this.service.findManiobra().subscribe(producto => {
            this.form.get('comisionTarjeta').setValue( (pena/100)) ;
            this.form.get('comisionTarjetaImporte').setValue(importeT);
            const det = this.buildPartidaDeManiobra(producto, importeT);
            console.log('Maniobra registrada: ', {...det});
            this.partidas.push(new FormControl(det));
            
          }, err=> {
            console.log('No se encuentra el producto de maniobras');
          })
        } else {
          /*
          maniobra.precio = importeT
          maniobra.importe = importeT
          maniobra.cantidad = 1
          this.form.get('comisionTarjeta').setValue( (pena/100)) ;
          this.form.get('comisionTarjetaImporte').setValue(importeT);
          */
        }
      }
    }
  }

  private getImporte(tipo : 'B' | 'N') {
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
      cortado: false,
      importeCortes: 0,
      sucursal: this.form.get('sucursal').value
    }
  }

  

  
}
