import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';

import { Sucursal, Cliente } from '@siipapx/models';
import { PedidoFormService } from './pedido-form.service';



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

  constructor(
    private fb: FormBuilder,
    private pedidoFormService: PedidoFormService
  ) { }

  ngOnInit() {
    this.buildForm();
    this.pedidoFormService.registerForm(this.form);
  }

  ngOnDestroy() {
    // this.subscription1.unsubscribe();
  }

  private buildForm() {
    this.form = this.fb.group({
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      cliente: [null, Validators.required],
      tipo: ['CON', Validators.required],
      modo: ['MOSTRADOR', Validators.required],
      entrega: ['LOCAL', Validators.required],
      vale: ['SIN_VALE', Validators.required],
      formaDePago: ['EFECTIVO', Validators.required],
      sucursalVale: [null],
      almacen: [null],
      direccion: [null],
      comprador: [null],
      comentario: [null],
      importe: [{value: 0, disabled: true}],
      descuento: [{value: 0, disabled: true}],
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
      sucursal: this.sucursal
    };
    this.save.emit(pedido);
  }

}
