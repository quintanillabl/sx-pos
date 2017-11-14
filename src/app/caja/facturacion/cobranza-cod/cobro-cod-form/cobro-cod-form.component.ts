import { Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy, SimpleChanges,
  ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';

import { CajaService } from 'app/caja/services/caja.service';

import { Cobro } from 'app/models/cobro';


export const CobradoValidator = (control: AbstractControl): {[key: string]: boolean} => {
  const cobrado = control.value;
  return cobrado > 0 ? null : { importeInvalido: true };
};


@Component({
  selector: 'sx-cobro-cod-form',
  templateUrl: './cobro-cod-form.component.html',
  styleUrls: ['./cobro-cod-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CobroCodFormComponent implements OnInit {

  @Input() cxc: any;

  @Output() save = new EventEmitter();

  @Output() cancelar = new EventEmitter();

  // subscription: Subscription;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    // this.subscription.unsubscribe();
  }
  ngOnChanges(changes: SimpleChanges) {

    if(changes.cxc && changes.cxc.currentValue !=null ){
      this.form.patchValue({
        formaDePago: this.cxc.formaDePago
      })
    }

  }

  private buildForm(){
    this.form = this.fb.group({
      formaDePago: [null, Validators.required],
      importe: [0, [Validators.required, CobradoValidator]],
      // importe: [{value: 0, required: false }, Validators.required],
      // cambio: [{value: 0, disabled: true}]
    });

    // this.subscription = this.form.get('cobrado').valueChanges.subscribe(cobrado => {
    //   let cambio = cobrado - this.porCobrar
    //   if (cambio > 0) {
    //     cambio = _.round(cambio,2);
    //     this.form.get('cambio').setValue(cambio);
    //   }
    // });
  }


  onSubmit() {
    if (this.form.valid) {
      const importe = this.form.get('importe').value
      const cobro: Cobro = {
        cliente: this.cxc.cliente,
        sucursal: this.cxc.sucursal,
        tipo: this.cxc.tipo,
        fecha: new Date().toISOString(),
        formaDePago: this.cxc.formaDePago,
        moneda: this.cxc.moneda,
        tipoDeCambio: this.cxc.tipoDeCambio,
        importe: importe,
        disponible: importe
      }
      cobro.aplicaciones = [
        {fecha: new Date().toISOString(), importe: importe, cuentaPorCobrar: this.cxc}
      ];
      console.log('Cobro preparado: ', cobro);
      this.save.emit(cobro);
    }
  }

}
