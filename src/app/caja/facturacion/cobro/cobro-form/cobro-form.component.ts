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

  parciales: Cobro[] = [];

  subscription: Subscription;
  subscription2: Subscription;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.subscription2.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.venta && changes.venta.currentValue !=null ){
      this.form.patchValue({
        porCobrar: this.venta.total,
        formaDePago: this.venta.formaDePago,
      })
    }
  }

  private buildForm(){
    this.form = this.fb.group({
      cobrado: [0, [Validators.required, CobradoValidator]],
      porCobrar: [{value: 0, required: false }, [this.validarPorCobrar.bind(this)]],
      cambio: [{value: 0, disabled: true}],
      formaDePago: ['', Validators.required]
    });

    this.subscription = this.form.get('cobrado').valueChanges.subscribe(cobrado => {
      let pendiente = this.saldo - cobrado;
      if(pendiente < 0) {
        pendiente = 0;
      }
      //console.log('Por cobrar: ', pendiente);
      this.form.get('porCobrar').setValue(pendiente);
    });
    
    this.subscription2 = this.form.get('cobrado').valueChanges.subscribe(porCobrar => {
      let cambio = porCobrar - this.saldo
      if (cambio > 0) {
        cambio = _.round(cambio,2);
        this.form.get('cambio').setValue(cambio);
      }
    });
  }

  validarPorCobrar(control: AbstractControl) {
    const pendiente = control.value;
    return pendiente <= 0 ? null : {importeInvalido: true};
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
    return this.form.get('porCobrar').value;
  }
  get cobrado() {
    return this.form.get('cobrado').value;
  }

  get permitirMasCobros() {
    return this.porCobrar > 0 && this.cobrado > 0
  }

  get saldo() {
    return this.venta.total;
  }

  agregarCobro(){
    const cobro = this.prepareEntity();
    this.parciales.push(cobro);
  }

  private prepareEntity(){
    //const importe = this.form.get('porCobrar').value
    const cobro: Cobro = {
      cliente: this.venta.cliente,
      sucursal: this.venta.sucursal,
      tipo: this.venta.tipo,
      fecha: new Date().toISOString(),
      formaDePago: this.form.get('formaDePago').value,
      moneda: this.venta.moneda,
      tipoDeCambio: this.venta.tipoDeCambio,
      importe: this.form.get('cobrado').value,
    }
    return cobro;
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
