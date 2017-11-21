import {
  Component, OnInit, Input, Output, EventEmitter, OnChanges, OnDestroy,
  SimpleChanges, ChangeDetectionStrategy, AfterViewInit
} from '@angular/core';
import {MdDialog} from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { AbstractControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as _ from 'lodash';


import { Venta } from 'app/models';
import { Cobro } from 'app/models/cobro';

import {ChequeFormComponent} from '../cheque-form/cheque-form.component';
import {TarjetaFormComponent} from '../tarjeta-form/tarjeta-form.component';
import {DisponibleFormComponent} from '../disponible-form/disponible-form.component';


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
export class CobroFormComponent implements OnInit, OnChanges, OnDestroy {


  @Input() venta: Venta;

  @Output() save = new EventEmitter();

  @Output() cancelar = new EventEmitter();

  @Output() facturar = new EventEmitter();

  formasDePago = ['EFECTIVO', 'TRANSFERENCIA', 'TARJETA_DEBITO', 'TARJETA_CREDITO'];

  parciales: Cobro[] = [];

  subscription: Subscription;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MdDialog,
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.venta && changes.venta.currentValue !== null ) {
      this.form.patchValue({
        formaDePago: this.venta.formaDePago,
        importe: this.venta.total
      });
      if (this.venta.cod) {
        this.form.get('formaDePago').disable();
      }
    }
  }

  ngOnInit() {
    // console.log('Cobro de venta: ', this.venta);
    if (this.venta.cliente.permiteCheque || this.venta.formaDePago === 'CHEQUE') {
      this.formasDePago.push('CHEQUE');
      _.pull(this.formasDePago, 'TRANSFERENCIA');
    }
    if (this.venta.formaDePago === 'TARJETA_DEBITO') {
      _.pull(this.formasDePago, 'TARJETA_CREDITO');
      _.pull(this.formasDePago, 'TRANSFERENCIA');
    }
    if (this.venta.formaDePago === 'CHEQUE') {
      _.pull(this.formasDePago, 'TARJETA_CREDITO');
      _.pull(this.formasDePago, 'TARJETA_DEBITO');
      _.pull(this.formasDePago, 'TRANSFERENCIA');
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


  private buildForm() {
    this.form = this.fb.group({
      importe: [0, [Validators.required]],
      formaDePago: [null, [Validators.required, this.validarFormaDePago.bind(this)]],
      cambio: [{value: 0, disabled: true}],
    }, {
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
      // console.log('Pendiente: ', pendiente);
      return pendiente <= 0 ? null : {importeInvalido: true};
    }
    /*
    const fp  = control.get('formaDePago').value;
    console.log('Validando forma de pago: ', fp);
    if (fp === 'CHEQUE') {

      const cliente = this.venta.cliente;
      return cliente.permiteCheque ? null : {permiteCheque: false};
    }
    */
    return null;
  }

  validarFormaDePago(control: AbstractControl) {
    const fp = control.value;
    if (fp === 'CHEQUE') {
      const cliente = this.venta.cliente;
      const result = cliente.permiteCheque ? null : {permiteCheque: false};
      return cliente.permiteCheque ? null : {permiteCheque: false};
    }
    return null;
  }

  get saldo() {
    return this.venta.total;
  }

  get totalParciales() {
    return _.sumBy(this.parciales, item => {
      return item.id ? item.porAplicar : item.disponible
    });
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
    return this.porCobrar > 0 && this.importe > 0 && (this.venta.formaDePago !== 'EFECTIVO')
  }

  agregarCobro() {
    const cobro = this.prepareEntity();
    let cobro$: Observable<any> = null;
    if (cobro.formaDePago === 'CHEQUE') {
      cobro$ = this.agregarCheque(cobro);
    }
    if (cobro.formaDePago === 'TARJETA_DEBITO' || cobro.formaDePago === 'TARJETA_CREDITO') {
      cobro$ = this.agregarTarjeta2(cobro);
    }
    if (cobro$) {
      cobro$.subscribe(res => {
        if (res) {
          this.pushCobro(res);
        }
      });
    } else {
      this.pushCobro(cobro);
    }
  }

  pushCobro(cobro: Cobro) {
    // console.log('Cobro generado: ', cobro);
    this.parciales.push(cobro);
    if (this.venta.formaDePago !== 'EFECTIVO') {
      this.form.get('formaDePago').enable();
    }
    this.form.reset({
      importe: 0,
      formaDePago: this.venta.formaDePago,
      cambio: 0
    });
  }

  quitarCobro(index: number) {
    this.parciales.splice(index);
    if (this.parciales.length === 0) {
      this.form.get('formaDePago').disable();
    }
  }

  private prepareEntity() {
    const value = _.toNumber(this.form.get('importe').value)
    const cobro: Cobro = {
      cliente: this.venta.cliente,
      sucursal: this.venta.sucursal,
      tipo: this.venta.tipo,
      fecha: new Date().toISOString(),
      formaDePago: this.form.get('formaDePago').value,
      moneda: this.venta.moneda,
      tipoDeCambio: this.venta.tipoDeCambio,
      importe: value,
      disponible: value
    }
    console.log('Agregar datos de la forma de pago...');
    return cobro;
  }

  onSubmit() {
    if (this.form.valid) {
      const cobros = [... this.parciales];
      const last = this.prepareEntity();
      let cobro$: Observable<any> = null;
      if (last.formaDePago === 'TARJETA_DEBITO' || last.formaDePago === 'TARJETA_CREDITO') {
        cobro$ = this.agregarTarjeta2(last);
      } if (last.formaDePago === 'CHEQUE') {
        cobro$ = this.agregarCheque(last);
      } if (cobro$) {
        cobro$.subscribe( result => {
          if (result) {
            cobros.push(result);
            const cobroJob = {
              venta: this.venta,
              cobros: cobros
            }
            this.save.emit(cobroJob);
          }
        });
      } else {
        cobros.push(this.prepareEntity());
        const cobroJob = {
          venta: this.venta,
          cobros: cobros
        }
        this.save.emit(cobroJob);
      }
    }
  }

  getTipo(venta: Venta) {
    if (venta !== null) {
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

  agregarCheque(cobro: Cobro): Observable<any> {
    const dialogRef = this.dialog.open(ChequeFormComponent, {
      data: {cobro: cobro}
    });
    return dialogRef.afterClosed();
  }

  agregarTarjeta(cobro: Cobro) {
    const dialogRef = this.dialog.open(TarjetaFormComponent, {
      data: {cobro: cobro}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.pushCobro(result);
      }
    });
  }

  agregarTarjeta2(cobro: Cobro): Observable<any> {
    const dialogRef = this.dialog.open(TarjetaFormComponent, {
      data: {cobro: cobro}
    });
    return dialogRef.afterClosed();
  }

  buscarDisponible() {
    const dialogRef = this.dialog.open(DisponibleFormComponent, {
      data: {cliente: this.venta.cliente}
    });
    dialogRef.afterClosed().subscribe( (result: Cobro) => {
      if (result) {
        const porAplicar = result.disponible > this.porCobrar ? this.porCobrar : result.disponible;
        result.porAplicar = porAplicar;
        this.pushCobro(result);
      }
    });
  }

  saldar() {
    this.form.get('importe').setValue(_.round(this.pendiente, 2));
  }

}
