import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { Cliente } from "@siipapx/models";
import { PedidoFormService } from "./pedido-form.service";


@Component({
  selector: 'sx-pedido-form',
  templateUrl: './pedido-form.component.html',
  styleUrls: ['./pedido-form.component.scss']
})
export class PedidoFormComponent implements OnInit {

  cliente$: Observable<Cliente>;

  form: FormGroup;

  @Output() addNewCliente = new EventEmitter();
  
  constructor(
    private fb: FormBuilder,
    private pedidoFormService: PedidoFormService
  ) { }

  ngOnInit() {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.fb.group({
      fecha: [{value: new Date(), disabled: true}, Validators.required],
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

}
