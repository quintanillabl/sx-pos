import {Component, OnInit, Inject, ViewEncapsulation, OnDestroy} from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, ValidatorFn, AbstractControl } from '@angular/forms';
import * as _ from 'lodash';

import {Existencia, Producto, Sucursal, VentaDet} from 'app/models';
import {ExistenciasService} from 'app/ventas/services/existencias.service';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

export function onlyNumber(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value = _.toNumber(control.value);
    const ok = _.isFinite(value);
    return ok ? null : {'notNumber': {value: value}};
  };
}

@Component({
  selector: 'sx-pedidodet-form-partida',
  templateUrl: 'pedido-det-form.component.html',
  styleUrls: ['./pedido-det-form.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PedidoDetFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  sucursal: Sucursal;
  producto$: Observable<Producto>;
  disponibilidadTotal$: Observable<number>;
  existenciaRemota$: Observable<Existencia[]>;
  sinExistencia$: Observable<boolean>;
  conVale$: Observable<boolean>;
  tipoDePrecio = 'CON';
  importeBruto$: Observable<number>;

  partida: VentaDet;

  subs1: Subscription;
  subs2: Subscription;
  subs3: Subscription;
  subs4: Subscription;

  corte$: Observable<boolean>;
  corteSubscription: Subscription

  constructor(
    public dialogRef: MdDialogRef<PedidoDetFormComponent>,
    @Inject(MD_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private existenciasService: ExistenciasService,
  ) {
    this.sucursal = data.sucursal;
    this.tipoDePrecio = data.tipo;
    this.partida = data.partida;
  }

  ngOnInit() {
    this.buildForm();
    this.edicion();
    this.buildExistenciaRemota$();
    this.buildDisponibilidadTotal$();
    this.buildProducto$();
    this.buildSinExistencia();
    this.buildSinVale();
    this.buildImporteBruto$();
    this.buildCorte$();
  }

  private edicion() {
    if (this.partida) {
      this.form.patchValue(this.partida);
    }
  }

  private buildForm() {
    this.form = this.fb.group({
      existencia: [null, Validators.required],
      cantidad: [0, [Validators.required, Validators.min(1), onlyNumber()]],
      precio: [{value: 0, disabled: true}, [Validators.required]],
      importe: [{value: 0, disabled: true}],
      cortado: [{value: false, disabled: true}],
      sinExistencia: [{value: false, disabled: true}],
      conVale: [{value: false, disabled: true}],
      conTrs: [{value: false, disabled: true}],
      instruccionDeCorte: this.fb.group({
        cantidad: [1, Validators.required],
        tipo: ['CALCULADO', Validators.required],
        precio: [10.0, Validators.required],
        instruccion: [null]
      })
    });
  }

  private buildExistenciaRemota$() {
    this.existenciaRemota$ = this.form.get('existencia')
      .valueChanges
      .do( exis => this.form.get('precio')
        .setValue(this.tipoDePrecio === 'CON' ? exis.producto.precioContado : exis.producto.precioCredito))
      .switchMap( exis => {
        return this.existenciasService.buscarExistencias(exis.producto);
          // .map( res => res.filter(item => item.sucursal.id !== this.sucursal.id))
      });
  }

  private buildDisponibilidadTotal$() {
    this.disponibilidadTotal$ = this.existenciaRemota$.map( exis => _.sumBy(exis, 'disponible'));
  }

  private buildProducto$() {
    this.producto$ = this.form.get('existencia').valueChanges.pluck('producto');
    this.subs1 = this.producto$.subscribe( p => {
      if (p.presentacion === 'EXTENDIDO') {
        this.form.get('cortado').enable();
      }
      // this.form.get('precio').setValue(this.tipoDePrecio === 'CREDITO' ? p.precioCredito : p.precioContado);
    });
  }

  private buildSinExistencia() {
    this.sinExistencia$ = this.form.get('existencia').valueChanges
      .combineLatest(this.form.get('cantidad').valueChanges, (exis, cantidad) => {
        return exis.disponible - cantidad < 0;
      });
    this.subs2 = this.sinExistencia$.subscribe( val => {
      if (val) {
        this.form.get('sinExistencia').enable();
      } else {
        this.form.get('sinExistencia').disable();
      }
    });
  }

  private buildSinVale() {
    this.conVale$ = this.sinExistencia$.combineLatest(
      this.disponibilidadTotal$,
      this.form.get('cantidad').valueChanges ,
      (sinExistencia, total, cantidad) => {
        if (sinExistencia) {
          return total - cantidad > 0;
        } else {
          return false;
        }
    });
    // Subscribe to the observable to enable or diable the checkbox
    this.subs3 = this.conVale$.subscribe( val => {
      if (val) {
        this.form.get('conVale').enable();
      } else {
        this.form.get('conVale').disable();
      }
    });
  }

  private buildImporteBruto$() {
    const precio$ = this.form.get('precio').valueChanges;
    const cantidad$ = this.form.get('cantidad').valueChanges;
    const factor$ = this.producto$.pluck('unidad').map( unidad => unidad === 'MIL' ? 1000 : 1);
    this.importeBruto$ = precio$
      .combineLatest(cantidad$, factor$, (cantidad, precio, factor) => (cantidad * precio) / factor).startWith(0);
    this.subs4 = this.importeBruto$.subscribe( importe => this.form.get('importe').setValue(importe));
  }

  private buildCorte$() {
    this.corte$ = this.form.get('cortado').valueChanges;
    this.corteSubscription = this.corte$.subscribe( val => {
      if (!val) {
        const instruccion = this.form.get('instruccionDeCorte').value;
        instruccion.cantidad = 0;
        instruccion.precio = 0;
        instruccion.instruccion = null;
      }
    })
  }

  ngOnDestroy() {
    this.subs1.unsubscribe();
    this.subs2.unsubscribe();
    this.subs3.unsubscribe();
    this.subs4.unsubscribe();
    this.corteSubscription.unsubscribe();
  }

  close() {
    this.dialogRef.close();
  }

  doAccept() {
    if (this.partida) {
      this.dialogRef.close(this.partida);
    } else {
      const ventaDet = this.preparePartida();
      this.dialogRef.close(ventaDet);
    }
  }

  preparePartida(): VentaDet {
    const rawData = this.form.getRawValue();
    const producto = rawData.existencia.producto;
    const factor = producto.unidad === 'MIL' ? 1000 : 1;
    const kilos = (rawData.cantidad * producto.kilos) / factor;
    const det: VentaDet = {
      producto: producto,
      cantidad: rawData.cantidad,
      precio: rawData.precio,
      importe: rawData.importe,
      desctoOriginal: 0,
      descuento: 0,
      descuentoImporte: 0,
      subTotal: rawData.importe,
      impuesto: 0,
      impuestoTasa: 0.16,
      total: rawData.importe,
      precioLista: rawData.precio,
      precioOriginal: rawData.precio,
      kilos: kilos,
      comentario: rawData.comentario,
      conVale: rawData.conVale,
      importeCortes: rawData.importeCortes,
      sucursal: this.sucursal
    }
    if (this.form.get('cortado').value) {
      det.corte = this.form.get('instruccionDeCorte').value;
    }
    return det;
  }

  get existencia() {
    return this.form.get('existencia').value;
  }
}
