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

  formasDePago = ['EFECTIVO', 'TRANSFERENCIA', 'TARJETA_DEBITO', 'TARJETA_CREDITO'];

  parciales: Cobro[] = [];

  subscription: Subscription;
  
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.buildForm();
  }

  ngOnInit() {
    // console.log('Cobro de venta: ', this.venta);
    if (this.venta.cliente.permiteCheque) {
      this.formasDePago.push('CHEQUE');
    }
    if (this.venta.formaDePago === 'TARJETA_DEBITO') {
      _.pull(this.formasDePago, 'TARJETA_CREDITO');
    }
  }

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
      formaDePago: [{value: '', disabled: true}, [Validators.required, this.validarFormaDePago.bind(this)]],
      cambio: [{value: 0, disabled: true}],
    },{
      validator: this.validarPorCobrar.bind(this)
    });
    
    this.subscription = this.form.get('importe').valueChanges.subscribe(importe => {
      
      if (this.porCobrar < 0) {
        let cambio = Math.abs(this.porCobrar); 
        cambio = _.round(cambio,2);
        this.form.get('cambio').setValue(cambio);
      } else {
        this.form.get('cambio').setValue(0);
      }
    });
  }

  validarPorCobrar(control: AbstractControl) {
    if (this.venta) {
      const pendiente = this.porCobrar
      return pendiente <= 0 ? null : {importeInvalido: true};
    }
    return null;
  }

  validarFormaDePago(control: AbstractControl) {
    const fp = control.value;
    if ( this.parciales.length > 0) {
      if (fp === 'CHEQUE') {
        const cliente = this.venta.cliente;
        return cliente.permiteCheque ? null : {permiteCheque: false};
      }
    }
    return null;
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

  get pendiente() {
    return this.saldo - this.totalParciales 
  }

  get permitirMasCobros() {
    return this.porCobrar > 0 && this.importe > 0
  }

  agregarCobro(){
    const cobro = this.prepareEntity();
    this.parciales.push(cobro);
    this.form.get('formaDePago').enable();
    this.form.reset({
      importe: 0,
      formaDePago: this.venta.formaDePago,
      cambio: 0
    });
  }

  quitarCobro(index: number) {
    console.log('Quitando cobro: ', index);
    this.parciales.splice(index);
    if (this.parciales.length === 0) {
      this.form.get('formaDePago').disable();
    }
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
      const cobros = [... this.parciales];
      cobros.push(this.prepareEntity());
      const cobroJob = {
        venta: this.venta,
        cobros: cobros
      }
      this.save.emit(cobroJob);
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

  getItemIcon(item) {
    switch (item.formaDePago) {
      case 'TARJETA_CREDITO':
      case 'TARJETA_DEBITO': {
        return 'credit_card';
      }
      case 'EFECTIVO':
        return 'attach_money'
      default: 
        return 'local_atm'
    }
  }

}
