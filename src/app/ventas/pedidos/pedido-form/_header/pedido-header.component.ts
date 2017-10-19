import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'sx-pedido-header',
  templateUrl: './pedido-header.component.html',
  styleUrls: ['./pedido-header.component.scss']
})
export class PedidoHeaderComponent implements OnInit {

  @Output() addCliente = new EventEmitter();

  @Output() insertar = new EventEmitter();

  @Input() parent: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  get comprador() {
    return this.parent.get('comprador').value;
  }
  get cliente() {
    return this.parent.get('cliente').value;
  }

}
