import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import * as _ from 'lodash';

import { Sucursal, Cliente, VentaDet } from 'app/models';
import { PedidoFormService } from './pedido-form.service';

export function mapPartidaToImporte( det: VentaDet) {
  const factor = det.producto.unidad === 'MIL' ? 1000 : 1;
  const res =  (det.cantidad * det.precio) / factor
  return _.round(res, 2);
}

@Component({
  selector: 'sx-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  @Output() save = new EventEmitter();

  @Output() addNewCliente = new EventEmitter();

  @Input() sucursal: Sucursal;

  subscription1: Subscription;

  descuentoPorVolumen$: Observable<any>

  constructor(
    private fb: FormBuilder,
    private pedidoFormService: PedidoFormService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.pedidoFormService.registerForm(this.form);
    this.buildDescuentoPorVolumen$();
  }

  private buildDescuentoPorVolumen$() {
    const importeBruto$ = this.partidas.valueChanges
      .map(partidas => partidas.filter(item => item.producto.modoVenta ==='B'))
      .map( partidas => _.map(partidas, mapPartidaToImporte));

    this.descuentoPorVolumen$ = this.form.get('tipo').valueChanges
    .combineLatest(importeBruto$, (tipo, partidas) => {
      const importe = _.sum(partidas);
      const descuento = this.pedidoFormService.findDescuento(tipo, importe);
      console.log(`Tipo: ${tipo} Importe bruto toal: ${importe} Descuento: ${descuento}`);
      return descuento;
    });
    
    this.descuentoPorVolumen$
    .subscribe( descuento => {
      console.log('Descuento por volumen: ', descuento);
      this.pedidoFormService.aplicarDescuento(descuento.descuento);
    });
  }

  ngOnDestroy() {
    // this.subscription1.unsubscribe();
  }

  private buildForm() {
    this.form = this.fb.group({
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      cliente: [null, Validators.required],
      tipo: [null, Validators.required],
      atencion: ['MOSTRADOR', Validators.required],
      entrega: ['LOCAL', Validators.required],
      vale: [false, Validators.required],
      formaDePago: ['EFECTIVO', Validators.required],
      sucursalVale: [null],
      almacen: [null],
      direccion: [null],
      comprador: [null],
      comentario: [null],
      importe: [{value: 0, disabled: true}],
      descuento: [{value: 0, disabled: true}],
      subTotal:  [{value: 0, disabled: true}],
      impuesto: [{value: 0, disabled: true}],
      total: [{value: 0, disabled: true}],
      partidas: this.fb.array([]),
    });
  }

  get fecha() {
    return this.form.get('fecha').value
  }

  onAddNewCliente() {
    this.addNewCliente.emit();
  }

  onInsertPartida() {
    // console.log('Insertando partida al pedido');
    this.pedidoFormService.agregarPartida({sucursal: this.sucursal});
  }

  get cliente() {
    return this.form.get('cliente').value;
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
  }

  onSave() {
    const pedido = {
      ...this.form.getRawValue(),
      sucursal: this.sucursal,
      vendedor: this.cliente.vendedor.id
    };
    this.save.emit(pedido);
  }

}
