import { Component, OnInit, OnDestroy, OnChanges,
  Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges, ViewChild } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl} from '@angular/forms';
import * as _ from 'lodash';

import { Sucursal, Cliente, Venta, VentaDet } from 'app/models';
import { PedidoFormService } from './pedido-form.service';
import { PartidasGridComponent } from './partidas-grid/partidas-grid.component';


@Component({
  selector: 'sx-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit, OnDestroy, OnChanges {
  
  form: FormGroup;

  @Output() save = new EventEmitter();

  @Output() addNewCliente = new EventEmitter();

  @Input() sucursal: Sucursal;

  @Input() pedido: Venta;

  descuentoSubscription: Subscription;

  descuentoContado$: Observable<any>;

  cliente$: Observable<Cliente>;

  clienteSubscription: Subscription;

  cargoPorTarjeta$: Observable<any>;

  @ViewChild(PartidasGridComponent) grid: PartidasGridComponent;

  constructor(
    private fb: FormBuilder,
    private pedidoFormService: PedidoFormService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // console.log('onInit');
    this.buildForm();
    this.pedidoFormService.registerForm(this.form);
    this.updateDescuentos$();
    this.buildCliente$();

    // Detectar cargos por tarjeta
    const tipo$ = this.form.get('tipo').valueChanges;
    const formaDePago$ = this.form.get('formaDePago').valueChanges;
    const partidas$ = this.partidas.valueChanges;
    this.cargoPorTarjeta$ = Observable.merge(tipo$, formaDePago$, partidas$);

    this.cargoPorTarjeta$.subscribe( data => {
      // const index = _.findIndex(this.partidas.value, (item: VentaDet) => item.producto.clave === 'MANIOBRA');
      this.pedidoFormService.generarCargosPorPagoConTarjeta(); 
      /*
      if(index !== -1){
      } else {
        
      }
      */
    });
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    // console.log('onChanges');
    if(changes.pedido && changes.pedido.currentValue) {
      const pedido: Venta = changes.pedido.currentValue;
      console.log('Editando pedido: ', pedido);
      
      this.form.patchValue({
        id: pedido.id,
        fecha: pedido.fecha,
        cliente: pedido.cliente,
        tipo: pedido.tipo,
      }, {emitEvent: false});
      
      _.forEach(pedido.partidas, item => this.partidas.push(new FormControl(item)));
    }
  }

  private updateDescuentos$() {
    const tipo$ = this.form.get('tipo').valueChanges;
    const partidas$ = this.partidas.valueChanges;
    const cliente$ = this.form.get('cliente').valueChanges.filter(cliente => cliente!== null);
    const formaDePago$ = this.form.get('formaDePago').valueChanges;

    this.descuentoSubscription = Observable.merge(tipo$, partidas$, cliente$, formaDePago$)
      .subscribe( value => {
        this.pedidoFormService.calcularDescuentos()
        this.cd.detectChanges();
        this.grid.refresh();
      });
  }
  
  private buildCliente$() {
    this.cliente$ = this.form.get('cliente').valueChanges
    .filter( cliente => cliente !==null);
    
    this.clienteSubscription = this.cliente$.subscribe( (cliente: Cliente) => {
      if( cliente.credito && cliente.credito.postfechado) {
        if(cliente.credito.postfechado){
          this.form.get('formaDePago').setValue('CHEQUE', {emitEvent: false});
        } else {
          this.form.get('formaDePago').setValue('EFECTIVO', {emitEvent: false});
        }
      } else {

      }
    });
  }

  ngOnDestroy() {
    this.descuentoSubscription.unsubscribe();
    this.clienteSubscription.unsubscribe();
  }

  private buildForm() {
    this.form = this.fb.group({
      id: [null],
      sucursal: [this.sucursal],
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      cliente: [null, Validators.required],
      tipo: [{value:'CON', disabled: true}, Validators.required],
      atencion: ['MOSTRADOR', Validators.required],
      entrega: ['LOCAL', Validators.required],
      vale: [false, Validators.required],
      formaDePago: ['EFECTIVO', Validators.required],
      sucursalVale: [null],
      almacen: [null],
      direccion: [null],
      comprador: [null],
      comentario: [null],
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
    });
  }

  onAddNewCliente() {
    this.addNewCliente.emit();
  }

  onInsertPartida() {
    this.pedidoFormService.agregarPartida({sucursal: this.sucursal});
  }

  onDelete(index: number) {
    this.partidas.removeAt(index);
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
    const pedido = {
      ...this.form.getRawValue(),
      sucursal: this.sucursal,
      vendedor: this.cliente.vendedor
    };
    this.save.emit(pedido);
  }

}
