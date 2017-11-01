import {
  Component, OnInit, OnDestroy, OnChanges,
  Input, Output, EventEmitter, SimpleChanges
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import * as _ from 'lodash';

import { Sucursal, Venta } from 'app/models';


@Component({
  selector: 'sx-anticipo-form',
  templateUrl: './anticipo-form.component.html',
  styleUrls: ['./anticipo-form.component.scss']
})
export class AnticipoFormComponent implements OnInit, OnDestroy, OnChanges {

  form: FormGroup;

  @Output() save = new EventEmitter();

  @Input() sucursal: Sucursal;

  @Input() pedido: Venta;

  @Input() readonly  = false;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pedido && changes.pedido.currentValue) {
      const pedido: Venta = changes.pedido.currentValue;
      this.form.patchValue(pedido, {emitEvent: false});
    }
  }

  ngOnInit() {}

  ngOnDestroy() {}

  private buildForm() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [this.sucursal],
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      cliente: [null, Validators.required],
      tipo: [{value: 'CON', disabled: true}, Validators.required],
      atencion: ['MOSTRADOR', Validators.required],
      formaDePago: ['EFECTIVO', Validators.required],
      comentario: [null],
      importe: [0, [Validators.required, Validators.min(1)]],
      subTotal:  [{value: 0, disabled: true}],
      impuesto: [{value: 0, disabled: true}],
      total: [{value: 0, disabled: true}],
      moneda: ['MXN']
    });
  }

  get cliente() {
    return this.form.get('cliente').value;
  }

  get fecha() {
    return this.form.get('fecha').value
  }

  get id () {
    return this.form.get('id').value;
  }

  onSave() {
    if (this.form.valid) {
      const pedido: Venta = {
        ...this.form.getRawValue(),
        sucursal: this.sucursal,
        vendedor: this.cliente.vendedor
      };
      this.save.emit(pedido);
    }
  }

  get title() {
    return this.id ? 'Anticipo: ' + this.form.get('documento').value : 'Alta de anticipo';
  }



}
