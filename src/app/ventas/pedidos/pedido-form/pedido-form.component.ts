import { Component, OnInit, OnDestroy,Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Sucursal, Cliente } from "@siipapx/models";
import { PedidoFormService } from "./pedido-form.service";



@Component({
  selector: 'sx-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit, OnDestroy {

  form: FormGroup;

  @Output() addNewCliente = new EventEmitter();

  @Input() sucursal: Sucursal;
  

  subscription1: Subscription;
  
  constructor(
    private fb: FormBuilder,
    private pedidoFormService: PedidoFormService
  ) { }

  ngOnInit() {
    this.buildForm();
    
  }

  ngOnDestroy(){
    // this.subscription1.unsubscribe();
  }

  private buildForm() {
    this.form = this.fb.group({
      fecha: [{value: new Date(), disabled: true}, Validators.required],
      cliente: [null, Validators.required],
      tipo: ['CONTADO', Validators.required],
      modo: ['MOSTRADOR', Validators.required],
      entrega: ['LOCAL', Validators.required],
      vale: ['SIN_VALE', Validators.required],
      sucursalVale: [null],
      almacen: [null],
      direccion: [null],
      comprador: [null],
      comentario: [null],
      importeBruto: [{value: 13870, disabled: true}]
    });
  }

  get fecha() {
    return this.form.get('fecha').value
  }

  onAddNewCliente() {
    this.addNewCliente.emit();
  }

  onInsertPartida() {
    // console.log('Insertando partida al pedido');
    this.pedidoFormService.agregarPartida();
  }

  get cliente() {
    return this.form.get('cliente').value;
  }

}
