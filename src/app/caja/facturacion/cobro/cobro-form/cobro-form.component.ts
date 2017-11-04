import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy,
  SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { CajaService } from 'app/caja/services/caja.service';
import { Venta } from 'app/models';
import { Cobro } from 'app/models/cobro';


export const CobradoValidator = (control: AbstractControl): {[key: string]: boolean} => {
  const cobrado = control.value;
  return cobrado > 0 ? null : { importeInvalido: true };
};


@Component({
  selector: 'sx-cobro-form',
  templateUrl: './cobro-form.component.html',
  styleUrls: ['./cobro-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CobroFormComponent implements OnInit, OnChanges, OnDestroy{

  @Input() venta: Venta;

  @Output() save = new EventEmitter();

  @Output() cancelar = new EventEmitter();

  @Output() facturar = new EventEmitter();

  @Output() cambiarPedido = new EventEmitter();

  subscription: Subscription;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.venta && changes.venta.currentValue !=null ){
      this.form.patchValue({
        porCobrar: this.venta.total
      })
    }
  }

  private buildForm(){
    this.form = this.fb.group({
      cobrado: [0, [Validators.required, CobradoValidator]],
      porCobrar: [{value: 0, required: false }, Validators.required],
      cambio: [{value: 0, disabled: true}]
    });

    this.subscription = this.form.get('cobrado').valueChanges.subscribe(cobrado => {
      let cambio = cobrado - this.porCobrar 
      if (cambio > 0) {
        cambio = _.round(cambio,2);
        this.form.get('cambio').setValue(cambio);
      }
    });
  }

  getTipo(venta: Venta){
    if(venta !== null) {
      switch (venta.tipo) {
        case 'CRE': 
          return 'CREDITO'
        case 'ANT':
          return 'ANTICIPO'
        default: {
          if (venta.cod) {
            return 'COD'
          } else {
            return 'CONTADO';
          }
        }
      }
    } else {
      return '';
    }
  }

  get porCobrar() {
    if(this.venta)
      return this.venta.total;
    else {
      return 0.0;
    }
  }

  onSubmit() {
    if (this.form.valid) {
      const importe = this.form.get('porCobrar').value
      const cobro: Cobro = {
        cliente: this.venta.cliente,
        sucursal: this.venta.sucursal,
        tipo: this.venta.tipo,
        fecha: this.venta.fecha,
        formaDePago: this.venta.formaDePago,
        moneda: this.venta.moneda,
        tipoDeCambio: this.venta.tipoDeCambio,
        importe: importe,
      }
      if (this.venta.tipo !== 'CRE') {
        
        cobro.aplicaciones = [
          {fecha: new Date().toISOString(), importe: importe, cuentaPorCobrar: this.venta.cuentaPorCobrar}
        ];
      }
      // console.log('Cobro preparado: ', cobro);
      this.save.emit(cobro);
    }
  }

}
