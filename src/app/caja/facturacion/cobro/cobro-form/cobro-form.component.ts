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
        formaDePago: this.venta.formaDePago,
      })
    }
  }

  private buildForm(){
    this.form = this.fb.group({
      importe: [0, [Validators.required, CobradoValidator]],
      formaDePago: ['', Validators.required],
      cambio: [{value: 0, disabled: true}],
    });
    
    this.subscription = this.form.get('importe').valueChanges.subscribe(importe => {
      let cambio = importe - this.saldo
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

  get saldo() {
    return this.venta.total;
  }

  get totalParciales() {
    return _.sumBy(this.parciales, 'importe');
  }

  get importe() {
    return this.form.get('importe').value;
  }

  get porCobrar() {
    return this.saldo - this.totalParciales - this.importe
  }

  get permitirMasCobros() {
    return this.porCobrar > 0 && this.importe > 0
  }

  agregarCobro(){
    const cobro = this.prepareEntity();
    this.parciales.push(cobro);
    this.form.reset({
      importe: 0,
      formaDePago: this.venta.formaDePago,
      cambio: 0
    });
    
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
      importe: _.toNumber(this.form.get('importe').value),
    }
    return cobro;
  }

  onSubmit() {
    if (this.form.valid) {
      const importe = this.form.get('porCobrar').value
      const cobro: Cobro = this.prepareEntity();
      if (this.venta.tipo !== 'CRE') {
        cobro.aplicaciones = [
          {fecha: new Date().toISOString(), importe: importe, cuentaPorCobrar: this.venta.cuentaPorCobrar}
        ];
      }
      // console.log('Cobro preparado: ', cobro);
      this.save.emit(cobro);
    }
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

}
