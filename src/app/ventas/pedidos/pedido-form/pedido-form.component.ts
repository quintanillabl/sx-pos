import {
  Component, OnInit, OnDestroy, OnChanges,
  Input, Output, EventEmitter, ChangeDetectorRef, SimpleChanges, ViewChild, HostListener, ViewContainerRef
} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import {FormGroup, FormBuilder, Validators, FormArray, FormControl, AbstractControl} from '@angular/forms';
import * as _ from 'lodash';

import { Sucursal, Cliente, Venta, VentaDet } from 'app/models';
import { PedidoFormService } from './pedido-form.service';
import { PartidasGridComponent } from './partidas-grid/partidas-grid.component';
import { TdDialogService } from '@covalent/core';
import { PedidoValidator } from './pedido.validator';


export enum KEY_CODE {
  RIGHT_ARROW = 39,
  LEFT_ARROW = 37
}

@Component({
  selector: 'sx-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit, OnDestroy, OnChanges {

  form: FormGroup;

  @Output() save = new EventEmitter();

  @Output() delete = new EventEmitter();

  @Output() addNewCliente = new EventEmitter();

  @Output() cambiarCfdiMail = new EventEmitter();

  @Output() print = new EventEmitter();

  @Input() sucursal: Sucursal;

  @Input() pedido: Venta;

  recalcular$: Observable<any>;
  recalcularSubscription: Subscription;

  formaDePago$: Observable<any>;
  formaDePagoSubscription: Subscription;


  @ViewChild(PartidasGridComponent) grid: PartidasGridComponent;

  constructor(
    private fb: FormBuilder,
    private pedidoFormService: PedidoFormService,
    private cd: ChangeDetectorRef,
    private _dialogService: TdDialogService,
    private _viewContainerRef: ViewContainerRef
  ) {
    this.buildForm();

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.pedido && changes.pedido.currentValue) {
      const pedido: Venta = changes.pedido.currentValue;
      // console.log('Editando pedido: ', pedido);
      _.forEach(pedido.partidas, item => this.partidas.push(new FormControl(item)));
      this.form.get('isPuesto').setValue(pedido.puesto !== undefined);

      if (pedido.envio) {
        console.log('Pedido con envio: ', pedido.envio)
        this.form.get('mismaDireccion').setValue(false);
        this.form.get('mismaDireccion').enable();
        this.form.get('entrega').setValue('ENVIO');
      }
      this.form.patchValue(pedido, {emitEvent: false});
      this.pedidoFormService.registerForm(this.form, pedido);
      this.buildRecalcular$();
      this.buildFomraDePago$();
      this.pedidoFormService.recalcular();

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
      documento: [0],
      sucursal: [this.sucursal],
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      cliente: [null, Validators.required],
      nombre: [null],
      tipo: [{value: 'CON', disabled: true}, Validators.required],
      formaDePago: ['EFECTIVO', Validators.required],
      atencion: ['', Validators.required],
      entrega: ['LOCAL', Validators.required],
      vale: [{value: false, disabled: true}, Validators.required],
      clasificacionVale: [{value: 'SIN_VALE', disabled: false}, Validators.required],
      sucursalVale: [{value: null, disabled: false}],
      almacen: [{value: null, disabled: true}],
      mismaDireccion: [{value: true, disabled: true}, Validators.required],
      entregaParcial: [{value: false, disabled: true}, Validators.required],
      direccion: [null],
      comprador: [null],
      comentario: [null],
      importe: [{value: 0, disabled: true}],
      descuento: [{value: 0, disabled: true}],
      descuentoImporte: [{value: 0, disabled: true}],
      descuentoOriginal: [{value: 0, disabled: true}],
      subtotal:  [{value: 0, disabled: true}],
      impuesto: [{value: 0, disabled: true}],
      total: [{value: 0, disabled: true}],
      partidas: this.fb.array([]),
      cod: [false],
      cargosPorManiobra: [{value: 0, disabled: true}],
      comisionTarjeta: [{value: 0, disabled: true}],
      comisionTarjetaImporte: [{value: 0, disabled: true}],
      corteImporte: [{value: 0, disabled: true}],
      cfdiMail: [{value: null, disabled: true}],
      usoDeCfdi: ['', Validators.required],
      kilos: [{value: 0, disabled: true}],
      envio: null,
      isPuesto: false,
      puesto: null
    }, { validator: PedidoValidator});
  }

  private  buildRecalcular$() {
    // console.log('Preparando recalculo observable');
    const cliente$ = this.form.get('cliente').valueChanges.distinctUntilChanged();
    const tipo$ = this.form.get('tipo').valueChanges.distinctUntilChanged();
    const formaDePago$ = this.form.get('formaDePago').valueChanges.distinctUntilChanged();
    this.recalcular$ = Observable.merge(cliente$, tipo$, formaDePago$);

    this.recalcularSubscription = this.recalcular$.subscribe( data => {
      // console.log('Recalculando importes : ', data);
      this.pedidoFormService.recalcular();
      this.cd.detectChanges();
      this.grid.refresh();
    });
  }

  private buildFomraDePago$() {

    const cliente$ = this.form.get('cliente')
      .valueChanges; // .filter( cliente =>  cliente !== null);

    const tipo$ = this.form.get('tipo').valueChanges.distinctUntilChanged();

    this.formaDePago$ = Observable.combineLatest(cliente$, tipo$ );

    this.formaDePagoSubscription = this.formaDePago$
      .subscribe( value =>  {
        // console.log('Activar/desactivar froma de pato', value);
        const cliente = value[0];
        const tipo = value[1];
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
    this.pedidoFormService.agregarPartida({sucursal: this.sucursal});
  }

  onEditPartida(index: number) {
    this.pedidoFormService.editarPartida(index, {sucursal: this.sucursal});
  }

  onDelete(index: number) {
    this.pedidoFormService.elimiarPartida(index);
  }

  onCambioDePrecio(index: number) {
    this.pedidoFormService.cambioDePrecio(index, this.grid);
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
    const pedido: Venta = {
      ...this.form.getRawValue(),
      sucursal: this.sucursal,
      vendedor: this.cliente.vendedor,
    };
    this.fixPedidoToApi(pedido);

    _.forEach(pedido.partidas, item => item.sucursal = this.sucursal)
    this.save.emit(pedido);
  }

  /**
   * Ajuste requerido para que Grails genere un update inecesario al producto. Cuando Grails recibe en
   * el payload de un HttpRequest mas propiedades aparte del ID genera un update a estas. Lo que ocaciona que
   * se registre un cambio inecesario en cada producto y en el cliente
   * @param pedido
   * @returns {any[]}
   */
  private fixPedidoToApi(pedido) {
    pedido.cliente = pedido.cliente.id
    const data = [...pedido.partidas];
    _.forEach(data, item => item.producto = item.producto.id);
    return pedido;
  }

  /*
  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    console.log('Event: ', event.key);
  }
  */

  onDescuento() {
    this.pedidoFormService.aplicarDescuentoEspecial(this.grid);
    // this.cd.detectChanges();
    // this.grid.refresh();
  }

  onPuesto(puesto) {
    if (puesto.checked) {
      this.form.get('puesto').setValue(new Date().toISOString());
    } else {
      this.form.get('puesto').setValue(null);
    }
  }

  onCambioDeCfdi(cliente) {
    // console.log('Cambio de CFDI mail', cliente);
    this.cambiarCfdiMail.emit(cliente);
  }

  onManiobra() {
    this._dialogService.openPrompt({
      message: 'Importe del cargo',
      viewContainerRef: this._viewContainerRef,
      title: 'Maniobras',
      cancelButton: 'Cancelar',
      acceptButton: 'Aceptar',
    }).afterClosed().subscribe((newValue: string) => {
      if (newValue) {
        const importe = _.toNumber(newValue);
        if ( !_.isNaN(importe) && _.isNumber(importe)){
          console.log('Asignando flete: ', importe);
          this.form.get('cargosPorManiobra').setValue(importe);
          this.pedidoFormService.generarCargosPorFlete(this.grid);
        }
      }
    });

  }


  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    // console.log(event);
    if (event.ctrlKey && event.code === 'KeyI' ) {
      this.onInsertPartida();
    }
    if (event.code === 'Insert') {
      this.onInsertPartida();
    }
    if (event.code === 'F7') {
      this.onAddNewCliente();
    }
  }


}
