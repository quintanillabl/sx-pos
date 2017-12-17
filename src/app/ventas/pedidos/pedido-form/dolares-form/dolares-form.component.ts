import {
  Component, OnInit, OnDestroy, OnChanges,
  Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges, ViewChild
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import * as _ from 'lodash';

import { Sucursal, Venta } from 'app/models';

import { PartidasGridComponent } from '../partidas-grid/partidas-grid.component';
import { PedidoDolaresFormServiceService } from './pedido-dolares-form-service.service';


@Component({
  selector: 'sx-dolares-form',
  templateUrl: './dolares-form.component.html',
  styleUrls: ['./dolares-form.component.scss']
})
export class DolaresFormComponent implements OnInit, OnDestroy, OnChanges {

  form: FormGroup;

  @Output() save = new EventEmitter();

  @Output() addNewCliente = new EventEmitter();

  @Input() sucursal: Sucursal;

  @Input() pedido: Venta;

  recalcular$: Observable<any>;
  recalcularSubscription: Subscription;

  formaDePago$: Observable<any>;
  formaDePagoSubscription: Subscription;

  @ViewChild(PartidasGridComponent) grid: PartidasGridComponent;

  constructor(
    private fb: FormBuilder,
    private service: PedidoDolaresFormServiceService,
    private cd: ChangeDetectorRef
  ) {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pedido && changes.pedido.currentValue) {
      const pedido: Venta = changes.pedido.currentValue;
      _.forEach(pedido.partidas, item => this.partidas.push(new FormControl(item)));
      this.form.patchValue(pedido, {emitEvent: false});
      this.service.registerForm(this.form);
      this.buildRecalcular$();
      this.buildFomraDePago$();
    }
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.recalcularSubscription.unsubscribe();
    this.formaDePagoSubscription.unsubscribe();
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [this.sucursal],
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      cliente: [null, Validators.required],
      tipo: [{value: 'CON', disabled: true}, Validators.required],
      atencion: ['MOSTRADOR', Validators.required],
      entrega: ['LOCAL', Validators.required],
      vale: [false, Validators.required],
      formaDePago: ['EFECTIVO', Validators.required],
      sucursalVale: [null],
      almacen: [null],
      direccion: [null],
      comprador: [null],
      comentario: [null],
      tipoDeCambio: [{value: 1}, [Validators.required, Validators.min(2)]],
      importe: [{value: 0, disabled: true}],
      descuento: [{value: 0, disabled: true}],
      descuentoImporte: [{value: 0, disabled: true}],
      subTotal:  [{value: 0, disabled: true}],
      impuesto: [{value: 0, disabled: true}],
      total: [{value: 0, disabled: true}],
      partidas: this.fb.array([]),
      cod: [false],
      cargosPorManiobra: [{value: 0, disabled: true}],
      comisionTarjeta: [{value: 0, disabled: true}],
      comisionTarjetaImporte: [{value: 0, disabled: true}],
      corteImporte: [{value: 0, disabled: true}],
      moneda: ['USD']
    });
  }

  private  buildRecalcular$() {
    // console.log('Preparando recalculo observable');

    const cliente$ = this.form.get('cliente').valueChanges.filter( c => c !== null).distinctUntilChanged()
    const tipo$ = this.form.get('tipo').valueChanges.distinctUntilChanged();
    const formaDePago$ = this.form.get('formaDePago').valueChanges.distinctUntilChanged();

    this.recalcular$ = Observable.combineLatest(cliente$, tipo$, formaDePago$);

    this.recalcularSubscription = this.recalcular$.subscribe( data => {
      // console.log('CombineLatest res : ', data);
      this.service.recalcular();
      this.cd.detectChanges();
      this.grid.refresh();
    });
  }

  private buildFomraDePago$() {
    const tipo$ = this.form.get('tipo').valueChanges.distinctUntilChanged();
    this.formaDePagoSubscription = tipo$
      .subscribe( tipo =>  {
        if ( tipo === 'CRE') {
          this.form.get('formaDePago').disable();
          this.form.get('formaDePago').setValue('CHEQUE');
        }
        if ( tipo === 'CON') {
          this.form.get('formaDePago').enable();
          this.form.get('formaDePago').setValue('EFECTIVO');
        }
      });
  }

  onAddNewCliente() {
    this.addNewCliente.emit();
  }

  onInsertPartida() {
    this.service.agregarPartida({sucursal: this.sucursal});
  }

  onEditPartida(index: number) {
    this.service.editarPartida(index, {sucursal: this.sucursal});
  }

  onDelete(index: number) {
    this.service.elimiarPartida(index);
  }

  get cliente() {
    return this.form.get('cliente').value;
  }

  get partidas() {
    return this.form.get('partidas') as FormArray;
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
      _.forEach(pedido.partidas, item => item.sucursal = this.sucursal)
      this.save.emit(pedido);
    }
  }

}
